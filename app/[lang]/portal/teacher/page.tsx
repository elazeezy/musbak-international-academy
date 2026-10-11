import { notFound } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { requireRole } from "@/lib/auth/server";
import { getDashboardData } from "@/lib/portal/dashboard";
import { DashboardView } from "@/components/portal/DashboardView";

export default async function TeacherHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; if (!isLang(lang)) notFound();
  const actor = await requireRole(lang, "teacher");
  const data = await getDashboardData("teacher", actor.user.id);
  return <DashboardView lang={lang} role="teacher" name={actor.profile.display_name || actor.user.email || "Teacher"} data={data}/>;
}
