"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function WhyMusbak() {
  const { t, lang } = useLang();
  const why = t.landing.why;

  const isArabic = lang === "ar";

  return (
    <section
      id="why"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative z-10 scroll-mt-24 overflow-hidden rounded-t-[42px] bg-[#EAF7FF] py-20 sm:rounded-t-[52px] sm:py-24 lg:rounded-t-[64px] lg:py-28"
    >
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Main white glow */}
        <div className="absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-white/80 blur-[120px]" />

        {/* Cyan glow */}
        <div className="absolute -left-32 top-1/3 h-[350px] w-[450px] rounded-full bg-[#35B8FF]/10 blur-[100px]" />

        {/* Right glow */}
        <div className="absolute -right-32 bottom-0 h-[400px] w-[500px] rounded-full bg-white/70 blur-[100px]" />

        {/* Very subtle atmosphere dots */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #258BC3 0.7px, transparent 0.7px)",
            backgroundSize: "24px 24px",
            maskImage:
              "radial-gradient(ellipse 70% 65% at 50% 50%, black, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 65% at 50% 50%, black, transparent 78%)",
          }}
        />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* =======================================================
            HEADER
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17639A] sm:text-xs">
              {isArabic ? "لماذا مسباك؟" : "WHY MUSBAK"}
            </span>

            <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.045em] text-[#001A3F] sm:text-4xl lg:text-[48px] lg:leading-[1.05]">
            {why.title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#607D90] sm:text-[15px]">
            {isArabic
              ? "تعلم مصمم حول الطالب، ومدعوم بعناية حقيقية في كل خطوة."
              : "A learning experience built around the student — with real care at every step."}
          </p>
        </motion.div>

        {/* =======================================================
            TRUST LINE
        ======================================================= */}

        <div className="relative mx-auto mt-12 max-w-[1180px] sm:mt-14">
          {/* horizontal connection line */}
          <div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-[31px] hidden h-px bg-[#B9DFF0] lg:block"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full origin-left bg-gradient-to-r from-[#35B8FF] via-[#62C9F2] to-[#B9E8FA]"
            />
          </div>

          {/* =====================================================
              ITEMS
          ===================================================== */}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.items.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative"
              >
                {/* Number */}
                <div className="relative z-10 mx-auto flex h-[62px] w-[62px] items-center justify-center rounded-full border border-[#A9DCF2] bg-[#EAF7FF] shadow-[0_8px_25px_rgba(0,80,120,0.07)]">
                  <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-white text-[#087CC1] shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[#35B8FF] group-hover:text-[#001A3F]">
                    <span className="text-xs font-black">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div className="relative mt-[-1px] min-h-[245px] overflow-hidden rounded-[24px] border border-white/90 bg-white/75 p-6 pt-8 text-center shadow-[0_12px_40px_rgba(0,50,90,0.055)] backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white group-hover:shadow-[0_20px_50px_rgba(0,50,90,0.09)]">
                  {/* glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#35B8FF]/7 blur-[30px] transition-opacity duration-300 group-hover:bg-[#35B8FF]/15"
                  />

                  {/* tiny check */}
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#E6F7FF] text-[#087CC1] transition-colors duration-300 group-hover:bg-[#D7F2FF]">
                    <CheckIcon />
                  </div>

                  <h3 className="relative mt-5 text-lg font-bold tracking-[-0.025em] text-[#001A3F]">
                    {item.title}
                  </h3>

                  <p className="relative mx-auto mt-3 max-w-[220px] text-xs leading-6 text-[#718999]">
                    {item.desc}
                  </p>

                  {/* cyan detail */}
                  <div className="mx-auto mt-6 h-1 w-8 rounded-full bg-[#35B8FF] transition-all duration-300 group-hover:w-14" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* =======================================================
            BOTTOM STATEMENT
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.4,
            duration: 0.6,
          }}
          className="mx-auto mt-10 flex max-w-3xl items-center justify-center gap-3 text-center"
        >
          <div className="hidden h-px flex-1 bg-[#C4E2EF] sm:block" />

          <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-4 py-2 shadow-sm backdrop-blur-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#001A3F] text-[#35B8FF]">
              <ArrowIcon />
            </span>

            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#52748A]">
              {isArabic
                ? "تعلم بثقة، خطوة بخطوة"
                : "Learn with confidence, step by step"}
            </span>
          </div>

          <div className="hidden h-px flex-1 bg-[#C4E2EF] sm:block" />
        </motion.div>
      </div>
    </section>
  );
}