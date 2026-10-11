import Link from "next/link";
import { notFound } from "next/navigation";
import { Search } from "lucide-react";
import { isLang } from "@/lib/dictionaries";
import { requireRole } from "@/lib/auth/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createClassAction, createCourseAction, createEnrollmentAction, createGuardianRelationshipAction, createStudentAction, revokeGuardianRelationshipAction, sendAnnouncementAction, createInvoiceAction, recordManualPaymentAction, saveSettingAction } from "@/app/actions/admin";
import { PortalInviteForm } from "@/components/portal/PortalInviteForm";
import { Notice, PageHeading } from "@/components/portal/PortalShell";

type Row = { id: string; title: string; detail?: string; status?: string; meta?: string };
const knownSections = new Set(["students", "guardians", "staff", "courses", "classes", "attendance", "assignments", "progress", "payments", "reports", "settings", "notifications"]);
const sectionNames = {
  en: { students: "Students", guardians: "Parents & guardians", staff: "Teachers & staff", courses: "Courses", classes: "Classes", attendance: "Attendance", assignments: "Assignments", progress: "Progress", payments: "Payments", reports: "Reports", settings: "Settings", notifications: "Announcements" },
  ar: { students: "الطلاب", guardians: "أولياء الأمور", staff: "المعلمون والموظفون", courses: "الدورات", classes: "الفصول", attendance: "الحضور", assignments: "الواجبات", progress: "التقدم", payments: "المدفوعات", reports: "التقارير", settings: "الإعدادات", notifications: "الإعلانات" },
  fr: { students: "Élèves", guardians: "Parents et tuteurs", staff: "Enseignants et équipe", courses: "Cours", classes: "Classes", attendance: "Présence", assignments: "Devoirs", progress: "Progrès", payments: "Paiements", reports: "Rapports", settings: "Paramètres", notifications: "Annonces" },
} as const;
const descriptions = {
  en: { students: "Academic records for children and adult learners. Accounts are optional for students.", guardians: "Invite parents and link multiple guardians to each child with explicit academic and financial access.", staff: "Invite teachers and staff. Class access follows active teaching assignments.", courses: "Manage the multilingual academy course catalog.", classes: "Create class groups, then assign staff and enroll students.", attendance: "Recent attendance recorded for academy sessions.", assignments: "Published work and due dates across the academy.", progress: "Recent teacher progress notes and assessments.", payments: "Invoice status and academy balances.", reports: "Current operational counts from academy records.", settings: "Academy settings stored in the database.", notifications: "Send localized in-app announcements to selected account roles." },
  ar: { students: "السجلات الأكاديمية للأطفال والطلاب البالغين. حساب الطالب اختياري.", guardians: "دعوة أولياء الأمور وربط عدة أوصياء بكل طالب بصلاحيات أكاديمية ومالية محددة.", staff: "دعوة المعلمين والموظفين. يعتمد الوصول للفصول على تكليف التدريس النشط.", courses: "إدارة الدورات متعددة اللغات.", classes: "إنشاء الفصول ثم تكليف المعلمين وتسجيل الطلاب.", attendance: "سجلات الحضور الأخيرة للحصص.", assignments: "الواجبات المنشورة ومواعيدها.", progress: "ملاحظات التقدم والتقييمات الأخيرة.", payments: "حالة الفواتير والأرصدة.", reports: "مؤشرات تشغيلية من سجلات الأكاديمية.", settings: "إعدادات الأكاديمية المحفوظة في قاعدة البيانات.", notifications: "إرسال إعلانات داخل التطبيق بلغات المستلمين." },
  fr: { students: "Dossiers scolaires des enfants et adultes. Le compte élève reste facultatif.", guardians: "Invitez les parents et liez plusieurs tuteurs avec des accès académiques et financiers distincts.", staff: "Invitez les enseignants et l’équipe. L’accès aux classes dépend des affectations actives.", courses: "Gérez le catalogue de cours multilingue.", classes: "Créez des classes, puis affectez les enseignants et inscrivez les élèves.", attendance: "Présences récentes enregistrées pour les cours.", assignments: "Devoirs publiés et échéances de l’académie.", progress: "Notes de progrès et évaluations récentes.", payments: "État des factures et soldes.", reports: "Indicateurs opérationnels calculés à partir des données.", settings: "Paramètres de l’académie stockés en base.", notifications: "Envoyez des annonces localisées dans l’application." },
} as const;

function BasicForm({ lang, section, courses, students, profiles, classes, invoices }: { lang: "en" | "ar" | "fr"; section: string; courses: { id: string; name: string }[]; students: { id: string; name: string }[]; profiles: { id: string; name: string }[]; classes: Row[]; invoices: Row[] }) {
  const common = "min-h-11 w-full rounded-xl border border-[#D6E8F1] bg-white px-3 text-sm text-[#001A3F] outline-none focus-visible:ring-2 focus-visible:ring-[#35B8FF]";
  const button = "min-h-11 rounded-xl bg-[#001A3F] px-4 text-sm font-bold text-white hover:bg-[#06274D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF]";
  if (section === "students") return <div className="space-y-7"><form action={createStudentAction} className="grid gap-3 border-b border-[#EAF1F5] pb-7 sm:grid-cols-2"><input type="hidden" name="lang" value={lang}/><label className="text-xs font-semibold">Legal name<input name="legal_name" required minLength={2} maxLength={160} className={`${common} mt-1`}/></label><label className="text-xs font-semibold">Preferred name<input name="display_name" required minLength={2} maxLength={100} className={`${common} mt-1`}/></label><label className="text-xs font-semibold">Student number (optional)<input name="student_number" maxLength={40} className={`${common} mt-1`}/></label><label className="text-xs font-semibold">Date of birth (optional)<input name="date_of_birth" type="date" className={`${common} mt-1`}/></label><label className="text-xs font-semibold sm:col-span-2">Adult student portal account (optional)<select name="auth_user_id" className={`${common} mt-1`}><option value="">No independent student login</option>{profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.name}</option>)}</select></label><div className="sm:col-span-2"><button className={button}>Create student record</button></div></form><div><h3 className="mb-3 text-sm font-bold">Create an adult student portal account</h3><p className="mb-4 text-xs leading-5 text-[#718A9A]">Create the adult learner’s login first. After activation, select their account above when creating or editing their student record. Children use a guardian account instead.</p><PortalInviteForm lang={lang} role="adult_student"/></div></div>;
  if (section === "staff") return <PortalInviteForm lang={lang} role="teacher"/>;
  if (section === "courses") return <form action={createCourseAction} className="grid gap-3 sm:grid-cols-2"><input type="hidden" name="lang" value={lang}/><label className="text-xs font-semibold">Course code<input name="code" required maxLength={30} placeholder="TAJWEED" className={`${common} mt-1`}/></label><label className="text-xs font-semibold">Category<input name="category" required maxLength={60} placeholder="quran" className={`${common} mt-1`}/></label><label className="text-xs font-semibold">English name<input name="name_en" required maxLength={100} className={`${common} mt-1`}/></label><label className="text-xs font-semibold">Arabic name<input name="name_ar" required maxLength={100} dir="rtl" className={`${common} mt-1`}/></label><label className="text-xs font-semibold">French name<input name="name_fr" required maxLength={100} className={`${common} mt-1`}/></label><div className="sm:col-span-2"><button className={button}>Create course</button></div></form>;
  if (section === "classes") return <div className="space-y-7"><form action={createClassAction} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"><input type="hidden" name="lang" value={lang}/><label className="text-xs font-semibold">Class name<input name="name" required maxLength={120} className={`${common} mt-1`}/></label><label className="text-xs font-semibold">Course<select name="course_id" required className={`${common} mt-1`}>{courses.map((course) => <option value={course.id} key={course.id}>{course.name}</option>)}</select></label><label className="text-xs font-semibold">Capacity<input name="capacity" type="number" min="1" max="500" className={`${common} mt-1`}/></label><label className="text-xs font-semibold">Assign teacher (optional)<select name="staff_member_id" className={`${common} mt-1`}><option value="">Choose later</option>{profiles.map((profile) => <option value={profile.id} key={profile.id}>{profile.name}</option>)}</select></label><label className="text-xs font-semibold">Weekly class day<select name="weekday" className={`${common} mt-1`}><option value="">Choose later</option>{[[0,"Sunday"],[1,"Monday"],[2,"Tuesday"],[3,"Wednesday"],[4,"Thursday"],[5,"Friday"],[6,"Saturday"]].map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label><label className="text-xs font-semibold">Local start time<input name="local_start" type="time" className={`${common} mt-1`}/></label><label className="text-xs font-semibold">Duration (minutes)<input name="duration_minutes" type="number" min="10" max="240" className={`${common} mt-1`}/></label><label className="text-xs font-semibold">IANA timezone<input name="timezone" placeholder="Asia/Riyadh" className={`${common} mt-1`}/></label><label className="text-xs font-semibold">Schedule begins<input name="starts_on" type="date" className={`${common} mt-1`}/></label><div className="sm:col-span-2 xl:col-span-3"><button className={button}>Create class and schedule</button></div></form><form action={createEnrollmentAction} className="grid gap-3 border-t border-[#EAF1F5] pt-6 sm:grid-cols-[1fr_1fr_auto]"><input type="hidden" name="lang" value={lang}/><label className="text-xs font-semibold">Student<select name="student_id" required className={`${common} mt-1`}>{students.map((student) => <option key={student.id} value={student.id}>{student.name}</option>)}</select></label><label className="text-xs font-semibold">Class<select name="class_group_id" required className={`${common} mt-1`}>{classes.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label><div className="flex items-end"><button className={button}>Enroll student</button></div></form></div>;
  if (section === "guardians") return <div className="space-y-7"><div><h3 className="mb-3 text-sm font-bold">Create a parent / guardian portal account</h3><PortalInviteForm lang={lang} role="parent"/></div><div className="border-t border-[#EAF1F5] pt-6"><h3 className="mb-4 text-sm font-bold">Link an active parent account to a student</h3><form action={createGuardianRelationshipAction} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"><input type="hidden" name="lang" value={lang}/><label className="text-xs font-semibold">Parent account<select name="guardian_user_id" required className={`${common} mt-1`}>{profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.name}</option>)}</select></label><label className="text-xs font-semibold">Child<select name="student_id" required className={`${common} mt-1`}>{students.map((student) => <option key={student.id} value={student.id}>{student.name}</option>)}</select></label><div className="flex flex-wrap gap-x-4 gap-y-2 sm:col-span-2"><label className="flex min-h-11 items-center gap-2 text-xs font-semibold"><input type="checkbox" name="can_view_academic" value="yes" defaultChecked className="h-4 w-4 accent-[#087CC1]"/>Can view academic records</label><label className="flex min-h-11 items-center gap-2 text-xs font-semibold"><input type="checkbox" name="can_view_financial" value="yes" className="h-4 w-4 accent-[#087CC1]"/>Can view finances</label></div><div className="sm:col-span-2"><button className={button}>Link guardian</button></div></form></div></div>;
  if (section === "payments") return <div className="space-y-6"><form action={createInvoiceAction} className="grid gap-3 sm:grid-cols-2"><input type="hidden" name="lang" value={lang}/><label className="text-xs font-semibold">Bill to<select name="billed_to" required className={`${common} mt-1`}>{profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.name}</option>)}</select></label><label className="text-xs font-semibold">Student (optional)<select name="student_id" className={`${common} mt-1`}><option value="">Family invoice</option>{students.map((student) => <option key={student.id} value={student.id}>{student.name}</option>)}</select></label><label className="text-xs font-semibold">Description<input name="description" required maxLength={160} className={`${common} mt-1`}/></label><label className="text-xs font-semibold">Amount<input name="amount" type="number" min="0.01" step="0.01" required className={`${common} mt-1`}/></label><label className="text-xs font-semibold">Currency (ISO 4217)<input name="currency" pattern="[A-Z]{3}" placeholder="SAR" required maxLength={3} className={`${common} mt-1 uppercase`}/></label><label className="text-xs font-semibold">Due date<input name="due_on" type="date" className={`${common} mt-1`}/></label><div className="sm:col-span-2"><button className={button}>Issue invoice</button></div></form><form action={recordManualPaymentAction} className="grid gap-3 border-t border-[#EAF1F5] pt-6 sm:grid-cols-[1fr_1fr_1fr_auto]"><input type="hidden" name="lang" value={lang}/><label className="text-xs font-semibold">Invoice<select name="invoice_id" required className={`${common} mt-1`}>{invoices.filter((invoice) => !["paid","void","draft"].includes(invoice.status ?? "")).map((invoice) => <option key={invoice.id} value={invoice.id}>{invoice.title} · {invoice.detail}</option>)}</select></label><label className="text-xs font-semibold">Payment amount<input name="amount" type="number" min="0.01" step="0.01" required className={`${common} mt-1`}/></label><label className="text-xs font-semibold">Receipt/reference<input name="reference" required maxLength={120} className={`${common} mt-1`}/></label><div className="flex items-end"><button className={button}>Record received payment</button></div></form></div>;
  return null;
}

function GuardianRevokeButton({ lang, relationshipId }: { lang: "en" | "ar" | "fr"; relationshipId: string }) {
  const label = lang === "ar" ? "إلغاء الوصول" : lang === "fr" ? "Révoquer l’accès" : "Revoke access";
  return <form action={revokeGuardianRelationshipAction}>
    <input type="hidden" name="lang" value={lang}/>
    <input type="hidden" name="relationship_id" value={relationshipId}/>
    <button className="min-h-10 rounded-lg px-3 text-xs font-bold text-[#A64C4C] hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-[#35B8FF]">{label}</button>
  </form>;
}

async function loadSection(section: string, query: string): Promise<{ rows: Row[]; error?: string; students: { id: string; name: string }[]; courses: { id: string; name: string }[]; profiles: { id: string; name: string }[]; counts?: { label: string; value: number }[] }> {
  // This data loader is only reached after the page enforces the admin role.
  const db = createSupabaseAdminClient();
  const students: { id: string; name: string }[] = [];
  const courses: { id: string; name: string }[] = [];
  const profiles: { id: string; name: string }[] = [];
  const rows: Row[] = [];
  if (section === "students") {
    let request = db.from("students").select("id,display_name,status,student_number").order("created_at", { ascending: false }).limit(50);
    if (query) request = request.ilike("display_name", `%${query.replace(/[%,()]/g, "").slice(0, 60)}%`);
    const { data, error } = await request;
    for (const row of data ?? []) rows.push({ id: row.id, title: row.display_name, detail: row.student_number ?? "Student record", status: row.status });
    const { data: adults } = await db.from("user_roles").select("user_id").eq("role", "adult_student").is("revoked_at", null);
    const adultIds = (adults ?? []).map((item) => item.user_id);
    if (adultIds.length) { const { data: adultProfiles } = await db.from("profiles").select("id,display_name").in("id", adultIds); for (const item of adultProfiles ?? []) profiles.push({ id: item.id, name: item.display_name }); }
    return { rows, error: error?.message, students: [], courses: [], profiles };
  }
  if (section === "courses") {
    const [{ data, error }, names] = await Promise.all([db.from("courses").select("id,code,category,active").order("code").limit(100), db.from("course_translations").select("course_id,locale,name").eq("locale", "en")]);
    const localized = new Map((names.data ?? []).map((item) => [item.course_id, item.name]));
    for (const row of data ?? []) { rows.push({ id: row.id, title: localized.get(row.id) ?? row.code, detail: `${row.code} · ${row.category}`, status: row.active ? "active" : "inactive" }); courses.push({ id: row.id, name: localized.get(row.id) ?? row.code }); }
    return { rows, error: error?.message, students, courses, profiles };
  }
  if (section === "classes") {
    const [{ data, error }, catalog, learners, staff] = await Promise.all([db.from("class_groups").select("id,name,status,capacity,course_id").order("created_at", { ascending: false }).limit(100), db.from("courses").select("id,code").order("code"), db.from("students").select("id,display_name").eq("status", "active").order("display_name"), db.from("staff_members").select("id,user_id").eq("status", "active")]);
    for (const course of catalog.data ?? []) courses.push({ id: course.id, name: course.code });
    for (const learner of learners.data ?? []) students.push({ id: learner.id, name: learner.display_name });
    const staffIds = (staff.data ?? []).map((item) => item.user_id);
    const staffProfiles = staffIds.length ? await db.from("profiles").select("id,display_name").in("id", staffIds) : { data: [] };
    const staffNames = new Map((staffProfiles.data ?? []).map((item) => [item.id, item.display_name]));
    for (const member of staff.data ?? []) profiles.push({ id: member.id, name: staffNames.get(member.user_id) ?? "Teacher" });
    const courseNames = new Map(courses.map((course) => [course.id, course.name]));
    for (const row of data ?? []) rows.push({ id: row.id, title: row.name, detail: `${courseNames.get(row.course_id) ?? "Course"}${row.capacity ? ` · ${row.capacity} places` : ""}`, status: row.status });
    return { rows, error: error?.message, students, courses, profiles };
  }
  if (section === "payments") {
    const [{ data, error }, { data: roles }, { data: children }] = await Promise.all([db.from("invoices").select("id,invoice_number,billed_to,student_id,total_minor,currency,status,due_at").order("created_at", { ascending: false }).limit(100), db.from("user_roles").select("user_id").in("role", ["parent","adult_student"]).is("revoked_at", null), db.from("students").select("id,display_name").eq("status", "active").order("display_name")]);
    for (const child of children ?? []) students.push({ id: child.id, name: child.display_name });
    const recipientIds = [...new Set((roles ?? []).map((item) => item.user_id))];
    const accountRows = recipientIds.length ? await db.from("profiles").select("id,display_name").in("id", recipientIds) : { data: [] };
    for (const account of accountRows.data ?? []) profiles.push({ id: account.id, name: account.display_name });
    const names = new Map(profiles.map((profile) => [profile.id, profile.name]));
    for (const row of data ?? []) rows.push({ id: row.id, title: row.invoice_number, detail: `${names.get(row.billed_to) ?? "Family"} · ${new Intl.NumberFormat("en", { style: "currency", currency: row.currency }).format(row.total_minor / 100)}`, status: row.status });
    return { rows, error: error?.message, students, courses, profiles };
  }
  if (section === "staff") {
    const [{ data: staff, error }, { data: invitations }] = await Promise.all([db.from("staff_members").select("id,user_id,staff_number,title,status").order("created_at", { ascending: false }).limit(100), db.from("invitations").select("id,email,role,status,expires_at").in("role", ["teacher","adult_student"]).order("created_at", { ascending: false }).limit(30)]);
    const userIds = [...new Set((staff ?? []).map((item) => item.user_id))];
    const nameRows = userIds.length ? await db.from("profiles").select("id,display_name").in("id", userIds) : { data: [] };
    const names = new Map((nameRows.data ?? []).map((item) => [item.id, item.display_name]));
    for (const row of staff ?? []) rows.push({ id: row.id, title: names.get(row.user_id) || row.title || "Staff member", detail: row.staff_number ?? "Academy staff", status: row.status });
    for (const invite of invitations ?? []) rows.push({ id: invite.id, title: invite.email, detail: `${invite.role} invitation`, status: invite.status });
    return { rows, error: error?.message, students, courses, profiles };
  }
  if (section === "guardians") {
    const [{ data: links, error }, { data: children }, { data: parentRoles }] = await Promise.all([db.from("guardian_student_relationships").select("id,guardian_user_id,student_id,can_view_financial,revoked_at").order("created_at", { ascending: false }).limit(100), db.from("students").select("id,display_name,status").eq("status", "active").order("display_name"), db.from("user_roles").select("user_id").eq("role", "parent").is("revoked_at", null)]);
    for (const child of children ?? []) students.push({ id: child.id, name: child.display_name });
    const ids = [...new Set((parentRoles ?? []).map((item) => item.user_id))];
    const parents = ids.length ? await db.from("profiles").select("id,display_name").in("id", ids) : { data: [] };
    for (const parent of parents.data ?? []) profiles.push({ id: parent.id, name: parent.display_name });
    const linksData = links ?? [];
    const userNames = new Map(profiles.map((profile) => [profile.id, profile.name]));
    const studentNames = new Map(students.map((student) => [student.id, student.name]));
    for (const row of linksData) rows.push({ id: row.id, title: `${userNames.get(row.guardian_user_id) ?? "Parent"} → ${studentNames.get(row.student_id) ?? "Student"}`, detail: row.can_view_financial ? "Academic + financial access" : "Academic access only", status: row.revoked_at ? "revoked" : "active" });
    return { rows, error: error?.message, students, courses, profiles };
  }
  if (section === "attendance") {
    const [{ data, error }, { data: people }] = await Promise.all([db.from("attendance").select("id,student_id,session_id,status,recorded_at").order("recorded_at", { ascending: false }).limit(50), db.from("students").select("id,display_name")]);
    const names = new Map((people ?? []).map((item) => [item.id, item.display_name]));
    for (const row of data ?? []) rows.push({ id: row.id, title: names.get(row.student_id) ?? "Student", detail: new Date(row.recorded_at).toLocaleString(), status: row.status });
    return { rows, error: error?.message, students, courses, profiles };
  }
  if (section === "assignments") {
    const [{ data, error }, { data: groups }] = await Promise.all([db.from("assignments").select("id,title,due_at,status,class_group_id").order("created_at", { ascending: false }).limit(50), db.from("class_groups").select("id,name")]);
    const groupNames = new Map((groups ?? []).map((item) => [item.id, item.name]));
    for (const row of data ?? []) rows.push({ id: row.id, title: row.title, detail: `${groupNames.get(row.class_group_id) ?? "Class"}${row.due_at ? ` · Due ${new Date(row.due_at).toLocaleDateString()}` : ""}`, status: row.status });
    return { rows, error: error?.message, students, courses, profiles };
  }
  if (section === "progress") {
    const [{ data, error }, { data: people }] = await Promise.all([db.from("progress_entries").select("id,student_id,skill,score,note,created_at").order("created_at", { ascending: false }).limit(50), db.from("students").select("id,display_name")]);
    const names = new Map((people ?? []).map((item) => [item.id, item.display_name]));
    for (const row of data ?? []) rows.push({ id: row.id, title: `${names.get(row.student_id) ?? "Student"} · ${row.skill}`, detail: row.note || "Progress entry", status: row.score === null ? "not scored" : `${row.score}%` });
    return { rows, error: error?.message, students, courses, profiles };
  }
  if (section === "payments") {
    const [{ data, error }, { data: people }] = await Promise.all([db.from("invoices").select("id,invoice_number,billed_to,total_minor,currency,status,due_at").order("created_at", { ascending: false }).limit(50), db.from("profiles").select("id,display_name")]);
    const names = new Map((people ?? []).map((item) => [item.id, item.display_name]));
    for (const row of data ?? []) rows.push({ id: row.id, title: row.invoice_number, detail: `${names.get(row.billed_to) ?? "Family"} · ${new Intl.NumberFormat("en", { style: "currency", currency: row.currency }).format(row.total_minor / 100)}`, status: row.status });
    return { rows, error: error?.message, students, courses, profiles };
  }
  if (section === "reports") {
    const [studentsCount, staffCount, classesCount, absentCount, openInvoices, assignmentCount] = await Promise.all([db.from("students").select("id", { count: "exact", head: true }), db.from("staff_members").select("id", { count: "exact", head: true }).eq("status", "active"), db.from("class_groups").select("id", { count: "exact", head: true }).eq("status", "active"), db.from("attendance").select("id", { count: "exact", head: true }).eq("status", "absent"), db.from("invoices").select("id", { count: "exact", head: true }).in("status", ["issued","overdue","partially_paid"]), db.from("assignments").select("id", { count: "exact", head: true }).eq("status", "published")]);
    for (const [title,value] of [["Total students",studentsCount.count],["Active staff",staffCount.count],["Active classes",classesCount.count],["Absence records",absentCount.count],["Open invoices",openInvoices.count],["Published assignments",assignmentCount.count]] as const) rows.push({ id: title, title, status: String(value ?? 0) });
    return { rows, students, courses, profiles };
  }
  if (section === "notifications") {
    const { data, error } = await db.from("notifications").select("id,event_type,title,body,created_at").order("created_at", { ascending: false }).limit(50);
    for (const item of data ?? []) rows.push({ id: item.id, title: item.title, detail: item.body, status: item.event_type });
    return { rows, error: error?.message, students, courses, profiles };
  }
  if (section === "settings") {
    const { data, error } = await db.from("system_settings").select("key,value,updated_at").order("key");
    for (const item of data ?? []) rows.push({ id: item.key, title: item.key, detail: JSON.stringify(item.value), status: new Date(item.updated_at).toLocaleDateString() });
    return { rows, error: error?.message, students, courses, profiles };
  }
  return { rows, students, courses, profiles };
}

export default async function AdminSectionPage({ params, searchParams }: { params: Promise<{ lang: string; section: string }>; searchParams: Promise<{ q?: string; created?: string; invited?: string; linked?: string; enrolled?: string; saved?: string; sent?: string; payment?: string; revoked?: string; error?: string }> }) {
  const { lang: raw, section } = await params;
  if (!isLang(raw) || !knownSections.has(section)) notFound();
  await requireRole(raw, "admin");
  const { q = "", error: errorFlag, created, invited, linked, enrolled, saved, sent, payment, revoked } = await searchParams;
  const result = await loadSection(section, q.trim().slice(0, 80));
  const title = sectionNames[raw][section as keyof typeof sectionNames.en];
  const description = descriptions[raw][section as keyof typeof descriptions.en];
  const hasForm = ["students", "guardians", "staff", "courses", "classes"].includes(section);
  return <>
    <PageHeading title={title} description={description}/>
    {created && <div className="mb-5"><Notice>Record created successfully.</Notice></div>}
    {invited && <div className="mb-5"><Notice>Invitation created. Share the generated one-time activation link with the recipient; the app does not send email automatically.</Notice></div>}
    {linked && <div className="mb-5"><Notice>Guardian relationship saved.</Notice></div>}
    {revoked && <div className="mb-5"><Notice>Guardian access has been revoked.</Notice></div>}
    {enrolled && <div className="mb-5"><Notice>Student enrolled successfully.</Notice></div>}
    {saved && <div className="mb-5"><Notice>Setting saved.</Notice></div>}
    {sent && <div className="mb-5"><Notice>Announcement delivered to {sent} active accounts.</Notice></div>}
    {payment && <div className="mb-5"><Notice>Payment recorded and invoice balance updated.</Notice></div>}
    {(errorFlag || result.error) && <div className="mb-5"><Notice tone="red">The request could not be completed. Check the details and try again. {result.error ? "Database access or connection failed." : ""}</Notice></div>}
    {(hasForm || section === "notifications" || section === "payments" || section === "settings") && <section className="mb-6 rounded-2xl border border-[#DDEBF2] bg-white p-5 shadow-[0_8px_25px_rgba(0,40,70,0.04)] sm:p-6"><h2 className="mb-4 text-base font-bold">{section === "notifications" ? "Compose an announcement" : section === "payments" ? "Invoices and received payments" : section === "settings" ? "Save an academy setting" : section === "students" ? "Student records and portal accounts" : section === "staff" ? "Create a teacher / staff portal account" : section === "guardians" ? "Create a parent / guardian portal account" : section === "courses" ? "Add a multilingual course" : "Create a class group"}</h2>{section === "notifications" ? <form action={sendAnnouncementAction} className="grid gap-3 sm:grid-cols-2"><input type="hidden" name="lang" value={raw}/><label className="text-xs font-semibold">Send to role<select name="role" className="mt-1 min-h-11 w-full rounded-xl border border-[#D6E8F1] bg-white px-3 text-sm"><option value="all">All active portal users</option><option value="teacher">Teachers</option><option value="parent">Parents / guardians</option><option value="adult_student">Adult students</option></select></label><label className="text-xs font-semibold">English title<input name="title_en" required maxLength={120} className="mt-1 min-h-11 w-full rounded-xl border border-[#D6E8F1] px-3 text-sm"/></label><label className="text-xs font-semibold">English message<textarea name="body_en" required maxLength={2000} rows={3} className="mt-1 w-full rounded-xl border border-[#D6E8F1] px-3 py-2 text-sm"/></label><label className="text-xs font-semibold">Arabic title<input name="title_ar" required maxLength={120} dir="rtl" className="mt-1 min-h-11 w-full rounded-xl border border-[#D6E8F1] px-3 text-sm"/></label><label className="text-xs font-semibold">Arabic message<textarea name="body_ar" required maxLength={2000} rows={3} dir="rtl" className="mt-1 w-full rounded-xl border border-[#D6E8F1] px-3 py-2 text-sm"/></label><label className="text-xs font-semibold">French title<input name="title_fr" required maxLength={120} className="mt-1 min-h-11 w-full rounded-xl border border-[#D6E8F1] px-3 text-sm"/></label><label className="text-xs font-semibold">French message<textarea name="body_fr" required maxLength={2000} rows={3} className="mt-1 w-full rounded-xl border border-[#D6E8F1] px-3 py-2 text-sm"/></label><div className="sm:col-span-2"><button className="min-h-11 rounded-xl bg-[#001A3F] px-5 text-sm font-bold text-white">Send announcement</button></div></form> : section === "settings" ? <form action={saveSettingAction} className="grid gap-3 sm:grid-cols-[1fr_2fr_auto]"><input type="hidden" name="lang" value={raw}/><label className="text-xs font-semibold">Setting key<input name="key" required pattern="[a-z][a-z0-9_.-]{1,79}" placeholder="academy.timezone" className="mt-1 min-h-11 w-full rounded-xl border border-[#D6E8F1] px-3 text-sm"/></label><label className="text-xs font-semibold">Value (text or JSON)<input name="value" required maxLength={4000} className="mt-1 min-h-11 w-full rounded-xl border border-[#D6E8F1] px-3 text-sm"/></label><div className="flex items-end"><button className="min-h-11 rounded-xl bg-[#001A3F] px-5 text-sm font-bold text-white">Save setting</button></div></form> : <BasicForm lang={raw} section={section} courses={result.courses} students={result.students} profiles={result.profiles} classes={result.rows} invoices={result.rows}/>}</section>}
    {section !== "reports" && section !== "settings" && <form method="get" className="mb-4 flex max-w-xl gap-2"><label htmlFor="admin-search" className="sr-only">Search {title}</label><div className="relative flex-1"><Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8299A8]"/><input id="admin-search" name="q" defaultValue={q} placeholder={`Search ${title.toLowerCase()}…`} className="min-h-11 w-full rounded-xl border border-[#D6E8F1] bg-white ps-10 pe-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#35B8FF]"/></div><button className="min-h-11 rounded-xl bg-[#001A3F] px-4 text-sm font-bold text-white">Search</button></form>}
    <section className="overflow-hidden rounded-2xl border border-[#E4EEF3] bg-white shadow-[0_8px_25px_rgba(0,40,70,0.04)]"><div className="flex items-center justify-between border-b border-[#EAF1F5] px-5 py-4"><h2 className="font-bold">{section === "students" ? "Academy records" : title}</h2><span className="rounded-full bg-[#E8F7FF] px-3 py-1 text-xs font-bold text-[#087CC1]">{result.rows.length}</span></div>{result.rows.length ? <><ul className="divide-y divide-[#EAF1F5]">{result.rows.map((row) => <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">{section === "students" ? <Link href={`/${raw}/portal/admin/students/${row.id}`} className="min-w-0 rounded-md focus-visible:outline-2 focus-visible:outline-[#35B8FF]"><span className="block truncate text-sm font-bold">{row.title}</span>{row.detail && <span className="mt-1 block truncate text-xs text-[#728A99]">{row.detail}</span>}</Link> : <span className="min-w-0"><span className="block truncate text-sm font-bold">{row.title}</span>{row.detail && <span className="mt-1 block truncate text-xs text-[#728A99]">{row.detail}</span>}</span>}<span className="ms-auto flex items-center gap-1">{row.status && <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${["active","paid","present","published","succeeded"].includes(row.status) ? "bg-[#E8F7FF] text-[#087CC1]" : ["overdue","absent","failed"].includes(row.status) ? "bg-red-50 text-red-700" : "bg-[#F3F7F9] text-[#6D8492]"}`}>{row.status}</span>}{section === "guardians" && row.status === "active" && <GuardianRevokeButton lang={raw} relationshipId={row.id}/>}</span></li>)}</ul><div className="border-t border-[#EAF1F5] px-5 py-3 text-xs text-[#7F96A4]">Showing up to 50 recent records</div></> : <div className="p-6"><Notice>{result.error ? "Could not load records. Verify database configuration and permissions." : "No matching records yet."}</Notice></div>}</section>
  </>;
}
