"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

function BookIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M5 7a3 3 0 0 1 3-3h17v21H8a3 3 0 0 0-3 3V7Z" />
      <path d="M5 25a3 3 0 0 1 3-3h17" />
      <path d="M10 9h10M10 13h9M10 17h6" />
    </svg>
  );
}

function TajweedIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M8 21c2.2 2.8 5.2 4.5 8.5 4.5 5.8 0 9-4.8 9-9.5 0-5-3.7-8.5-8.4-8.5-3.4 0-6.4 2-7.8 5" />
      <path d="m8 12-3.5-3.5L8 5" />
      <path d="M15 12h.01M19 15h.01M12 18h.01" />
    </svg>
  );
}

function HifzIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M16 5v22" />
      <path d="M11 9h10M11 14h10M11 19h10" />
      <path d="M7 25h18" />
    </svg>
  );
}

function RevisionIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="M7 11a10 10 0 0 1 17-3" />
      <path d="m23 4 1 5-5-1" />
      <path d="M25 21a10 10 0 0 1-17 3" />
      <path d="m9 28-1-5 5 1" />
      <path d="M12 16h8" />
    </svg>
  );
}

function IjazahIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
    >
      <path d="m16 4 3.2 6.5 7.2 1-5.2 5.1 1.2 7.2-6.4-3.4-6.4 3.4 1.2-7.2-5.2-5.1 7.2-1L16 4Z" />
      <path d="M12 22v5l4-2 4 2v-5" />
    </svg>
  );
}

const icons = [
  <BookIcon key="reading" />,
  <TajweedIcon key="tajweed" />,
  <HifzIcon key="hifz" />,
  <RevisionIcon key="revision" />,
  <IjazahIcon key="ijazah" />,
];

export function QuranExperience() {
  const { t, lang } = useLang();
  const q = t.landing.quran;

  const isArabic = lang === "ar";

  const fallbackItems = isArabic
    ? [
        {
          name: "القراءة",
          desc: "أساس قوي",
        },
        {
          name: "التجويد",
          desc: "تلاوة صحيحة",
        },
        {
          name: "الحفظ",
          desc: "حفظ متدرج",
        },
        {
          name: "المراجعة",
          desc: "تثبيت المحفوظ",
        },
        {
          name: "مسار الإجازة",
          desc: "نحو الإتقان",
        },
      ]
    : [
        {
          name: "Reading",
          desc: "Strong foundation",
        },
        {
          name: "Tajweed",
          desc: "Correct recitation",
        },
        {
          name: "Hifz",
          desc: "Guided memorization",
        },
        {
          name: "Revision",
          desc: "Keep progressing",
        },
        {
          name: "Ijazah Pathway",
          desc: "Toward mastery",
        },
      ];

  const items =
    q.items && q.items.length > 0
      ? q.items.slice(0, 5)
      : fallbackItems;

  return (
    <section
      id="quran"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative scroll-mt-24 overflow-hidden bg-[#001A3F] text-white"
    >
      {/* =========================================================
          ATMOSPHERE
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Main blue glow */}
        <div className="absolute -left-40 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#168DDD]/12 blur-[120px]" />

        <div className="absolute right-0 top-0 h-[360px] w-[520px] rounded-full bg-[#35B8FF]/8 blur-[120px]" />

        {/* Soft center light */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 58% 50%, rgba(53,184,255,0.09), transparent 32%), linear-gradient(115deg, #001A3F 0%, #002653 52%, #001A3F 100%)",
          }}
        />

        {/* Very subtle horizon */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#35B8FF]/20 to-transparent" />
      </div>

      {/* =========================================================
          COMPACT CONTENT
      ========================================================= */}

      <div className="relative mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-[72px]">
        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* =====================================================
              QUR'AN CUTOUT
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: isArabic ? 45 : -45,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`relative flex items-center justify-center ${
              isArabic ? "lg:order-2" : "lg:order-1"
            }`}
          >
            {/* Glow behind Qur'an */}
            <div className="absolute h-[280px] w-[280px] rounded-full bg-[#35B8FF]/14 blur-[80px]" />

            {/* Floating Qur'an */}
            <motion.div
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 w-[78%] max-w-[500px] sm:w-[65%] lg:w-[105%] lg:max-w-[560px]"
            >
              <Image
                src="/images/quran-feature.png"
                alt={
                  isArabic
                    ? "القرآن الكريم مفتوحًا على رحل"
                    : "Open Qur'an on a traditional rehal"
                }
                width={1024}
                height={1024}
                priority={false}
                className="h-auto w-full object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.32)]"
              />
            </motion.div>

            {/* Tiny floating label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className={`absolute bottom-2 z-20 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-md ${
                isArabic ? "right-[10%]" : "left-[10%]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#35B8FF]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  {isArabic ? "رحلة مع القرآن" : "A journey with the Qur'an"}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* =====================================================
              CONTENT
          ===================================================== */}

          <div
            className={`${
              isArabic ? "lg:order-1" : "lg:order-2"
            }`}
          >
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="h-2 w-2 rounded-full bg-[#35B8FF] shadow-[0_0_15px_rgba(53,184,255,0.8)]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#70CFFF] sm:text-xs">
                {isArabic ? "تعلم القرآن" : "QUR'AN LEARNING"}
              </span>
            </motion.div>

            {/* ===================================================
                VERSE
            =================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.05 }}
              className="mt-4"
            >
              <p
                dir="rtl"
                lang="ar"
                className="font-quran text-[30px] leading-[1.9] text-white sm:text-[36px] lg:text-[40px]"
              >
                {q.verse || "وَقُلْ رَبِّ زِدْنِي عِلْمًا"}
              </p>

              <div className="mt-2 flex items-center gap-3">
                <span className="h-px w-7 bg-[#35B8FF]" />

                <span className="text-[10px] tracking-wide text-white/45">
                  {q.verseRef || "Qur’an 20:114"}
                </span>
              </div>
            </motion.div>

            {/* ===================================================
                HEADING
            =================================================== */}

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.12 }}
            >
              <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl lg:text-[43px]">
                {q.title}
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#B8D1E2] sm:text-[15px]">
                {q.sub}
              </p>
            </motion.div>

            {/* ===================================================
                LEARNING PATH
            =================================================== */}

            <div className="relative mt-7">
              {/* Connecting line */}
              <div className="absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-transparent via-[#35B8FF]/35 to-transparent sm:block" />

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.name}-${index}`}
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
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + index * 0.07,
                    }}
                    whileHover={{
                      y: -4,
                    }}
                    className={`group relative z-10 rounded-[17px] border border-white/10 bg-white/[0.045] px-3 py-3.5 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#35B8FF]/35 hover:bg-[#35B8FF]/[0.07] ${
                      index === 4
                        ? "col-span-2 sm:col-span-1"
                        : ""
                    }`}
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#062C53] text-[#62C9FF] transition-all duration-300 group-hover:bg-[#35B8FF] group-hover:text-[#001A3F]">
                      {icons[index]}
                    </div>

                    <h3 className="mt-2 text-[11px] font-bold text-white">
                      {item.name}
                    </h3>

                    <p className="mt-0.5 hidden text-[8px] leading-4 text-white/45 sm:block">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          SECTION TRANSITION
      ========================================================= */}

      <div className="h-10 bg-gradient-to-b from-[#001A3F] to-[#F4FAFD]" />
    </section>
  );
}