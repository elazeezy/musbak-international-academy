import Link from "next/link";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { requireRole } from "@/lib/auth/server";
import { getPortalRecords } from "@/lib/portal/resources";
import { Notice, PageHeading } from "@/components/portal/PortalShell";

const panels = ["schedule", "attendance", "assignments", "progress", "payments", "materials"] as const;
const labels = { en: { schedule: "Schedule", attendance: "Attendance", assignments: "Assignments", progress: "Progress", payments: "Payments", materials: "Learning materials", error: "This child is not linked to your account." }, ar: { schedule: "الجدول", attendance: "الحضور", assignments: "الواجبات", progress: "التقدم", payments: "المدفوعات", materials: "مواد التعلم", error: "هذا الطالب غير مرتبط بحسابك." }, fr: { schedule: "Planning", attendance: "Présence", assignments: "Devoirs", progress: "Progrès", payments: "Paiements", materials: "Ressources pédagogiques", error: "Cet enfant n’est pas lié à votre compte." } } as const;

export default async function ParentChildPage({ params }: { params: Promise<{ lang: string; studentId: string }> }) {
  const { lang, studentId } = await params; if (!isLang(lang)) notFound();
  const actor = await requireRole(lang, "parent");
  const resultSets = await Promise.all(panels.map((panel) => getPortalRecords("parent", actor.user.id, panel, studentId)));
  const student = resultSets[0]?.students.find((item) => item.id === studentId);
  const t = labels[lang];
  if (!student || resultSets.some((result) => result.error === "You do not have access to this student.")) return <Notice tone="red">{t.error}</Notice>;
  return <><PageHeading title={student.name} description={lang === "ar" ? "ملخص رحلة التعلم." : lang === "fr" ? "Un aperçu du parcours d’apprentissage." : "A clear view of your child’s learning journey."}/><div className="grid gap-4 lg:grid-cols-2">{panels.map((panel, index) => { const records = resultSets[index]?.records ?? []; return <section key={panel} className="overflow-hidden rounded-2xl border border-[#E4EEF3] bg-white"><header className="flex items-center justify-between border-b border-[#EAF1F5] px-5 py-4"><h2 className="font-bold">{t[panel]}</h2><Link href={`/${lang}/portal/parent/${panel}?child=${studentId}`} className="text-xs font-bold text-[#087CC1]">{lang === "ar" ? "عرض الكل" : lang === "fr" ? "Tout voir" : "View all"}</Link></header>{records.length ? <ul className="divide-y divide-[#EAF1F5]">{records.slice(0,4).map((record) => <li key={record.id} className="px-5 py-3"><p className="text-sm font-semibold">{record.title}</p><p className="mt-1 text-xs text-[#718A9A]">{record.detail}</p></li>)}</ul> : <p className="p-5 text-sm text-[#718A9A]">{lang === "ar" ? "لا توجد تحديثات بعد." : lang === "fr" ? "Aucune mise à jour." : "No updates yet."}</p>}</section>; })}</div></>;
}
