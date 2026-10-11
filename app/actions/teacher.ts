"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOneOfRoles, requireRole } from "@/lib/auth/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const langSchema = z.enum(["en", "ar", "fr"]);
const attendanceSchema = z.object({ session_id: z.uuid(), student_id: z.uuid(), status: z.enum(["present", "absent", "late", "excused"]), note: z.string().max(500).optional(), lang: langSchema });
const assignmentSchema = z.object({ class_group_id: z.uuid(), title: z.string().trim().min(2).max(160), description: z.string().trim().max(5000), due_at: z.string().optional(), lang: langSchema });
const progressSchema = z.object({ student_id: z.uuid(), class_group_id: z.uuid(), skill: z.string().trim().min(2).max(120), score: z.preprocess((value) => value === "" ? undefined : Number(value), z.number().min(0).max(100).optional()), note: z.string().trim().max(3000), lang: langSchema });
const materialSchema = z.object({ class_group_id: z.uuid(), student_id: z.string().uuid().optional().or(z.literal("")), title: z.string().trim().min(2).max(160), description: z.string().trim().max(1000), file_name: z.string().trim().min(1).max(180), mime_type: z.enum(["application/pdf", "image/jpeg", "image/png", "image/webp", "audio/mpeg", "audio/mp4", "video/mp4", "text/plain"]), size_bytes: z.coerce.number().int().positive().max(52428800), lang: langSchema });

export async function recordAttendanceAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const lang = langSchema.safeParse(formData.get("lang")).data ?? "en";
  const actor = await requireRole(lang, "teacher");
  const parsed = attendanceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: "Check the attendance details and try again." };
  const db = await createSupabaseServerClient();
  const { error } = await db.from("attendance").upsert({ session_id: parsed.data.session_id, student_id: parsed.data.student_id, status: parsed.data.status, note: parsed.data.note || null, recorded_by: actor.user.id, recorded_at: new Date().toISOString() }, { onConflict: "session_id,student_id" });
  if (error) return { ok: false, error: "Attendance could not be saved. Confirm that you are assigned to this class." };
  if (parsed.data.status === "absent") {
    const admin = createSupabaseAdminClient();
    const { data: guardians } = await admin.from("guardian_student_relationships").select("guardian_user_id").eq("student_id", parsed.data.student_id).eq("can_view_academic", true).is("revoked_at", null);
    const { data: student } = await admin.from("students").select("display_name").eq("id", parsed.data.student_id).maybeSingle();
    const recipients = [...new Set((guardians ?? []).map((item) => item.guardian_user_id))];
    if (recipients.length) {
      const { data: profiles } = await admin.from("profiles").select("id,preferred_language").in("id", recipients);
      const notice = { en: { title: "Attendance update", body: `${student?.display_name ?? "Your child"} was marked absent.` }, ar: { title: "تحديث الحضور", body: `تم تسجيل غياب ${student?.display_name ?? "ابنك"}.` }, fr: { title: "Mise à jour de présence", body: `${student?.display_name ?? "Votre enfant"} a été marqué absent.` } } as const;
      const rows = (profiles ?? []).map((profile) => { const locale = profile.preferred_language; const text = notice[locale]; return { user_id: profile.id, event_type: "ATTENDANCE_MARKED_ABSENT", source_key: `${parsed.data.session_id}:${parsed.data.student_id}`, title: text.title, body: text.body, href: `/${locale}/portal/parent` }; });
      if (rows.length) await admin.from("notifications").upsert(rows, { onConflict: "user_id,event_type,source_key" });
    }
  }
  return { ok: true };
}

export async function createAssignmentAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const lang = langSchema.safeParse(formData.get("lang")).data ?? "en";
  const actor = await requireRole(lang, "teacher");
  const raw = Object.fromEntries(formData);
  if (typeof raw.due_at === "string" && raw.due_at) {
    const utcDate = new Date(`${raw.due_at}:00Z`);
    if (!Number.isNaN(utcDate.getTime())) raw.due_at = utcDate.toISOString();
  }
  const parsed = assignmentSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Complete the assignment details." };
  const db = await createSupabaseServerClient();
  const { error } = await db.from("assignments").insert({ class_group_id: parsed.data.class_group_id, created_by: actor.user.id, title: parsed.data.title, description: parsed.data.description, due_at: parsed.data.due_at || null, status: "published" });
  if (error) return { ok: false, error: "The assignment could not be published." };
  return { ok: true };
}

export async function submitAssignmentAction(formData: FormData): Promise<void> {
  const lang = langSchema.safeParse(formData.get("lang")).data ?? "en";
  const actor = await requireRole(lang, "adult_student");
  const parsed = z.object({ assignment_id: z.uuid(), response: z.string().trim().min(1).max(5000) }).safeParse({ assignment_id: formData.get("assignment_id"), response: formData.get("response") });
  if (!parsed.success) redirect(`/${lang}/portal/student/assignments?error=invalid`);
  const db = await createSupabaseServerClient();
  const [{ data: student }, { data: assignment }] = await Promise.all([
    db.from("students").select("id").eq("auth_user_id", actor.user.id).maybeSingle(),
    db.from("assignments").select("id,status").eq("id", parsed.data.assignment_id).maybeSingle(),
  ]);
  if (!student || assignment?.status !== "published") redirect(`/${lang}/portal/student/assignments?error=unavailable`);
  const { data: existing } = await db.from("submissions").select("id").eq("assignment_id", assignment.id).eq("student_id", student.id).maybeSingle();
  const now = new Date().toISOString();
  const result = existing
    ? await db.from("submissions").update({ text_response: parsed.data.response, submitted_at: now }).eq("id", existing.id)
    : await db.from("submissions").insert({ assignment_id: assignment.id, student_id: student.id, text_response: parsed.data.response, submitted_at: now });
  if (result.error) redirect(`/${lang}/portal/student/assignments?error=submit_failed`);
  revalidatePath(`/${lang}/portal/student/assignments`);
  redirect(`/${lang}/portal/student/assignments?submitted=1`);
}

export async function recordProgressAction(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const lang = langSchema.safeParse(formData.get("lang")).data ?? "en";
  const actor = await requireRole(lang, "teacher");
  const parsed = progressSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: "Check the progress details and try again." };
  const db = await createSupabaseServerClient();
  const { error } = await db.from("progress_entries").insert({ student_id: parsed.data.student_id, class_group_id: parsed.data.class_group_id, author_id: actor.user.id, skill: parsed.data.skill, score: parsed.data.score ?? null, note: parsed.data.note });
  if (error) return { ok: false, error: "The progress update could not be saved." };
  const admin = createSupabaseAdminClient();
  const { data: guardians } = await admin.from("guardian_student_relationships").select("guardian_user_id").eq("student_id", parsed.data.student_id).eq("can_view_academic", true).is("revoked_at", null);
  const { data: student } = await admin.from("students").select("display_name").eq("id", parsed.data.student_id).maybeSingle();
  const recipients = [...new Set((guardians ?? []).map((item) => item.guardian_user_id))];
  if (recipients.length) {
    const { data: profiles } = await admin.from("profiles").select("id,preferred_language").in("id", recipients);
    const notice = { en: { title: "Progress updated", body: `A new learning update is available for ${student?.display_name ?? "your child"}.` }, ar: { title: "تم تحديث التقدم", body: `يتوفر تحديث تعليمي جديد لـ ${student?.display_name ?? "ابنك"}.` }, fr: { title: "Progrès mis à jour", body: `Une nouvelle mise à jour est disponible pour ${student?.display_name ?? "votre enfant"}.` } } as const;
    const rows = (profiles ?? []).map((profile) => { const locale = profile.preferred_language; const text = notice[locale]; return { user_id: profile.id, event_type: "PROGRESS_UPDATED", source_key: `${parsed.data.student_id}:${new Date().toISOString().slice(0, 10)}`, title: text.title, body: text.body, href: `/${locale}/portal/parent/progress` }; });
    if (rows.length) await admin.from("notifications").upsert(rows, { onConflict: "user_id,event_type,source_key" });
  }
  return { ok: true };
}

export async function createMaterialRecordAction(input: { class_group_id: string; student_id?: string; title: string; description: string; file_name: string; mime_type: string; size_bytes: number; lang: string }): Promise<{ ok: true; id: string; path: string; bucket: string } | { ok: false; error: string }> {
  const lang = langSchema.safeParse(input.lang).data ?? "en";
  const actor = await requireRole(lang, "teacher");
  const parsed = materialSchema.safeParse({ ...input, lang });
  if (!parsed.success) return { ok: false, error: "Choose a supported file up to 50 MB." };
  const db = await createSupabaseServerClient();
  const id = crypto.randomUUID();
  const name = parsed.data.file_name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
  const path = `${actor.user.id}/${id}/${name}`;
  const { error } = await db.from("learning_materials").insert({ id, class_group_id: parsed.data.class_group_id, student_id: parsed.data.student_id || null, uploaded_by: actor.user.id, title: parsed.data.title, description: parsed.data.description, bucket: "learning-materials", object_path: path, mime_type: parsed.data.mime_type, size_bytes: parsed.data.size_bytes });
  if (error) return { ok: false, error: "You do not have access to upload for this class." };
  return { ok: true, id, path, bucket: "learning-materials" };
}

export async function removeMaterialRecordAction(id: string, langInput: string): Promise<void> {
  const lang = langSchema.safeParse(langInput).data ?? "en";
  await requireRole(lang, "teacher");
  const db = await createSupabaseServerClient();
  const { data: material } = await db.from("learning_materials").select("bucket,object_path").eq("id", id).maybeSingle();
  if (!material) return;
  await db.storage.from(material.bucket).remove([material.object_path]);
  await db.from("learning_materials").delete().eq("id", id);
}

export async function getMaterialSignedUrlAction(id: string, langInput: string): Promise<string | null> {
  const lang = langSchema.safeParse(langInput).data ?? "en";
  await requireOneOfRoles(lang, ["adult_student", "parent", "teacher"]);
  const db = await createSupabaseServerClient();
  const { data: material } = await db.from("learning_materials").select("bucket,object_path").eq("id", id).maybeSingle();
  if (!material) return null;
  const { data } = await db.storage.from(material.bucket).createSignedUrl(material.object_path, 60);
  return data?.signedUrl ?? null;
}

export async function gradeSubmissionAction(input: { id: string; grade: number; feedback: string; lang: string }): Promise<{ ok: boolean; error?: string }> {
  const lang = langSchema.safeParse(input.lang).data ?? "en";
  await requireRole(lang, "teacher");
  const data = z.object({ id: z.uuid(), grade: z.number().min(0).max(1000), feedback: z.string().max(4000) }).safeParse(input);
  if (!data.success) return { ok: false, error: "Check the grade and feedback." };
  const db = await createSupabaseServerClient();
  const { error } = await db.rpc("grade_submission", { target_submission: data.data.id, new_grade: data.data.grade, new_feedback: data.data.feedback });
  return error ? { ok: false, error: "The grade could not be saved." } : { ok: true };
}
