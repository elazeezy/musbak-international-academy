"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireRole } from "@/lib/auth/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { inviteSchema } from "@/lib/validation/auth";
import type { Json } from "@/lib/supabase/database.types";

const langSchema = z.enum(["en", "ar", "fr"]);
const studentSchema = z.object({ legal_name: z.string().trim().min(2).max(160), display_name: z.string().trim().min(2).max(100), student_number: z.string().trim().max(40).optional(), date_of_birth: z.string().optional(), lang: langSchema });
const courseSchema = z.object({ code: z.string().trim().toUpperCase().regex(/^[A-Z0-9_-]{2,30}$/), category: z.string().trim().min(2).max(60), name_en: z.string().trim().min(2).max(100), name_ar: z.string().trim().min(2).max(100), name_fr: z.string().trim().min(2).max(100), lang: langSchema });
const classSchema = z.object({ name: z.string().trim().min(2).max(120), course_id: z.uuid(), capacity: z.preprocess((value) => value === "" ? undefined : Number(value), z.number().int().positive().max(500).optional()), staff_member_id: z.string().uuid().optional().or(z.literal("")), weekday: z.preprocess((value) => value === "" ? undefined : Number(value), z.number().int().min(0).max(6).optional()), local_start: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional().or(z.literal("")), duration_minutes: z.preprocess((value) => value === "" ? undefined : Number(value), z.number().int().min(10).max(240).optional()), timezone: z.string().max(80).optional(), starts_on: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")), lang: langSchema });
const relationshipSchema = z.object({ guardian_user_id: z.uuid(), student_id: z.uuid(), can_view_academic: z.string().optional(), can_view_financial: z.string().optional(), lang: langSchema });
const enrollmentSchema = z.object({ student_id: z.uuid(), class_group_id: z.uuid(), lang: langSchema });
const invoiceSchema = z.object({ billed_to: z.uuid(), student_id: z.string().uuid().optional().or(z.literal("")), description: z.string().trim().min(2).max(160), amount: z.coerce.number().positive().max(10000000), currency: z.string().regex(/^[A-Z]{3}$/), due_on: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")), lang: langSchema });

function value(formData: FormData, key: string) { return formData.get(key); }

export async function createStudentAction(formData: FormData): Promise<void> {
  const langValue = String(value(formData, "lang") ?? "en");
  const lang = langSchema.safeParse(langValue).data ?? "en";
  await requireRole(lang, "admin");
  const parsed = studentSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/${lang}/portal/admin/students?error=invalid`);
  const supabase = await createSupabaseServerClient();
  const { data: student, error } = await supabase.from("students").insert({
    display_name: parsed.data.display_name,
    student_number: parsed.data.student_number || null,
  }).select("id").single();
  if (error || !student) redirect(`/${lang}/portal/admin/students?error=create_failed`);
  const { error: privateDetailsError } = await supabase.from("student_private_details").insert({ student_id: student.id, legal_name: parsed.data.legal_name, date_of_birth: parsed.data.date_of_birth || null });
  if (privateDetailsError) {
    await supabase.from("students").delete().eq("id", student.id);
    redirect(`/${lang}/portal/admin/students?error=create_failed`);
  }
  const adultUserId = String(value(formData, "auth_user_id") ?? "");
  if (adultUserId) {
    const { data: adultRole } = await supabase.from("user_roles").select("user_id").eq("user_id", adultUserId).eq("role", "adult_student").is("revoked_at", null).maybeSingle();
    if (!adultRole) { await supabase.from("students").delete().eq("id", student.id); redirect(`/${lang}/portal/admin/students?error=student_account_required`); }
    const { error: linkError } = await supabase.from("students").update({ auth_user_id: adultUserId }).eq("id", student.id);
    if (linkError) {
      await supabase.from("students").delete().eq("id", student.id);
      redirect(`/${lang}/portal/admin/students?error=link_failed`);
    }
  }
  revalidatePath(`/${lang}/portal/admin/students`);
  redirect(`/${lang}/portal/admin/students?created=1`);
}

export async function updateStudentProfileAction(formData: FormData): Promise<void> {
  const rawLang = String(value(formData, "lang") ?? "en");
  const lang = langSchema.safeParse(rawLang).data ?? "en";
  await requireRole(lang, "admin");
  const parsed = z.object({
    student_id: z.uuid(),
    display_name: z.string().trim().min(2).max(100),
    student_number: z.string().trim().max(40).optional(),
    preferred_language: langSchema,
    timezone: z.string().trim().min(1).max(80),
    status: z.enum(["active", "inactive", "archived"]),
  }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/${lang}/portal/admin/students?error=invalid`);
  try { new Intl.DateTimeFormat("en", { timeZone: parsed.data.timezone }); }
  catch { redirect(`/${lang}/portal/admin/students/${parsed.data.student_id}?error=timezone_invalid`); }
  const db = await createSupabaseServerClient();
  const { error } = await db.from("students").update({
    display_name: parsed.data.display_name,
    student_number: parsed.data.student_number || null,
    preferred_language: parsed.data.preferred_language,
    timezone: parsed.data.timezone,
    status: parsed.data.status,
    updated_at: new Date().toISOString(),
  }).eq("id", parsed.data.student_id);
  if (error) redirect(`/${lang}/portal/admin/students/${parsed.data.student_id}?error=save_failed`);
  revalidatePath(`/${lang}/portal/admin/students`);
  revalidatePath(`/${lang}/portal/admin/students/${parsed.data.student_id}`);
  redirect(`/${lang}/portal/admin/students/${parsed.data.student_id}?saved=1`);
}

export async function createCourseAction(formData: FormData): Promise<void> {
  const langValue = String(value(formData, "lang") ?? "en");
  const lang = langSchema.safeParse(langValue).data ?? "en";
  await requireRole(lang, "admin");
  const parsed = courseSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/${lang}/portal/admin/courses?error=invalid`);
  const supabase = await createSupabaseServerClient();
  const { data: course, error } = await supabase.from("courses").insert({ code: parsed.data.code, category: parsed.data.category }).select("id").single();
  if (error || !course) redirect(`/${lang}/portal/admin/courses?error=create_failed`);
  const { error: translationError } = await supabase.from("course_translations").insert([
    { course_id: course.id, locale: "en", name: parsed.data.name_en },
    { course_id: course.id, locale: "ar", name: parsed.data.name_ar },
    { course_id: course.id, locale: "fr", name: parsed.data.name_fr },
  ]);
  if (translationError) {
    await supabase.from("courses").delete().eq("id", course.id);
    redirect(`/${lang}/portal/admin/courses?error=translation_failed`);
  }
  revalidatePath(`/${lang}/portal/admin/courses`);
  redirect(`/${lang}/portal/admin/courses?created=1`);
}

export async function createClassAction(formData: FormData): Promise<void> {
  const langValue = String(value(formData, "lang") ?? "en");
  const lang = langSchema.safeParse(langValue).data ?? "en";
  await requireRole(lang, "admin");
  const parsed = classSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/${lang}/portal/admin/classes?error=invalid`);
  const supabase = await createSupabaseServerClient();
  if (parsed.data.staff_member_id) {
    const { data: staff } = await supabase.from("staff_members").select("user_id,status").eq("id", parsed.data.staff_member_id).maybeSingle();
    const { data: teacherRole } = staff ? await supabase.from("user_roles").select("user_id").eq("user_id", staff.user_id).eq("role", "teacher").is("revoked_at", null).maybeSingle() : { data: null };
    if (!staff || staff.status !== "active" || !teacherRole) redirect(`/${lang}/portal/admin/classes?error=teacher_invalid`);
  }
  const scheduleValues = [parsed.data.weekday, parsed.data.local_start, parsed.data.duration_minutes, parsed.data.timezone, parsed.data.starts_on];
  const hasSchedule = scheduleValues.some((item) => item !== undefined && item !== "");
  if (hasSchedule && (!parsed.data.staff_member_id || parsed.data.weekday === undefined || !parsed.data.local_start || !parsed.data.duration_minutes || !parsed.data.timezone || !parsed.data.starts_on)) redirect(`/${lang}/portal/admin/classes?error=schedule_incomplete`);
  const { data: group, error } = await supabase.from("class_groups").insert({ name: parsed.data.name, course_id: parsed.data.course_id, capacity: parsed.data.capacity ?? null, status: hasSchedule ? "active" : "draft" }).select("id").single();
  if (error || !group) redirect(`/${lang}/portal/admin/classes?error=create_failed`);
  if (parsed.data.staff_member_id) {
    const { error: assignmentError } = await supabase.from("teacher_assignments").insert({ class_group_id: group.id, staff_member_id: parsed.data.staff_member_id, starts_on: parsed.data.starts_on || new Date().toISOString().slice(0, 10) });
    if (assignmentError) { await supabase.from("class_groups").delete().eq("id", group.id); redirect(`/${lang}/portal/admin/classes?error=teacher_assignment_failed`); }
  }
  if (hasSchedule) {
    const weekday = parsed.data.weekday;
    const localStart = parsed.data.local_start;
    const duration = parsed.data.duration_minutes;
    const timezone = parsed.data.timezone;
    const startsOn = parsed.data.starts_on;
    if (weekday === undefined || !localStart || duration === undefined || !timezone || !startsOn) { await supabase.from("class_groups").delete().eq("id", group.id); redirect(`/${lang}/portal/admin/classes?error=schedule_incomplete`); }
    try { new Intl.DateTimeFormat("en", { timeZone: timezone }); } catch { await supabase.from("class_groups").delete().eq("id", group.id); redirect(`/${lang}/portal/admin/classes?error=timezone_invalid`); }
    const { error: scheduleError } = await supabase.from("schedules").insert({ class_group_id: group.id, weekday, local_start: localStart, duration_minutes: duration, timezone, starts_on: startsOn });
    if (scheduleError) { await supabase.from("class_groups").delete().eq("id", group.id); redirect(`/${lang}/portal/admin/classes?error=schedule_failed`); }
  }
  revalidatePath(`/${lang}/portal/admin/classes`);
  redirect(`/${lang}/portal/admin/classes?created=1`);
}

export async function createEnrollmentAction(formData: FormData): Promise<void> {
  const rawLang = String(value(formData, "lang") ?? "en");
  const lang = langSchema.safeParse(rawLang).data ?? "en";
  await requireRole(lang, "admin");
  const parsed = enrollmentSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/${lang}/portal/admin/classes?error=invalid`);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("enrollments").upsert({ student_id: parsed.data.student_id, class_group_id: parsed.data.class_group_id, status: "active", ended_at: null }, { onConflict: "student_id,class_group_id" });
  if (error) redirect(`/${lang}/portal/admin/classes?error=enrollment_failed`);
  revalidatePath(`/${lang}/portal/admin/classes`);
  redirect(`/${lang}/portal/admin/classes?enrolled=1`);
}

export async function createGuardianRelationshipAction(formData: FormData): Promise<void> {
  const langValue = String(value(formData, "lang") ?? "en");
  const lang = langSchema.safeParse(langValue).data ?? "en";
  const actor = await requireRole(lang, "admin");
  const parsed = relationshipSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/${lang}/portal/admin/guardians?error=invalid`);
  const supabase = await createSupabaseServerClient();
  const { data: parentRole } = await supabase.from("user_roles").select("user_id").eq("user_id", parsed.data.guardian_user_id).eq("role", "parent").is("revoked_at", null).maybeSingle();
  if (!parentRole) redirect(`/${lang}/portal/admin/guardians?error=parent_account_required`);
  const { error } = await supabase.from("guardian_student_relationships").upsert({
    guardian_user_id: parsed.data.guardian_user_id,
    student_id: parsed.data.student_id,
    can_view_academic: parsed.data.can_view_academic !== undefined,
    can_view_financial: Boolean(parsed.data.can_view_financial),
    created_by: actor.user.id,
    revoked_at: null,
  }, { onConflict: "guardian_user_id,student_id" });
  if (error) redirect(`/${lang}/portal/admin/guardians?error=relationship_failed`);
  revalidatePath(`/${lang}/portal/admin/guardians`);
  redirect(`/${lang}/portal/admin/guardians?linked=1`);
}

export async function revokeGuardianRelationshipAction(formData: FormData): Promise<void> {
  const lang = langSchema.safeParse(value(formData, "lang")).data ?? "en";
  await requireRole(lang, "admin");
  const parsed = z.object({ relationship_id: z.uuid() }).safeParse({ relationship_id: value(formData, "relationship_id") });
  if (!parsed.success) redirect(`/${lang}/portal/admin/guardians?error=invalid`);
  const db = await createSupabaseServerClient();
  const { data: relationship } = await db.from("guardian_student_relationships").select("id,student_id").eq("id", parsed.data.relationship_id).is("revoked_at", null).maybeSingle();
  if (!relationship) redirect(`/${lang}/portal/admin/guardians?error=relationship_unavailable`);
  const { error } = await db.from("guardian_student_relationships").update({ revoked_at: new Date().toISOString() }).eq("id", relationship.id);
  if (error) redirect(`/${lang}/portal/admin/guardians?error=revoke_failed`);
  revalidatePath(`/${lang}/portal/admin/guardians`);
  revalidatePath(`/${lang}/portal/admin/students/${relationship.student_id}`);
  redirect(`/${lang}/portal/admin/guardians?revoked=1`);
}

export type PortalInviteResult = { ok: true; email: string; actionLink: string; role: "teacher" | "parent" | "adult_student" } | { ok: false; reason: "invalid" | "account_exists" | "failed" };

export async function inviteAccountAction(formData: FormData): Promise<PortalInviteResult> {
  const rawLang = String(value(formData, "lang") ?? "en");
  const lang = langSchema.safeParse(rawLang).data ?? "en";
  const actor = await requireRole(lang, "admin");
  const parsed = inviteSchema.safeParse({ email: value(formData, "email"), role: value(formData, "role"), lang });
  if (!parsed.success) return { ok: false, reason: "invalid" };
  const admin = createSupabaseAdminClient();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { data, error } = await admin.auth.admin.generateLink({
    type: "invite",
    email: parsed.data.email,
    options: {
      data: { preferred_language: lang },
      redirectTo: `${baseUrl}/${lang}/auth/callback?next=/${lang}/reset-password`,
    },
  });
  if (error || !data.user || !data.properties.action_link) {
    const reason = error?.message.toLowerCase().includes("already") ? "account_exists" : "failed";
    return { ok: false, reason };
  }
  const { data: invitation, error: insertError } = await admin.from("invitations").insert({
    email: parsed.data.email,
    role: parsed.data.role,
    invited_by: actor.user.id,
    auth_user_id: data.user.id,
  }).select("id").single();
  if (insertError || !invitation) {
    await admin.auth.admin.deleteUser(data.user.id);
    return { ok: false, reason: "failed" };
  }
  await admin.from("audit_logs").insert({ actor_id: actor.user.id, action: "invite_created", target_table: "invitations", target_id: invitation.id, safe_details: { role: parsed.data.role } });
  revalidatePath(`/${lang}/portal/admin/staff`);
  revalidatePath(`/${lang}/portal/admin/guardians`);
  revalidatePath(`/${lang}/portal/admin/students`);
  return { ok: true, email: parsed.data.email, actionLink: data.properties.action_link, role: parsed.data.role };
}

export async function sendAnnouncementAction(formData: FormData): Promise<void> {
  const rawLang = String(value(formData, "lang") ?? "en");
  const lang = langSchema.safeParse(rawLang).data ?? "en";
  const actor = await requireRole(lang, "admin");
  const parsed = z.object({
    role: z.enum(["all", "teacher", "parent", "adult_student"]),
    title_en: z.string().trim().min(2).max(120), body_en: z.string().trim().min(2).max(2000),
    title_ar: z.string().trim().min(2).max(120), body_ar: z.string().trim().min(2).max(2000),
    title_fr: z.string().trim().min(2).max(120), body_fr: z.string().trim().min(2).max(2000),
  }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/${lang}/portal/admin/notifications?error=invalid`);
  const admin = createSupabaseAdminClient();
  let query = admin.from("user_roles").select("user_id,role").is("revoked_at", null);
  if (parsed.data.role !== "all") query = query.eq("role", parsed.data.role);
  const { data: assignments, error } = await query;
  if (error) redirect(`/${lang}/portal/admin/notifications?error=audience_failed`);
  const userIds = [...new Set((assignments ?? []).map((assignment) => assignment.user_id).filter((id) => id !== actor.user.id))];
  if (!userIds.length) redirect(`/${lang}/portal/admin/notifications?sent=0`);
  const { data: profiles } = await admin.from("profiles").select("id,preferred_language").in("id", userIds);
  const audienceText = {
    en: { title: parsed.data.title_en, body: parsed.data.body_en },
    ar: { title: parsed.data.title_ar, body: parsed.data.body_ar },
    fr: { title: parsed.data.title_fr, body: parsed.data.body_fr },
  } as const;
  const sourceKey = crypto.randomUUID();
  const rows = (profiles ?? []).map((profile) => {
    const locale = profile.preferred_language;
    const text = audienceText[locale];
    return { user_id: profile.id, event_type: "ACADEMY_ANNOUNCEMENT", source_key: sourceKey, title: text.title, body: text.body, href: `/${locale}/portal/notifications` };
  });
  for (let start = 0; start < rows.length; start += 500) {
    const { error: sendError } = await admin.from("notifications").insert(rows.slice(start, start + 500));
    if (sendError) redirect(`/${lang}/portal/admin/notifications?error=send_failed`);
  }
  await admin.from("audit_logs").insert({ actor_id: actor.user.id, action: "announcement_sent", target_table: "notifications", target_id: sourceKey, safe_details: { audience_count: rows.length, target_role: parsed.data.role } });
  revalidatePath(`/${lang}/portal/admin/notifications`);
  redirect(`/${lang}/portal/admin/notifications?sent=${rows.length}`);
}

export async function createInvoiceAction(formData: FormData): Promise<void> {
  const lang = langSchema.safeParse(value(formData, "lang")).data ?? "en";
  await requireRole(lang, "admin");
  const parsed = invoiceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/${lang}/portal/admin/payments?error=invalid`);
  const db = await createSupabaseServerClient();
  const { data: billTo } = await db.from("user_roles").select("user_id").eq("user_id", parsed.data.billed_to).in("role", ["parent", "adult_student"]).is("revoked_at", null).limit(1).maybeSingle();
  if (!billTo) redirect(`/${lang}/portal/admin/payments?error=recipient_invalid`);
  let decimals = 2;
  try { decimals = new Intl.NumberFormat("en", { style: "currency", currency: parsed.data.currency }).resolvedOptions().maximumFractionDigits ?? 2; }
  catch { redirect(`/${lang}/portal/admin/payments?error=currency_invalid`); }
  const totalMinor = Math.round(parsed.data.amount * (10 ** decimals));
  const invoiceNumber = `MIA-${new Date().toISOString().slice(0,10).replaceAll("-","")}-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
  const { data: invoice, error } = await db.from("invoices").insert({ invoice_number: invoiceNumber, billed_to: parsed.data.billed_to, student_id: parsed.data.student_id || null, currency: parsed.data.currency, total_minor: totalMinor, status: "issued", due_at: parsed.data.due_on ? `${parsed.data.due_on}T23:59:59.000Z` : null }).select("id").single();
  if (error || !invoice) redirect(`/${lang}/portal/admin/payments?error=invoice_failed`);
  const { error: lineError } = await db.from("invoice_items").insert({ invoice_id: invoice.id, description: parsed.data.description, quantity: 1, amount_minor: totalMinor });
  if (lineError) { await db.from("invoices").delete().eq("id", invoice.id); redirect(`/${lang}/portal/admin/payments?error=invoice_failed`); }
  revalidatePath(`/${lang}/portal/admin/payments`);
  redirect(`/${lang}/portal/admin/payments?created=1`);
}

export async function recordManualPaymentAction(formData: FormData): Promise<void> {
  const lang = langSchema.safeParse(value(formData, "lang")).data ?? "en";
  const actor = await requireRole(lang, "admin");
  const parsed = z.object({ invoice_id: z.uuid(), amount: z.coerce.number().positive().max(10000000), reference: z.string().trim().min(3).max(120) }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/${lang}/portal/admin/payments?error=payment_invalid`);
  const db = await createSupabaseServerClient();
  const { data: invoice } = await db.from("invoices").select("id,total_minor,currency,status").eq("id", parsed.data.invoice_id).maybeSingle();
  if (!invoice || ["draft", "void", "paid"].includes(invoice.status)) redirect(`/${lang}/portal/admin/payments?error=invoice_unavailable`);
  const decimals = new Intl.NumberFormat("en", { style: "currency", currency: invoice.currency }).resolvedOptions().maximumFractionDigits ?? 2;
  const amountMinor = Math.round(parsed.data.amount * (10 ** decimals));
  const { data: previous } = await db.from("payments").select("amount_minor").eq("invoice_id", invoice.id).eq("status", "succeeded");
  const paid = (previous ?? []).reduce((total, item) => total + item.amount_minor, 0);
  if (amountMinor > invoice.total_minor - paid) redirect(`/${lang}/portal/admin/payments?error=overpayment`);
  const { error } = await db.from("payments").insert({ invoice_id: invoice.id, provider: "manual", provider_reference: parsed.data.reference, amount_minor: amountMinor, currency: invoice.currency, status: "succeeded", paid_at: new Date().toISOString() });
  if (error) redirect(`/${lang}/portal/admin/payments?error=payment_failed`);
  await db.from("audit_logs").insert({ actor_id: actor.user.id, action: "manual_payment_recorded", target_table: "invoices", target_id: invoice.id, safe_details: { provider: "manual", amount_minor: amountMinor } });
  revalidatePath(`/${lang}/portal/admin/payments`);
  redirect(`/${lang}/portal/admin/payments?payment=recorded`);
}

export async function saveSettingAction(formData: FormData): Promise<void> {
  const lang = langSchema.safeParse(value(formData, "lang")).data ?? "en";
  const actor = await requireRole(lang, "admin");
  const parsed = z.object({ key: z.string().trim().regex(/^[a-z][a-z0-9_.-]{1,79}$/), value: z.string().trim().min(1).max(4000) }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect(`/${lang}/portal/admin/settings?error=invalid`);
  let json: Json;
  try { json = z.json().parse(JSON.parse(parsed.data.value)); } catch { json = parsed.data.value; }
  const db = await createSupabaseServerClient();
  const { error } = await db.from("system_settings").upsert({ key: parsed.data.key, value: json, updated_by: actor.user.id }, { onConflict: "key" });
  if (error) redirect(`/${lang}/portal/admin/settings?error=save_failed`);
  revalidatePath(`/${lang}/portal/admin/settings`);
  redirect(`/${lang}/portal/admin/settings?saved=1`);
}
