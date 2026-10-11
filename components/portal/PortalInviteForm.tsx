"use client";

import { useState, useTransition, type FormEvent } from "react";
import { inviteAccountAction, type PortalInviteResult } from "@/app/actions/admin";
import type { Role } from "@/lib/supabase/database.types";

type InviteRole = Extract<Role, "teacher" | "parent" | "adult_student">;

const copy = {
  en: {
    labels: { teacher: "Teacher / staff", parent: "Parent / guardian", adult_student: "Adult student" },
    email: "Email address", create: "Create portal account", creating: "Creating secure link…", instructions: "Musbak creates the account and a one-time activation link. No email is sent automatically. Review the message, then send it yourself from your email app.",
    draft: "Open email draft", copyMessage: "Copy message", copied: "Message copied", link: "Activation link", invalid: "Enter a valid email address.", exists: "An account already uses this email. Link that existing account instead of creating a duplicate.", failed: "The portal account could not be created. Check the email and try again.",
    subject: "Activate your Musbak International Academy portal", greeting: "Hello,", body: "Your Musbak International Academy portal is ready. Use this secure, one-time link to activate your account and set your own password:", tail: "If the link expires, contact the academy to request a new one. Sign in here after activation:",
  },
  ar: {
    labels: { teacher: "معلم / موظف", parent: "ولي أمر / وصي", adult_student: "طالب بالغ" },
    email: "البريد الإلكتروني", create: "إنشاء حساب البوابة", creating: "جارٍ إنشاء رابط آمن…", instructions: "ستنشئ الأكاديمية الحساب ورابط تفعيل لمرة واحدة. لن يُرسل بريد تلقائيًا. راجع الرسالة ثم أرسلها بنفسك من تطبيق البريد.",
    draft: "فتح مسودة بريد", copyMessage: "نسخ الرسالة", copied: "تم نسخ الرسالة", link: "رابط التفعيل", invalid: "أدخل بريدًا إلكترونيًا صالحًا.", exists: "يوجد حساب بهذا البريد. اربط الحساب الحالي بدلًا من إنشاء حساب مكرر.", failed: "تعذر إنشاء حساب البوابة. تحقق من البريد وحاول مرة أخرى.",
    subject: "تفعيل بوابتك في أكاديمية مسّباك الدولية", greeting: "مرحبًا،", body: "أصبحت بوابتك في أكاديمية مسّباك الدولية جاهزة. استخدم هذا الرابط الآمن لمرة واحدة لتفعيل حسابك واختيار كلمة مرورك:", tail: "إذا انتهت صلاحية الرابط، تواصل مع الأكاديمية لطلب رابط جديد. سجّل الدخول بعد التفعيل من هنا:",
  },
  fr: {
    labels: { teacher: "Enseignant / équipe", parent: "Parent / tuteur", adult_student: "Étudiant adulte" },
    email: "Adresse e-mail", create: "Créer le compte du portail", creating: "Création du lien sécurisé…", instructions: "Musbak crée le compte et un lien d’activation à usage unique. Aucun e-mail n’est envoyé automatiquement. Vérifiez le message puis envoyez-le depuis votre messagerie.",
    draft: "Ouvrir le brouillon", copyMessage: "Copier le message", copied: "Message copié", link: "Lien d’activation", invalid: "Saisissez une adresse e-mail valide.", exists: "Un compte utilise déjà cette adresse. Associez ce compte au lieu d’en créer un autre.", failed: "Impossible de créer le compte. Vérifiez l’adresse et réessayez.",
    subject: "Activez votre portail Musbak International Academy", greeting: "Bonjour,", body: "Votre portail Musbak International Academy est prêt. Utilisez ce lien sécurisé à usage unique pour activer votre compte et choisir votre mot de passe :", tail: "Si le lien expire, contactez l’académie pour en demander un nouveau. Connectez-vous ici après activation :",
  },
} as const;

export function PortalInviteForm({ lang, role }: { lang: "en" | "ar" | "fr"; role: InviteRole }) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<PortalInviteResult | null>(null);
  const [copied, setCopied] = useState(false);
  const text = copy[lang];
  const roleLabel = text.labels[role];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);
    const formData = new FormData(event.currentTarget);
    formData.set("role", role);
    formData.set("lang", lang);
    startTransition(async () => setResult(await inviteAccountAction(formData)));
  }

  const message = result?.ok
    ? `${text.greeting}\n\n${text.body}\n\n${result.actionLink}\n\n${text.tail}\n${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/${lang}/login\n\nMusbak International Academy`
    : "";
  const mailto = result?.ok
    ? `mailto:${encodeURIComponent(result.email)}?subject=${encodeURIComponent(text.subject)}&body=${encodeURIComponent(message)}`
    : undefined;

  async function copyMessage() {
    if (!message) return;
    await navigator.clipboard.writeText(message);
    setCopied(true);
  }

  return <div className="space-y-3">
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-[1fr_220px_auto]">
      <label className="text-xs font-semibold">{text.email}<input name="email" type="email" autoComplete="email" required maxLength={254} disabled={pending} className="mt-1 min-h-11 w-full rounded-xl border border-[#D6E8F1] bg-white px-3 text-sm text-[#001A3F] outline-none focus-visible:ring-2 focus-visible:ring-[#35B8FF]"/></label>
      <div><span className="text-xs font-semibold">Portal type</span><p className="mt-1 flex min-h-11 items-center rounded-xl bg-[#F4FAFD] px-3 text-sm text-[#456579]">{roleLabel}</p></div>
      <div className="flex items-end"><button disabled={pending} className="min-h-11 rounded-xl bg-[#001A3F] px-4 text-sm font-bold text-white hover:bg-[#06274D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF] disabled:opacity-60">{pending ? text.creating : text.create}</button></div>
    </form>
    <p className="text-xs leading-5 text-[#718A9A]">{text.instructions}</p>
    {result?.ok && <section className="space-y-3 rounded-xl border border-[#B7E5FB] bg-[#F2FAFF] p-4" aria-live="polite">
      <p className="text-sm font-semibold text-[#07518B]">Portal account created for {result.email}.</p>
      <label className="block text-xs font-semibold">{text.link}<input readOnly value={result.actionLink} className="mt-1 min-h-11 w-full rounded-lg border border-[#D6E8F1] bg-white px-3 text-xs text-[#31566C]" onFocus={(event) => event.currentTarget.select()}/></label>
      <div className="flex flex-wrap gap-2"><a href={mailto} className="inline-flex min-h-10 items-center rounded-lg bg-[#35B8FF] px-4 text-sm font-bold text-[#001A3F]">{text.draft}</a><button type="button" onClick={copyMessage} className="min-h-10 rounded-lg border border-[#BBD9E8] bg-white px-4 text-sm font-semibold text-[#164B6D]">{copied ? text.copied : text.copyMessage}</button></div>
      <p className="text-xs leading-5 text-[#557487]">The email app opens a draft; it does not send it. Review and press Send there. The recipient chooses their own password from the secure link.</p>
    </section>}
    {result && !result.ok && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{result.reason === "invalid" ? text.invalid : result.reason === "account_exists" ? text.exists : text.failed}</p>}
  </div>;
}
