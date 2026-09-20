"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { site, waLink } from "@/lib/config";
import { Reveal } from "./Reveal";
import { CheckIcon, ChevronDownIcon, PlayIcon, WhatsAppIcon } from "./icons";

/* VSL frame: YouTube embed when configured, branded poster otherwise */
function VideoVSL() {
  const { t } = useLang();
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-white shadow-2xl shadow-gold/10">
        {site.vslUrl && playing ? (
          <iframe
            src={`${site.vslUrl}?autoplay=1&rel=0`}
            title={t.hero.videoLabel}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full"
          />
        ) : (
          <button
            onClick={() => site.vslUrl && setPlaying(true)}
            className="group relative block aspect-video w-full cursor-pointer"
            aria-label={t.hero.videoLabel}
          >
            <div className="pattern-star absolute inset-0 bg-ink" />
            <div className="absolute -top-16 start-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl rtl:translate-x-1/2" />
            <Image
              src="/musbak-logo.png"
              alt=""
              width={180}
              height={107}
              className="absolute start-6 top-6 w-28 opacity-90 sm:w-36"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="absolute h-24 w-24 animate-ping rounded-full bg-gold/30 [animation-duration:2.5s] sm:h-28 sm:w-28" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gold shadow-2xl shadow-gold/40 transition-transform group-hover:scale-110 sm:h-24 sm:w-24">
                <PlayIcon className="ms-1 h-9 w-9 text-cream" />
              </span>
            </span>
            <span className="absolute bottom-5 end-5 rounded-full bg-ink/70 px-3 py-1 text-xs font-bold text-white backdrop-blur">
              2:00
            </span>
          </button>
        )}
      </div>
      <p className="mt-4 text-center text-sm text-muted">
        {t.hero.videoCaption}
      </p>
    </div>
  );
}

/* Grouped course dropdown + Learn button wired to WhatsApp */
function CoursePicker() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const ready = selected !== "";

  return (
    <div className="mx-auto mt-6 flex max-w-xl flex-col items-stretch gap-3 sm:flex-row">
      <div ref={ref} className="relative flex-1">
        <button
          onClick={() => setOpen(!open)}
          className={`flex w-full items-center justify-between gap-3 rounded-full border bg-white px-6 py-4 text-sm font-semibold shadow-lg shadow-black/5 transition-colors ${
            open ? "border-gold" : "border-line hover:border-gold/60"
          }`}
        >
          <span className={ready ? "text-cream" : "text-muted"}>
            {ready ? selected : t.hero.selectPlaceholder}
          </span>
          <ChevronDownIcon
            className={`h-4 w-4 shrink-0 text-golddeep transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute inset-x-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-line bg-white p-2 shadow-2xl shadow-black/15">
            {t.hero.courses.map((group) => (
              <div key={group.group} className="mb-1 last:mb-0">
                <p className="px-4 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-golddeep">
                  {group.group}
                </p>
                {group.items.map((course) => (
                  <button
                    key={course}
                    onClick={() => {
                      setSelected(course);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-start text-sm transition-colors ${
                      selected === course
                        ? "bg-gold/10 font-bold text-golddeep"
                        : "text-cream hover:bg-ink2"
                    }`}
                  >
                    {course}
                    {selected === course && (
                      <CheckIcon className="h-4 w-4 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <a
        href={ready ? waLink(t.wa.learn(selected)) : undefined}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!ready}
        onClick={(e) => {
          if (!ready) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className={`flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold transition-all ${
          ready
            ? "bg-gold text-cream hover:bg-gold2 hover:shadow-xl hover:shadow-gold/30"
            : "cursor-pointer bg-gold/40 text-cream/70"
        }`}
      >
        <WhatsAppIcon className="h-4 w-4" />
        {t.hero.learn}
      </a>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
      {/* backdrop */}
      <div className="pattern-star absolute inset-0 opacity-60" />
      <div className="absolute -top-40 start-1/4 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute bottom-0 end-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* 1. The question */}
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-golddeep">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold" />
            {t.hero.badge}
          </span>
          <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-extrabold uppercase leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            {t.hero.question1}{" "}
            <span className="gold-text">{t.hero.questionAccent}</span>{" "}
            {t.hero.question2}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {t.hero.sub}
          </p>
        </Reveal>

        {/* 2. VSL */}
        <Reveal delay={150} className="mt-14">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.25em] text-golddeep">
            {t.hero.videoLabel}
          </p>
          <VideoVSL />
        </Reveal>

        {/* 3. The answer + course picker */}
        <Reveal delay={100} className="mt-16 text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t.hero.covered1}{" "}
            <span className="gold-text">{t.hero.coveredAccent}</span>
          </h2>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
            {t.hero.coursesLabel}
          </p>
          <CoursePicker />
        </Reveal>

        {/* 4. Double CTA */}
        <Reveal delay={150} className="mt-12">
          <div className="mx-auto flex max-w-2xl flex-col items-stretch justify-center gap-4 sm:flex-row">
            <a
              href={waLink(t.wa.enroll)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-gold px-8 py-4 text-base font-bold uppercase tracking-wide text-cream transition-all hover:bg-gold2 hover:shadow-xl hover:shadow-gold/30"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t.hero.cta1}
            </a>
            <a
              href={waLink(t.wa.trial)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2.5 rounded-full border-2 border-cream/80 bg-white px-8 py-4 text-base font-bold uppercase tracking-wide text-cream transition-all hover:border-gold hover:text-golddeep"
            >
              {t.hero.cta2}
            </a>
          </div>
        </Reveal>

        {/* stats */}
        <Reveal delay={200} className="mt-16">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {t.hero.stats.map((s) => (
              <div key={s.v} className="bg-white px-6 py-6 text-center">
                <dt className="sr-only">{s.v}</dt>
                <dd className="text-2xl font-extrabold text-gold sm:text-3xl">
                  {s.k}
                </dd>
                <dd className="mt-1 text-xs text-muted sm:text-sm">{s.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
