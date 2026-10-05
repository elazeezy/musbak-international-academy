"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { site } from "@/lib/config";

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        d="M9 7.5L17 12L9 16.5V7.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function VSLSection() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

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

const video = getVideoSrc(
  site.heroVideo ||
    site.vslLocal?.[
      lang as keyof typeof site.vslLocal
    ],
);

  return (
    <>
     <section
  id="vsl"
  dir={isArabic ? "rtl" : "ltr"}
  className="relative overflow-hidden rounded-t-[38px] bg-[#001A3F] sm:rounded-t-[48px] lg:rounded-t-[58px]"
>
        {/* =====================================================
            ATMOSPHERE
        ===================================================== */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-[#35B8FF]/10 blur-[110px]" />

          <div className="absolute -left-32 bottom-0 h-[300px] w-[350px] rounded-full bg-[#35B8FF]/5 blur-[100px]" />

          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #8DDCFF 0.7px, transparent 0.7px)",
              backgroundSize: "26px 26px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 85%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black, transparent 85%)",
            }}
          />
        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="relative mx-auto max-w-7xl px-5 py-11 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          {/* ===================================================
              INTRO
          =================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#35B8FF]" />

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#72CFFF] sm:text-[10px]">
                {isArabic
                  ? "شاهد مسباك في الواقع"
                  : "SEE MUSBAK IN ACTION"}
              </p>

              <span className="h-1.5 w-1.5 rounded-full bg-[#35B8FF]" />
            </div>

            <h2 className="text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl lg:text-[38px]">
              {isArabic
                ? "تجربة تعليمية تتجاوز الشاشة."
                : "Learning that feels personal."}
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-white/55 sm:text-sm">
              {isArabic
                ? "ألقِ نظرة أقرب على طريقة التعلم في مسباك."
                : "Take a closer look at how learning with Musbak comes to life."}
            </p>
          </motion.div>

          {/* ===================================================
              VIDEO
          =================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 28,
              scale: 0.985,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.75,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-9 max-w-5xl"
          >
            <div className="relative aspect-[16/6] overflow-hidden rounded-[24px] border border-white/10 bg-[#061D38] shadow-[0_30px_80px_rgba(0,0,0,0.28)] sm:aspect-[16/6] sm:rounded-[28px]">
              {/* =================================================
                  VIDEO
              ================================================= */}

              {video ? (
                <video
                  src={video}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                /* Temporary visual placeholder until VSL exists */
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(53,184,255,0.22),transparent_45%),linear-gradient(135deg,#082B4C,#001A3F_55%,#000F26)]" />

                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/35 to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#72CFFF]">
                        VSL
                      </p>

                      <p className="mt-2 text-xs text-white/40">
                        {isArabic
                          ? "الفيديو التعريفي سيظهر هنا"
                          : "Your introduction video will appear here"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  DARK CINEMATIC OVERLAY
              ================================================= */}

              <div className="absolute inset-0 bg-gradient-to-t from-[#001A3F]/75 via-[#001A3F]/15 to-transparent" />

              <div className="absolute inset-0 bg-[#001A3F]/10" />

              {/* =================================================
                  PLAY BUTTON
              ================================================= */}

              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label={
                    isArabic
                      ? "تشغيل الفيديو"
                      : "Play Musbak introduction video"
                  }
                  className="group relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white text-[#001A3F] shadow-[0_15px_45px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 hover:bg-[#EAF8FF] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#35B8FF] sm:h-20 sm:w-20"
                >
                  <span className="absolute inset-[-8px] rounded-full border border-white/25 transition-all duration-500 group-hover:inset-[-12px] group-hover:border-[#35B8FF]/60" />

                  <PlayIcon />
                </button>
              </div>

              {/* =================================================
                  VIDEO LABEL
              ================================================= */}

              <div className="absolute bottom-4 start-4 sm:bottom-5 sm:start-5">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#001A3F]/45 px-3 py-1.5 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#35B8FF]" />

                  <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/75">
                    {isArabic
                      ? "شاهد الفيديو"
                      : "WATCH VIDEO"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ===================================================
              BOTTOM LABEL
          =================================================== */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mt-7 flex items-center justify-center gap-3 text-[8px] font-bold uppercase tracking-[0.25em] text-white/25"
          >
            <span className="h-px w-8 bg-white/15" />

            <span>
              {isArabic
                ? "تعلّم • تواصل • نمُ"
                : "LEARN • CONNECT • GROW"}
            </span>

            <span className="h-px w-8 bg-white/15" />
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          FULLSCREEN VIDEO MODAL
      ========================================================= */}

      <AnimatePresence>
        {open && video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000814]/95 p-4 backdrop-blur-md sm:p-8"
            onClick={() => setOpen(false)}
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
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative w-full max-w-6xl overflow-hidden rounded-[20px] bg-black shadow-[0_40px_120px_rgba(0,0,0,0.5)] sm:rounded-[28px]"
              onClick={(event) => event.stopPropagation()}
            >
              <video
                src={video}
                controls
                autoPlay
                playsInline
                className="max-h-[82vh] w-full object-contain"
              />

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={
                  isArabic
                    ? "إغلاق الفيديو"
                    : "Close video"
                }
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF] rtl:right-auto rtl:left-4"
              >
                <CloseIcon />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}