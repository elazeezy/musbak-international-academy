"use client";

import {
  CalendarCheck,
  MessageCircle,
  Route,
  TrendingUp,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

const STEP_ICONS = [MessageCircle, CalendarCheck, Route, TrendingUp] as const;

export function HowItWorks() {
  const { t } = useLang();

  return (
    <section id="how" className="relative scroll-mt-24 bg-ink2 py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-golddeep">
            {t.how.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t.how.title}
          </h2>
        </Reveal>

        <div className="relative mt-14">
          {/* dashed gold connector between steps (desktop) */}
          <div
            aria-hidden
            className="absolute start-[12%] end-[12%] top-[3.4rem] hidden border-t-2 border-dashed border-gold/50 lg:block"
          />
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.how.steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? MessageCircle;
              return (
                <Reveal key={step.title} delay={i * 70}>
                  <li className="relative h-full rounded-2xl border border-line bg-white p-7">
                    <div className="flex items-start justify-between gap-3">
                      <span className="gold-text text-5xl font-extrabold leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-golddeep">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {step.desc}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
