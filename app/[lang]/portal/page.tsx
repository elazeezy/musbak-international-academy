import { notFound, redirect } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { requireAnyRole } from "@/lib/auth/server";

export default async function PortalIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const actor = await requireAnyRole(lang);
  if (actor.roles.includes("admin")) redirect(`/${lang}/portal/admin`);
  if (actor.roles.includes("teacher")) redirect(`/${lang}/portal/teacher`);
  if (actor.roles.includes("parent")) redirect(`/${lang}/portal/parent`);
  if (actor.roles.includes("adult_student")) redirect(`/${lang}/portal/student`);
  redirect(`/${lang}/login?error=account_not_activated`);
}
