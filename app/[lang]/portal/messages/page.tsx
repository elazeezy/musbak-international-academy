import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageSquareText } from "lucide-react";
import { startConversationAction } from "@/app/actions/messages";
import { requireAnyRole } from "@/lib/auth/server";
import { isLang } from "@/lib/dictionaries";
import { getMessageStartOptions } from "@/lib/portal/messages";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Notice, PageHeading } from "@/components/portal/PortalShell";

const copy = {
  en: { title: "Messages", description: "Private conversations between a family and the teaching team.", new: "Start a conversation", recipient: "Student and recipient", first: "Message", send: "Start conversation", inbox: "Your conversations", empty: "No conversations yet.", noOptions: "There are no active family or teaching relationships to message yet.", error: "The message could not be sent. Confirm the student and recipient still have an active academy relationship.", invalid: "Complete the message details and try again.", student: "Student", unread: "Open conversation", updated: "Updated" },
  ar: { title: "الرسائل", description: "محادثات خاصة بين الأسرة وفريق التدريس.", new: "بدء محادثة", recipient: "الطالب والمستلم", first: "الرسالة", send: "بدء المحادثة", inbox: "محادثاتك", empty: "لا توجد محادثات بعد.", noOptions: "لا توجد علاقات تدريس أو أسر نشطة للمراسلة بعد.", error: "تعذر إرسال الرسالة. تحقق من استمرار العلاقة الأكاديمية بين الطالب والمستلم.", invalid: "أكمل بيانات الرسالة وحاول مرة أخرى.", student: "الطالب", unread: "فتح المحادثة", updated: "آخر تحديث" },
  fr: { title: "Messages", description: "Conversations privées entre les familles et l’équipe pédagogique.", new: "Démarrer une conversation", recipient: "Élève et destinataire", first: "Message", send: "Démarrer", inbox: "Vos conversations", empty: "Aucune conversation pour le moment.", noOptions: "Aucun lien actif avec une famille ou un enseignant à contacter.", error: "Impossible d’envoyer le message. Vérifiez que le lien avec l’élève est toujours actif.", invalid: "Complétez le message et réessayez.", student: "Élève", unread: "Ouvrir la conversation", updated: "Dernière mise à jour" },
} as const;

export default async function MessagesPage({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<{ error?: string }> }) {
  const { lang: rawLang } = await params;
  if (!isLang(rawLang)) notFound();
  const actor = await requireAnyRole(rawLang);
  const lang = rawLang;
  const text = copy[lang];
  const db = await createSupabaseServerClient();
  const [{ data: conversations, error }, options, search] = await Promise.all([
    db.from("conversations").select("id,student_id,created_at,last_message_at,last_message_preview").order("last_message_at", { ascending: false, nullsFirst: false }).limit(100),
    getMessageStartOptions(actor.user.id, actor.roles),
    searchParams,
  ]);
  const conversationRows = conversations ?? [];
  const studentIds = [...new Set(conversationRows.map((row) => row.student_id).filter((id): id is string => id !== null))];
  const { data: students } = studentIds.length ? await db.from("students").select("id,display_name").in("id", studentIds) : { data: [] };
  const names = new Map((students ?? []).map((row) => [row.id, row.display_name]));
  const statusMessage = search.error === "invalid" ? text.invalid : search.error ? text.error : "";
  return <>
    <PageHeading title={text.title} description={text.description}/>
    {error && <div className="mb-5"><Notice tone="red">Conversations could not be loaded.</Notice></div>}
    {statusMessage && <div className="mb-5"><Notice tone={search.error === "invalid" ? "amber" : "red"}>{statusMessage}</Notice></div>}
    {options.length > 0 && <form action={startConversationAction} className="mb-8 grid gap-3 border-y border-[#DCEAF1] bg-white px-4 py-5 sm:grid-cols-[1fr_1.6fr_auto] sm:items-end sm:px-6">
      <input type="hidden" name="lang" value={lang}/>
      <label className="text-xs font-semibold text-[#526F81]">{text.recipient}<select name="recipient" required className="mt-1 min-h-11 w-full rounded-xl border border-[#D6E8F1] bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#35B8FF]">{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
      <label className="text-xs font-semibold text-[#526F81]">{text.first}<input name="body" required maxLength={10000} className="mt-1 min-h-11 w-full rounded-xl border border-[#D6E8F1] bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#35B8FF]"/></label>
      <button className="min-h-11 rounded-xl bg-[#001A3F] px-4 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF]">{text.send}</button>
    </form>}
    <section aria-labelledby="inbox-title" className="max-w-4xl">
      <h2 id="inbox-title" className="border-b border-[#DCEAF1] pb-3 text-base font-bold">{text.inbox}</h2>
      {conversationRows.length === 0 ? <div className="py-8"><div className="flex items-center gap-3 text-[#718A9A]"><MessageSquareText className="h-5 w-5" aria-hidden="true"/><p className="text-sm">{options.length ? text.empty : text.noOptions}</p></div></div> : <ul className="divide-y divide-[#E7F0F4]">{conversationRows.map((conversation) => {
        const updated = conversation.last_message_at ?? conversation.created_at;
        return <li key={conversation.id}><Link href={`/${lang}/portal/messages/${conversation.id}`} className="flex min-h-[4.5rem] items-center justify-between gap-4 py-4 focus-visible:outline-2 focus-visible:outline-[#35B8FF]"><span className="min-w-0"><span className="block truncate text-sm font-bold">{text.student}: {names.get(conversation.student_id ?? "") ?? "—"}</span><span className="mt-1 block truncate text-xs text-[#718A9A]">{conversation.last_message_preview ?? ""}</span></span><span className="shrink-0 text-end"><time dateTime={updated} className="block text-[10px] text-[#8299A8]">{new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeStyle: "short" }).format(new Date(updated))}</time><span className="mt-1 inline-block text-[10px] font-bold text-[#087CC1]">{text.unread}</span></span></Link></li>;
      })}</ul>}
    </section>
  </>;
}
