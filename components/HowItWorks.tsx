"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function HowItWorks() {
  const { t } = useLang();

  return (
    <section id="how" className="relative scroll-mt-24 bg-ink2 py-20 lg:py-28">
      <div className="pattern-star absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-golddeep">
            {t.how.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t.how.title}
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.how.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 120}>
              <li className="relative h-full rounded-3xl border border-line bg-white p-7">
                <span className="gold-text text-5xl font-extrabold leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {step.desc}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
