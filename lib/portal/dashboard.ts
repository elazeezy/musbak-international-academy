import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Role } from "@/lib/supabase/database.types";

export type Metric = { label: string; value: number; detail?: string };
export type AdminSession = { id: string; starts_at: string; ends_at: string; group: string; students: number; teacher: string | null; status: string };
export type AdminActivity = { id: number; actor: string | null; action: string; target_table: string; created_at: string };
export type AdminAttention = { kind: "attendance" | "grading" | "payments" | "invitations"; count: number; href: string };
export type AdminOverview = {
  timezone: string;
  activeStudents: number;
  totalStudents: number;
  activeStaff: number;
  activeClasses: number;
  sessionsToday: AdminSession[];
  attendance: { marked: number; present: number; late: number; absent: number; excused: number; rate: number | null };
  attention: AdminAttention[];
  activity: AdminActivity[];
  errors: string[];
};
export type DashboardData = { metrics: Metric[]; upcoming: { id: string; starts_at: string; group: string }[]; children?: { id: string; display_name: string; status: string }[]; admin?: AdminOverview; error?: string };

function localDayBounds(timezone: string, now: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" });
  const parts = Object.fromEntries(formatter.formatToParts(now).map(({ type, value }) => [type, value]));
  const dateKey = `${parts.year}-${parts.month}-${parts.day}`;
  const offsetAt = (instant: Date) => {
    const values = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: timezone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(instant).map(({ type, value }) => [type, value]));
    return Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day), Number(values.hour), Number(values.minute), Number(values.second)) - instant.getTime();
  };
  const midnight = (key: string) => {
    const [year, month, day] = key.split("-").map(Number);
    const utcGuess = new Date(Date.UTC(year, month - 1, day));
    return new Date(utcGuess.getTime() - offsetAt(utcGuess));
  };
  const nextDay = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day) + 1));
  const nextDateKey = `${nextDay.getUTCFullYear()}-${String(nextDay.getUTCMonth() + 1).padStart(2, "0")}-${String(nextDay.getUTCDate()).padStart(2, "0")}`;
  return { start: midnight(dateKey), end: midnight(nextDateKey) };
}

export async function getDashboardData(role: Role, userId: string, preferredTimezone?: string): Promise<DashboardData> {
  if (role === "admin") {
    // Admin pages call this only after requireRole("admin"). Use the server-only
    // client for the academy-wide overview so the page does not depend on
    // browser-session RLS policy evaluation for its aggregate reads.
    const supabase = createSupabaseAdminClient();
    let timezone = preferredTimezone || "UTC";
    try { new Intl.DateTimeFormat("en", { timeZone: timezone }); } catch { timezone = "UTC"; }
    const now = new Date();
    const { start, end } = localDayBounds(timezone, now);
    const [students, activeStudents, staff, classes, sessions, overdue, pendingInvites, publishedAssignments, audit] = await Promise.all([
      supabase.from("students").select("id", { count: "exact", head: true }),
      supabase.from("students").select("id", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("staff_members").select("id", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("class_groups").select("id", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("class_sessions").select("id,class_group_id,starts_at,ends_at,status").gte("starts_at", start.toISOString()).lt("starts_at", end.toISOString()).neq("status", "cancelled").order("starts_at").limit(40),
      supabase.from("invoices").select("id", { count: "exact", head: true }).eq("status", "overdue"),
      supabase.from("invitations").select("id", { count: "exact", head: true }).eq("role", "teacher").eq("status", "pending").gt("expires_at", now.toISOString()),
      supabase.from("assignments").select("id").eq("status", "published"),
      supabase.from("audit_logs").select("id,actor_id,action,target_table,created_at").order("created_at", { ascending: false }).limit(8),
    ]);
    const errors: string[] = [];
    for (const [key, error] of [["students", students.error], ["activeStudents", activeStudents.error], ["staff", staff.error], ["classes", classes.error], ["sessions", sessions.error], ["overdueInvoices", overdue.error], ["invitations", pendingInvites.error], ["assignments", publishedAssignments.error], ["activity", audit.error]] as const) {
      if (error) { console.error(`[portal] Admin overview ${key} read failed:`, error.code ?? "unknown", error.message); errors.push(key); }
    }
    const todaySessions = sessions.data ?? [];
    const groupIds = [...new Set(todaySessions.map((session) => session.class_group_id))];
    const sessionIds = todaySessions.map((session) => session.id);
    const [groups, enrollments, attendanceRows, teaching, ungraded] = await Promise.all([
      groupIds.length ? supabase.from("class_groups").select("id,name").in("id", groupIds) : Promise.resolve({ data: [], error: null }),
      groupIds.length ? supabase.from("enrollments").select("class_group_id,student_id").in("class_group_id", groupIds).eq("status", "active") : Promise.resolve({ data: [], error: null }),
      sessionIds.length ? supabase.from("attendance").select("session_id,student_id,status").in("session_id", sessionIds) : Promise.resolve({ data: [], error: null }),
      groupIds.length ? supabase.from("teacher_assignments").select("class_group_id,staff_member_id").in("class_group_id", groupIds).lte("starts_on", now.toISOString().slice(0, 10)).or(`ends_on.is.null,ends_on.gte.${now.toISOString().slice(0, 10)}`) : Promise.resolve({ data: [], error: null }),
      (publishedAssignments.data?.length ?? 0) ? supabase.from("submissions").select("id", { count: "exact", head: true }).in("assignment_id", (publishedAssignments.data ?? []).map((item) => item.id)).is("grade", null).not("submitted_at", "is", null) : Promise.resolve({ count: 0, error: null }),
    ]);
    for (const [key, error] of [["groups", groups.error], ["enrollments", enrollments.error], ["attendance", attendanceRows.error], ["teachers", teaching.error], ["grading", ungraded.error]] as const) {
      if (error) { console.error(`[portal] Admin overview ${key} read failed:`, error.code ?? "unknown", error.message); errors.push(key); }
    }
    const staffIds = [...new Set((teaching.data ?? []).map((item) => item.staff_member_id))];
    const staffRows = staffIds.length ? await supabase.from("staff_members").select("id,user_id").in("id", staffIds) : { data: [], error: null };
    const userIds = [...new Set((staffRows.data ?? []).map((item) => item.user_id))];
    const profileRows = userIds.length ? await supabase.from("profiles").select("id,display_name").in("id", userIds) : { data: [], error: null };
    const profileNames = new Map((profileRows.data ?? []).map((item) => [item.id, item.display_name]));
    const staffNames = new Map((staffRows.data ?? []).map((item) => [item.id, profileNames.get(item.user_id) ?? null]));
    const groupNames = new Map((groups.data ?? []).map((group) => [group.id, group.name]));
    const teacherByGroup = new Map<string, string>();
    for (const assignment of teaching.data ?? []) {
      if (!teacherByGroup.has(assignment.class_group_id)) {
        const name = staffNames.get(assignment.staff_member_id);
        if (name) teacherByGroup.set(assignment.class_group_id, name);
      }
    }
    const rosterCounts = new Map<string, number>();
    for (const enrollment of enrollments.data ?? []) rosterCounts.set(enrollment.class_group_id, (rosterCounts.get(enrollment.class_group_id) ?? 0) + 1);
    const recorded = attendanceRows.data ?? [];
    const markedBySession = new Map<string, number>();
    for (const row of recorded) markedBySession.set(row.session_id, (markedBySession.get(row.session_id) ?? 0) + 1);
    const attendanceCount = (status: string) => recorded.filter((item) => item.status === status).length;
    const attendanceTotal = attendanceCount("present") + attendanceCount("late") + attendanceCount("absent");
    const missingAttendance = todaySessions.filter((session) => new Date(session.ends_at) < now).reduce((sum, session) => sum + Math.max(0, (rosterCounts.get(session.class_group_id) ?? 0) - (markedBySession.get(session.id) ?? 0)), 0);
    const actorIds = [...new Set((audit.data ?? []).flatMap((item) => item.actor_id ? [item.actor_id] : []))];
    const activityProfiles = actorIds.length ? await supabase.from("profiles").select("id,display_name").in("id", actorIds) : { data: [] };
    const activityNames = new Map((activityProfiles.data ?? []).map((item) => [item.id, item.display_name]));
    const activity: AdminActivity[] = (audit.data ?? []).map((item) => ({ id: item.id, actor: item.actor_id ? activityNames.get(item.actor_id) ?? null : null, action: item.action, target_table: item.target_table, created_at: item.created_at }));
    const attention: AdminAttention[] = [
      { kind: "attendance", count: missingAttendance, href: "/portal/admin/attendance" },
      { kind: "grading", count: ungraded.count ?? 0, href: "/portal/admin/assignments" },
      { kind: "payments", count: overdue.count ?? 0, href: "/portal/admin/payments" },
      { kind: "invitations", count: pendingInvites.count ?? 0, href: "/portal/admin/staff" },
    ];
    const sessionsToday: AdminSession[] = todaySessions.map((session) => ({ id: session.id, starts_at: session.starts_at, ends_at: session.ends_at, group: groupNames.get(session.class_group_id) ?? "Class", students: rosterCounts.get(session.class_group_id) ?? 0, teacher: teacherByGroup.get(session.class_group_id) ?? null, status: session.status }));
    const admin: AdminOverview = { timezone, activeStudents: activeStudents.count ?? 0, totalStudents: students.count ?? 0, activeStaff: staff.count ?? 0, activeClasses: classes.count ?? 0, sessionsToday, attendance: { marked: recorded.length, present: attendanceCount("present"), late: attendanceCount("late"), absent: attendanceCount("absent"), excused: attendanceCount("excused"), rate: attendanceTotal ? Math.round(((attendanceCount("present") + attendanceCount("late")) / attendanceTotal) * 100) : null }, attention, activity, errors };
    return {
      metrics: [
        { label: "Active students", value: admin.activeStudents, detail: `${admin.activeStudents} / ${admin.totalStudents}` },
        { label: "Teachers & staff", value: admin.activeStaff },
        { label: "Classes today", value: sessionsToday.length },
        { label: "Attendance rate", value: admin.attendance.rate ?? -1, detail: admin.attendance.rate === null ? "No attendance recorded" : `${admin.attendance.present + admin.attendance.late} of ${attendanceTotal} marked` },
      ],
      upcoming: sessionsToday.map((session) => ({ id: session.id, starts_at: session.starts_at, group: session.group })),
      admin,
      error: errors.length ? "Some overview information could not be loaded." : undefined,
    };
  }

  const supabase = await createSupabaseServerClient();

  if (role === "teacher") {
    const staff = await supabase.from("staff_members").select("id").eq("user_id", userId).maybeSingle();
    if (staff.error) return { metrics: [], upcoming: [], error: staff.error.message };
    const assigned = staff.data ? await supabase.from("teacher_assignments").select("class_group_id").eq("staff_member_id", staff.data.id) : { data: [], error: null };
    const groupIds = [...new Set((assigned.data ?? []).map((item) => item.class_group_id))];
    if (assigned.error) return { metrics: [], upcoming: [], error: assigned.error.message };
    if (!groupIds.length) return { metrics: [{ label: "Assigned classes", value: 0 }, { label: "Students", value: 0 }, { label: "Upcoming lessons", value: 0 }, { label: "Attendance to complete", value: 0 }], upcoming: [] };
    const [groups, enrollments, sessions, assignments] = await Promise.all([
      supabase.from("class_groups").select("id,name").in("id", groupIds).eq("status", "active"),
      supabase.from("enrollments").select("student_id").in("class_group_id", groupIds).eq("status", "active"),
      supabase.from("class_sessions").select("id,starts_at,class_group_id").in("class_group_id", groupIds).gte("starts_at", new Date().toISOString()).eq("status", "scheduled").order("starts_at").limit(6),
      supabase.from("assignments").select("id", { count: "exact", head: true }).in("class_group_id", groupIds).eq("status", "published"),
    ]);
    const sessionIds = (sessions.data ?? []).map((s) => s.id);
    const attendanceRows = sessionIds.length ? await supabase.from("attendance").select("session_id").in("session_id", sessionIds) : { data: [] };
    const names = new Map((groups.data ?? []).map((g) => [g.id, g.name]));
    return { metrics: [{ label: "Assigned classes", value: groups.data?.length ?? 0 }, { label: "Students", value: new Set((enrollments.data ?? []).map((e) => e.student_id)).size }, { label: "Upcoming lessons", value: sessions.data?.length ?? 0 }, { label: "Attendance to complete", value: Math.max(0, (enrollments.data?.length ?? 0) * (sessions.data?.length ?? 0) - (attendanceRows.data ?? []).length) }, { label: "Published assignments", value: assignments.count ?? 0 }], upcoming: (sessions.data ?? []).map((s) => ({ id: s.id, starts_at: s.starts_at, group: names.get(s.class_group_id) ?? "Class" })) };
  }

  if (role === "parent") {
    const relations = await supabase.from("guardian_student_relationships").select("student_id").eq("guardian_user_id", userId).is("revoked_at", null);
    const ids = [...new Set((relations.data ?? []).map((item) => item.student_id))];
    if (relations.error) return { metrics: [], upcoming: [], error: relations.error.message };
    if (!ids.length) return { metrics: [{ label: "Children linked", value: 0 }], upcoming: [], children: [] };
    const [children, attendance, progress, enrollments] = await Promise.all([
      supabase.from("students").select("id,display_name,status").in("id", ids).eq("status", "active"),
      supabase.from("attendance").select("id", { count: "exact", head: true }).in("student_id", ids),
      supabase.from("progress_entries").select("id", { count: "exact", head: true }).in("student_id", ids),
      supabase.from("enrollments").select("class_group_id").in("student_id", ids).eq("status", "active"),
    ]);
    const groupIds = [...new Set((enrollments.data ?? []).map((e) => e.class_group_id))];
    const sessions = groupIds.length ? await supabase.from("class_sessions").select("id,starts_at,class_group_id").in("class_group_id", groupIds).gte("starts_at", new Date().toISOString()).eq("status", "scheduled").order("starts_at").limit(6) : { data: [] };
    const groups = groupIds.length ? await supabase.from("class_groups").select("id,name").in("id", groupIds) : { data: [] };
    const names = new Map((groups.data ?? []).map((g) => [g.id, g.name]));
    return { metrics: [{ label: "Children", value: children.data?.length ?? 0 }, { label: "Attendance records", value: attendance.count ?? 0 }, { label: "Progress updates", value: progress.count ?? 0 }, { label: "Upcoming lessons", value: sessions.data?.length ?? 0 }], upcoming: (sessions.data ?? []).map((s) => ({ id: s.id, starts_at: s.starts_at, group: names.get(s.class_group_id) ?? "Class" })), children: children.data ?? [] };
  }

  const student = await supabase.from("students").select("id").eq("auth_user_id", userId).maybeSingle();
  if (student.error) return { metrics: [], upcoming: [], error: student.error.message };
  if (!student.data) return { metrics: [{ label: "Courses", value: 0 }, { label: "Attendance records", value: 0 }, { label: "Progress updates", value: 0 }], upcoming: [] };
  const [enrollments, attendance, progress] = await Promise.all([
    supabase.from("enrollments").select("class_group_id").eq("student_id", student.data.id).eq("status", "active"),
    supabase.from("attendance").select("id", { count: "exact", head: true }).eq("student_id", student.data.id),
    supabase.from("progress_entries").select("id", { count: "exact", head: true }).eq("student_id", student.data.id),
  ]);
  const groupIds = [...new Set((enrollments.data ?? []).map((e) => e.class_group_id))];
  const sessions = groupIds.length ? await supabase.from("class_sessions").select("id,starts_at,class_group_id").in("class_group_id", groupIds).gte("starts_at", new Date().toISOString()).eq("status", "scheduled").order("starts_at").limit(6) : { data: [] };
  const groups = groupIds.length ? await supabase.from("class_groups").select("id,name").in("id", groupIds) : { data: [] };
  const names = new Map((groups.data ?? []).map((g) => [g.id, g.name]));
  return { metrics: [{ label: "Enrolled classes", value: groupIds.length }, { label: "Attendance records", value: attendance.count ?? 0 }, { label: "Progress updates", value: progress.count ?? 0 }, { label: "Upcoming lessons", value: sessions.data?.length ?? 0 }], upcoming: (sessions.data ?? []).map((s) => ({ id: s.id, starts_at: s.starts_at, group: names.get(s.class_group_id) ?? "Class" })) };
}
