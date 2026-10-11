import { notFound } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { requireAnyRole } from "@/lib/auth/server";
import { PortalShell } from "@/components/portal/PortalShell";

export const dynamic = "force-dynamic";

export default async function PortalLayout({ children, params }: LayoutProps<"/[lang]/portal">) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const actor = await requireAnyRole(raw);
  const role = actor.roles.includes("admin") ? "admin" : actor.roles.includes("teacher") ? "teacher" : actor.roles.includes("parent") ? "parent" : "adult_student";
  const name = actor.profile.display_name || actor.user.email || "Musbak member";
  return <PortalShell lang={raw} role={role} roles={actor.roles} name={name} currentPath={`/${raw}/portal`}>{children}</PortalShell>;
}
