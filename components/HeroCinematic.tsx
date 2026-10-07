"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useLang } from "@/lib/i18n";
import { site, waLink } from "@/lib/config";

export function HeroCinematic() {
  const { lang, t } = useLang();
  const h = t.landing.hero;

  const [vslOpen, setVslOpen] = useState(false);

  const isArabic = lang === "ar";

  /*
   * ================================================================
   * VIDEO SOURCE
   * ================================================================
   */

  const getVideoSrc = (value: unknown): string => {
    if (typeof value === "string") {
      return value;
    }

    if (
      value &&
      typeof value === "object" &&
      "src" in value &&
      typeof value.src === "string"
    ) {
      return value.src;
    }

    return "";
  };

  const vsl = getVideoSrc(
    site.heroVideo ||
      site.vslLocal?.[lang as keyof typeof site.vslLocal]
  );

  /*
   * ================================================================
   * ENTRANCE ANIMATION
   * ================================================================
   */

  const entrance = (delay: number) => ({
    initial: {
      opacity: 0,
      y: 18,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: 0.8,
      delay,
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
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <>
      <section
        id="top"
        dir={isArabic ? "rtl" : "ltr"}
        className="
          relative
          isolate
          min-h-[1040px]
          overflow-hidden
          bg-[#001A3F]
          lg:min-h-screen
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
            src="/images/hero-mosque.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-center
              opacity-[0.42]
              grayscale
              contrast-[1.08]
              saturate-[0.7]
            "
          />

          {/* Blue colour treatment */}
          <div
            className="
              absolute
              inset-0
              bg-[#004B78]/55
              mix-blend-color
            "
          />

          {/* Deep navy overlay */}
          <div
            className="
              absolute
              inset-0
              bg-[#001A3F]/45
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
              h-[620px]
              bg-gradient-to-b
              from-[#001A3F]
              via-[#001A3F]/96
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
            DESKTOP CHILD
           
            English + French:
              RIGHT

            Arabic:
              LEFT

            No glass cards around the child.
            ============================================================ */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            hidden
            lg:block
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 1.1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`
              absolute
              bottom-[-35px]
              h-[780px]
              w-[760px]
              ${
                isArabic
                  ? "left-[-2%] xl:left-[0%]"
                  : "right-[-2%] xl:right-[0%]"
              }
              xl:h-[820px]
              xl:w-[800px]
            `}
          >
            <Image
              src="/images/hero-child-cutout.png"
              alt="A young student reading the Qur'an"
              fill
              priority
              sizes="60vw"
              className="
                object-contain
                object-bottom
              "
            />

            {/* Subtle integration with the hero background */}
            <div
              className={`
                absolute
                inset-0
                ${
                  isArabic
                    ? "bg-gradient-to-r from-transparent via-transparent to-[#001A3F]/10"
                    : "bg-gradient-to-l from-transparent via-transparent to-[#001A3F]/10"
                }
              `}
            />

            {/* Fade the lower edge into the hero */}
            <div
              className="
                absolute
                inset-x-0
                bottom-0
                h-[190px]
                bg-gradient-to-t
                from-[#001A3F]
                via-[#001A3F]/60
                to-transparent
              "
            />
          </motion.div>
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
            flex
            min-h-[1040px]
            w-full
            max-w-[1480px]
            items-start
            px-5
            pt-28
            sm:px-8
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
          </div>
        </div>

        {/* ============================================================
            MOBILE CHILD

            Mobile is intentionally a different composition.
            ============================================================ */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-1/2
            z-20
            block
            h-[400px]
            w-[470px]
            -translate-x-1/2
            lg:hidden
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              h-full
              w-full
            "
          >
            <Image
              src="/images/hero-child-cutout.png"
              alt="A young student reading the Qur'an"
              fill
              priority
              sizes="90vw"
              className="
                object-contain
                object-bottom
              "
            />

            <div
              className="
                absolute
                inset-x-0
                bottom-0
                h-[150px]
                bg-gradient-to-t
                from-[#001A3F]
                via-[#001A3F]/70
                to-transparent
              "
            />
          </motion.div>
        </div>

        {/* ============================================================
            MOBILE VSL
            ============================================================ */}

        <motion.button
          type="button"
          onClick={() => {
            if (vsl) {
              setVslOpen(true);
            } else {
              scrollToPaths();
            }
          }}
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.9,
          }}
          className="
            absolute
            bottom-[385px]
            left-1/2
            z-50
            flex
            -translate-x-1/2
            items-center
            gap-2
            rounded-full
            border
            border-white/15
            bg-[#001A3F]/65
            px-4
            py-2.5
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.16em]
            text-white/75
            backdrop-blur-xl
            transition
            hover:border-[#35B8FF]/40
            hover:text-white
            lg:hidden
          "
        >
          <span
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              bg-[#35B8FF]
              text-[#001A3F]
            "
          >
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2.7 1.4 7 4.5 2.7 7.6V1.4Z"
                fill="currentColor"
              />
            </svg>
          </span>

          {vsl ? "Watch our story" : "See Musbak in action"}
        </motion.button>

        {/* ============================================================
            VSL MODAL
            ============================================================ */}

        <AnimatePresence>
          {vslOpen && vsl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-[#001A3F]/90
                p-5
                backdrop-blur-xl
              "
              role="dialog"
              aria-modal="true"
              aria-label="Musbak Academy video"
              onClick={() => setVslOpen(false)}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  y: 15,
                }}
                className="
                  relative
                  w-full
                  max-w-5xl
                  overflow-hidden
                  rounded-3xl
                  bg-black
                  shadow-2xl
                "
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setVslOpen(false)}
                  aria-label="Close video"
                  className="
                    absolute
                    right-4
                    top-4
                    z-10
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-black/50
                    text-white
                    backdrop-blur-md
                    transition
                    hover:bg-black/75
                  "
                >
                  ×
                </button>

                <video
                  src={vsl}
                  controls
                  autoPlay
                  playsInline
                  className="
                    aspect-video
                    w-full
                    bg-black
                  "
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}