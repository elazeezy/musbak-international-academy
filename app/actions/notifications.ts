"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAnyRole } from "@/lib/auth/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function markNotificationReadAction(formData: FormData): Promise<void> {
  const lang = z.enum(["en", "ar", "fr"]).safeParse(formData.get("lang")).data ?? "en";
  await requireAnyRole(lang);
  const id = z.uuid().safeParse(formData.get("id"));
  if (!id.success) return;
  const db = await createSupabaseServerClient();
  await db.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", id.data);
  revalidatePath(`/${lang}/portal/notifications`);
}
