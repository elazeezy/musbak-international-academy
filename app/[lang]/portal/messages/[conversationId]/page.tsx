import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { sendConversationMessageAction } from "@/app/actions/messages";
import { requireAnyRole } from "@/lib/auth/server";
import { isLang } from "@/lib/dictionaries";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Notice, PageHeading } from "@/components/portal/PortalShell";

const copy = {
  en: { back: "All messages", message: "Write a message", send: "Send message", you: "You", academy: "Academy team", student: "Student", empty: "No messages in this conversation yet.", failed: "The message could not be sent. Please try again.", sent: "Message sent." },
  ar: { back: "كل الرسائل", message: "اكتب رسالة", send: "إرسال الرسالة", you: "أنت", academy: "فريق الأكاديمية", student: "الطالب", empty: "لا توجد رسائل في هذه المحادثة بعد.", failed: "تعذر إرسال الرسالة. حاول مرة أخرى.", sent: "تم إرسال الرسالة." },
  fr: { back: "Tous les messages", message: "Écrire un message", send: "Envoyer", you: "Vous", academy: "Équipe de l’académie", student: "Élève", empty: "Aucun message dans cette conversation.", failed: "Impossible d’envoyer le message. Réessayez.", sent: "Message envoyé." },
} as const;

export default async function ConversationPage({ params, searchParams }: { params: Promise<{ lang: string; conversationId: string }>; searchParams: Promise<{ error?: string; sent?: string }> }) {
  const { lang: rawLang, conversationId } = await params;
  if (!isLang(rawLang)) notFound();
  const parsedId = z.uuid().safeParse(conversationId);
  if (!parsedId.success) notFound();
  const actor = await requireAnyRole(rawLang);
  const lang = rawLang;
  const text = copy[lang];
  const db = await createSupabaseServerClient();
  const [{ data: conversation, error }, search] = await Promise.all([
    db.from("conversations").select("id,student_id,created_at").eq("id", parsedId.data).maybeSingle(),
    searchParams,
  ]);
  if (!conversation) notFound();
  const [messageResult, participantResult, studentResult] = await Promise.all([
    db.from("messages").select("id,sender_id,body,created_at").eq("conversation_id", conversation.id).order("created_at", { ascending: true }).limit(100),
    db.from("conversation_participants").select("user_id").eq("conversation_id", conversation.id),
    conversation.student_id ? db.from("students").select("display_name").eq("id", conversation.student_id).maybeSingle() : Promise.resolve({ data: null }),
  ]);
  const participantIds = [...new Set((participantResult.data ?? []).map((item) => item.user_id).filter((id) => id !== actor.user.id))];
  const admin = createSupabaseAdminClient();
  const { data: participants } = participantIds.length ? await admin.from("profiles").select("id,display_name").in("id", participantIds) : { data: [] };
  const participantNames = new Map((participants ?? []).map((item) => [item.id, item.display_name]));
  const counterpartName = participantIds.map((id) => participantNames.get(id)).find(Boolean) ?? text.academy;
  const title = studentResult.data?.display_name ?? text.student;
  const messages = messageResult.data ?? [];
  return <>
    <PageHeading title={title} description={`${text.student} · ${counterpartName}`} action={<Link href={`/${lang}/portal/messages`} className="inline-flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold text-[#087CC1] hover:bg-white focus-visible:outline-2 focus-visible:outline-[#35B8FF]">{text.back}</Link>}/>
    {error && <div className="mb-5"><Notice tone="red">This conversation could not be loaded.</Notice></div>}
    {search.error && <div className="mb-5"><Notice tone="red">{text.failed}</Notice></div>}
    {search.sent && <div className="mb-5"><Notice>{text.sent}</Notice></div>}
    {messageResult.error && <div className="mb-5"><Notice tone="red">Messages could not be loaded.</Notice></div>}
    <section aria-label={title} className="mx-auto flex min-h-[min(62vh,42rem)] max-w-4xl flex-col border-y border-[#DCEAF1] bg-white">
      <ol className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6" aria-live="polite">
        {messages.length === 0 ? <li className="py-8 text-center text-sm text-[#718A9A]">{text.empty}</li> : messages.map((message) => {
          const isMine = message.sender_id === actor.user.id;
          return <li key={message.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}><article className={`max-w-[88%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${isMine ? "bg-[#001A3F] text-white" : "bg-[#F0F7FA] text-[#183D55]"}`}><p className="mb-1 text-[10px] font-bold opacity-70">{isMine ? text.you : counterpartName}</p><p className="whitespace-pre-wrap break-words text-sm leading-6">{message.body}</p><time dateTime={message.created_at} className="mt-2 block text-end text-[10px] opacity-60">{new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeStyle: "short" }).format(new Date(message.created_at))}</time></article></li>;
        })}
      </ol>
      <form action={sendConversationMessageAction} className="border-t border-[#E7F0F4] p-4 sm:p-5">
        <input type="hidden" name="lang" value={lang}/><input type="hidden" name="conversation_id" value={conversation.id}/>
        <label className="sr-only" htmlFor="message-body">{text.message}</label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end"><textarea id="message-body" name="body" required maxLength={10000} rows={3} className="min-h-24 flex-1 resize-y rounded-xl border border-[#D6E8F1] bg-white p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#35B8FF]" placeholder={text.message}/><button className="min-h-11 rounded-xl bg-[#001A3F] px-5 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF]">{text.send}</button></div>
      </form>
    </section>
  </>;
}
