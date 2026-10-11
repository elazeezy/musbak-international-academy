import { notFound } from "next/navigation";
import { isLang } from "@/lib/dictionaries";
import { activatePasswordAction } from "@/app/actions/auth";

export const dynamic = "force-dynamic";

const labels = { en: ["Choose a new password", "Use at least 12 characters.", "New password", "Confirm password", "Save password"], ar: ["اختر كلمة مرور جديدة", "استخدم 12 حرفًا على الأقل.", "كلمة المرور الجديدة", "تأكيد كلمة المرور", "حفظ كلمة المرور"], fr: ["Choisir un nouveau mot de passe", "Utilisez au moins 12 caractères.", "Nouveau mot de passe", "Confirmer le mot de passe", "Enregistrer"] } as const;
export default async function ResetPasswordPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params; if (!isLang(raw)) notFound(); const t = labels[raw];
  return <main dir={raw === "ar" ? "rtl" : "ltr"} className="flex min-h-screen items-center justify-center bg-[#F4FAFD] px-4 text-[#001A3F]"><section className="w-full max-w-md rounded-3xl border border-[#D8EAF3] bg-white p-8 shadow-xl"><h1 className="text-2xl font-bold">{t[0]}</h1><p className="mt-2 text-sm text-[#5D788D]">{t[1]}</p><form action={activatePasswordAction} className="mt-6 space-y-4"><input type="hidden" name="lang" value={raw}/>{t.slice(2,4).map((label, i) => <label key={label} className="block text-sm font-semibold">{label}<input name={i === 0 ? "password" : "confirm"} type="password" minLength={12} maxLength={128} required autoComplete={i === 0 ? "new-password" : "new-password"} className="mt-2 min-h-12 w-full rounded-xl border border-[#D6E8F1] px-4"/></label>)}<button className="min-h-12 w-full rounded-xl bg-[#001A3F] font-bold text-white">{t[4]}</button></form></section></main>;
}
