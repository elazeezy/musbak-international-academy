"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useLang } from "@/lib/i18n";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

const PROFILE_STYLES = [
  {
    background: "bg-[#E2F5FF]",
    text: "text-[#087CC1]",
  },
  {
    background: "bg-[#EAF0FF]",
    text: "text-[#365FAD]",
  },
  {
    background: "bg-[#E4F7F3]",
    text: "text-[#167A68]",
  },
  {
    background: "bg-[#EEF1FF]",
    text: "text-[#5366B2]",
  },
  {
    background: "bg-[#E7F7FF]",
    text: "text-[#087CC1]",
  },
];

function ProfileIcon({
  name,
  index,
}: {
  name: string;
  index: number;
}) {
  const style = PROFILE_STYLES[index % PROFILE_STYLES.length];

  return (
    <div
      className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${style.background} ${style.text} ring-4 ring-white shadow-[0_5px_18px_rgba(0,50,90,0.08)]`}
    >
      {/* subtle person silhouette */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="absolute inset-0 h-full w-full opacity-[0.12]"
      >
        <circle cx="12" cy="8" r="3.5" fill="currentColor" />
        <path
          d="M5.5 20c.7-4.1 2.8-6.2 6.5-6.2s5.8 2.1 6.5 6.2"
          fill="currentColor"
        />
      </svg>

      <span className="relative z-10 text-[11px] font-black">
        {getInitials(name)}
      </span>
    </div>
  );
}

function Stars() {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label="5 out of 5 stars"
    >
      {[0, 1, 2, 3, 4].map((star) => (
        <Star
          key={star}
          className="h-3 w-3 fill-[#35B8FF] text-[#35B8FF]"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const { t, lang } = useLang();
  const { eyebrow, title, disclaimer, items } = t.testimonials;

  const [active, setActive] = useState(0);

  const isArabic = lang === "ar";

  /*
   * We show three testimonials at a time on desktop.
   * The active index controls the group, while the mobile layout
   * naturally becomes one card at a time.
   */

  const visibleItems =
    items.length <= 3
      ? items
      : [
          items[active % items.length],
          items[(active + 1) % items.length],
          items[(active + 2) % items.length],
        ];

  const goNext = () => {
    setActive((current) =>
      items.length ? (current + 1) % items.length : 0,
    );
  };

  const goPrevious = () => {
    setActive((current) =>
      items.length
        ? (current - 1 + items.length) % items.length
        : 0,
    );
  };

  return (
    <section
      id="testimonials"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative z-10 -mt-8 scroll-mt-24 overflow-hidden rounded-t-[42px] bg-white pt-14 pb-20 shadow-[0_-18px_60px_rgba(0,45,80,0.055)] sm:-mt-10 sm:rounded-t-[52px] sm:pt-16 lg:-mt-14 lg:rounded-t-[64px] lg:pt-20 lg:pb-24"
    >
      {/* =========================================================
          TOP ATMOSPHERE
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[280px]"
      >
        <div className="absolute left-1/2 top-0 h-[240px] w-[700px] -translate-x-1/2 rounded-full bg-[#EAF8FF] opacity-70 blur-[100px]" />

        <div className="absolute left-[10%] top-10 h-32 w-32 rounded-full bg-[#35B8FF]/5 blur-[50px]" />

        <div className="absolute right-[8%] top-16 h-40 w-40 rounded-full bg-[#BEEAFF]/25 blur-[60px]" />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* =======================================================
            HEADER
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17639A] sm:text-xs">
              {eyebrow}
            </p>

            <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.045em] text-[#001A3F] sm:text-4xl lg:text-[44px]">
            {title}
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#6B8494]">
            {isArabic
              ? "قصص وتجارب حقيقية من مجتمع مسباك العالمي."
              : "Real stories from our global learning community."}
          </p>
        </motion.div>

        {/* =======================================================
            TESTIMONIAL CARDS
        ======================================================= */}

        <div className="relative mt-10 sm:mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid gap-4 md:grid-cols-3"
            >
              {visibleItems.map((item, index) => {
                /*
                 * Find the actual index so profile colors remain
                 * consistent when the carousel moves.
                 */
                const originalIndex = items.findIndex(
                  (entry) => entry.name === item.name,
                );

                return (
                  <motion.article
                    key={`${item.name}-${active}-${index}`}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.07,
                    }}
                    className={`group relative flex min-h-[265px] flex-col overflow-hidden rounded-[24px] border border-[#E4EEF3] p-5 shadow-[0_12px_35px_rgba(0,45,80,0.045)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,45,80,0.08)] ${
                      index === 1
                        ? "bg-[#F2FAFE]"
                        : "bg-[#F8FBFD]"
                    }`}
                  >
                    {/* decorative quote */}
                    <div className="absolute end-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#35B8FF] shadow-sm">
                      <Quote
                        className="h-4 w-4"
                        strokeWidth={2}
                      />
                    </div>

                    {/* subtle card glow */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -end-16 -top-16 h-36 w-36 rounded-full bg-[#35B8FF]/5 blur-[35px] transition-opacity group-hover:bg-[#35B8FF]/10"
                    />

                    {/* =================================================
                        QUOTE
                    ================================================= */}

                    <blockquote className="relative z-10 flex-1 pe-10">
                      <p className="text-sm font-medium leading-6 text-[#35566A] sm:text-[13px] sm:leading-6">
                        “{item.quote}”
                      </p>
                    </blockquote>

                    {/* =================================================
                        PROFILE
                    ================================================= */}

                    <div className="relative z-10 mt-7 border-t border-[#DCEAF1] pt-4">
                      <div className="flex items-center gap-3">
                        <ProfileIcon
                          name={item.name}
                          index={
                            originalIndex >= 0
                              ? originalIndex
                              : index
                          }
                        />

                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-[#001A3F]">
                            {item.name}
                          </p>

                          <p className="mt-0.5 truncate text-[9px] font-medium text-[#78909F]">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <Stars />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* =========================================================
              MOBILE / DESKTOP CONTROLS
          ========================================================= */}

          <div className="mt-6 flex items-center justify-between">
            {/* progress indicators */}
            <div className="flex items-center gap-1.5">
              {items.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={
                    isArabic
                      ? `التقييم ${index + 1}`
                      : `Testimonial ${index + 1}`
                  }
                  aria-current={index === active}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#35B8FF] ${
                    index === active
                      ? "w-7 bg-[#35B8FF]"
                      : "w-1.5 bg-[#C9DDE8] hover:bg-[#8DCDEB]"
                  }`}
                />
              ))}
            </div>

            {/* arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrevious}
                aria-label={
                  isArabic
                    ? "التقييم السابق"
                    : "Previous testimonial"
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCEAF1] bg-white text-[#3E6479] shadow-sm transition-all hover:border-[#35B8FF] hover:bg-[#EAF8FF] hover:text-[#087CC1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label={
                  isArabic
                    ? "التقييم التالي"
                    : "Next testimonial"
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCEAF1] bg-white text-[#3E6479] shadow-sm transition-all hover:border-[#35B8FF] hover:bg-[#EAF8FF] hover:text-[#087CC1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            TRUST NOTE
        ========================================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mt-8 max-w-2xl text-center"
        >
          <p className="text-[9px] leading-5 text-[#8BA0AC]">
            {disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}