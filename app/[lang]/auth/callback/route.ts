import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next");
  const routeLang = request.nextUrl.pathname.split("/")[1];
  const lang = routeLang === "ar" || routeLang === "fr" ? routeLang : "en";
  const safeNext = next?.startsWith("/") && !next.startsWith("//") ? next : `/${lang}/portal`;
  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return NextResponse.redirect(new URL(`/${lang}/login?error=activation_expired`, origin));
      const admin = createSupabaseAdminClient();
      const { data: invitation } = await admin.from("invitations").select("id,role,invited_by").eq("email", (user.email ?? "").toLowerCase()).eq("status", "pending").gt("expires_at", new Date().toISOString()).order("created_at").limit(1).maybeSingle();
      if (invitation) {
        const { error: roleError } = await admin.from("user_roles").upsert({ user_id: user.id, role: invitation.role, granted_by: invitation.invited_by, revoked_at: null }, { onConflict: "user_id,role" });
        if (roleError) return NextResponse.redirect(new URL(`/${lang}/login?error=activation_failed`, origin));
        if (invitation.role === "teacher") await admin.from("staff_members").upsert({ user_id: user.id, status: "active" }, { onConflict: "user_id" });
        await admin.from("invitations").update({ auth_user_id: user.id, status: "accepted", accepted_at: new Date().toISOString() }).eq("id", invitation.id);
      }
      return NextResponse.redirect(new URL(safeNext, origin));
    }
  }
  return NextResponse.redirect(new URL(`/${lang}/login?error=activation_expired`, origin));
}
