"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { CheckIcon } from "./icons";

export function About() {
  const { t } = useLang();

  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-8 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-white p-10 pattern-star">
              <Image
                src="/musbak-logo.png"
                alt="Musbak International Academy"
                width={440}
                height={260}
                className="mx-auto w-full max-w-xs drop-shadow-2xl"
              />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-golddeep">
              {t.about.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {t.about.title}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-6 leading-relaxed text-muted">{t.about.p1}</p>
            <p className="mt-4 leading-relaxed text-muted">{t.about.p2}</p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.about.points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5 text-sm font-medium"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
