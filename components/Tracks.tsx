"use client";

import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/config";
import { Reveal } from "./Reveal";

export function Tracks() {
  const { t } = useLang();

  return (
    <section id="programs" className="relative scroll-mt-24 py-20 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-golddeep">
            {t.tracks.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t.tracks.title}
          </h2>
          <p className="mt-4 text-muted">{t.tracks.sub}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.tracks.items.map((track, i) => (
            <Reveal key={track.title} delay={i * 120}>
              <a
                href={waLink(t.wa.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/10"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold/70">
                  {track.tag}
                </span>
                <h3 className="mt-3 text-xl font-bold leading-snug">
                  {track.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {track.desc}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {track.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-line bg-ink2 px-3 py-1 text-xs text-cream/80 transition-colors group-hover:border-gold/30"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
