import { notFound } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { requireRole } from "@/lib/auth/server";
import { getDashboardData } from "@/lib/portal/dashboard";
import { DashboardView } from "@/components/portal/DashboardView";

export default async function ParentHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; if (!isLang(lang)) notFound();
  const actor = await requireRole(lang, "parent");
  const data = await getDashboardData("parent", actor.user.id);
  return <DashboardView lang={lang} role="parent" name={actor.profile.display_name || actor.user.email || "Parent"} data={data}/>;
}
