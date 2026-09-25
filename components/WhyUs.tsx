"use client";

import Image from "next/image";
import {
  Clock,
  GraduationCap,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

const FEATURE_ICONS = [
  ShieldCheck,
  Users,
  Clock,
  GraduationCap,
  TrendingUp,
  MessageCircle,
] as const;

export function WhyUs() {
  const { t } = useLang();

  return (
    <section id="why" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-golddeep">
            {t.why.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t.why.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.features.map((f, i) => {
            const Icon = FEATURE_ICONS[i] ?? ShieldCheck;
            return (
              <Reveal key={f.title} delay={(i % 3) * 70}>
                <div className="h-full rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-golddeep">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mx-auto mt-20 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-golddeep">
            {t.tutors.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t.tutors.title}
          </h2>
          <p className="mt-4 text-muted">{t.tutors.sub}</p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
          {t.tutors.items.map((tutor, i) => (
            <Reveal key={tutor.name} delay={i * 80} className="text-center">
              <Image
                src={`/images/teacher-${i + 1}.jpg`}
                alt={tutor.name}
                width={800}
                height={800}
                className="mx-auto aspect-square w-full max-w-56 rounded-2xl border border-line object-cover shadow-lg shadow-black/10"
              />
              <h3 className="mt-4 text-base font-bold">{tutor.name}</h3>
              <p className="mt-1 text-sm text-muted">{tutor.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
