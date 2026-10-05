"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLang } from "@/lib/i18n";
import Image from "next/image";

function StepIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-7 w-7"
      >
        <path d="M7 6.5h13a4 4 0 0 1 4 4v15H11a4 4 0 0 0-4 4V6.5Z" />
        <path d="M7 25.5h13a4 4 0 0 0 4-4" />
        <path d="M11 11h8M11 15h7M11 19h5" />
        <path d="m19.5 5.5 2 2 4-4" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-7 w-7"
      >
        <path d="M7 21c2.2 2.8 5.4 4.5 9 4.5 6.6 0 10.5-5.2 10.5-10.5 0-5.5-4.1-9.5-9.2-9.5-3.8 0-7.2 2.2-8.7 5.6" />
        <path d="M7.5 11.5 4 8l3.5-3.5" />
        <path d="M15 10c1.7-1.7 4.4-1.7 6.1 0" />
        <path d="M17 13.5h.01" />
        <path d="M13.5 17h.01" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-7 w-7"
      >
        <circle cx="16" cy="10" r="4" />
        <path d="M8 27c.5-5.2 3.2-8 8-8s7.5 2.8 8 8" />
        <path d="M4.5 7.5v17" />
        <path d="M27.5 7.5v17" />
        <path d="M2.5 9.5h4M25.5 9.5h4" />
      </svg>
    );
  }

  if (index === 3) {
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-7 w-7"
      >
        <rect x="7" y="4.5" width="18" height="23" rx="2.5" />
        <path d="M11 10h10M11 15h10M11 20h6" />
        <path d="m20 20 1.5 1.5L24.5 18" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-7 w-7"
    >
      <circle cx="16" cy="16" r="11.5" />
      <path d="M4.5 16h23" />
      <path d="M16 4.5c3.2 3.1 4.8 6.9 4.8 11.5S19.2 24.4 16 27.5c-3.2-3.1-4.8-6.9-4.8-11.5S12.8 7.6 16 4.5Z" />
      <path d="M8.5 9.5h15M8.5 22.5h15" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function Journey() {
  const { t, lang } = useLang();
  const { title, steps } = t.landing.journey;

  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 28%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  const pathScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  useMotionValueEvent(smoothProgress, "change", (value) => {
    const total = steps.length;

    if (!total) return;

    const nextStep = Math.min(
      total - 1,
      Math.max(0, Math.floor(value * total))
    );

    setActiveStep(nextStep);
  });

  const isArabic = lang === "ar";

  return (
    <section
      id="journey"
      ref={sectionRef}
      dir={isArabic ? "rtl" : "ltr"}
      className="relative scroll-mt-24 overflow-hidden"
    >
      {/* =========================================================
          FULL LANDSCAPE BACKGROUND
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src="/images/journey-mosque-landscape.png"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Soft white veil */}
        <div className="absolute inset-0 bg-white/10" />

        {/* Blue atmospheric wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
  "linear-gradient(180deg, rgba(221,241,255,0.62) 0%, rgba(221,241,255,0.52) 38%, rgba(241,249,253,0.62) 72%, rgba(255,255,255,0.82) 100%)",
          }}
        />

        {/* Extra center readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.25), rgba(221,241,255,0.08) 45%, rgba(255,255,255,0.45) 100%)",
          }}
        />

        {/* Gentle blur layer */}
        <div className="absolute inset-0 bg-[#DDF1FF]/10 backdrop-blur-[1px]" />
      </div>

      {/* =========================================================
          TOP ATMOSPHERIC GLOW
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[850px] -translate-x-1/2 rounded-full bg-white/45 blur-[110px]"
      />

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        {/* =======================================================
            HEADER
        ======================================================= */}

        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17639A] sm:text-xs">
                {isArabic ? "رحلتك التعليمية" : "YOUR LEARNING JOURNEY"}
              </span>

              <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />
            </div>

            <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#001A3F] sm:text-4xl lg:text-[44px]">
              {title}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#55738A] sm:text-[15px] sm:leading-7">
              {isArabic
                ? "من أول درس لك إلى تقدمك على المدى الطويل، نرافقك في كل خطوة من الطريق."
                : lang === "fr"
                  ? "De votre premier cours à votre progression à long terme, nous sommes avec vous à chaque étape."
                  : "From your first class to long-term progress, we are with you every step of the way."}
            </p>
          </motion.div>
        </div>

        {/* =======================================================
            DESKTOP JOURNEY
        ======================================================= */}

        <div className="relative mt-16 hidden lg:block">
          {/* Main path */}
          <div className="absolute left-[9%] right-[9%] top-[59px] h-[3px]">
            <div className="absolute inset-0 rounded-full bg-[#B7D9ED]/80" />

            <motion.div
              style={{
                scaleX: pathScale,
              }}
              className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#35B8FF] via-[#168DDD] to-[#07518B] ${
                isArabic ? "origin-right" : "origin-left"
              }`}
            />

            {/* Traveling light */}
            <motion.div
              style={{
                left: isArabic ? undefined : "0%",
                right: isArabic ? "0%" : undefined,
                scaleX: pathScale,
              }}
              className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgba(53,184,255,0.2),0_0_22px_rgba(53,184,255,0.9)]"
            />
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-5 gap-4">
            {steps.map((step, index) => {
              const isActive = index <= activeStep;

              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                >
                  {/* Icon */}
                  <div className="relative z-20 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: isActive ? 1 : 0.92,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`relative flex h-[118px] w-[118px] items-center justify-center rounded-full border transition-all duration-500 ${
                        isActive
                          ? "border-[#8FD7FA] bg-white/95 shadow-[0_15px_40px_rgba(0,94,160,0.14)]"
                          : "border-[#C9E1EE] bg-white/75"
                      }`}
                    >
                      <div
                        className={`absolute inset-[8px] rounded-full transition-all duration-500 ${
                          isActive ? "bg-[#E6F6FF]" : "bg-[#F4FAFD]"
                        }`}
                      />

                      <div
                        className={`relative z-10 transition-colors duration-500 ${
                          isActive ? "text-[#07518B]" : "text-[#7190A5]"
                        }`}
                      >
                        <StepIcon index={index} />
                      </div>

                      {/* Number */}
                      <div
                        className={`absolute -left-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-extrabold shadow-sm transition-all duration-500 ${
                          isActive
                            ? "border-[#B9E4FA] bg-[#E5F6FF] text-[#07518B]"
                            : "border-[#D7E7EF] bg-white text-[#7590A1]"
                        }`}
                      >
                        {step.num}
                      </div>
                    </motion.div>
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0.35,
                        x: isActive ? 2 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className="absolute -right-[19px] top-[49px] z-30 flex h-8 w-8 items-center justify-center text-[#65A8CD]"
                    >
                      <ArrowRight />
                    </motion.div>
                  )}

                  {/* Content card */}
                  <motion.div
                    animate={{
                      y: isActive ? -3 : 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`mt-7 min-h-[178px] rounded-[24px] border px-5 py-6 text-center backdrop-blur-md transition-all duration-500 ${
                      isActive
                        ? "border-white/90 bg-white/90 shadow-[0_18px_45px_rgba(0,59,103,0.10)]"
                        : "border-white/70 bg-white/65"
                    }`}
                  >
                    <h3
                      className={`text-lg font-bold tracking-[-0.02em] transition-colors duration-500 ${
                        isActive ? "text-[#001A3F]" : "text-[#49667A]"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-2 max-w-[180px] text-xs leading-5 text-[#668196]">
                      {step.desc}
                    </p>

                    <motion.div
                      initial={false}
                      animate={{
                        scaleX: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      className="mx-auto mt-5 h-[2px] w-10 origin-center rounded-full bg-[#35B8FF]"
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-10 flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#7292A7]"
          >
            <span className="h-px w-10 bg-[#B8D9E9]" />

            <span>
              {isArabic ? "تقدم خطوة بخطوة" : "STEP BY STEP"}
            </span>

            <span className="h-px w-10 bg-[#B8D9E9]" />
          </motion.div>
        </div>

        {/* =======================================================
            MOBILE JOURNEY
        ======================================================= */}

        <div className="relative mt-12 lg:hidden">
          {/* Vertical path */}
          <div
            className={`absolute bottom-8 top-8 w-[2px] bg-[#B7D9ED] ${
              isArabic ? "right-[25px]" : "left-[25px]"
            }`}
          >
            <motion.div
              style={{
                scaleY: pathScale,
              }}
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-[#35B8FF] to-[#07518B]"
            />
          </div>

          <div className="space-y-5">
            {steps.map((step, index) => {
              const isActive = index <= activeStep;

              return (
                <motion.div
                  key={step.num}
                  initial={{
                    opacity: 0,
                    x: isArabic ? 25 : -25,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative flex items-start gap-5 ${
                    isArabic ? "flex-row-reverse" : ""
                  }`}
                >
                  {/* Node */}
                  <div className="relative z-10 shrink-0">
                    <motion.div
                      animate={{
                        scale: isActive ? 1 : 0.9,
                      }}
                      className={`flex h-[52px] w-[52px] items-center justify-center rounded-full border shadow-sm transition-all duration-500 ${
                        isActive
                          ? "border-[#8FD7FA] bg-white text-[#07518B] shadow-[0_8px_25px_rgba(0,93,160,0.15)]"
                          : "border-[#D0E4EF] bg-[#F8FCFE] text-[#7590A1]"
                      }`}
                    >
                      <StepIcon index={index} />

                      <span
                        className={`absolute -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[8px] font-bold ${
                          isArabic ? "-left-1" : "-right-1"
                        } ${
                          isActive
                            ? "bg-[#DDF3FF] text-[#07518B]"
                            : "bg-white text-[#7891A2]"
                        }`}
                      >
                        {step.num}
                      </span>
                    </motion.div>
                  </div>

                  {/* Mobile card */}
                  <motion.div
                    animate={{
                      y: isActive ? -2 : 0,
                    }}
                    className="flex-1 rounded-[22px] border border-white/85 bg-white/85 p-5 shadow-[0_10px_30px_rgba(0,59,103,0.07)] backdrop-blur-md"
                  >
                    <h3 className="text-lg font-bold tracking-[-0.02em] text-[#001A3F]">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-[#668196]">
                      {step.desc}
                    </p>

                    <div className="mt-4 h-[2px] w-8 rounded-full bg-[#35B8FF]" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM FADE
      ========================================================= */}

      <div
        aria-hidden="true"
        className="relative h-16 bg-gradient-to-b from-transparent to-white"
      />
    </section>
  );
}