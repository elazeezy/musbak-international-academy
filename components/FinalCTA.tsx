"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/wa";

export function FinalCTA() {
  const { lang, t } = useLang();
  const ref = useRef<HTMLElement>(null);

  const isArabic = lang === "ar";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const mosqueY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const mosqueScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.04, 1.1],
  );

  const scrollToPrograms = () => {
    document
      .getElementById("paths")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="final-cta"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative z-10 -mt-8 overflow-hidden rounded-t-[42px] bg-[#001A3F] sm:-mt-10 sm:rounded-t-[52px] lg:-mt-14 lg:rounded-t-[64px]"
    >
      {/* =========================================================
          MOSQUE BACKGROUND
      ========================================================= */}

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{
            y: mosqueY,
            scale: mosqueScale,
          }}
          className="absolute -inset-[5%]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/hero-mosque.jpg')",
            }}
          />
        </motion.div>

        {/* Deep navy tint — keeps the mosque obvious while
            making the section feel cinematic rather than sky-blue */}
        <div className="absolute inset-0 bg-[#001A3F]/65" />

        {/* Stronger bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000F26] via-[#001A3F]/35 to-[#001A3F]/45" />

        {/* Text protection */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,26,63,0.18)_0%,rgba(0,26,63,0.5)_70%,rgba(0,15,38,0.72)_100%)]" />

        {/* Cyan atmospheric glow */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[380px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#35B8FF]/10 blur-[120px]"
        />
      </div>

      {/* =========================================================
          SUBTLE TOP EDGE
      ========================================================= */}

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#72D2FF]/70 to-transparent"
      />

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative z-10 flex min-h-[480px] items-center justify-center px-5 py-24 sm:min-h-[520px] sm:px-8 lg:min-h-[560px] lg:px-12">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* =====================================================
              EYEBROW
          ===================================================== */}

          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#35B8FF]" />

            <span className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#8DDCFF] sm:text-[10px]">
              {isArabic
                ? "رحلتك تبدأ هنا"
                : "YOUR JOURNEY STARTS HERE"}
            </span>

            <span className="h-1.5 w-1.5 rounded-full bg-[#35B8FF]" />
          </div>

          {/* =====================================================
              MAIN HEADLINE
          ===================================================== */}

          <h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl lg:text-[60px]">
            {isArabic
              ? "رحلتك مع العلم تبدأ هنا."
              : "Your journey starts here."}
          </h2>

          {/* =====================================================
              DESCRIPTION
          ===================================================== */}

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-[15px]">
            {isArabic
              ? "تعلم مع معلّم، اختبر تجربة تعليمية حقيقية، وابدأ رحلتك مع مسباك."
              : "Meet a tutor. Experience a real class. Begin your learning journey with Musbak."}
          </p>

          {/* =====================================================
              CTA BUTTONS
          ===================================================== */}

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* Primary */}
            <a
              href={waLink(t.wa.trial)}
              className="group flex min-h-12 items-center justify-center gap-3 rounded-xl bg-white px-7 py-3 text-xs font-bold text-[#001A3F] shadow-[0_10px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EAF8FF] hover:shadow-[0_15px_45px_rgba(0,0,0,0.25)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#35B8FF]"
            >
              <span>
                {isArabic
                  ? "احجز درسًا تجريبيًا مجانيًا"
                  : "Book a Free Trial"}
              </span>

              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF8FF] text-[#087CC1] transition-transform duration-300 group-hover:bg-[#35B8FF] ${
                  isArabic
                    ? "group-hover:-translate-x-0.5"
                    : "group-hover:translate-x-0.5"
                }`}
              >
                {isArabic ? "←" : "→"}
              </span>
            </a>

            {/* Secondary */}
            <button
              type="button"
              onClick={scrollToPrograms}
              className="group flex min-h-12 items-center justify-center gap-3 rounded-xl border border-white/30 bg-white/5 px-7 py-3 text-xs font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#72D2FF]/70 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#35B8FF]"
            >
              <span>
                {isArabic
                  ? "استكشف البرامج"
                  : "Explore Programs"}
              </span>

              <span
                className={`text-[#72D2FF] transition-transform duration-300 ${
                  isArabic
                    ? "group-hover:-translate-x-0.5"
                    : "group-hover:translate-x-0.5"
                }`}
              >
                {isArabic ? "←" : "→"}
              </span>
            </button>
          </div>

          {/* =====================================================
              SMALL TRUST LINE
          ===================================================== */}

          <div className="mt-10 flex items-center justify-center gap-3 text-[9px] font-medium uppercase tracking-[0.18em] text-white/40">
            <span className="h-px w-8 bg-white/20" />

            <span>
              {isArabic
                ? "القرآن • العربية • العلوم الإسلامية • التميز الأكاديمي"
                : "Qur'an • Arabic • Islamic Sciences • Academic Excellence"}
            </span>

            <span className="h-px w-8 bg-white/20" />
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          BOTTOM FADE INTO FOOTER
      ========================================================= */}

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-[#000B1B]/55 to-transparent"
      />
    </section>
  );
}