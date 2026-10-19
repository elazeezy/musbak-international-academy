"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/config";
import { OPEN_VSL_EVENT } from "@/lib/vsl";

export function HeroCinematic() {
  const { lang, t } = useLang();
  const h = t.landing.hero;

  const isArabic = lang === "ar";
  const reduceMotion = useReducedMotion();

  /*
   * ================================================================
   * ENTRANCE ANIMATION
   * ================================================================
   */

  const entrance = (delay: number) => ({
    initial: false,
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: reduceMotion ? 0 : 0.55,
      delay: reduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  /*
   * ================================================================
   * SCROLL TO PROGRAM PATHS
   * ================================================================
   */

  const scrollToPaths = () => {
    document
      .getElementById("paths")
      ?.scrollIntoView({
        behavior: reduceMotion ? "instant" : "smooth",
        block: "start",
      });
  };

  const playVsl = () => {
    const vsl = document.getElementById("vsl");
    if (!vsl) {
      window.dispatchEvent(new Event(OPEN_VSL_EVENT));
      return;
    }

    vsl.scrollIntoView({
      behavior: reduceMotion ? "instant" : "smooth",
      block: "start",
    });

    const openVideo = () => window.dispatchEvent(new Event(OPEN_VSL_EVENT));
    if (reduceMotion) {
      openVideo();
      return;
    }

    let opened = false;
    const finishScroll = () => {
      if (opened) return;
      opened = true;
      window.clearTimeout(fallbackTimer);
      document.removeEventListener("scrollend", finishScroll);
      openVideo();
    };
    const fallbackTimer = window.setTimeout(finishScroll, 1100);
    document.addEventListener("scrollend", finishScroll, { once: true });
  };

  return (
    <>
      <section
        id="top"
        dir={isArabic ? "rtl" : "ltr"}
        className="
          relative
          isolate
          min-h-0
          overflow-hidden
          pb-8
          lg:min-h-screen
          lg:pb-0
          bg-[#001A3F]
        "
      >
        {/* ============================================================
            BACKGROUND — MOSQUE
            ============================================================ */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
          "
          aria-hidden="true"
        >
          {/* Mosque photograph */}
          <Image
            src="/images/hero-mosque.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={70}
            sizes="100vw"
            className="
              object-cover
              object-center
              opacity-[0.9] lg:opacity-[0.68]
              contrast-[1.08]
              saturate-[0.82] lg:grayscale lg:saturate-[0.7]
            "
          />

          {/* Blue colour treatment */}
          <div
            className="
              absolute
              inset-0
              bg-[#004B78]/38
              mix-blend-color
            "
          />

          {/* Deep navy overlay */}
          <div
            className="
              absolute
              inset-0
              bg-[#001A3F]/32
            "
          />

          {/* Right-side atmosphere */}
          <div
            className="
              absolute
              inset-y-0
              right-0
              w-[72%]
              bg-gradient-to-l
              from-transparent
              via-[#001A3F]/10
              to-[#001A3F]/80
            "
          />

          {/* Desktop text protection */}
          <div
            className="
              absolute
              inset-y-0
              left-0
              hidden
              w-[58%]
              bg-gradient-to-r
              from-[#001A3F]
              via-[#001A3F]/92
              to-transparent
              lg:block
            "
          />

          {/* Mobile text protection */}
          <div
            className="
              absolute
              inset-x-0
              top-0
              h-[720px]
              bg-gradient-to-b
              from-[#001A3F]
              via-[#001A3F]/88
              to-transparent
              lg:hidden
            "
          />

          {/* Top atmosphere */}
          <div
            className="
              absolute
              inset-x-0
              top-0
              h-[260px]
              bg-gradient-to-b
              from-[#001A3F]/85
              to-transparent
            "
          />

          {/* Desktop bottom atmosphere */}
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-[300px]
              bg-gradient-to-t
              from-[#001A3F]
              via-[#001A3F]/75
              to-transparent
            "
          />

          {/* Mobile bottom atmosphere */}
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-[430px]
              bg-gradient-to-t
              from-[#001A3F]
              via-[#001A3F]/92
              to-transparent
              lg:hidden
            "
          />

          {/* Cyan glow */}
          <div
            className="
              absolute
              right-[8%]
              top-[24%]
              h-[600px]
              w-[600px]
              rounded-full
              bg-[#35B8FF]/10
              blur-[130px]
            "
          />

          {/* Mobile glow */}
          <div
            className="
              absolute
              bottom-[12%]
              left-1/2
              h-[360px]
              w-[360px]
              -translate-x-1/2
              rounded-full
              bg-[#35B8FF]/8
              blur-[110px]
              lg:hidden
            "
          />

          {/* Secondary glow */}
          <div
            className="
              absolute
              right-[32%]
              bottom-[5%]
              h-[350px]
              w-[350px]
              rounded-full
              bg-[#35B8FF]/7
              blur-[110px]
            "
          />
        </div>

        {/* ============================================================
            DESKTOP TEXT

            English + French:
              LEFT

            Arabic:
              RIGHT
            ============================================================ */}

        <div
          className="
            relative
            z-30
            mx-auto
            hidden
            min-h-[980px]
            w-full
            max-w-[1480px]
            items-start
            px-5
            pt-28
            sm:px-8
            lg:flex
            lg:min-h-screen
            lg:items-center
            lg:px-10
            lg:pb-14
            lg:pt-24
            xl:px-14
          "
        >
          <div
            className={`
              w-full
              max-w-[620px]
              lg:w-[48%]
              ${
                isArabic
                  ? "lg:ml-auto lg:mr-0 text-right"
                  : "lg:ml-0 lg:mr-auto text-left"
              }
            `}
          >
            {/* ========================================================
                EYEBROW
                ======================================================== */}

            <motion.div {...entrance(0)}>
              <span
                className={`
                  inline-flex
                  items-center
                  gap-3
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#35B8FF]
                  sm:text-[11px]
                  ${
                    isArabic
                      ? "flex-row-reverse"
                      : "flex-row"
                  }
                `}
              >
                <span className="h-px w-8 bg-[#35B8FF]" />

                {h.kicker}
              </span>
            </motion.div>

            {/* ========================================================
                HEADLINE
                ======================================================== */}

            <motion.h1
              {...entrance(0.08)}
              className="
                mt-7
                max-w-[610px]
                font-display
                text-[clamp(3rem,5vw,5.2rem)]
                font-semibold
                leading-[0.98]
                tracking-[-0.045em]
                text-white
              "
            >
              <span className="block">
                {h.line1}
              </span>

              <span className="block text-[#35B8FF]">
                {h.line2}
              </span>
            </motion.h1>

            {/* ========================================================
                SUPPORTING COPY
                ======================================================== */}

            <motion.p
              {...entrance(0.16)}
              className="
                mt-7
                max-w-[535px]
                text-[15px]
                leading-7
                text-white/65
                sm:text-base
              "
            >
              {h.sub}
            </motion.p>

            {/* ========================================================
                BUTTONS
                ======================================================== */}

            <motion.div
              {...entrance(0.24)}
              className={`
                mt-9
                flex
                flex-col
                gap-3
                sm:flex-row
                ${
                  isArabic
                    ? "sm:flex-row-reverse"
                    : "sm:flex-row"
                }
              `}
            >
              {/* Primary */}
              <button
                type="button"
                onClick={scrollToPaths}
                className="
                  group
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-[#35B8FF]
                  px-6
                  text-sm
                  font-bold
                  text-[#001A3F]
                  shadow-[0_15px_50px_rgba(53,184,255,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-white
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#35B8FF]
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#001A3F]
                "
              >
                {h.primary}

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className={isArabic ? "rotate-180" : ""}
                >
                  <path
                    d="M3.5 8h8M8.5 4.5 12 8l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Secondary */}
              <a
                href={waLink(t.wa.trial)}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.025]
                  px-6
                  text-sm
                  font-semibold
                  text-white/90
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:border-white/30
                  hover:bg-white/[0.07]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white
                  focus-visible:ring-offset-2
                  focus-visible:ring-offset-[#001A3F]
                "
              >
                {h.secondary}
              </a>
            </motion.div>
            <button
              type="button"
              onClick={playVsl}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-medium text-white/75 transition-colors hover:text-[#35B8FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#35B8FF]/70 text-[#35B8FF]" aria-hidden="true">▶</span>
              {h.seeInAction}
            </button>
          </div>
        </div>

        {/* Mobile composition: copy and actions occupy their own flow above the learner. */}
        <div className="relative z-30 mx-auto w-full max-w-[680px] px-5 pb-0 pt-[88px] sm:px-8 lg:hidden">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.18em] text-[#35B8FF] sm:text-[10px]">
              {h.kicker}
            </p>
            <h1 className="max-w-[13ch] font-display text-[clamp(2.35rem,9vw,3.65rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white [overflow-wrap:anywhere]">
              <span className="block">{h.line1}</span>
              <span className="block text-[#35B8FF]">{h.mobileLine2}</span>
              <span className="block text-[#35B8FF]">{h.mobileLine3}</span>
            </h1>
            <p className="mt-4 max-w-[34rem] text-[13px] leading-[1.55] text-white/80 sm:text-base sm:leading-7">
              {h.sub}
            </p>
            <div className={lang === "fr" ? "mt-5 flex max-w-[520px] flex-col gap-2" : "mt-5 flex max-w-[520px] flex-col gap-2 min-[390px]:flex-row min-[390px]:flex-wrap"}>
              <button
                type="button"
                onClick={scrollToPaths}
                className="group inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-full bg-[#35B8FF] px-2 text-[11px] font-bold leading-tight text-[#001A3F] transition-colors hover:bg-white active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF] sm:gap-3 sm:px-5 sm:text-sm"
              >
                {h.primary}
                <span aria-hidden="true" className={isArabic ? "rotate-180" : ""}>→</span>
              </button>
              <a
                href={waLink(t.wa.trial)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-full border border-white/35 bg-[#001A3F]/60 px-3 text-[12px] font-semibold leading-tight text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF] sm:px-5 sm:text-sm"
              >
                {h.secondary}
              </a>
              <button
                type="button"
                onClick={playVsl}
                className="inline-flex min-h-10 items-center justify-center gap-2 self-center rounded-full px-4 text-[13px] font-medium text-white/90 transition-colors hover:text-[#35B8FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF] min-[390px]:basis-full"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#35B8FF]/70 text-[#35B8FF]" aria-hidden="true">▶</span>
                {h.seeInAction}
              </button>
            </div>
          </motion.div>
        </div>

        <motion.figure
          initial={false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 mx-auto mt-0 h-[min(100vw,420px)] w-full max-w-[520px] lg:pointer-events-none lg:absolute lg:inset-0 lg:mx-auto lg:min-h-full lg:max-w-[1480px]"
        >
          <div
            className={`relative h-full w-full lg:absolute lg:bottom-[-35px] lg:h-[780px] lg:w-[760px] xl:h-[820px] xl:w-[800px] ${
              isArabic ? "lg:left-[-2%] xl:left-0" : "lg:right-[-2%] xl:right-0"
            }`}
          >
            <Image
              src="/images/hero-child-cutout.webp"
              alt={lang === "ar" ? "طفل يقرأ القرآن الكريم" : lang === "fr" ? "Un enfant lit le Coran" : "A young student reading the Qur’an"}
              fill
              loading="eager"
              fetchPriority="high"
              quality={78}
              sizes="(min-width: 1280px) 800px, (min-width: 1024px) 760px, (max-width: 520px) 100vw, 520px"
              className="object-contain object-bottom"
            />
            <div className={`absolute inset-0 hidden lg:block ${isArabic ? "bg-gradient-to-r from-transparent via-transparent to-[#001A3F]/10" : "bg-gradient-to-l from-transparent via-transparent to-[#001A3F]/10"}`} />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-[190px] bg-gradient-to-t from-[#001A3F] via-[#001A3F]/60 to-transparent lg:block" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#001A3F] to-transparent lg:hidden" />
          </div>
        </motion.figure>
      </section>
    </>
  );
}
