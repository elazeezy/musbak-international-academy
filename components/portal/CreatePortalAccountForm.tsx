"use client";

import { useState, useTransition, type FormEvent } from "react";
import { createPortalAccountAction, type CreatePortalAccountResult } from "@/app/actions/admin";
import { signOutAction } from "@/app/actions/auth";

type AccountRole = "teacher" | "parent" | "adult_student";
type ClassOption = { id: string; name: string };

const copy = {
  en: {
    labels: { teacher: "Teacher / staff", parent: "Parent / guardian", adult_student: "Student" },
    name: "Full name",
    email: "Email address",
    password: "Password",
    generate: "Generate",
    create: "Create account",
    creating: "Creating account…",
    courses: "Activate courses (optional)",
    coursesHint: "Tick the classes this student is taking. They appear in the student portal right away. Create classes first if the list is empty.",
    coursesTeacher: "Assign courses they teach (optional)",
    coursesTeacherHint: "Tick the classes this teacher will teach. They appear in the teacher portal right away. Create classes first if the list is empty.",
    instructions: "Enter an email and a password. The account works immediately — share the details below and they can sign in straight to their portal.",
    created: "Account ready for",
    enrolled: (n: number) => `${n} course${n === 1 ? "" : "s"} activated.`,
    assigned: (n: number) => `${n} course${n === 1 ? "" : "s"} assigned.`,
    loginAt: "Sign-in page",
    copy: "Copy",
    copied: "Copied",
    copyAll: "Copy all details",
    loginAs: "Log in to the created account",
    loginAsHint: "This signs you out of the admin account and opens a fresh sign-in page for the new login.",
    invalid: "Enter a name, a valid email, and a password of at least 8 characters.",
    exists: "An account already uses this email.",
    failed: "The account could not be created. Try again.",
  },
  ar: {
    labels: { teacher: "معلم / موظف", parent: "ولي أمر / وصي", adult_student: "طالب" },
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    generate: "توليد",
    create: "إنشاء الحساب",
    creating: "جارٍ إنشاء الحساب…",
    courses: "تفعيل الدورات (اختياري)",
    coursesHint: "اختر الفصول التي يدرسها الطالب. ستظهر في بوابته فورًا. أنشئ الفصول أولًا إذا كانت القائمة فارغة.",
    coursesTeacher: "تحديد الدورات التي يُدرّسها (اختياري)",
    coursesTeacherHint: "اختر الفصول التي سيُدرّسها المعلم. ستظهر في بوابته فورًا. أنشئ الفصول أولًا إذا كانت القائمة فارغة.",
    instructions: "أدخل البريد وكلمة المرور. يعمل الحساب فورًا — شارك البيانات أدناه ليتمكن من تسجيل الدخول مباشرة إلى بوابته.",
    created: "الحساب جاهز لـ",
    enrolled: (n: number) => `تم تفعيل ${n} دورة.`,
    assigned: (n: number) => `تم إسناد ${n} دورة.`,
    loginAt: "صفحة تسجيل الدخول",
    copy: "نسخ",
    copied: "تم النسخ",
    copyAll: "نسخ كل البيانات",
    loginAs: "تسجيل الدخول بالحساب المُنشأ",
    loginAsHint: "سيؤدي هذا إلى تسجيل خروجك من حساب الإدارة وفتح صفحة تسجيل دخول جديدة للحساب الجديد.",
    invalid: "أدخل اسمًا وبريدًا صالحًا وكلمة مرور من 8 أحرف على الأقل.",
    exists: "يوجد حساب بهذا البريد بالفعل.",
    failed: "تعذر إنشاء الحساب. حاول مرة أخرى.",
  },
  fr: {
    labels: { teacher: "Enseignant / équipe", parent: "Parent / tuteur", adult_student: "Élève" },
    name: "Nom complet",
    email: "Adresse e-mail",
    password: "Mot de passe",
    generate: "Générer",
    create: "Créer le compte",
    creating: "Création du compte…",
    courses: "Activer les cours (facultatif)",
    coursesHint: "Cochez les classes que suit cet élève. Elles apparaissent aussitôt dans son portail. Créez d’abord des classes si la liste est vide.",
    coursesTeacher: "Attribuer les cours qu’il enseigne (facultatif)",
    coursesTeacherHint: "Cochez les classes que cet enseignant va donner. Elles apparaissent aussitôt dans son portail. Créez d’abord des classes si la liste est vide.",
    instructions: "Saisissez un e-mail et un mot de passe. Le compte fonctionne aussitôt — transmettez les informations ci-dessous pour une connexion directe au portail.",
    created: "Compte prêt pour",
    enrolled: (n: number) => `${n} cours activé${n === 1 ? "" : "s"}.`,
    assigned: (n: number) => `${n} cours attribué${n === 1 ? "" : "s"}.`,
    loginAt: "Page de connexion",
    copy: "Copier",
    copied: "Copié",
    copyAll: "Copier toutes les infos",
    loginAs: "Se connecter au compte créé",
    loginAsHint: "Cela vous déconnecte du compte admin et ouvre une page de connexion vierge pour le nouveau compte.",
    invalid: "Saisissez un nom, un e-mail valide et un mot de passe d’au moins 8 caractères.",
    exists: "Un compte utilise déjà cette adresse.",
    failed: "Impossible de créer le compte. Réessayez.",
  },
} as const;

function generatePassword(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const bytes = new Uint32Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (n) => alphabet[n % alphabet.length]).join("");
}

export function CreatePortalAccountForm({
  lang,
  role,
  classes = [],
}: {
  lang: "en" | "ar" | "fr";
  role: AccountRole;
  classes?: ClassOption[];
}) {
  const text = copy[lang];
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<CreatePortalAccountResult | null>(null);
  const [password, setPassword] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/${lang}/login`;
  const input =
    "mt-1 min-h-11 w-full rounded-xl border border-[#D6E8F1] bg-white px-3 text-sm text-[#001A3F] outline-none focus-visible:ring-2 focus-visible:ring-[#35B8FF]";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);
    const formData = new FormData(event.currentTarget);
    formData.set("role", role);
    formData.set("lang", lang);
    startTransition(async () => setResult(await createPortalAccountAction(formData)));
  }

  async function copyValue(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="space-y-3">
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-semibold">
          {text.name}
          <input name="name" required minLength={2} maxLength={100} disabled={pending} className={input} />
        </label>
        <label className="text-xs font-semibold">
          {text.email}
          <input name="email" type="email" autoComplete="off" required maxLength={254} disabled={pending} className={input} />
        </label>
        <label className="text-xs font-semibold sm:col-span-2">
          {text.password}
          <span className="mt-1 flex gap-2">
            <input
              name="password"
              type="text"
              required
              minLength={8}
              maxLength={128}
              disabled={pending}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`${input} mt-0 font-mono`}
            />
            <button
              type="button"
              onClick={() => setPassword(generatePassword())}
              disabled={pending}
              className="min-h-11 shrink-0 rounded-xl border border-[#BBD9E8] bg-white px-4 text-xs font-bold text-[#164B6D] hover:bg-[#F2FAFF]"
            >
              {text.generate}
            </button>
          </span>
        </label>

        {(role === "adult_student" || role === "teacher") && classes.length > 0 && (
          <fieldset className="sm:col-span-2">
            <legend className="text-xs font-semibold">{role === "teacher" ? text.coursesTeacher : text.courses}</legend>
            <div className="mt-2 grid gap-2 rounded-xl border border-[#E4EEF3] bg-[#F8FCFE] p-3 sm:grid-cols-2">
              {classes.map((option) => (
                <label key={option.id} className="flex items-start gap-2 text-xs font-medium">
                  <input type="checkbox" name="class_ids" value={option.id} className="mt-0.5 h-4 w-4 accent-[#087CC1]" />
                  <span className="text-[#35566B]">{option.name}</span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs leading-5 text-[#718A9A]">{role === "teacher" ? text.coursesTeacherHint : text.coursesHint}</p>
          </fieldset>
        )}

        <div className="sm:col-span-2">
          <button
            disabled={pending}
            className="min-h-11 rounded-xl bg-[#001A3F] px-4 text-sm font-bold text-white hover:bg-[#06274D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF] disabled:opacity-60"
          >
            {pending ? text.creating : text.create}
          </button>
        </div>
      </form>

      <p className="text-xs leading-5 text-[#718A9A]">{text.instructions}</p>

      {result?.ok && (
        <section className="space-y-3 rounded-xl border border-[#B7E5FB] bg-[#F2FAFF] p-4" aria-live="polite">
          <p className="text-sm font-semibold text-[#07518B]">
            {text.created} {result.name}.{" "}
            {result.enrolled > 0 && (
              <span className="text-[#2E6F49]">{role === "teacher" ? text.assigned(result.enrolled) : text.enrolled(result.enrolled)}</span>
            )}
          </p>
          {[
            { key: "email", label: text.email, value: result.email },
            { key: "password", label: text.password, value: result.password },
            { key: "login", label: text.loginAt, value: loginUrl },
          ].map((field) => (
            <label key={field.key} className="block text-xs font-semibold">
              {field.label}
              <span className="mt-1 flex gap-2">
                <input
                  readOnly
                  value={field.value}
                  onFocus={(event) => event.currentTarget.select()}
                  className="min-h-10 w-full rounded-lg border border-[#D6E8F1] bg-white px-3 font-mono text-xs text-[#31566C]"
                />
                <button
                  type="button"
                  onClick={() => copyValue(field.key, field.value)}
                  className="min-h-10 shrink-0 rounded-lg border border-[#BBD9E8] bg-white px-3 text-xs font-bold text-[#164B6D] hover:bg-white"
                >
                  {copiedKey === field.key ? text.copied : text.copy}
                </button>
              </span>
            </label>
          ))}
          <button
            type="button"
            onClick={() => copyValue("all", `${text.email}: ${result.email}\n${text.password}: ${result.password}\n${text.loginAt}: ${loginUrl}`)}
            className="min-h-10 rounded-lg bg-[#35B8FF] px-4 text-sm font-bold text-[#001A3F]"
          >
            {copiedKey === "all" ? text.copied : text.copyAll}
          </button>
          <div className="border-t border-[#C9E8F7] pt-3">
            <form action={signOutAction}>
              <input type="hidden" name="lang" value={lang} />
              <button className="min-h-10 w-full rounded-lg border border-[#001A3F] bg-white px-4 text-sm font-bold text-[#001A3F] hover:bg-[#001A3F] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF]">
                {text.loginAs}
              </button>
            </form>
            <p className="mt-2 text-xs leading-5 text-[#718A9A]">{text.loginAsHint}</p>
          </div>
        </section>
      )}

      {result && !result.ok && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {result.reason === "invalid" ? text.invalid : result.reason === "account_exists" ? text.exists : text.failed}
        </p>
      )}
    </div>
  );
}
