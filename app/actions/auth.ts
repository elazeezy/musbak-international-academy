"use server";

import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/validation/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function signInAction(formData: FormData): Promise<void> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    lang: formData.get("lang"),
  });
  if (!parsed.success) redirect("/en/login?error=invalid_input");
  const { email, password, lang } = parsed.data;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) redirect(`/${lang}/login?error=backend_not_configured`);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/${lang}/login?error=${error.code === "email_not_confirmed" ? "email_not_confirmed" : "invalid_credentials"}`);
  const { data: { user }, error: sessionError } = await supabase.auth.getUser();
  if (sessionError || !user) redirect(`/${lang}/login?error=session_not_established`);
  // Read only this verified user's account state using a server-only client.
  // This keeps login from depending on the profiles RLS policy while never
  // trusting a user id supplied by the browser.
  const admin = createSupabaseAdminClient();
  const [{ data: profile, error: profileError }, { data: roles, error: rolesError }] = await Promise.all([
    admin.from("profiles").select("status").eq("id", user.id).maybeSingle(),
    admin.from("user_roles").select("role").eq("user_id", user.id).is("revoked_at", null),
  ]);
  if (profileError) {
    console.error("[auth] Profile lookup failed:", profileError.code ?? "unknown", profileError.message);
    redirect(`/${lang}/login?error=profile_query_failed`);
  }
  if (!profile) redirect(`/${lang}/login?error=profile_row_missing`);
  if (profile.status !== "active") redirect(`/${lang}/login?error=account_inactive`);
  if (rolesError) redirect(`/${lang}/login?error=role_lookup_failed`);
  if (!roles?.length) redirect(`/${lang}/login?error=account_not_activated`);
  redirect(`/${lang}/portal`);
}

export async function signOutAction(formData: FormData): Promise<void> {
  const lang = String(formData.get("lang") ?? "en");
  const safeLang = lang === "ar" || lang === "fr" ? lang : "en";
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect(`/${safeLang}/login`);
}

export async function requestPasswordResetAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim();
  const langValue = String(formData.get("lang") ?? "en");
  const lang = langValue === "ar" || langValue === "fr" ? langValue : "en";
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) redirect(`/${lang}/login?error=backend_not_configured`);
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) redirect(`/${lang}/forgot-password?sent=1`);
  const supabase = await createSupabaseServerClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/${lang}/auth/callback?next=/${lang}/reset-password`,
  });
  redirect(`/${lang}/forgot-password?sent=1`);
}

export async function activatePasswordAction(formData: FormData): Promise<void> {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const langValue = String(formData.get("lang") ?? "en");
  const lang = langValue === "ar" || langValue === "fr" ? langValue : "en";
  if (password.length < 12 || password.length > 128 || password !== confirm) redirect(`/${lang}/reset-password?error=invalid_password`);
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${lang}/login?error=activation_expired`);
  const { error } = await supabase.auth.updateUser({ password });
  if (error) redirect(`/${lang}/reset-password?error=activation_failed`);
  redirect(`/${lang}/portal`);
}
