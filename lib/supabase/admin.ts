import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicEnv } from "./env";
import type { Database } from "./database.types";

export function createSupabaseAdminClient() {
  const { NEXT_PUBLIC_SUPABASE_URL } = getSupabasePublicEnv();
  const secretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secretKey) throw new Error("SUPABASE_SECRET_KEY is not configured.");
  return createClient<Database>(NEXT_PUBLIC_SUPABASE_URL, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
