import { randomBytes } from "node:crypto";
import { chmod, writeFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !publishableKey || !secretKey) throw new Error("Set the Supabase URL, publishable key, and secret key in .env.local first.");
const hostname = new URL(url).hostname;
if (!(hostname === "localhost" || hostname === "127.0.0.1" || hostname === "host.docker.internal")) {
  throw new Error("Demo account seeding is local-only. Refusing to create accounts outside a local Supabase instance.");
}

const supabase = createClient(url, secretKey, { auth: { persistSession: false, autoRefreshToken: false } });
const demoUsers = [
  { email: "admin@musbak-demo.test", name: "Demo Academy Admin", language: "en", role: "admin" },
  { email: "teacher@musbak-demo.test", name: "Demo Teacher", language: "en", role: "teacher" },
  { email: "parent@musbak-demo.test", name: "Demo Parent", language: "en", role: "parent" },
  { email: "second-parent@musbak-demo.test", name: "Demo Second Parent", language: "ar", role: "parent" },
  { email: "adult-student@musbak-demo.test", name: "Demo Adult Student", language: "fr", role: "adult_student" },
];
const credentials = [];

async function check(result, label) {
  if (result.error) throw new Error(`${label}: ${result.error.message}`);
  return result.data;
}

async function ensureUser(person) {
  const listed = await check(await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 }), "List local Auth users");
  const existing = listed.users.find((user) => user.email?.toLowerCase() === person.email);
  const password = randomBytes(32).toString("base64url");
  const attributes = { email: person.email, password, email_confirm: true, user_metadata: { display_name: person.name, preferred_language: person.language } };
  const user = existing
    ? await check(await supabase.auth.admin.updateUserById(existing.id, { password, user_metadata: attributes.user_metadata }), `Update ${person.email}`)
    : await check(await supabase.auth.admin.createUser(attributes), `Create ${person.email}`);
  credentials.push({ email: person.email, password, role: person.role });
  return user.user;
}

const users = {};
for (const person of demoUsers) users[person.role === "parent" ? (person.language === "ar" ? "parentTwo" : "parent") : person.role] = await ensureUser(person);

const studentIds = {
  childOne: "20000000-0000-4000-8000-000000000001",
  childTwo: "20000000-0000-4000-8000-000000000002",
  adult: "20000000-0000-4000-8000-000000000003",
};
const groupIds = {
  tajweed: "10000000-0000-4000-8000-000000000001",
  arabic: "10000000-0000-4000-8000-000000000002",
};
const sessionIds = {
  tajweed: "40000000-0000-4000-8000-000000000001",
  arabic: "40000000-0000-4000-8000-000000000002",
};
const assignmentId = "50000000-0000-4000-8000-000000000001";
const progressId = "60000000-0000-4000-8000-000000000001";

for (const [role, user] of Object.entries(users)) {
  await check(await supabase.from("user_roles").upsert({ user_id: user.id, role, revoked_at: null }, { onConflict: "user_id,role" }), `Grant local ${role} role`);
}
const teacherStaff = await check(await supabase.from("staff_members").upsert({ user_id: users.teacher.id, staff_number: "DEMO-T-001", title: "Qur’an Teacher", status: "active" }, { onConflict: "user_id" }).select("id").single(), "Create demo teacher record");
await check(await supabase.from("students").upsert([
  { id: studentIds.childOne, student_number: "DEMO-001", display_name: "Demo Learner One", preferred_language: "en", timezone: "Europe/London", status: "active" },
  { id: studentIds.childTwo, student_number: "DEMO-002", display_name: "Demo Learner Two", preferred_language: "ar", timezone: "Asia/Riyadh", status: "active" },
  { id: studentIds.adult, student_number: "DEMO-003", display_name: "Demo Adult Learner", preferred_language: "fr", timezone: "Africa/Dakar", auth_user_id: users.adult_student.id, status: "active" },
], { onConflict: "id" }), "Create demo students");
await check(await supabase.from("student_private_details").upsert([
  { student_id: studentIds.childOne, legal_name: "Demo Learner One" },
  { student_id: studentIds.childTwo, legal_name: "Demo Learner Two" },
  { student_id: studentIds.adult, legal_name: "Demo Adult Learner" },
], { onConflict: "student_id" }), "Create demo student details");
await check(await supabase.from("guardian_student_relationships").upsert([
  { guardian_user_id: users.parent.id, student_id: studentIds.childOne, can_view_academic: true, can_view_financial: true, can_manage: true },
  { guardian_user_id: users.parent.id, student_id: studentIds.childTwo, can_view_academic: true, can_view_financial: true, can_manage: true },
  { guardian_user_id: users.parentTwo.id, student_id: studentIds.childOne, can_view_academic: true, can_view_financial: false },
], { onConflict: "guardian_user_id,student_id" }), "Link demo guardians");

const courses = await check(await supabase.from("courses").select("id,code").in("code", ["DEMO-QURAN", "DEMO-TAJWEED", "DEMO-ARABIC"]), "Read demo courses");
const courseByCode = new Map(courses.map((course) => [course.code, course.id]));
const years = await check(await supabase.from("academic_years").select("id").eq("name", "Demo 2026–2027").single(), "Read demo year");
const term = await check(await supabase.from("terms").select("id").eq("academic_year_id", years.id).eq("name", "Demo Term 1").single(), "Read demo term");
await check(await supabase.from("class_groups").upsert([
  { id: groupIds.tajweed, course_id: courseByCode.get("DEMO-TAJWEED"), term_id: term.id, name: "Demo Tajweed Circle", capacity: 8, status: "active" },
  { id: groupIds.arabic, course_id: courseByCode.get("DEMO-ARABIC"), term_id: term.id, name: "Demo Arabic Circle", capacity: 8, status: "active" },
], { onConflict: "id" }), "Create demo classes");
await check(await supabase.from("teacher_assignments").upsert([
  { class_group_id: groupIds.tajweed, staff_member_id: teacherStaff.id, starts_on: new Date().toISOString().slice(0, 10) },
  { class_group_id: groupIds.arabic, staff_member_id: teacherStaff.id, starts_on: new Date().toISOString().slice(0, 10) },
], { onConflict: "class_group_id,staff_member_id,starts_on" }), "Assign demo teacher");
await check(await supabase.from("enrollments").upsert([
  { student_id: studentIds.childOne, class_group_id: groupIds.tajweed, status: "active" },
  { student_id: studentIds.childTwo, class_group_id: groupIds.tajweed, status: "active" },
  { student_id: studentIds.adult, class_group_id: groupIds.arabic, status: "active" },
], { onConflict: "student_id,class_group_id" }), "Enroll demo learners");
await check(await supabase.from("class_sessions").upsert([
  { id: sessionIds.tajweed, class_group_id: groupIds.tajweed, starts_at: new Date(Date.now() + 86400000).toISOString(), ends_at: new Date(Date.now() + 86400000 + 2700000).toISOString(), status: "scheduled" },
  { id: sessionIds.arabic, class_group_id: groupIds.arabic, starts_at: new Date(Date.now() + 172800000).toISOString(), ends_at: new Date(Date.now() + 172800000 + 2700000).toISOString(), status: "scheduled" },
], { onConflict: "id" }), "Create demo sessions");
await check(await supabase.from("attendance").upsert([
  { session_id: sessionIds.tajweed, student_id: studentIds.childOne, status: "present" },
  { session_id: sessionIds.tajweed, student_id: studentIds.childTwo, status: "late" },
], { onConflict: "session_id,student_id" }), "Create demo attendance");
await check(await supabase.from("assignments").upsert({ id: assignmentId, class_group_id: groupIds.tajweed, created_by: users.teacher.id, title: "Demo recitation review", description: "Review the selected passage and note two points to practise.", due_at: new Date(Date.now() + 3 * 86400000).toISOString(), status: "published" }, { onConflict: "id" }), "Create demo assignment");
await check(await supabase.from("submissions").upsert({ assignment_id: assignmentId, student_id: studentIds.childOne, text_response: "Demo response for teacher review.", submitted_at: new Date().toISOString() }, { onConflict: "assignment_id,student_id" }), "Create demo submission");
await check(await supabase.from("progress_entries").upsert({ id: progressId, student_id: studentIds.childOne, course_id: courseByCode.get("DEMO-TAJWEED"), class_group_id: groupIds.tajweed, author_id: users.teacher.id, skill: "Recitation confidence", score: 76, note: "Fictional progress sample." }, { onConflict: "id" }), "Create demo progress");
const invoice = await check(await supabase.from("invoices").upsert({ invoice_number: "MIA-DEMO-001", billed_to: users.parent.id, student_id: studentIds.childOne, currency: "SAR", total_minor: 25000, status: "issued", due_at: new Date(Date.now() + 10 * 86400000).toISOString() }, { onConflict: "invoice_number" }).select("id").single(), "Create demo invoice");
await check(await supabase.from("invoice_items").delete().eq("invoice_id", invoice.id), "Reset demo invoice items");
await check(await supabase.from("invoice_items").insert({ invoice_id: invoice.id, description: "Demo monthly tuition", quantity: 1, amount_minor: 25000 }), "Create demo invoice item");
for (const user of Object.values(users)) {
  await check(await supabase.from("notifications").upsert({ user_id: user.id, event_type: "DEMO_WELCOME", source_key: "local-demo-welcome", title: "Welcome to Musbak", body: "This fictional local account demonstrates the academy portal.", href: "/en/portal" }, { onConflict: "user_id,event_type,source_key" }), "Create demo notification");
}

await writeFile(".demo-credentials.json", JSON.stringify({ warning: "Local-only fictional credentials. Never deploy or commit this file.", accounts: credentials }, null, 2), { mode: 0o600 });
await chmod(".demo-credentials.json", 0o600);
console.log("Local demo academy data created. Open the ignored .demo-credentials.json file for the generated local credentials.");
