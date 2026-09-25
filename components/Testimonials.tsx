"use client";

import Image from "next/image";
import { CheckCheck, Info } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/* Decorative chat timestamps for the sample bubbles. */
const TIMES = ["09:41", "18:07", "21:15"];

export function Testimonials() {
  const { t } = useLang();

  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-golddeep">
            {t.testimonials.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t.testimonials.title}
          </h2>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
            <Info className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            {t.testimonials.disclaimer}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {t.testimonials.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 70}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-sm">
                <figcaption className="flex items-center gap-3 border-b border-line pb-4">
                  <Image
                    src={`/images/avatar-${(i % 3) + 1}.jpg`}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border border-line object-cover"
                  />
                  <span>
                    <span className="block text-sm font-bold">{item.name}</span>
                    <span className="block text-xs text-muted">{item.role}</span>
                  </span>
                </figcaption>
                <div className="relative mt-4 flex-1 rounded-2xl rounded-ss-sm bg-[#DCF8C6] px-4 py-3.5">
                  <span
                    aria-hidden
                    className="absolute -top-0.5 -start-1 h-3 w-3 bg-[#DCF8C6] [clip-path:polygon(0_0,100%_0,0_100%)] rtl:-scale-x-100"
                  />
                  <blockquote className="text-sm leading-relaxed text-cream/90">
                    {item.quote}
                  </blockquote>
                  <div className="mt-2 flex items-center justify-end gap-1 text-[11px] font-medium text-cream/50">
                    {TIMES[i % TIMES.length]}
                    <CheckCheck
                      className="h-3.5 w-3.5 text-[#53BDEB]"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
