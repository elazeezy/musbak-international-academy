import { notFound } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { requireRole } from "@/lib/auth/server";
import { MemberSection } from "@/components/portal/MemberSection";

export default async function StudentSectionPage({ params }: { params: Promise<{ lang: string; section: string }> }) {
  const { lang, section } = await params;
  if (!isLang(lang) || !["schedule", "assignments", "progress", "materials"].includes(section)) notFound();
  const actor = await requireRole(lang, "adult_student");
  return <MemberSection lang={lang} role="adult_student" userId={actor.user.id} section={section}/>;
}
