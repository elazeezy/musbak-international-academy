import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type LocalParts = { year: number; month: number; day: number; hour: number; minute: number; weekday: number };
function partsAt(timestamp: number, timezone: string): LocalParts {
  const values = new Intl.DateTimeFormat("en-US", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23", weekday: "short" }).formatToParts(timestamp);
  const part = (type: Intl.DateTimeFormatPartTypes) => values.find((item) => item.type === type)?.value ?? "0";
  const weekdays: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { year: Number(part("year")), month: Number(part("month")), day: Number(part("day")), hour: Number(part("hour")), minute: Number(part("minute")), weekday: weekdays[part("weekday")] ?? 0 };
}

function localTimeToEpoch(date: string, localTime: string, timezone: string): number | null {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = localTime.slice(0, 5).split(":").map(Number);
  const target = Date.UTC(year, month - 1, day, hour, minute);
  let candidate = target;
  for (let count = 0; count < 4; count += 1) {
    const actual = partsAt(candidate, timezone);
    const actualAsUtc = Date.UTC(actual.year, actual.month - 1, actual.day, actual.hour, actual.minute);
    const difference = target - actualAsUtc;
    if (difference === 0) break;
    candidate += difference;
  }
  const verify = partsAt(candidate, timezone);
  return verify.year === year && verify.month === month && verify.day === day && verify.hour === hour && verify.minute === minute ? candidate : null;
}

function authorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!secret || !token) return false;
  const expected = Buffer.from(secret);
  const supplied = Buffer.from(token);
  return expected.length === supplied.length && timingSafeEqual(expected, supplied);
}

function localNotice(locale: string, type: "CLASS_REMINDER" | "ASSIGNMENT_DUE_SOON" | "ASSIGNMENT_MISSED", name: string) {
  const all = {
    CLASS_REMINDER: { en: ["Class reminder", `${name} has an upcoming class within 24 hours.`], ar: ["تذكير بحصة", `لدى ${name} حصة قادمة خلال 24 ساعة.`], fr: ["Rappel de cours", `${name} a un cours dans les prochaines 24 heures.`] },
    ASSIGNMENT_DUE_SOON: { en: ["Assignment due soon", `An assignment for ${name} is due within 24 hours.`], ar: ["موعد واجب قريب", `يحل موعد واجب ${name} خلال 24 ساعة.`], fr: ["Devoir bientôt à rendre", `Un devoir de ${name} est à rendre dans les prochaines 24 heures.`] },
    ASSIGNMENT_MISSED: { en: ["Missed assignment", `An assignment for ${name} is past due.`], ar: ["واجب متأخر", `انتهى موعد واجب ${name}.`], fr: ["Devoir en retard", `Un devoir de ${name} est en retard.`] },
  } as const;
  const lang = locale === "ar" || locale === "fr" ? locale : "en";
  return all[type][lang];
}

async function notifyLearners(admin: ReturnType<typeof createSupabaseAdminClient>, studentIds: string[], type: "CLASS_REMINDER" | "ASSIGNMENT_DUE_SOON" | "ASSIGNMENT_MISSED", sourceId: string, href: string) {
  if (!studentIds.length) return 0;
  const [{ data: students }, { data: guardians }] = await Promise.all([
    admin.from("students").select("id,auth_user_id,display_name").in("id", studentIds),
    admin.from("guardian_student_relationships").select("student_id,guardian_user_id").in("student_id", studentIds).eq("can_view_academic", true).is("revoked_at", null),
  ]);
  const recipients = new Map<string, { name: string; source: string }[]>();
  for (const student of students ?? []) {
    if (student.auth_user_id) recipients.set(student.auth_user_id, [...(recipients.get(student.auth_user_id) ?? []), { name: student.display_name, source: student.id }]);
  }
  for (const relation of guardians ?? []) {
    const student = (students ?? []).find((item) => item.id === relation.student_id);
    if (student) recipients.set(relation.guardian_user_id, [...(recipients.get(relation.guardian_user_id) ?? []), { name: student.display_name, source: student.id }]);
  }
  const recipientIds = [...recipients.keys()];
  if (!recipientIds.length) return 0;
  const { data: profiles } = await admin.from("profiles").select("id,preferred_language").in("id", recipientIds);
  const rows = (profiles ?? []).flatMap((profile) => recipients.get(profile.id)?.map((context) => {
    const [title, body] = localNotice(profile.preferred_language, type, context.name);
    return { user_id: profile.id, event_type: type, source_key: `${sourceId}:${context.source}`, title, body, href: `/${profile.preferred_language}${href}` };
  }) ?? []);
  if (!rows.length) return 0;
  let inserted = 0;
  for (let start = 0; start < rows.length; start += 500) {
    const { data, error } = await admin.from("notifications").upsert(rows.slice(start, start + 500), { onConflict: "user_id,event_type,source_key", ignoreDuplicates: true }).select("id");
    if (!error) inserted += data?.length ?? 0;
  }
  return inserted;
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = createSupabaseAdminClient();
  const now = new Date();
  const sessionsEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const { data: schedules, error: schedulesError } = await admin.from("schedules").select("id,class_group_id,weekday,local_start,duration_minutes,timezone,starts_on,ends_on").eq("active", true);
  if (schedulesError) return NextResponse.json({ error: "Could not read class schedules." }, { status: 500 });
  const { data: groups } = await admin.from("class_groups").select("id").eq("status", "active");
  const activeGroups = new Set((groups ?? []).map((group) => group.id));
  const generatedByTime = new Map<string, { class_group_id: string; starts_at: string; ends_at: string }>();
  for (const schedule of schedules ?? []) {
    if (!activeGroups.has(schedule.class_group_id)) continue;
    let localToday: LocalParts;
    try { localToday = partsAt(now.getTime(), schedule.timezone); } catch { continue; }
    const base = Date.UTC(localToday.year, localToday.month - 1, localToday.day);
    for (let offset = 0; offset < 14; offset += 1) {
      const date = new Date(base + offset * 86400000);
      const dateString = date.toISOString().slice(0, 10);
      const weekday = date.getUTCDay();
      if (weekday !== schedule.weekday || dateString < schedule.starts_on || (schedule.ends_on && dateString > schedule.ends_on)) continue;
      const timestamp = localTimeToEpoch(dateString, schedule.local_start, schedule.timezone);
      if (timestamp === null || timestamp <= now.getTime()) continue;
      const startsAt = new Date(timestamp).toISOString();
      generatedByTime.set(`${schedule.class_group_id}:${startsAt}`, { class_group_id: schedule.class_group_id, starts_at: startsAt, ends_at: new Date(timestamp + schedule.duration_minutes * 60000).toISOString() });
    }
  }
  const generated = [...generatedByTime.values()];
  for (let start = 0; start < generated.length; start += 500) {
    await admin.from("class_sessions").upsert(generated.slice(start, start + 500), { onConflict: "class_group_id,starts_at", ignoreDuplicates: true });
  }

  const { data: upcoming } = await admin.from("class_sessions").select("id,class_group_id").gte("starts_at", now.toISOString()).lte("starts_at", sessionsEnd.toISOString()).eq("status", "scheduled").limit(500);
  let reminders = 0;
  for (const session of upcoming ?? []) {
    const { data: enrollments } = await admin.from("enrollments").select("student_id").eq("class_group_id", session.class_group_id).eq("status", "active");
    reminders += await notifyLearners(admin, (enrollments ?? []).map((item) => item.student_id), "CLASS_REMINDER", session.id, "/portal/schedule");
  }

  const { data: dueSoon } = await admin.from("assignments").select("id,class_group_id").eq("status", "published").gte("due_at", now.toISOString()).lte("due_at", sessionsEnd.toISOString()).limit(500);
  for (const assignment of dueSoon ?? []) {
    const { data: enrollments } = await admin.from("enrollments").select("student_id").eq("class_group_id", assignment.class_group_id).eq("status", "active");
    reminders += await notifyLearners(admin, (enrollments ?? []).map((item) => item.student_id), "ASSIGNMENT_DUE_SOON", assignment.id, "/portal/assignments");
  }

  const missedEnd = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  const { data: missed } = await admin.from("assignments").select("id,class_group_id").eq("status", "published").lt("due_at", missedEnd).limit(200);
  for (const assignment of missed ?? []) {
    const [{ data: enrollments }, { data: submissions }] = await Promise.all([
      admin.from("enrollments").select("student_id").eq("class_group_id", assignment.class_group_id).eq("status", "active"),
      admin.from("submissions").select("student_id").eq("assignment_id", assignment.id).not("submitted_at", "is", null),
    ]);
    const submitted = new Set((submissions ?? []).map((item) => item.student_id));
    reminders += await notifyLearners(admin, (enrollments ?? []).map((item) => item.student_id).filter((id) => !submitted.has(id)), "ASSIGNMENT_MISSED", assignment.id, "/portal/assignments");
  }
  return NextResponse.json({ sessionsCreated: generated.length, remindersCreated: reminders });
}
