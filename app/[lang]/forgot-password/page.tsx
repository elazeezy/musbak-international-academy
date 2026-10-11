import { notFound } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { requestPasswordResetAction } from "@/app/actions/auth";

export const dynamic = "force-dynamic";

const labels = { en: ["Reset your password", "Enter your account email. If it belongs to an active account, we’ll send a secure recovery link.", "Email address", "Send recovery link", "If the address is registered, a recovery email is on its way."], ar: ["إعادة تعيين كلمة المرور", "أدخل بريد حسابك. إذا كان مرتبطًا بحساب نشط، سنرسل رابط استعادة آمنًا.", "البريد الإلكتروني", "إرسال رابط الاستعادة", "إذا كان البريد مسجلاً، فسيصلك رابط الاستعادة."], fr: ["Réinitialiser votre mot de passe", "Saisissez l’e-mail de votre compte. Un lien sécurisé sera envoyé s’il est associé à un compte actif.", "Adresse e-mail", "Envoyer le lien", "Si l’adresse est enregistrée, un e-mail de récupération a été envoyé."] } as const;

export default async function ForgotPasswordPage({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<{ sent?: string }> }) {
  const { lang: raw } = await params; if (!isLang(raw)) notFound();
  const t = labels[raw]; const { sent } = await searchParams;
  return <main dir={raw === "ar" ? "rtl" : "ltr"} className="flex min-h-screen items-center justify-center bg-[#F4FAFD] px-4 text-[#001A3F]"><section className="w-full max-w-md rounded-3xl border border-[#D8EAF3] bg-white p-8 shadow-xl"><h1 className="text-2xl font-bold">{t[0]}</h1><p className="mt-2 text-sm leading-6 text-[#5D788D]">{t[1]}</p>{sent && <p role="status" className="mt-5 rounded-xl bg-[#E8F7FF] p-3 text-sm">{t[4]}</p>}<form action={requestPasswordResetAction} className="mt-6 space-y-4"><input type="hidden" name="lang" value={raw}/><label className="block text-sm font-semibold">{t[2]}<input name="email" type="email" required maxLength={254} className="mt-2 min-h-12 w-full rounded-xl border border-[#D6E8F1] px-4"/></label><button className="min-h-12 w-full rounded-xl bg-[#001A3F] font-bold text-white">{t[3]}</button></form></section></main>;
}
