"use client";

import { ArrowRight, Atom, BookOpen, Languages } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/config";
import { Reveal } from "./Reveal";

const TRACK_ICONS = [BookOpen, Languages, Atom] as const;

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
          {t.tracks.items.map((track, i) => {
            const Icon = TRACK_ICONS[i] ?? BookOpen;
            return (
              <Reveal key={track.title} delay={i * 70}>
                <div className="group flex h-full flex-col rounded-2xl border border-line bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-2xl hover:shadow-gold/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-golddeep">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <span className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-gold/70">
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
                        className="rounded-lg border border-line bg-ink2 px-3 py-1 text-xs text-cream/80 transition-colors group-hover:border-gold/30"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <a
                    href={waLink(t.wa.track(track.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 self-start border-t border-line pt-5 text-sm font-bold text-golddeep transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-golddeep"
                  >
                    {t.tracks.startLabel}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                      strokeWidth={2}
                    />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
