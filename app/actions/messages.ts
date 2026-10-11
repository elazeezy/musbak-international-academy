"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAnyRole, requireOneOfRoles } from "@/lib/auth/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const langSchema = z.enum(["en", "ar", "fr"]);

export async function startConversationAction(formData: FormData): Promise<void> {
  const lang = langSchema.safeParse(formData.get("lang")).data ?? "en";
  const actor = await requireOneOfRoles(lang, ["teacher", "parent", "adult_student"]);
  const [studentId, recipientId] = String(formData.get("recipient") ?? "").split(":");
  const parsed = z.object({ studentId: z.uuid(), recipientId: z.uuid(), body: z.string().trim().min(1).max(10000) }).safeParse({ studentId, recipientId, body: formData.get("body") });
  if (!parsed.success) redirect(`/${lang}/portal/messages?error=invalid`);
  const db = await createSupabaseServerClient();
  const { data: conversationId, error } = await db.rpc("start_student_conversation", {
    target_student: parsed.data.studentId,
    target_recipient: parsed.data.recipientId,
    first_message: parsed.data.body,
  });
  if (error || !conversationId) redirect(`/${lang}/portal/messages?error=thread_failed`);
  await createNotification(parsed.data.recipientId, actor.user.id, conversationId, lang, "New academy message");
  revalidatePath(`/${lang}/portal/messages`);
  redirect(`/${lang}/portal/messages/${conversationId}`);
}

export async function sendConversationMessageAction(formData: FormData): Promise<void> {
  const lang = langSchema.safeParse(formData.get("lang")).data ?? "en";
  const actor = await requireAnyRole(lang);
  const parsed = z.object({ conversation_id: z.uuid(), body: z.string().trim().min(1).max(10000) }).safeParse({ conversation_id: formData.get("conversation_id"), body: formData.get("body") });
  if (!parsed.success) redirect(`/${lang}/portal/messages?error=invalid`);
  const db = await createSupabaseServerClient();
  const { data: participants, error: participantsError } = await db.from("conversation_participants").select("user_id").eq("conversation_id", parsed.data.conversation_id);
  if (participantsError || !(participants ?? []).some((item) => item.user_id === actor.user.id)) redirect(`/${lang}/portal/messages?error=thread_unavailable`);
  const { data: message, error } = await db.from("messages").insert({ conversation_id: parsed.data.conversation_id, sender_id: actor.user.id, body: parsed.data.body }).select("id").single();
  if (error || !message) redirect(`/${lang}/portal/messages/${parsed.data.conversation_id}?error=send_failed`);
  const recipient = participants?.find((item) => item.user_id !== actor.user.id)?.user_id;
  if (recipient) await createNotification(recipient, actor.user.id, message.id, lang, "New academy message");
  revalidatePath(`/${lang}/portal/messages`);
  revalidatePath(`/${lang}/portal/messages/${parsed.data.conversation_id}`);
  redirect(`/${lang}/portal/messages/${parsed.data.conversation_id}?sent=1`);
}

async function createNotification(recipientId: string, senderId: string, sourceId: string, lang: "en" | "ar" | "fr", fallbackTitle: string) {
  const admin = createSupabaseAdminClient();
  const { data: profile } = await admin.from("profiles").select("preferred_language").eq("id", recipientId).maybeSingle();
  const locale = profile?.preferred_language ?? lang;
  const copy = {
    en: { title: fallbackTitle, body: "You have a new academy message." },
    ar: { title: "رسالة جديدة من الأكاديمية", body: "لديك رسالة جديدة في بوابة الأكاديمية." },
    fr: { title: "Nouveau message de l’académie", body: "Vous avez un nouveau message dans le portail." },
  } as const;
  const notice = copy[locale];
  await admin.from("notifications").upsert({
    user_id: recipientId,
    event_type: "NEW_MESSAGE",
    source_key: sourceId,
    title: notice.title,
    body: notice.body,
    href: `/${locale}/portal/messages`,
  }, { onConflict: "user_id,event_type,source_key" });
  await admin.from("audit_logs").insert({ actor_id: senderId, action: "message_sent", target_table: "messages", target_id: sourceId, safe_details: { notification: "in_app" } });
}
