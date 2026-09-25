"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/config";
import { Reveal } from "./Reveal";
import { RiskRow } from "./RiskRow";
import { StarMark, WhatsAppIcon } from "./icons";

export function FinalCTA() {
  const { t } = useLang();

  return (
    <section className="relative px-5 pb-24 lg:px-8">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl bg-cream px-6 py-16 text-center sm:px-12 lg:py-20">
          <Image
            src="/images/bg-cta.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover opacity-15"
          />
          <div className="absolute -top-24 start-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl rtl:translate-x-1/2" />
          <div className="relative">
            <StarMark className="mx-auto h-8 w-8 text-gold/70" />
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-extrabold tracking-tight text-gold sm:text-5xl">
              {t.cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink/75">
              {t.cta.sub}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={waLink(t.wa.trial)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-ink px-9 py-4 text-base font-bold text-cream transition-all hover:bg-white hover:shadow-2xl hover:shadow-gold/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t.cta.button}
              </a>
              <a
                href="#pricing"
                className="text-sm font-bold text-ink/80 underline-offset-4 transition-colors hover:text-gold hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {t.cta.secondary}
              </a>
            </div>
            <RiskRow className="mt-7 text-ink/60" iconClassName="text-gold" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
