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
    site.vslLocal?.[
      lang as keyof typeof site.vslLocal
    ],
);

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
          min-h-[780px]
          overflow-hidden
          bg-[#001A3F]
          lg:min-h-screen
        "
      >
        {/* ========================================================
            BACKGROUND — MOSQUE
            Full bleed. NO container. NO grid.
        ========================================================= */}

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

          {/* Blue Musbak color treatment */}
          <div
            className="
              absolute
              inset-0
              bg-[#004B78]/55
              mix-blend-color
            "
          />

          {/* Deep navy overlay — keeps the hero branded */}
          <div
            className="
              absolute
              inset-0
              bg-[#001A3F]/45
            "
          />

          {/* Stronger visibility on the right */}
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

          {/* Protect the text area */}
          <div
            className="
              absolute
              inset-y-0
              left-0
              w-[58%]
              bg-gradient-to-r
              from-[#001A3F]
              via-[#001A3F]/92
              to-transparent
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

          {/* Bottom atmosphere */}
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

          {/* Cyan atmospheric glow behind child */}
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

          {/* Small secondary glow */}
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

        {/* ========================================================
            MAIN HERO
        ========================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[780px]
            w-full
            max-w-[1480px]
            items-center
            px-5
            pb-20
            pt-28
            sm:px-8
            lg:min-h-screen
            lg:px-10
            lg:pb-14
            lg:pt-24
            xl:px-14
          "
        >
          <div
            className="
              grid
              w-full
              items-center
              lg:grid-cols-[0.88fr_1.12fr]
              xl:grid-cols-[0.86fr_1.14fr]
            "
          >
            {/* ====================================================
                LEFT — TEXT
            ===================================================== */}

            <div
              className="
                relative
                z-40
                max-w-[620px]
                lg:pb-12
              "
            >
              {/* Eyebrow */}
              <motion.div {...entrance(0)}>
                <span
                  className="
                    inline-flex
                    items-center
                    gap-3
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-[#35B8FF]
                    sm:text-[11px]
                  "
                >
                  <span className="h-px w-8 bg-[#35B8FF]" />
                  {h.kicker}
                </span>
              </motion.div>

              {/* Headline */}
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

              {/* Supporting text */}
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

              {/* Buttons */}
              <motion.div
                {...entrance(0.24)}
                className="
                  mt-9
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                "
              >
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

            {/* ====================================================
                RIGHT — CHILD FLOATING DIRECTLY IN HERO
                NO FRAME
                NO IMAGE CARD
                NO RECTANGLE
            ===================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                inset-y-0
                right-0
                z-20
                hidden
                w-[64%]
                lg:block
              "
            >
              {/* Child cutout */}

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
                className="
                  absolute
                  bottom-[-35px]
                  right-[-2%]
                  h-[780px]
                  w-[760px]
                  xl:right-[1%]
                  xl:h-[820px]
                  xl:w-[800px]
                "
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

                {/* Subtle blue integration over the cutout */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-l
                    from-transparent
                    via-transparent
                    to-[#001A3F]/12
                  "
                />

                {/* Bottom fade */}
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

              {/* ==================================================
                  GLASS — PERSONALIZED LEARNING
              =================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -12,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.65,
                }}
                className="
                  pointer-events-auto
                  absolute
                  left-[2%]
                  top-[35%]
                  z-40
                  w-[205px]
                  rounded-2xl
                  border
                  border-white/20
                  bg-[#102A4D]/45
                  p-3
                  shadow-[0_20px_60px_rgba(0,0,0,0.22)]
                  backdrop-blur-xl
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#35B8FF]/15
                      text-[#35B8FF]
                    "
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M9 2.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM3 15.5c.7-2.6 2.5-3.9 6-3.9s5.3 1.3 6 3.9"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-white">
                      Personalized
                    </p>

                    <p className="mt-0.5 text-[9px] text-white/50">
                      Learning
                    </p>

                    <p className="mt-1 text-[8px] text-white/35">
                      One-to-one or small groups
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ==================================================
                  GLASS — QUALIFIED TUTORS
              =================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 12,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.8,
                }}
                className="
                  pointer-events-auto
                  absolute
                  right-[1%]
                  top-[46%]
                  z-40
                  w-[205px]
                  rounded-2xl
                  border
                  border-white/20
                  bg-[#102A4D]/45
                  p-3
                  shadow-[0_20px_60px_rgba(0,0,0,0.22)]
                  backdrop-blur-xl
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#35B8FF]/15
                      text-[#35B8FF]
                    "
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                    >
                      <path
                        d="M3.5 7.2 9.5 3l6 4.2-6 4.1-6-4.1Z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M5.5 9.1v3.2c0 1.3 1.8 2.5 4 2.5s4-1.2 4-2.5V9.1"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-white">
                      Qualified Tutors
                    </p>

                    <p className="mt-0.5 text-[9px] text-white/50">
                      Experienced and certified
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ==================================================
                  GLASS — GLOBAL COMMUNITY
              =================================================== */}

              <motion.div
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
                  delay: 0.92,
                }}
                className="
                  pointer-events-auto
                  absolute
                  bottom-[13%]
                  left-[11%]
                  z-40
                  w-[190px]
                  rounded-2xl
                  border
                  border-white/20
                  bg-[#102A4D]/45
                  p-3
                  shadow-[0_20px_60px_rgba(0,0,0,0.22)]
                  backdrop-blur-xl
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#35B8FF]/15
                      text-[#35B8FF]
                    "
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <circle
                        cx="9"
                        cy="9"
                        r="6.5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />

                      <path
                        d="M2.8 9h12.4M9 2.5c1.5 1.7 2.3 3.9 2.3 6.5S10.5 13.8 9 15.5M9 2.5C7.5 4.2 6.7 6.4 6.7 9s.8 4.8 2.3 6.5"
                        stroke="currentColor"
                        strokeWidth="1.1"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-white">
                      Global Community
                    </p>

                    <p className="mt-0.5 text-[9px] leading-4 text-white/50">
                      Students from around the world
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ==================================================
                  VSL
              =================================================== */}

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
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 1,
                }}
                className="
                  pointer-events-auto
                  group
                  absolute
                  bottom-[1%]
                  right-[4%]
                  z-50
                  flex
                  w-[430px]
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/15
                  bg-[#001A3F]/70
                  p-2.5
                  text-left
                  shadow-[0_20px_70px_rgba(0,0,0,0.3)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-[#35B8FF]/40
                  hover:bg-[#001A3F]/85
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#35B8FF]
                "
              >
                <span
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#35B8FF]
                    text-[#001A3F]
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                  >
                    <path
                      d="M4 2.4 10 6.5 4 10.6V2.4Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold text-white">
                    See Musbak in action
                  </span>

                  <span className="mt-0.5 block text-[9px] text-white/45">
                    A glimpse into the learning experience
                  </span>
                </span>

                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  className="mr-2 text-white/35 transition-all group-hover:translate-x-0.5 group-hover:text-[#35B8FF]"
                >
                  <path
                    d="m5.5 3.5 4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ========================================================
            MOBILE CHILD
        ========================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            right-[-20%]
            z-10
            block
            h-[430px]
            w-[540px]
            opacity-90
            lg:hidden
          "
        >
          <Image
            src="/images/hero-child-cutout.png"
            alt=""
            fill
            sizes="90vw"
            className="object-contain object-bottom"
          />

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-32
              bg-gradient-to-t
              from-[#001A3F]
              to-transparent
            "
          />
        </div>

        {/* ========================================================
            VSL MODAL
        ========================================================= */}

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
                onClick={(event) =>
                  event.stopPropagation()
                }
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
                  className="aspect-video w-full bg-black"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}