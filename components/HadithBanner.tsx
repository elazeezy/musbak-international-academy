"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { StarMark } from "./icons";

export function HadithBanner() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden py-20 lg:py-24">
      <div className="absolute -start-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -end-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-golddeep/10 blur-3xl" />
      <Reveal className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-golddeep">
          {t.hadith.label}
        </p>
        <p
          dir="rtl"
          className="mt-6 text-2xl font-bold leading-loose text-cream sm:text-3xl lg:text-4xl lg:leading-loose"
          style={{ fontFamily: "var(--font-arabic)" }}
        >
          {t.hadith.ar}
        </p>
        {t.hadith.en && (
          <p className="mt-6 text-lg italic text-muted">{t.hadith.en}</p>
        )}
        <p className="mt-6 flex items-center justify-center gap-3 text-sm font-semibold text-golddeep">
          <StarMark className="h-4 w-4" />
          {t.hadith.source}
          <StarMark className="h-4 w-4" />
        </p>
      </Reveal>
    </section>
  );
}
