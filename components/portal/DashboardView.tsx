import Link from "next/link";
import { Activity, ArrowUpRight, BookOpen, CalendarClock, CheckCheck, ClipboardCheck, CreditCard, GraduationCap, UsersRound, type LucideIcon } from "lucide-react";
import type { Role } from "@/lib/supabase/database.types";
import type { AdminAttention, AdminOverview, DashboardData } from "@/lib/portal/dashboard";
import { portalCopy } from "@/lib/portal/labels";
import { MetricCard, Notice, PageHeading } from "./PortalShell";

const metricLabels = {
  en: { "Total students": "Total students", "Active students": "Active students", "Teachers & staff": "Teachers & staff", "Active classes": "Active classes", "Attendance alerts": "Absence alerts", "Outstanding invoices": "Outstanding invoices", "Assigned classes": "Assigned classes", "Students": "Students", "Upcoming lessons": "Upcoming lessons", "Attendance to complete": "Attendance to complete", "Published assignments": "Published assignments", "Children": "Children", "Attendance records": "Attendance records", "Progress updates": "Progress updates", "Enrolled classes": "Enrolled classes" },
  ar: { "Total students": "إجمالي الطلاب", "Active students": "الطلاب النشطون", "Teachers & staff": "المعلمون والموظفون", "Active classes": "الفصول النشطة", "Attendance alerts": "تنبيهات الغياب", "Outstanding invoices": "الفواتير المستحقة", "Assigned classes": "الفصول المسندة", "Students": "الطلاب", "Upcoming lessons": "الحصص القادمة", "Attendance to complete": "حضور يحتاج إلى تسجيل", "Published assignments": "الواجبات المنشورة", "Children": "الأبناء", "Attendance records": "سجلات الحضور", "Progress updates": "تحديثات التقدم", "Enrolled classes": "الفصول المسجل بها" },
  fr: { "Total students": "Nombre total d’élèves", "Active students": "Élèves actifs", "Teachers & staff": "Enseignants et équipe", "Active classes": "Classes actives", "Attendance alerts": "Alertes d’absence", "Outstanding invoices": "Factures impayées", "Assigned classes": "Classes attribuées", "Students": "Élèves", "Upcoming lessons": "Cours à venir", "Attendance to complete": "Présences à enregistrer", "Published assignments": "Devoirs publiés", "Children": "Enfants", "Attendance records": "Présences enregistrées", "Progress updates": "Mises à jour des progrès", "Enrolled classes": "Classes suivies" },
} as const;

const hints: Record<Role, Record<"en" | "ar" | "fr", string>> = {
  admin: { en: "Your academy at a glance, with today’s priorities up front.", ar: "نظرة سريعة على الأكاديمية وأولويات اليوم.", fr: "Un aperçu de l’académie avec les priorités du jour." },
  teacher: { en: "Your assigned classes and the work that needs your attention.", ar: "فصولك والمهام التي تحتاج إلى متابعتك.", fr: "Vos classes et les tâches à suivre." },
  parent: { en: "A clear view of your linked children’s learning.", ar: "نظرة واضحة على تعلم أبنائك المرتبطين بحسابك.", fr: "Un aperçu clair des apprentissages de vos enfants." },
  adult_student: { en: "Your classes, learning progress, and next steps.", ar: "فصولك وتقدمك وخطواتك التالية.", fr: "Vos cours, vos progrès et les prochaines étapes." },
};

const adminCopy = {
  en: { today: "Today at Musbak", attendance: "Attendance", attention: "Needs attention", activity: "Recent activity", quick: "Quick access", noSessions: "No classes are scheduled for today.", noAttention: "Nothing needs immediate follow-up.", noActivity: "Academy activity will appear here as records are updated.", activeStudents: "Active learners", staff: "Teachers & staff", lessons: "Lessons today", attendanceRate: "Attendance rate", total: "learners in total", of: "of", marked: "marked", noMarks: "No attendance recorded yet", due: "Open", present: "Present", late: "Late", absent: "Absent", excused: "Excused", students: "Students", teachers: "Teachers & staff", classes: "Classes", takeAttendance: "Attendance", assignments: "Assignments", payments: "Payments", invitations: "Invitations", view: "View all", completed: "Completed", scheduled: "Scheduled", starts: "Starts", ends: "Ends", learners: "learners", activityBy: "by", activitySystem: "Academy system", added: "added", updated: "updated", removed: "removed", other: "changed", system: "system", failed: "Some overview data could not be loaded. Affected sections are marked unavailable." },
  ar: { today: "اليوم في مسـبك", attendance: "الحضور", attention: "يحتاج إلى متابعة", activity: "النشاط الأخير", quick: "وصول سريع", noSessions: "لا توجد حصص مجدولة اليوم.", noAttention: "لا توجد مهام عاجلة للمتابعة.", noActivity: "سيظهر نشاط الأكاديمية هنا عند تحديث السجلات.", activeStudents: "الطلاب النشطون", staff: "المعلمون والموظفون", lessons: "حصص اليوم", attendanceRate: "نسبة الحضور", total: "إجمالي الطلاب", of: "من", marked: "مسجل", noMarks: "لم يسجل الحضور بعد", due: "مفتوح", present: "حاضر", late: "متأخر", absent: "غائب", excused: "بعذر", students: "الطلاب", teachers: "المعلمون والموظفون", classes: "الفصول", takeAttendance: "الحضور", assignments: "الواجبات", payments: "المدفوعات", invitations: "الدعوات", view: "عرض الكل", completed: "مكتملة", scheduled: "مجدولة", starts: "تبدأ", ends: "تنتهي", learners: "طلاب", activityBy: "بواسطة", activitySystem: "نظام الأكاديمية", added: "أضاف", updated: "حدّث", removed: "حذف", other: "غيّر", system: "النظام", failed: "تعذر تحميل بعض بيانات النظرة العامة. تم تحديد الأقسام المتأثرة." },
  fr: { today: "Aujourd’hui à Musbak", attendance: "Présences", attention: "À suivre", activity: "Activité récente", quick: "Accès rapide", noSessions: "Aucun cours n’est prévu aujourd’hui.", noAttention: "Aucun suivi urgent pour le moment.", noActivity: "L’activité de l’académie apparaîtra ici lors des mises à jour.", activeStudents: "Élèves actifs", staff: "Enseignants et équipe", lessons: "Cours aujourd’hui", attendanceRate: "Taux de présence", total: "élèves au total", of: "sur", marked: "enregistrés", noMarks: "Aucune présence enregistrée", due: "Ouvert", present: "Présents", late: "En retard", absent: "Absents", excused: "Excusés", students: "Élèves", teachers: "Équipe", classes: "Classes", takeAttendance: "Présences", assignments: "Devoirs", payments: "Paiements", invitations: "Invitations", view: "Tout voir", completed: "Terminées", scheduled: "Planifiées", starts: "Début", ends: "Fin", learners: "élèves", activityBy: "par", activitySystem: "Système de l’académie", added: "a ajouté", updated: "a modifié", removed: "a supprimé", other: "a changé", system: "système", failed: "Certaines données n’ont pas pu être chargées. Les sections concernées sont signalées." },
} as const;

const attentionLabels: Record<"en" | "ar" | "fr", Record<AdminAttention["kind"], string>> = {
  en: { attendance: "Attendance still missing", grading: "Submissions to review", payments: "Overdue invoices", invitations: "Teacher invitations awaiting activation" },
  ar: { attendance: "حضور لم يكتمل تسجيله", grading: "إجابات بانتظار المراجعة", payments: "فواتير متأخرة", invitations: "دعوات معلمين بانتظار التفعيل" },
  fr: { attendance: "Présences à compléter", grading: "Travaux à corriger", payments: "Factures en retard", invitations: "Invitations d’enseignants en attente" },
};

const activityTables: Record<"en" | "ar" | "fr", Record<string, string>> = {
  en: { students: "student record", student_private_details: "student details", invitations: "invitation", user_roles: "role assignment", guardian_student_relationships: "guardian relationship", enrollments: "enrollment", attendance: "attendance record", progress_entries: "progress update", invoices: "invoice", payments: "payment", learning_materials: "learning material" },
  ar: { students: "سجل طالب", student_private_details: "بيانات طالب", invitations: "دعوة", user_roles: "تعيين دور", guardian_student_relationships: "صلة ولي الأمر", enrollments: "تسجيل", attendance: "سجل حضور", progress_entries: "تحديث تقدم", invoices: "فاتورة", payments: "دفعة", learning_materials: "مادة تعليمية" },
  fr: { students: "dossier élève", student_private_details: "informations de l’élève", invitations: "invitation", user_roles: "attribution de rôle", guardian_student_relationships: "lien de tuteur", enrollments: "inscription", attendance: "présence", progress_entries: "mise à jour des progrès", invoices: "facture", payments: "paiement", learning_materials: "ressource pédagogique" },
};

const quickLinks: Record<"en" | "ar" | "fr", { href: string; key: "students" | "teachers" | "classes" | "takeAttendance" | "assignments" | "payments"; icon: LucideIcon }[]> = {
  en: [{ href: "students", key: "students", icon: UsersRound }, { href: "staff", key: "teachers", icon: GraduationCap }, { href: "classes", key: "classes", icon: BookOpen }, { href: "attendance", key: "takeAttendance", icon: CheckCheck }, { href: "assignments", key: "assignments", icon: ClipboardCheck }, { href: "payments", key: "payments", icon: CreditCard }],
  ar: [{ href: "students", key: "students", icon: UsersRound }, { href: "staff", key: "teachers", icon: GraduationCap }, { href: "classes", key: "classes", icon: BookOpen }, { href: "attendance", key: "takeAttendance", icon: CheckCheck }, { href: "assignments", key: "assignments", icon: ClipboardCheck }, { href: "payments", key: "payments", icon: CreditCard }],
  fr: [{ href: "students", key: "students", icon: UsersRound }, { href: "staff", key: "teachers", icon: GraduationCap }, { href: "classes", key: "classes", icon: BookOpen }, { href: "attendance", key: "takeAttendance", icon: CheckCheck }, { href: "assignments", key: "assignments", icon: ClipboardCheck }, { href: "payments", key: "payments", icon: CreditCard }],
};

function AdminOverviewView({ lang, name, data }: { lang: "en" | "ar" | "fr"; name: string; data: AdminOverview }) {
  const c = adminCopy[lang];
  const locale = lang === "ar" ? "ar-SA" : lang === "fr" ? "fr-FR" : "en-GB";
  const now = new Date();
  const date = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", timeZone: data.timezone }).format(now);
  const timeFormat = new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone: data.timezone });
  const activeShare = data.totalStudents ? Math.round(data.activeStudents / data.totalStudents * 100) : 0;
  const sectionErrors = new Set(data.errors);
  const unavailableAttention = ([
    ["attendance", "attendance", "/portal/admin/attendance"],
    ["grading", "grading", "/portal/admin/assignments"],
    ["overdueInvoices", "payments", "/portal/admin/payments"],
    ["invitations", "invitations", "/portal/admin/staff"],
  ] as const).filter(([errorKey, kind]) => sectionErrors.has(errorKey) || (kind === "attendance" && sectionErrors.has("enrollments")) || (kind === "grading" && sectionErrors.has("assignments")));
  const metricData = [
    { label: c.activeStudents, value: sectionErrors.has("activeStudents") ? "—" : data.activeStudents.toLocaleString(locale), detail: sectionErrors.has("students") ? c.failed : `${activeShare}% ${c.total} · ${data.totalStudents.toLocaleString(locale)}`, icon: UsersRound },
    { label: c.staff, value: sectionErrors.has("staff") ? "—" : data.activeStaff.toLocaleString(locale), detail: lang === "ar" ? "الحسابات النشطة" : lang === "fr" ? "comptes actifs" : "active accounts", icon: GraduationCap },
    { label: c.lessons, value: sectionErrors.has("sessions") ? "—" : data.sessionsToday.length.toLocaleString(locale), detail: date, icon: CalendarClock },
    { label: c.attendanceRate, value: sectionErrors.has("attendance") ? "—" : data.attendance.rate === null ? "—" : `${data.attendance.rate}%`, detail: sectionErrors.has("attendance") ? c.failed : data.attendance.rate === null ? c.noMarks : `${data.attendance.present + data.attendance.late} ${c.of} ${data.attendance.present + data.attendance.late + data.attendance.absent} ${c.marked}`, icon: Activity },
  ];
  const attention = data.attention.filter((item) => item.count > 0);
  const activityVerb = (action: string) => action === "insert" ? c.added : action === "update" ? c.updated : action === "delete" ? c.removed : c.other;
  return <>
    <PageHeading title={portalCopy[lang].adminDashboard} description={`${portalCopy[lang].welcome}, ${name.split(" ")[0]}. ${hints.admin[lang]}`} action={<div className="flex flex-col items-start text-xs font-medium text-[#718A9A] sm:items-end sm:text-sm"><p>{date}</p><p className="break-all text-[10px]">{data.timezone}</p></div>} />
    {data.errors.length > 0 && <div className="mb-5"><Notice tone="amber">{c.failed}</Notice></div>}
    <section aria-label={lang === "ar" ? "مؤشرات الأكاديمية" : lang === "fr" ? "Indicateurs de l’académie" : "Academy indicators"} className="grid grid-cols-2 border-y border-[#DCEAF1] bg-white sm:grid-cols-4">
      {metricData.map(({ label, value, detail, icon: Icon }, index) => <article key={label} className={`min-w-0 px-3 py-4 sm:px-5 sm:py-5 ${index % 2 === 1 ? "border-s border-[#E7F0F4]" : ""} ${index > 1 ? "border-t border-[#E7F0F4] sm:border-t-0" : ""} ${index === 2 ? "sm:border-s" : ""}`}>
        <div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold leading-5 text-[#718A9A]">{label}</p><Icon className="h-4 w-4 shrink-0 text-[#1680B9]" aria-hidden="true" /></div>
        <p className="mt-2 text-2xl font-bold tracking-tight text-[#001A3F] sm:text-3xl">{value}</p>
        <p className="mt-1 truncate text-[11px] leading-5 text-[#8299A8]">{detail}</p>
      </article>)}
    </section>

    <div className="mt-7 grid items-start gap-7 xl:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.85fr)]">
      <section aria-labelledby="today-title" className="min-w-0">
        <div className="flex items-end justify-between gap-3 border-b border-[#DCEAF1] pb-3"><h2 id="today-title" className="text-lg font-bold">{c.today}</h2><Link href={`/${lang}/portal/admin/classes`} className="min-h-10 shrink-0 inline-flex items-center gap-1 rounded-lg px-2 text-xs font-bold text-[#087CC1] hover:bg-[#EAF7FF] focus-visible:outline-2 focus-visible:outline-[#35B8FF]">{c.view}<ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></Link></div>
        {sectionErrors.has("sessions") ? <div className="py-5"><Notice tone="red">{portalCopy[lang].loadingError}</Notice></div> : data.sessionsToday.length === 0 ? <p className="py-8 text-sm text-[#718A9A]">{c.noSessions}</p> : <ol className="divide-y divide-[#E7F0F4]">
          {data.sessionsToday.map((session) => {
            const ended = new Date(session.ends_at).getTime() < now.getTime();
            return <li key={session.id} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 py-4 sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:gap-4">
              <div className="pt-0.5 text-start"><time dateTime={session.starts_at} className="block text-sm font-bold tabular-nums">{timeFormat.format(new Date(session.starts_at))}</time><time dateTime={session.ends_at} className="mt-1 block text-[10px] tabular-nums text-[#8299A8]">{c.ends} {timeFormat.format(new Date(session.ends_at))}</time></div>
              <div className="min-w-0"><p className="truncate text-sm font-bold text-[#001A3F]">{session.group}</p><p className="mt-1 truncate text-xs text-[#718A9A]">{session.teacher ?? c.staff} · {session.students} {c.learners}</p></div>
              <span className={`col-start-2 mt-1 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] font-bold sm:col-start-auto sm:mt-0 ${ended || session.status === "completed" ? "bg-[#F1F6F8] text-[#607C8E]" : "bg-[#E8F7FF] text-[#087CC1]"}`}>{ended || session.status === "completed" ? c.completed : c.scheduled}</span>
            </li>;
          })}
        </ol>}
        {!sectionErrors.has("attendance") && data.attendance.marked > 0 && <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#E7F0F4] pt-4 text-xs text-[#718A9A]"><span><i className="me-1.5 inline-block h-2 w-2 rounded-full bg-[#35B8FF]" />{c.present} {data.attendance.present}</span><span><i className="me-1.5 inline-block h-2 w-2 rounded-full bg-[#90B6CB]" />{c.late} {data.attendance.late}</span><span><i className="me-1.5 inline-block h-2 w-2 rounded-full bg-[#D96B6B]" />{c.absent} {data.attendance.absent}</span><span><i className="me-1.5 inline-block h-2 w-2 rounded-full bg-[#C3D0D7]" />{c.excused} {data.attendance.excused}</span></div>}
      </section>

      <section aria-labelledby="attention-title" className="min-w-0 xl:border-s xl:border-[#DCEAF1] xl:ps-6">
        <div className="flex items-center justify-between gap-3 border-b border-[#DCEAF1] pb-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1680B9]">MUSBAK</p><h2 id="attention-title" className="mt-1 text-lg font-bold">{c.attention}</h2></div><span aria-label={`${attention.length} ${c.due.toLowerCase()}`} className="text-xs tabular-nums text-[#8299A8]">{attention.length}</span></div>
        {attention.length === 0 && unavailableAttention.length === 0 ? <p className="py-8 text-sm text-[#718A9A]">{c.noAttention}</p> : <ul className="divide-y divide-[#E7F0F4]">{attention.map((item) => <li key={item.kind}><Link href={`/${lang}${item.href}`} className="group flex min-h-[4.25rem] items-center justify-between gap-3 py-3 focus-visible:outline-2 focus-visible:outline-[#35B8FF]"><span className="text-sm font-medium leading-5 text-[#31566C] group-hover:text-[#001A3F]">{attentionLabels[lang][item.kind]}</span><span className={`shrink-0 text-sm font-bold tabular-nums ${item.kind === "attendance" || item.kind === "payments" ? "text-[#B44B4B]" : "text-[#087CC1]"}`}>{item.count}</span></Link></li>)}{unavailableAttention.map(([errorKey, kind, href]) => <li key={errorKey}><Link href={`/${lang}${href}`} className="group flex min-h-[4.25rem] items-center justify-between gap-3 py-3 focus-visible:outline-2 focus-visible:outline-[#35B8FF]"><span className="text-sm font-medium leading-5 text-[#31566C] group-hover:text-[#001A3F]">{attentionLabels[lang][kind]}</span><span className="shrink-0 text-sm font-bold text-[#9A4C4C]">—</span></Link></li>)}</ul>}
      </section>
    </div>

    <section aria-labelledby="quick-title" className="mt-8 border-y border-[#DCEAF1] py-4">
      <h2 id="quick-title" className="mb-3 text-xs font-bold uppercase tracking-[0.13em] text-[#718A9A]">{c.quick}</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">{quickLinks[lang].map(({ href, key, icon: Icon }) => <Link key={href} href={`/${lang}/portal/admin/${href}`} className="flex min-h-12 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-[#31566C] transition hover:bg-white hover:text-[#087CC1] focus-visible:outline-2 focus-visible:outline-[#35B8FF]"><Icon className="h-4 w-4 shrink-0 text-[#1680B9]" aria-hidden="true"/><span>{c[key]}</span><ArrowUpRight className="ms-auto h-3.5 w-3.5 shrink-0 text-[#9BB0BC]" aria-hidden="true"/></Link>)}</div>
    </section>

    <section aria-labelledby="activity-title" className="mt-7 max-w-4xl">
      <div className="flex items-center gap-2 border-b border-[#DCEAF1] pb-3"><Activity className="h-4 w-4 text-[#1680B9]" aria-hidden="true"/><h2 id="activity-title" className="text-base font-bold">{c.activity}</h2></div>
      {sectionErrors.has("activity") ? <p className="py-5 text-sm text-[#9A4C4C]">{portalCopy[lang].loadingError}</p> : data.activity.length === 0 ? <p className="py-5 text-sm text-[#718A9A]">{c.noActivity}</p> : <ol className="divide-y divide-[#E7F0F4]">{data.activity.map((item) => <li key={item.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 text-sm"><p className="min-w-0 text-[#31566C]"><span className="font-semibold text-[#001A3F]">{item.actor ?? c.activitySystem}</span>{" "}{activityVerb(item.action)}{" "}{activityTables[lang][item.target_table] ?? item.target_table.replaceAll("_", " ")}</p><time dateTime={item.created_at} className="shrink-0 text-xs text-[#8299A8]">{new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short", timeZone: data.timezone }).format(new Date(item.created_at))}</time></li>)}</ol>}
    </section>
  </>;
}

export function DashboardView({ lang, role, name, data }: { lang: "en" | "ar" | "fr"; role: Role; name: string; data: DashboardData }) {
  if (role === "admin" && data.admin) return <AdminOverviewView lang={lang} name={name} data={data.admin} />;
  const t = portalCopy[lang];
  const displayName = name.split(" ")[0];
  const title = role === "admin" ? t.adminDashboard : role === "teacher" ? t.teacherDashboard : role === "parent" ? t.parentDashboard : t.studentDashboard;
  const locale = lang === "ar" ? "ar-SA" : lang === "fr" ? "fr-FR" : "en-GB";
  const activeSummary = lang === "ar" ? "بيانات الطلاب النشطين" : lang === "fr" ? "Données des élèves actifs" : "Active learner records";
  return <>
    <PageHeading title={title} description={`${t.welcome}, ${displayName}. ${hints[role][lang]}`} />
    {data.error && <div className="mb-6"><Notice tone="red">{t.loadingError}</Notice></div>}
    <section aria-label={t.dashboard} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{data.metrics.map((metric, index) => <MetricCard key={metric.label} label={metricLabels[lang][metric.label as keyof typeof metricLabels.en] ?? metric.label} value={metric.value} icon={( ["users", "graduation", "calendar", "check", "credit", "trend"] as const)[index % 6]} />)}</section>
    {role === "parent" && data.children && <section className="mt-8"><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">{t.children}</h2></div>{data.children.length ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{data.children.map((child) => <Link key={child.id} href={`/${lang}/portal/parent/children/${child.id}`} className="group flex min-h-24 items-center justify-between rounded-2xl border border-[#DDEBF2] bg-white p-5 shadow-[0_8px_25px_rgba(0,40,70,0.04)] focus-visible:outline-2 focus-visible:outline-[#35B8FF]"><span><span className="block text-xs font-semibold text-[#7990A0]">{t.progress}</span><span className="mt-1 block text-lg font-bold">{child.display_name}</span></span><ArrowUpRight className="h-4 w-4 text-[#1680B9] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>)}</div> : <Notice>{t.noData}</Notice>}</section>}
    <section className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-2xl border border-[#E4EEF3] bg-white p-5 shadow-[0_8px_25px_rgba(0,40,70,0.04)] sm:p-6"><div className="flex items-center justify-between"><h2 className="text-base font-bold">{t.upcoming}</h2><CalendarClock className="h-4 w-4 text-[#1680B9]" /></div>{data.upcoming.length ? <ul className="mt-4 divide-y divide-[#EAF1F5]">{data.upcoming.map((session) => <li key={session.id} className="flex flex-wrap items-center justify-between gap-3 py-3"><span className="min-w-0"><span className="block truncate text-sm font-bold">{session.group}</span><time dateTime={session.starts_at} className="mt-1 block text-xs text-[#728A99]">{new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(new Date(session.starts_at))} UTC</time></span><span className="rounded-full bg-[#E8F7FF] px-3 py-1 text-[11px] font-bold text-[#087CC1]">{t.today}</span></li>)}</ul> : <p className="mt-4 rounded-xl bg-[#F7FBFD] p-4 text-sm text-[#718A99]">{data.error ? t.loadingError : t.empty}</p>}</div>
      <div className="rounded-2xl bg-[#001A3F] p-6 text-white shadow-[0_12px_30px_rgba(0,26,63,0.12)]"><span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#72CFFF]">MUSBAK</span><h2 className="mt-3 text-xl font-bold">{role === "teacher" ? t.attention : role === "admin" ? t.learners : t.progress}</h2><p className="mt-2 text-sm leading-6 text-white/65">{data.error ? t.loadingError : activeSummary}</p></div>
    </section>
  </>;
}
