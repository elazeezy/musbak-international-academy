import type { Role } from "@/lib/supabase/database.types";

export type PortalSection = { href: string; en: string; ar: string; fr: string };
export const portalCopy = {
  en: { dashboard: "Overview", welcome: "Welcome back", signOut: "Sign out", menu: "Open navigation", close: "Close navigation", more: "More", upcoming: "Upcoming classes", learners: "Learners", staff: "Teachers & staff", classes: "Active classes", attention: "Needs attention", empty: "Nothing needs your attention right now.", noData: "No records yet", loadingError: "We couldn’t load this information. Check your connection or contact an administrator.", viewAll: "View all", today: "Today", children: "Your children", attendance: "Attendance", progress: "Progress", assignments: "Assignments", materials: "Learning materials", students: "Students", guardians: "Parents & guardians", people: "People", courses: "Courses", classesNav: "Classes", schedule: "Schedule", invoices: "Payments", reports: "Reports", settings: "Settings", notifications: "Notifications", teacherDashboard: "Teacher home", parentDashboard: "Family home", studentDashboard: "My learning", adminDashboard: "Academy overview", search: "Search", role: { admin: "Academy admin", teacher: "Teacher", parent: "Parent / guardian", adult_student: "Adult student" } },
  ar: { dashboard: "نظرة عامة", welcome: "مرحبًا بعودتك", signOut: "تسجيل الخروج", menu: "فتح قائمة التنقل", close: "إغلاق قائمة التنقل", more: "المزيد", upcoming: "الحصص القادمة", learners: "الطلاب", staff: "المعلمون والموظفون", classes: "الفصول النشطة", attention: "يحتاج إلى متابعة", empty: "لا يوجد ما يحتاج إلى متابعة الآن.", noData: "لا توجد سجلات بعد", loadingError: "تعذر تحميل هذه المعلومات. تحقق من الاتصال أو تواصل مع الإدارة.", viewAll: "عرض الكل", today: "اليوم", children: "أبناؤك", attendance: "الحضور", progress: "التقدم", assignments: "الواجبات", materials: "مواد التعلم", students: "الطلاب", guardians: "أولياء الأمور", people: "الأشخاص", courses: "الدورات", classesNav: "الفصول", schedule: "الجدول", invoices: "المدفوعات", reports: "التقارير", settings: "الإعدادات", notifications: "الإشعارات", teacherDashboard: "بوابة المعلم", parentDashboard: "بوابة الأسرة", studentDashboard: "تعلمي", adminDashboard: "نظرة عامة على الأكاديمية", search: "بحث", role: { admin: "إدارة الأكاديمية", teacher: "معلم", parent: "ولي أمر", adult_student: "طالب بالغ" } },
  fr: { dashboard: "Vue d’ensemble", welcome: "Ravi de vous revoir", signOut: "Se déconnecter", menu: "Ouvrir la navigation", close: "Fermer la navigation", more: "Plus", upcoming: "Cours à venir", learners: "Élèves", staff: "Enseignants et équipe", classes: "Classes actives", attention: "À suivre", empty: "Rien ne demande votre attention pour le moment.", noData: "Aucun enregistrement", loadingError: "Impossible de charger ces informations. Vérifiez la connexion ou contactez l’administration.", viewAll: "Tout voir", today: "Aujourd’hui", children: "Vos enfants", attendance: "Présence", progress: "Progrès", assignments: "Devoirs", materials: "Ressources pédagogiques", students: "Élèves", guardians: "Parents et tuteurs", people: "Personnes", courses: "Cours", classesNav: "Classes", schedule: "Planning", invoices: "Paiements", reports: "Rapports", settings: "Paramètres", notifications: "Notifications", teacherDashboard: "Espace enseignant", parentDashboard: "Espace famille", studentDashboard: "Mon apprentissage", adminDashboard: "Vue de l’académie", search: "Rechercher", role: { admin: "Administration", teacher: "Enseignant", parent: "Parent / tuteur", adult_student: "Étudiant adulte" } },
} as const;

export function portalSections(role: Role, lang: "en" | "ar" | "fr"): PortalSection[] {
  const labels = portalCopy[lang];
  const sections: Record<Role, PortalSection[]> = {
    admin: [
      { href: "/portal/admin", en: "Overview", ar: "نظرة عامة", fr: "Vue d’ensemble" },
      { href: "/portal/admin/students", en: "Students", ar: "الطلاب", fr: "Élèves" },
      { href: "/portal/admin/guardians", en: "Parents & guardians", ar: "أولياء الأمور", fr: "Parents et tuteurs" },
      { href: "/portal/admin/staff", en: "Teachers & staff", ar: "المعلمون والموظفون", fr: "Équipe" },
      { href: "/portal/admin/courses", en: "Courses", ar: "الدورات", fr: "Cours" },
      { href: "/portal/admin/classes", en: "Classes", ar: "الفصول", fr: "Classes" },
      { href: "/portal/admin/attendance", en: "Attendance", ar: "الحضور", fr: "Présence" },
      { href: "/portal/admin/assignments", en: "Assignments", ar: "الواجبات", fr: "Devoirs" },
      { href: "/portal/admin/progress", en: "Progress", ar: "التقدم", fr: "Progrès" },
      { href: "/portal/admin/payments", en: "Payments", ar: "المدفوعات", fr: "Paiements" },
      { href: "/portal/admin/reports", en: "Reports", ar: "التقارير", fr: "Rapports" },
      { href: "/portal/admin/settings", en: "Settings", ar: "الإعدادات", fr: "Paramètres" },
      { href: "/portal/admin/notifications", en: "Announcements", ar: "الإعلانات", fr: "Annonces" },
      { href: "/portal/messages", en: "Messages", ar: "الرسائل", fr: "Messages" },
    ],
    teacher: [
      { href: "/portal/teacher", en: "Overview", ar: "نظرة عامة", fr: "Vue d’ensemble" },
      { href: "/portal/teacher/classes", en: "My classes", ar: "فصولي", fr: "Mes classes" },
      { href: "/portal/teacher/attendance", en: "Attendance", ar: "الحضور", fr: "Présence" },
      { href: "/portal/teacher/assignments", en: "Assignments", ar: "الواجبات", fr: "Devoirs" },
      { href: "/portal/teacher/progress", en: "Student progress", ar: "تقدم الطلاب", fr: "Progrès des élèves" },
      { href: "/portal/teacher/materials", en: "Learning materials", ar: "مواد التعلم", fr: "Ressources pédagogiques" },
      { href: "/portal/messages", en: "Messages", ar: "الرسائل", fr: "Messages" },
    ],
    parent: [
      { href: "/portal/parent", en: "Family home", ar: "الرئيسية", fr: "Accueil famille" },
      { href: "/portal/parent/schedule", en: "Schedule", ar: "الجدول", fr: "Planning" },
      { href: "/portal/parent/assignments", en: "Assignments", ar: "الواجبات", fr: "Devoirs" },
      { href: "/portal/parent/progress", en: "Progress", ar: "التقدم", fr: "Progrès" },
      { href: "/portal/parent/payments", en: "Payments", ar: "المدفوعات", fr: "Paiements" },
      { href: "/portal/messages", en: "Messages", ar: "الرسائل", fr: "Messages" },
    ],
    adult_student: [
      { href: "/portal/student", en: "My learning", ar: "تعلمي", fr: "Mon apprentissage" },
      { href: "/portal/student/schedule", en: "My schedule", ar: "جدولي", fr: "Mon planning" },
      { href: "/portal/student/assignments", en: "Assignments", ar: "الواجبات", fr: "Devoirs" },
      { href: "/portal/student/progress", en: "My progress", ar: "تقدمي", fr: "Mes progrès" },
      { href: "/portal/student/materials", en: "Learning materials", ar: "مواد التعلم", fr: "Ressources pédagogiques" },
      { href: "/portal/messages", en: "Messages", ar: "الرسائل", fr: "Messages" },
    ],
  };
  void labels;
  return sections[role];
}
