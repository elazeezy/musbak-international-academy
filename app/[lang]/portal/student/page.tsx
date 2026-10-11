import { notFound } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { requireRole } from "@/lib/auth/server";
import { getDashboardData } from "@/lib/portal/dashboard";
import { DashboardView } from "@/components/portal/DashboardView";

export default async function StudentHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; if (!isLang(lang)) notFound();
  const actor = await requireRole(lang, "adult_student");
  const data = await getDashboardData("adult_student", actor.user.id);
  return <DashboardView lang={lang} role="adult_student" name={actor.profile.display_name || actor.user.email || "Student"} data={data}/>;
}
