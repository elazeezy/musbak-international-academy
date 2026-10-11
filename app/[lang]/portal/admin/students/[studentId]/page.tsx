import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, CalendarCheck2, UsersRound } from "lucide-react";
import { z } from "zod";
import { updateStudentProfileAction } from "@/app/actions/admin";
import { requireRole } from "@/lib/auth/server";
import { isLang } from "@/lib/dictionaries";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { Notice, PageHeading } from "@/components/portal/PortalShell";

const copy = {
  en: { back: "All students", details: "Student details", legal: "Legal name", dob: "Date of birth", number: "Student number", preferred: "Preferred name", language: "Preferred language", timezone: "Time zone", status: "Enrollment status", save: "Save changes", classes: "Enrolled classes", guardians: "Guardians", manage: "Manage", attendance: "Recent attendance", progress: "Recent progress", noClasses: "No active class enrollments.", noGuardians: "No guardians linked yet.", noAttendance: "No attendance records yet.", noProgress: "No progress updates yet.", active: "Active", inactive: "Inactive", archived: "Archived", academic: "Academic access", finance: "Financial access", saved: "Student profile updated.", failed: "Could not save the profile. Check the details and try again.", timezoneError: "Enter a valid IANA time zone, such as Asia/Riyadh.", statusLabel: "Status" },
  ar: { back: "كل الطلاب", details: "بيانات الطالب", legal: "الاسم الرسمي", dob: "تاريخ الميلاد", number: "رقم الطالب", preferred: "الاسم المفضل", language: "اللغة المفضلة", timezone: "المنطقة الزمنية", status: "حالة التسجيل", save: "حفظ التغييرات", classes: "الفصول المسجل بها", guardians: "أولياء الأمور", manage: "إدارة", attendance: "سجل الحضور الأخير", progress: "آخر تحديثات التقدم", noClasses: "لا توجد فصول نشطة.", noGuardians: "لم تتم إضافة ولي أمر بعد.", noAttendance: "لا توجد سجلات حضور بعد.", noProgress: "لا توجد تحديثات تقدم بعد.", active: "نشط", inactive: "غير نشط", archived: "مؤرشف", academic: "صلاحية أكاديمية", finance: "صلاحية مالية", saved: "تم تحديث ملف الطالب.", failed: "تعذر حفظ الملف. تحقق من البيانات وحاول مرة أخرى.", timezoneError: "أدخل منطقة زمنية صحيحة مثل Asia/Riyadh.", statusLabel: "الحالة" },
  fr: { back: "Tous les élèves", details: "Dossier de l’élève", legal: "Nom légal", dob: "Date de naissance", number: "Numéro d’élève", preferred: "Nom d’usage", language: "Langue préférée", timezone: "Fuseau horaire", status: "État de l’inscription", save: "Enregistrer", classes: "Classes suivies", guardians: "Parents et tuteurs", manage: "Gérer", attendance: "Présences récentes", progress: "Progrès récents", noClasses: "Aucune inscription active.", noGuardians: "Aucun tuteur associé.", noAttendance: "Aucune présence enregistrée.", noProgress: "Aucune mise à jour des progrès.", active: "Actif", inactive: "Inactif", archived: "Archivé", academic: "Accès pédagogique", finance: "Accès financier", saved: "Le dossier a été mis à jour.", failed: "Impossible d’enregistrer le dossier. Vérifiez les informations.", timezoneError: "Saisissez un fuseau IANA valide, par exemple Asia/Riyadh.", statusLabel: "Statut" },
} as const;

const inputClass = "mt-1 min-h-11 w-full rounded-xl border border-[#D6E8F1] bg-white px-3 text-sm text-[#001A3F] outline-none focus-visible:ring-2 focus-visible:ring-[#35B8FF]";
const sectionClass = "min-w-0 border-t border-[#DCEAF1] pt-5";

export default async function StudentProfilePage({ params, searchParams }: { params: Promise<{ lang: string; studentId: string }>; searchParams: Promise<{ saved?: string; error?: string }> }) {
  const { lang: rawLang, studentId } = await params;
  if (!isLang(rawLang)) notFound();
  const id = z.uuid().safeParse(studentId);
  if (!id.success) notFound();
  await requireRole(rawLang, "admin");
  const lang = rawLang;
  const text = copy[lang];
  const db = createSupabaseAdminClient();
  const { data: student, error: studentError } = await db.from("students").select("id,display_name,student_number,preferred_language,timezone,status,auth_user_id,created_at").eq("id", id.data).maybeSingle();
  if (!student && !studentError) notFound();
  if (!student) return <><PageHeading title={text.details}/><Notice tone="red">{text.failed}</Notice></>;

  const [privateDetails, guardianLinks, enrollments, attendance, progress, search] = await Promise.all([
    db.from("student_private_details").select("legal_name,date_of_birth").eq("student_id", student.id).maybeSingle(),
    db.from("guardian_student_relationships").select("id,guardian_user_id,relationship,can_view_academic,can_view_financial,revoked_at").eq("student_id", student.id).order("created_at", { ascending: false }),
    db.from("enrollments").select("id,class_group_id,status,enrolled_at").eq("student_id", student.id).order("enrolled_at", { ascending: false }),
    db.from("attendance").select("id,session_id,status,recorded_at").eq("student_id", student.id).order("recorded_at", { ascending: false }).limit(8),
    db.from("progress_entries").select("id,skill,score,note,created_at").eq("student_id", student.id).order("created_at", { ascending: false }).limit(8),
    searchParams,
  ]);
  const guardians = guardianLinks.data ?? [];
  const enrollmentsData = enrollments.data ?? [];
  const sessionIds = [...new Set((attendance.data ?? []).map((row) => row.session_id))];
  const classIds = [...new Set(enrollmentsData.map((row) => row.class_group_id))];
  const [profiles, groups, sessions] = await Promise.all([
    guardians.length ? db.from("profiles").select("id,display_name").in("id", guardians.map((link) => link.guardian_user_id)) : Promise.resolve({ data: [] }),
    classIds.length ? db.from("class_groups").select("id,name").in("id", classIds) : Promise.resolve({ data: [] }),
    sessionIds.length ? db.from("class_sessions").select("id,class_group_id,starts_at").in("id", sessionIds) : Promise.resolve({ data: [] }),
  ]);
  const sessionGroupIds = [...new Set((sessions.data ?? []).map((session) => session.class_group_id))];
  const sessionGroups = sessionGroupIds.length ? await db.from("class_groups").select("id,name").in("id", sessionGroupIds) : { data: [] };
  const guardianNames = new Map((profiles.data ?? []).map((profile) => [profile.id, profile.display_name]));
  const groupNames = new Map([...(groups.data ?? []), ...(sessionGroups.data ?? [])].map((group) => [group.id, group.name]));
  const sessionMap = new Map((sessions.data ?? []).map((session) => [session.id, session]));
  const statusText = student.status === "active" ? text.active : student.status === "inactive" ? text.inactive : text.archived;
  return <>
    <PageHeading title={student.display_name} description={`${text.statusLabel}: ${statusText}`} action={<Link href={`/${lang}/portal/admin/students`} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-[#087CC1] hover:bg-white focus-visible:outline-2 focus-visible:outline-[#35B8FF]"><ArrowLeft aria-hidden="true" className="h-4 w-4"/>{text.back}</Link>}/>
    {search.saved && <div className="mb-5"><Notice>{text.saved}</Notice></div>}
    {search.error === "timezone_invalid" ? <div className="mb-5"><Notice tone="red">{text.timezoneError}</Notice></div> : search.error && <div className="mb-5"><Notice tone="red">{text.failed}</Notice></div>}
    {(privateDetails.error || guardianLinks.error || enrollments.error || attendance.error || progress.error) && <div className="mb-5"><Notice tone="amber">Some profile information could not be loaded.</Notice></div>}

    <form action={updateStudentProfileAction} className="grid gap-x-6 gap-y-4 border-y border-[#DCEAF1] bg-white px-4 py-5 sm:grid-cols-2 sm:px-6">
      <input type="hidden" name="lang" value={lang}/><input type="hidden" name="student_id" value={student.id}/>
      <h2 className="text-base font-bold sm:col-span-2">{text.details}</h2>
      <label className="text-xs font-semibold text-[#526F81]">{text.preferred}<input name="display_name" required minLength={2} maxLength={100} defaultValue={student.display_name} className={inputClass}/></label>
      <label className="text-xs font-semibold text-[#526F81]">{text.number}<input name="student_number" maxLength={40} defaultValue={student.student_number ?? ""} className={inputClass}/></label>
      <label className="text-xs font-semibold text-[#526F81]">{text.language}<select name="preferred_language" defaultValue={student.preferred_language} className={inputClass}><option value="en">English</option><option value="ar">العربية</option><option value="fr">Français</option></select></label>
      <label className="text-xs font-semibold text-[#526F81]">{text.timezone}<input name="timezone" required maxLength={80} defaultValue={student.timezone} className={inputClass}/></label>
      <label className="text-xs font-semibold text-[#526F81]">{text.status}<select name="status" defaultValue={student.status} className={inputClass}><option value="active">{text.active}</option><option value="inactive">{text.inactive}</option><option value="archived">{text.archived}</option></select></label>
      <div className="flex items-end sm:col-span-2"><button className="min-h-11 rounded-xl bg-[#001A3F] px-5 text-sm font-bold text-white transition hover:bg-[#06274D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF]">{text.save}</button></div>
    </form>

    <section className="mt-8 grid gap-x-8 gap-y-8 lg:grid-cols-2">
      <div className={sectionClass}><div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-[#1680B9]" aria-hidden="true"/><h2 className="font-bold">{text.classes}</h2></div>{enrollmentsData.length ? <ul className="mt-3 divide-y divide-[#E7F0F4]">{enrollmentsData.map((enrollment) => <li key={enrollment.id} className="flex items-center justify-between gap-3 py-3"><span className="min-w-0"><span className="block truncate text-sm font-semibold">{groupNames.get(enrollment.class_group_id) ?? "Class"}</span><time dateTime={enrollment.enrolled_at} className="mt-1 block text-xs text-[#718A9A]">{new Intl.DateTimeFormat(lang, { dateStyle: "medium" }).format(new Date(enrollment.enrolled_at))}</time></span><span className="text-xs font-semibold text-[#607C8E]">{enrollment.status}</span></li>)}</ul> : <p className="py-4 text-sm text-[#718A9A]">{text.noClasses}</p>}</div>
      <div className={sectionClass}><div className="flex items-center gap-2"><UsersRound className="h-4 w-4 text-[#1680B9]" aria-hidden="true"/><h2 className="font-bold">{text.guardians}</h2><Link href={`/${lang}/portal/admin/guardians`} className="ms-auto min-h-10 rounded-lg px-2 text-xs font-bold text-[#087CC1] hover:bg-white focus-visible:outline-2 focus-visible:outline-[#35B8FF]">{text.manage}</Link></div>{guardians.length ? <ul className="mt-3 divide-y divide-[#E7F0F4]">{guardians.map((link) => <li key={link.id} className="flex flex-wrap items-center justify-between gap-3 py-3"><span className="min-w-0"><span className="block truncate text-sm font-semibold">{guardianNames.get(link.guardian_user_id) ?? "Guardian"}</span><span className="mt-1 block text-xs text-[#718A9A]">{link.relationship}</span></span><span className="text-end text-[10px] leading-5 text-[#718A9A]">{link.revoked_at ? "Revoked" : text.academic}{link.can_view_financial && !link.revoked_at ? ` · ${text.finance}` : ""}</span></li>)}</ul> : <p className="py-4 text-sm text-[#718A9A]">{text.noGuardians}</p>}</div>
      <div className={sectionClass}><div className="flex items-center gap-2"><CalendarCheck2 className="h-4 w-4 text-[#1680B9]" aria-hidden="true"/><h2 className="font-bold">{text.attendance}</h2></div>{attendance.data?.length ? <ul className="mt-3 divide-y divide-[#E7F0F4]">{attendance.data.map((row) => { const session = sessionMap.get(row.session_id); return <li key={row.id} className="flex items-center justify-between gap-3 py-3"><span className="min-w-0"><span className="block truncate text-sm font-semibold">{session ? groupNames.get(session.class_group_id) ?? "Class" : "Class"}</span><time dateTime={row.recorded_at} className="mt-1 block text-xs text-[#718A99]">{new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeStyle: "short", timeZone: student.timezone }).format(new Date(row.recorded_at))}</time></span><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${row.status === "absent" ? "bg-red-50 text-red-700" : "bg-[#E8F7FF] text-[#087CC1]"}`}>{row.status}</span></li>; })}</ul> : <p className="py-4 text-sm text-[#718A9A]">{text.noAttendance}</p>}</div>
      <div className={sectionClass}><h2 className="font-bold">{text.progress}</h2>{progress.data?.length ? <ol className="mt-3 divide-y divide-[#E7F0F4]">{progress.data.map((entry) => <li key={entry.id} className="py-3"><div className="flex items-baseline justify-between gap-3"><h3 className="text-sm font-semibold">{entry.skill}</h3><span className="text-xs font-bold text-[#087CC1]">{entry.score === null ? "—" : `${entry.score}%`}</span></div>{entry.note && <p className="mt-1 text-sm leading-6 text-[#607C8E]">{entry.note}</p>}<time dateTime={entry.created_at} className="mt-1 block text-[10px] text-[#8299A8]">{new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeZone: student.timezone }).format(new Date(entry.created_at))}</time></li>)}</ol> : <p className="py-4 text-sm text-[#718A9A]">{text.noProgress}</p>}</div>
      <div className={`${sectionClass} lg:col-span-2`}><dl className="grid gap-4 sm:grid-cols-3"><div><dt className="text-xs font-semibold text-[#718A9A]">{text.legal}</dt><dd className="mt-1 text-sm font-medium">{privateDetails.data?.legal_name ?? "—"}</dd></div><div><dt className="text-xs font-semibold text-[#718A9A]">{text.dob}</dt><dd className="mt-1 text-sm font-medium">{privateDetails.data?.date_of_birth ?? "—"}</dd></div><div><dt className="text-xs font-semibold text-[#718A9A]">{text.number}</dt><dd className="mt-1 text-sm font-medium">{student.student_number ?? "—"}</dd></div></dl></div>
    </section>
  </>;
}
