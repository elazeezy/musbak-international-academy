import Link from "next/link";
import { CalendarClock, ClipboardCheck, FileText } from "lucide-react";
import type { Role } from "@/lib/supabase/database.types";
import { getPortalRecords } from "@/lib/portal/resources";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AssignmentComposer, AttendanceButtons, GradeSubmission, ProgressComposer } from "./TeacherActions";
import { MaterialDownloadButton, MaterialUpload } from "./MaterialUpload";
import { Notice, PageHeading } from "./PortalShell";
import { submitAssignmentAction } from "@/app/actions/teacher";

const label = {
  en: { classes: "My classes", schedule: "Schedule", attendance: "Attendance", assignments: "Assignments", progress: "Learning progress", payments: "Payments", materials: "Learning materials", empty: "No records are available yet.", adminHelp: "Ask the academy admin to add or assign this information.", pickChild: "Viewing all linked children", selectChild: "View one child", overline: "ACADEMY PORTAL" },
  ar: { classes: "فصولي", schedule: "الجدول", attendance: "الحضور", assignments: "الواجبات", progress: "التقدم التعليمي", payments: "المدفوعات", materials: "مواد التعلم", empty: "لا توجد سجلات متاحة بعد.", adminHelp: "تواصل مع إدارة الأكاديمية لإضافة هذه المعلومات أو تكليفك بها.", pickChild: "عرض جميع الأبناء المرتبطين", selectChild: "عرض أحد الأبناء", overline: "بوابة الأكاديمية" },
  fr: { classes: "Mes classes", schedule: "Planning", attendance: "Présence", assignments: "Devoirs", progress: "Progrès", payments: "Paiements", materials: "Ressources pédagogiques", empty: "Aucun enregistrement pour le moment.", adminHelp: "Demandez à l’administration d’ajouter ces informations ou de vous les attribuer.", pickChild: "Tous les enfants liés", selectChild: "Afficher un enfant", overline: "PORTAIL DE L’ACADÉMIE" },
} as const;
const titles = { classes: "classes", schedule: "schedule", attendance: "attendance", assignments: "assignments", progress: "progress", payments: "payments", materials: "materials" } as const;

export async function MemberSection({ lang, role, userId, section, childId }: { lang: "en" | "ar" | "fr"; role: Role; userId: string; section: string; childId?: string }) {
  if (!(section in titles)) return <Notice tone="red">This section is not available.</Notice>;
  const copy = label[lang];
  const { records, classes, students, selectedChild, error } = await getPortalRecords(role, userId, section, childId);
  const title = copy[section as keyof typeof titles];
  const db = await createSupabaseServerClient();
  let children: { id: string; display_name: string }[] = [];
  if (role === "parent") {
    const links = await db.from("guardian_student_relationships").select("student_id").eq("guardian_user_id", userId).is("revoked_at", null);
    const ids = [...new Set((links.data ?? []).map((link) => link.student_id))];
    if (ids.length) { const childData = await db.from("students").select("id,display_name").in("id", ids); children = childData.data ?? []; }
  }
  const submissionData = role === "teacher" && section === "assignments" && records.length
    ? await db.from("submissions").select("id,assignment_id,student_id,grade,feedback,submitted_at,text_response").in("assignment_id", records.map((record) => record.id)).not("submitted_at", "is", null).order("submitted_at", { ascending: false }).limit(100)
    : { data: [], error: null };
  const learnerData = role === "adult_student" && section === "assignments"
    ? await db.from("students").select("id").eq("auth_user_id", userId).maybeSingle()
    : { data: null };
  const learnerSubmissions = learnerData.data && records.length
    ? await db.from("submissions").select("assignment_id,text_response,submitted_at,grade,feedback").eq("student_id", learnerData.data.id).in("assignment_id", records.map((record) => record.id))
    : { data: [] };
  const learnerSubmissionMap = new Map((learnerSubmissions.data ?? []).map((submission) => [submission.assignment_id, submission]));
  const nameMap = new Map(students.map((student) => [student.id, student.name]));

  return <>
    <PageHeading title={title} description={copy.adminHelp}/>
    {role === "parent" && children.length > 1 && <div className="mb-6 flex flex-wrap items-center gap-2"><Link href={`/${lang}/portal/parent/${section}`} className={`min-h-10 rounded-xl px-3 py-2 text-xs font-bold ${!selectedChild ? "bg-[#001A3F] text-white" : "bg-white text-[#607C8E]"}`}>{copy.pickChild}</Link>{children.map((child) => <Link key={child.id} href={`/${lang}/portal/parent/${section}?child=${child.id}`} className={`min-h-10 rounded-xl px-3 py-2 text-xs font-bold ${selectedChild === child.id ? "bg-[#001A3F] text-white" : "bg-white text-[#607C8E]"}`}>{child.display_name}</Link>)}</div>}
    {error && <div className="mb-5"><Notice tone="red">{error}</Notice></div>}
    {role === "teacher" && section === "assignments" && <section className="mb-6 rounded-2xl border border-[#E4EEF3] bg-white p-5"><h2 className="mb-4 text-base font-bold">Publish an assignment</h2><AssignmentComposer lang={lang} classes={classes}/></section>}
    {role === "teacher" && section === "progress" && <section className="mb-6 rounded-2xl border border-[#E4EEF3] bg-white p-5"><h2 className="mb-4 text-base font-bold">Record student progress</h2><ProgressComposer lang={lang} classes={classes} students={students}/></section>}
    {role === "teacher" && section === "materials" && <section className="mb-6 rounded-2xl border border-[#E4EEF3] bg-white p-5"><h2 className="mb-4 text-base font-bold">Share class material</h2><MaterialUpload lang={lang} classes={classes}/></section>}
    {role === "teacher" && section === "classes" && <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{classes.map((item) => <article key={item.id} className="rounded-2xl border border-[#DDEBF2] bg-white p-5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F7FF] text-[#087CC1]"><BookOpenIcon/></span><h2 className="mt-3 font-bold">{item.name}</h2><Link href={`/${lang}/portal/teacher/attendance`} className="mt-3 inline-flex min-h-10 items-center gap-2 text-xs font-bold text-[#087CC1]">{lang === "ar" ? "تسجيل الحضور" : lang === "fr" ? "Faire l’appel" : "Take attendance"}<CalendarClock className="h-4 w-4"/></Link></article>)}</div>}
    {role === "teacher" && section === "attendance" ? <TeacherAttendance lang={lang} groups={classes} students={students}/> : section === "materials" ? <RecordList records={records} lang={lang} materials/> : section === "assignments" && role === "teacher" ? <section className="space-y-3">{records.length ? records.map((record) => <article key={record.id} className="rounded-2xl border border-[#E4EEF3] bg-white p-5"><div className="flex items-start justify-between gap-3"><div><h2 className="font-bold">{record.title}</h2><p className="mt-1 text-xs leading-5 text-[#708898]">{record.detail}</p></div><ClipboardCheck className="h-4 w-4 text-[#1680B9]"/></div>{(submissionData.data ?? []).filter((submission) => submission.assignment_id === record.id).map((submission) => <div key={submission.id} className="mt-4 rounded-xl bg-[#F7FBFD] p-4"><p className="text-xs font-bold">{nameMap.get(submission.student_id) ?? "Student"}</p>{submission.text_response && <p className="mt-2 whitespace-pre-wrap text-sm text-[#607C8E]">{submission.text_response}</p>}<div className="mt-3"><GradeSubmission lang={lang} id={submission.id} currentGrade={submission.grade} currentFeedback={submission.feedback}/></div></div>)}</article>) : <Empty lang={lang}/>}</section> : role === "adult_student" && section === "assignments" ? <section className="space-y-3">{records.length ? records.map((record) => { const submission = learnerSubmissionMap.get(record.id); return <article key={record.id} className="rounded-2xl border border-[#E4EEF3] bg-white p-5"><h2 className="font-bold">{record.title}</h2><p className="mt-1 text-xs leading-5 text-[#708898]">{record.detail}</p>{submission?.grade !== null && submission?.grade !== undefined && <p className="mt-3 text-sm font-semibold text-[#087CC1]">{lang === "ar" ? "النتيجة" : lang === "fr" ? "Note" : "Grade"}: {submission.grade}{submission.feedback ? ` · ${submission.feedback}` : ""}</p>}<form action={submitAssignmentAction} className="mt-4 space-y-3"><input type="hidden" name="lang" value={lang}/><input type="hidden" name="assignment_id" value={record.id}/><label className="block text-xs font-semibold">{lang === "ar" ? "إجابتك" : lang === "fr" ? "Votre réponse" : "Your response"}<textarea name="response" required maxLength={5000} defaultValue={submission?.text_response ?? ""} rows={4} className="mt-1 w-full rounded-xl border border-[#D6E8F1] p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#35B8FF]"/></label><button className="min-h-11 rounded-xl bg-[#001A3F] px-4 text-sm font-bold text-white">{submission?.submitted_at ? (lang === "ar" ? "تحديث الإجابة" : lang === "fr" ? "Modifier la réponse" : "Update response") : (lang === "ar" ? "إرسال الإجابة" : lang === "fr" ? "Envoyer la réponse" : "Submit response")}</button></form></article>; }) : <Empty lang={lang}/>}</section> : <RecordList records={records} lang={lang}/>}
  </>;
}

function BookOpenIcon() { return <FileText aria-hidden="true" className="h-5 w-5"/>; }

function Empty({ lang }: { lang: "en" | "ar" | "fr" }) { return <div className="rounded-2xl border border-dashed border-[#CFE1EA] bg-white p-8 text-center"><p className="text-sm font-bold text-[#001A3F]">{label[lang].empty}</p><p className="mt-2 text-xs text-[#7B92A0]">{label[lang].adminHelp}</p></div>; }

function RecordList({ records, lang, materials = false }: { records: { id: string; title: string; detail: string; status?: string; created_at?: string }[]; lang: "en" | "ar" | "fr"; materials?: boolean }) {
  if (!records.length) return <Empty lang={lang}/>;
  return <div className="overflow-hidden rounded-2xl border border-[#E4EEF3] bg-white shadow-[0_8px_25px_rgba(0,40,70,0.04)]"><ul className="divide-y divide-[#EAF1F5]">{records.map((record) => <li key={record.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div className="min-w-0"><p className="truncate text-sm font-bold">{record.title}</p><p className="mt-1 text-xs leading-5 text-[#718A9A]">{record.detail}</p>{record.created_at && <time className="mt-1 block text-[10px] text-[#93A5AF]" dateTime={record.created_at}>{new Date(record.created_at).toLocaleString(lang)}</time>}</div><div className="flex items-center gap-3">{record.status && <span className="rounded-full bg-[#E8F7FF] px-3 py-1 text-[11px] font-bold text-[#087CC1]">{record.status}</span>}{materials && <MaterialDownloadButton id={record.id} lang={lang}/>}</div></li>)}</ul></div>;
}

async function TeacherAttendance({ lang, groups, students }: { lang: "en" | "ar" | "fr"; groups: { id: string; name: string }[]; students: { id: string; name: string }[] }) {
  const db = await createSupabaseServerClient();
  const groupIds = groups.map((group) => group.id);
  const now = new Date(); const since = new Date(now.getTime() - 7 * 86400000).toISOString(); const until = new Date(now.getTime() + 14 * 86400000).toISOString();
  const { data: sessions, error } = groupIds.length ? await db.from("class_sessions").select("id,class_group_id,starts_at,ends_at").in("class_group_id", groupIds).gte("starts_at", since).lte("starts_at", until).eq("status", "scheduled").order("starts_at").limit(30) : { data: [], error: null };
  const sessionIds = (sessions ?? []).map((session) => session.id);
  const attendanceRows = sessionIds.length ? await db.from("attendance").select("session_id,student_id,status").in("session_id", sessionIds) : { data: [], error: null };
  const groupsMap = new Map(groups.map((group) => [group.id, group.name]));
  const studentMap = new Map(students.map((student) => [student.id, student.name]));
  const enrollmentData = groupIds.length ? await db.from("enrollments").select("class_group_id,student_id").in("class_group_id", groupIds).eq("status", "active") : { data: [] };
  return error ? <Notice tone="red">Could not load sessions. Please try again.</Notice> : !sessions?.length ? <Empty lang={lang}/> : <div className="space-y-4">{sessions.map((session) => {
    const roster = (enrollmentData.data ?? []).filter((enrollment) => enrollment.class_group_id === session.class_group_id);
    const existing = new Map((attendanceRows.data ?? []).filter((row) => row.session_id === session.id).map((row) => [row.student_id, row.status]));
    return <section key={session.id} className="overflow-hidden rounded-2xl border border-[#DDEBF2] bg-white shadow-[0_8px_25px_rgba(0,40,70,0.04)]"><header className="flex flex-wrap items-center justify-between gap-2 bg-[#F7FBFD] px-5 py-4"><span><h2 className="font-bold">{groupsMap.get(session.class_group_id) ?? "Class"}</h2><time dateTime={session.starts_at} className="mt-1 block text-xs text-[#718A9A]">{new Date(session.starts_at).toLocaleString(lang, { dateStyle: "medium", timeStyle: "short" })}</time></span><span className="rounded-full bg-[#E8F7FF] px-3 py-1 text-[10px] font-bold text-[#087CC1]">{roster.length} {lang === "ar" ? "طلاب" : lang === "fr" ? "élèves" : "students"}</span></header>{roster.length ? <ul className="divide-y divide-[#EAF1F5]">{roster.map((enrollment) => <li key={enrollment.student_id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"><span className="text-sm font-semibold">{studentMap.get(enrollment.student_id) ?? "Student"}</span><AttendanceButtons lang={lang} sessionId={session.id} studentId={enrollment.student_id} status={existing.get(enrollment.student_id)}/></li>)}</ul> : <p className="p-5 text-sm text-[#718A9A]">No students enrolled in this class.</p>}</section>;
  })}</div>;
}
