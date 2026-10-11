import Link from "next/link";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { requireAnyRole } from "@/lib/auth/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { markNotificationReadAction } from "@/app/actions/notifications";
import { Notice, PageHeading } from "@/components/portal/PortalShell";

const words = { en: { title: "Notifications", desc: "Class reminders and important academy updates.", empty: "You’re all caught up.", mark: "Mark as read", read: "Read", view: "View" }, ar: { title: "الإشعارات", desc: "تذكيرات الحصص وتحديثات الأكاديمية المهمة.", empty: "أنت على اطلاع بكل جديد.", mark: "تحديد كمقروء", read: "مقروء", view: "عرض" }, fr: { title: "Notifications", desc: "Rappels de cours et informations importantes de l’académie.", empty: "Vous êtes à jour.", mark: "Marquer comme lu", read: "Lu", view: "Voir" } } as const;

export default async function NotificationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; if (!isLang(lang)) notFound();
  await requireAnyRole(lang);
  const db = await createSupabaseServerClient();
  const { data, error } = await db.from("notifications").select("id,event_type,title,body,href,read_at,created_at").order("created_at", { ascending: false }).limit(100);
  const t = words[lang];
  return <><PageHeading title={t.title} description={t.desc}/>{error ? <Notice tone="red">Notifications could not be loaded.</Notice> : !data?.length ? <Notice>{t.empty}</Notice> : <ul className="overflow-hidden rounded-2xl border border-[#E4EEF3] bg-white shadow-[0_8px_25px_rgba(0,40,70,0.04)]">{data.map((notification) => { const safeHref = notification.href?.startsWith("/") && !notification.href.startsWith("//") ? notification.href : undefined; return <li key={notification.id} className={`flex flex-wrap items-start justify-between gap-4 border-b border-[#EAF1F5] px-5 py-5 last:border-0 ${notification.read_at ? "" : "bg-[#F7FBFD]"}`}><div className="min-w-0"><p className="font-bold">{notification.title}</p><p className="mt-1 text-sm leading-6 text-[#607C8E]">{notification.body}</p><time dateTime={notification.created_at} className="mt-2 block text-[11px] text-[#91A5B1]">{new Date(notification.created_at).toLocaleString(lang)}</time></div><div className="flex items-center gap-3">{safeHref && <Link href={safeHref} className="text-xs font-bold text-[#087CC1]">{t.view}</Link>}{notification.read_at ? <span className="text-[11px] text-[#8096A4]">{t.read}</span> : <form action={markNotificationReadAction}><input type="hidden" name="lang" value={lang}/><input type="hidden" name="id" value={notification.id}/><button className="min-h-10 rounded-xl bg-[#E8F7FF] px-3 text-xs font-bold text-[#087CC1] focus-visible:outline-2 focus-visible:outline-[#35B8FF]">{t.mark}</button></form>}</div></li>; })}</ul>}</>;
}
