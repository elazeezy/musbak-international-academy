import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { Role } from "@/lib/supabase/database.types";

export async function getCurrentActor() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) return null;
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  // This server-only lookup is scoped to the Auth user verified above. Portal
  // reads and mutations remain subject to RLS and their own authorization.
  const admin = createSupabaseAdminClient();
  const [{ data: profile }, { data: assignments }] = await Promise.all([
    admin.from("profiles").select("display_name, preferred_language, timezone, status").eq("id", user.id).maybeSingle(),
    admin.from("user_roles").select("role").eq("user_id", user.id).is("revoked_at", null),
  ]);
  if (!profile || profile.status !== "active") return null;
  return { user, profile, roles: (assignments ?? []).map((item) => item.role) };
}

export async function requireRole(lang: string, role: Role) {
  const actor = await getCurrentActor();
  if (!actor) redirect(`/${lang}/login?error=session_not_established`);
  if (!actor.roles.includes(role) && !actor.roles.includes("admin")) redirect(`/${lang}/portal`);
  return actor;
}

export async function requireAnyRole(lang: string) {
  const actor = await getCurrentActor();
  if (!actor) redirect(`/${lang}/login`);
  if (actor.roles.length === 0) redirect(`/${lang}/login?error=account_not_activated`);
  return actor;
}

export async function requireOneOfRoles(lang: string, allowed: readonly Role[]) {
  const actor = await getCurrentActor();
  if (!actor) redirect(`/${lang}/login`);
  if (!actor.roles.includes("admin") && !actor.roles.some((role) => allowed.includes(role))) redirect(`/${lang}/portal`);
  return actor;
}
