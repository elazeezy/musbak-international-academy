import { notFound } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { requireRole } from "@/lib/auth/server";
import { MemberSection } from "@/components/portal/MemberSection";

export default async function ParentSectionPage({ params, searchParams }: { params: Promise<{ lang: string; section: string }>; searchParams: Promise<{ child?: string }> }) {
  const { lang, section } = await params;
  if (!isLang(lang) || !["schedule", "attendance", "assignments", "progress", "payments", "materials"].includes(section)) notFound();
  const actor = await requireRole(lang, "parent");
  const { child } = await searchParams;
  return <MemberSection lang={lang} role="parent" userId={actor.user.id} section={section} childId={child}/>;
}
