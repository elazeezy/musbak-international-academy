import { notFound } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { requireRole } from "@/lib/auth/server";
import { getDashboardData } from "@/lib/portal/dashboard";
import { DashboardView } from "@/components/portal/DashboardView";

export default async function AdminHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; if (!isLang(lang)) notFound();
  const actor = await requireRole(lang, "admin");
  const data = await getDashboardData("admin", actor.user.id, actor.profile.timezone);
  return <DashboardView lang={lang} role="admin" name={actor.profile.display_name || actor.user.email || "Admin"} data={data}/>;
}
