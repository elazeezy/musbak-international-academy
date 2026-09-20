"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { StarMark } from "./icons";

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
          {t.why.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 120}>
              <div className="h-full rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-golddeep">
                  <StarMark className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
