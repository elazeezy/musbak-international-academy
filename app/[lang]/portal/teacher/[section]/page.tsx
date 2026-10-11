import { notFound } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { requireRole } from "@/lib/auth/server";
import { MemberSection } from "@/components/portal/MemberSection";

export default async function TeacherSectionPage({ params }: { params: Promise<{ lang: string; section: string }> }) {
  const { lang, section } = await params;
  if (!isLang(lang) || !["classes", "attendance", "assignments", "progress", "materials"].includes(section)) notFound();
  const actor = await requireRole(lang, "teacher");
  return <MemberSection lang={lang} role="teacher" userId={actor.user.id} section={section}/>;
}
