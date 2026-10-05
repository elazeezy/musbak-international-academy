"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/* Interactive curriculum explorer: pick a track, see its learning path.
   Copy: t.landing.curriculum. */
export function CurriculumExplorer() {
  const { t } = useLang();
  const { title, sub, paths } = t.landing.curriculum;
  const [active, setActive] = useState(0);
  const current = paths[active];

  return (
    <section id="curriculum" className="scroll-mt-24 bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <h2 className="max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-body">{sub}</p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div
            role="tablist"
            aria-label={title}
            className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-0"
          >
            {paths.map((p, i) => (
              <button
                key={p.label}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`shrink-0 border-s-2 px-5 py-4 text-start font-serif text-xl tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:border-line ${
                  i === active
                    ? "border-gold text-golddeep"
                    : "border-line text-muted hover:text-cream"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="min-h-40">
            <AnimatePresence mode="wait">
              <motion.ol
                key={current.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col gap-y-0"
              >
                {current.steps.map((step, i) => (
                  <li
                    key={step}
                    className="flex items-baseline gap-6 border-t border-line py-5 last:border-b"
                  >
                    <span className="font-serif text-sm text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-2xl tracking-tight sm:text-3xl">
                      {step}
                    </span>
                    {i < current.steps.length - 1 && (
                      <span
                        aria-hidden
                        className="ms-auto text-muted rtl:-scale-x-100"
                      >
                        →
                      </span>
                    )}
                  </li>
                ))}
              </motion.ol>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
