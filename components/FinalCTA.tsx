"use client";

import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/config";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./icons";

export function FinalCTA() {
  const { t } = useLang();

  return (
    <section className="relative px-5 pb-24 lg:px-8">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/30 bg-gradient-to-b from-gold/15 via-white to-white px-6 py-16 text-center sm:px-12 lg:py-20">
          <div className="pattern-star absolute inset-0 opacity-60" />
          <div className="absolute -top-24 start-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl rtl:translate-x-1/2" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">
              {t.cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
              {t.cta.sub}
            </p>
            <a
              href={waLink(t.wa.trial)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-gold px-9 py-4 text-base font-bold text-cream transition-all hover:bg-gold2 hover:shadow-2xl hover:shadow-gold/30"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t.cta.button}
            </a>
            <p className="mt-5 text-xs text-muted">{t.cta.small}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
