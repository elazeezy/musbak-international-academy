"use client";

import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/config";
import { Reveal } from "./Reveal";
import { RiskRow } from "./RiskRow";
import { CheckIcon, WhatsAppIcon } from "./icons";

export function Pricing() {
  const { t } = useLang();

  return (
    <section id="pricing" className="relative scroll-mt-24 bg-ink2 py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-golddeep">
            {t.pricing.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-muted">{t.pricing.sub}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.pricing.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 70}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                  plan.popular
                    ? "border-gold bg-gradient-to-b from-gold/15 to-white shadow-2xl shadow-gold/15"
                    : "border-line bg-white"
                }`}
              >
                {plan.popular && (
                  <span className="mx-auto -mt-10 mb-5 block w-fit rounded-lg bg-gold px-4 py-1 text-xs font-bold text-cream">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{plan.desc}</p>
                <p className="mt-5">
                  <span className="gold-text text-4xl font-extrabold">
                    {plan.price}
                  </span>
                  {plan.per && (
                    <span className="ms-1 text-sm text-muted">{plan.per}</span>
                  )}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span className="text-cream/85">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(t.wa.plan(plan.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golddeep ${
                    plan.popular
                      ? "bg-gold text-cream hover:bg-gold2 hover:shadow-lg hover:shadow-gold/25"
                      : "border border-line text-cream hover:border-gold hover:text-gold"
                  }`}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {plan.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <RiskRow className="mt-8 text-muted" />
          <p className="mt-8 text-center text-sm text-muted">
            {t.pricing.note}
          </p>
          <p className="mt-2 text-center text-xs text-muted/70">
            {t.pricing.payments}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
