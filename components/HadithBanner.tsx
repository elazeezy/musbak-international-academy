"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function HadithBanner() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden px-5 py-20 lg:px-8 lg:py-24">
      <Reveal className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-ink2 px-6 py-12 text-center sm:px-12 lg:py-16">
          <Image
            src="/images/bg-hadith.jpg"
            alt=""
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover opacity-25"
          />
          <div className="absolute -start-24 -top-24 h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -bottom-24 -end-24 h-56 w-56 rounded-full bg-golddeep/10 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-golddeep">
              {t.hadith.label}
            </p>
            <p
              dir="rtl"
              lang="ar"
              className="mt-8 font-quran text-3xl font-bold leading-loose text-cream sm:text-4xl lg:leading-loose"
            >
              {t.hadith.ar}
            </p>
            {t.hadith.en && (
              <p className="mt-8 text-lg italic text-muted">{t.hadith.en}</p>
            )}
            <div
              aria-hidden
              className="mt-8 flex items-center justify-center gap-4"
            >
              <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-golddeep"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect
                  x="7"
                  y="7"
                  width="10"
                  height="10"
                  transform="rotate(45 12 12)"
                />
                <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
              </svg>
              <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            </div>
            <p className="mt-4 text-sm font-semibold text-golddeep">
              {t.hadith.source}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
