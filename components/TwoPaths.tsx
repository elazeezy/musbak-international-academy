"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "@/lib/i18n";

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-7 w-7"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-7 w-7"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="m10 8 6 4-6 4V8Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-7 w-7"
    >
      <path d="m3 9 9-5 9 5-9 5-9-5Z" />
      <path d="M7 11.2V16c2.7 2 7.3 2 10 0v-4.8" />
      <path d="M21 10v5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-7 w-7"
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19" />
      <path d="M12 2.5c3 3 4.5 6.17 4.5 9.5S15 18.5 12 21.5c-3-3-4.5-6.17-4.5-9.5S9 5.5 12 2.5Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M4 10h11" />
      <path d="m10.5 5.5 4.5 4.5-4.5 4.5" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-7 w-7"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M8 7h8M8 10h7" />
    </svg>
  );
}

type Stat = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

type LearningCard = {
  title: string;
  items: string[];
  image: string;
  imagePosition?: string;
  icon: React.ReactNode;
};

export function TwoPaths() {
  const { lang } = useLang();

  const isArabic = lang === "ar";
  const isFrench = lang === "fr";

  const copy = isArabic
    ? {
        communityTitle: "مجتمع متنامٍ من المتعلمين.",
        communityText:
          "انضم إلى آلاف الطلاب الذين يتعلمون القرآن والعربية والعلوم الإسلامية والمواد الأكاديمية مع مسباك.",
        students: "طلاب",
        sessions: "جلسات مباشرة ومسجلة",
        tutors: "معلمون مؤهلون",
        countries: "دول",
        learnTitle: "ماذا يمكنك أن تتعلم في مسباك؟",
        learnText:
          "اختر من برامجنا الإسلامية والأكاديمية المصممة لمختلف الأعمار والمستويات.",
        quran: "القرآن الكريم",
        quranItems: ["القراءة", "التجويد", "الحفظ", "المراجعة", "مسار الأجزاء"],
        arabic: "اللغة العربية",
        arabicItems: ["التأسيس", "المحادثة", "القواعد", "اللغة العربية الفصحى"],
        islamic: "الدراسات الإسلامية",
        islamicItems: ["العقيدة", "الفقه", "السيرة", "الحديث", "الأدعية والآداب"],
        academic: "المواد الأكاديمية",
        academicItems: ["اللغة الإنجليزية", "الرياضيات", "العلوم", "دعم دراسي", "الاستعداد للاختبارات"],
        explore: "استكشف",
      }
    : isFrench
      ? {
          communityTitle: "Une communauté d'apprenants en pleine croissance.",
          communityText:
            "Rejoignez des milliers d'élèves qui apprennent le Coran, l'arabe, les sciences islamiques et les matières académiques avec Musbak.",
          students: "Étudiants",
          sessions: "Sessions en direct et enregistrées",
          tutors: "Tuteurs qualifiés",
          countries: "Pays",
          learnTitle: "Que pouvez-vous apprendre à Musbak ?",
          learnText:
            "Choisissez parmi nos programmes islamiques et académiques conçus pour tous les âges et niveaux.",
          quran: "Coran",
          quranItems: ["Lecture", "Tajweed", "Mémorisation", "Révision", "Parcours Juz"],
          arabic: "Arabe",
          arabicItems: ["Fondations", "Conversation", "Grammaire", "Arabe classique"],
          islamic: "Études islamiques",
          islamicItems: ["Aqida", "Fiqh", "Sira", "Hadith", "Douas et bonnes manières"],
          academic: "Matières académiques",
          academicItems: ["Anglais", "Mathématiques", "Sciences", "Soutien scolaire", "Préparation aux examens"],
          explore: "Découvrir",
        }
      : {
          communityTitle: "A growing community of learners.",
          communityText:
            "Join thousands of students learning Qur’an, Arabic, Islamic sciences and academic subjects with Musbak.",
          students: "Students",
          sessions: "Live & Recorded Sessions",
          tutors: "Qualified Tutors",
          countries: "Countries",
          learnTitle: "What can you learn at Musbak?",
          learnText:
            "Choose from our Islamic and academic programs, designed for all ages and levels.",
          quran: "Qur'an",
          quranItems: ["Reading", "Tajweed", "Hifz", "Revision", "Juz Pathway"],
          arabic: "Arabic",
          arabicItems: ["Foundation", "Conversation", "Grammar", "Classical Arabic"],
          islamic: "Islamic Studies",
          islamicItems: ["Aqidah", "Fiqh", "Seerah", "Hadith", "Du’as & Islamic Manners"],
          academic: "Academic Subjects",
          academicItems: ["English", "Mathematics", "Science", "School Support", "Exam Preparation"],
          explore: "Explore",
        };

  const stats: Stat[] = [
    {
      value: "3K+",
      label: copy.students,
      icon: <UsersIcon />,
    },
    {
      value: "400+",
      label: copy.sessions,
      icon: <PlayIcon />,
    },
    {
      value: "50+",
      label: copy.tutors,
      icon: <GraduationIcon />,
    },
    {
      value: "30+",
      label: copy.countries,
      icon: <GlobeIcon />,
    },
  ];

  const cards: LearningCard[] = [
    {
      title: copy.quran,
      items: copy.quranItems,
      image: "/images/hero-child-cutout.png",
      imagePosition: "right bottom",
      icon: <BookIcon />,
    },
    {
      title: copy.arabic,
      items: copy.arabicItems,
      image: "/images/hero-mosque.jpg",
      imagePosition: "center",
      icon: <span className="font-serif text-2xl font-bold">ع</span>,
    },
    {
      title: copy.islamic,
      items: copy.islamicItems,
      image: "/images/hero-mosque.jpg",
      imagePosition: "center right",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-7 w-7"
        >
          <path d="M4 20h16" />
          <path d="M6 20V10l6-4 6 4v10" />
          <path d="M10 20v-6h4v6" />
          <path d="M12 3v3" />
          <path d="M10.5 4.5h3" />
        </svg>
      ),
    },
    {
      title: copy.academic,
      items: copy.academicItems,
      image: "/images/academic-subjects.jpg",
      imagePosition: "center",
      icon: <BookIcon />,
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardsY = useTransform(scrollYProgress, [0, 0.35, 1], [28, 0, -12]);

  return (
    <section
      id="paths"
      ref={sectionRef}
      className="relative scroll-mt-24 bg-[#001A3F]"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* =========================================================
          SOFT HERO → SECTION TRANSITION
          This is intentionally a large rounded surface that
          visually sits over the bottom edge of the hero.
      ========================================================= */}
      <div className="relative z-10 -mt-10 overflow-hidden rounded-t-[42px] bg-[#DDF1FF] shadow-[0_-18px_60px_rgba(0,0,0,0.16)] sm:-mt-14 sm:rounded-t-[54px] lg:-mt-20 lg:rounded-t-[68px]">
        {/* Subtle blue atmospheric glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(53,184,255,0.35), transparent 68%)",
          }}
        />

        {/* =====================================================
            COMMUNITY / STATS
        ===================================================== */}
        <div className="relative mx-auto max-w-[1440px] px-5 pb-8 pt-10 sm:px-8 sm:pt-12 lg:px-12 lg:pb-10 lg:pt-14">
          <div
            className={`grid items-center gap-8 lg:grid-cols-[1.15fr_2fr] lg:gap-10 ${
              isArabic ? "lg:grid-cols-[2fr_1.15fr]" : ""
            }`}
          >
            {/* Intro */}
            <div className={isArabic ? "lg:order-2" : ""}>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#17639A] sm:text-xs">
                  Musbak International Academy
                </span>
              </div>

              <h2 className="max-w-xl text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-[#001A3F] sm:text-4xl lg:text-[42px]">
                {copy.communityTitle}
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-6 text-[#42617A] sm:text-[15px] sm:leading-7">
                {copy.communityText}
              </p>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-2 overflow-hidden rounded-[24px] border border-[#B9DDF4]/80 bg-white/45 shadow-[0_16px_50px_rgba(0,48,90,0.08)] backdrop-blur-sm sm:grid-cols-4 ${
                isArabic ? "lg:order-1" : ""
              }`}
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.value}
                  className={`relative flex min-h-[128px] flex-col items-center justify-center px-4 py-6 text-center sm:min-h-[150px] ${
                    index !== 0
                      ? "border-t border-[#B9DDF4] sm:border-l sm:border-t-0"
                      : ""
                  }`}
                >
                  <div className="mb-3 text-[#07518B]">{stat.icon}</div>

                  <div className="text-2xl font-extrabold tracking-[-0.03em] text-[#00295A] sm:text-3xl">
                    {stat.value}
                  </div>

                  <div className="mt-1 max-w-[120px] text-[10px] font-medium leading-4 text-[#56758E] sm:text-xs">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            LEARNING SECTION
        ===================================================== */}
        <div className="relative bg-white px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-12 lg:pb-24 lg:pt-16">
          <div className="mx-auto max-w-[1340px]">
            <div
              className={`mb-8 flex flex-col gap-3 sm:mb-10 ${
                isArabic ? "text-right" : ""
              }`}
            >
              <h3 className="text-2xl font-bold tracking-[-0.025em] text-[#001A3F] sm:text-3xl lg:text-[34px]">
                {copy.learnTitle}
              </h3>

              <p className="max-w-2xl text-sm leading-6 text-[#64798B] sm:text-[15px]">
                {copy.learnText}
              </p>
            </div>

            {/* =================================================
                FOUR LEARNING CARDS
            ================================================= */}
            <motion.div
              style={{ y: cardsY }}
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {cards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -7 }}
                  className="group relative min-h-[285px] overflow-hidden rounded-[20px] border border-[#D8E6EF] bg-[#F4FAFE] shadow-[0_8px_30px_rgba(0,45,80,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,55,100,0.13)]"
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className={`object-cover opacity-[0.25] grayscale-[15%] transition-all duration-700 group-hover:scale-105 group-hover:opacity-[0.34] ${
                        card.imagePosition === "right bottom"
                          ? "object-right-bottom"
                          : card.imagePosition === "center right"
                            ? "object-right"
                            : "object-center"
                      }`}
                    />
                  </div>

                  {/* White/blue readability wash */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-[#DCEFFF]/45" />

                  {/* Bottom image reveal */}
                  <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#D5ECFA]/80 via-[#EAF6FD]/35 to-transparent" />

                  {/* Content */}
                  <div
                    className={`relative z-10 flex h-full min-h-[285px] flex-col p-5 sm:p-6 ${
                      isArabic ? "text-right" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-white/85 text-[#07518B] shadow-sm backdrop-blur-md">
                        {card.icon}
                      </div>

                      <span className="text-[10px] font-bold tracking-[0.2em] text-[#5D7890]">
                        0{index + 1}
                      </span>
                    </div>

                    <h4 className="mt-5 text-xl font-bold tracking-[-0.02em] text-[#001A3F]">
                      {card.title}
                    </h4>

                    <ul className="mt-3 space-y-1 text-[11px] leading-5 text-[#456278]">
                      {card.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <div className="mt-auto flex items-end justify-between pt-7">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2C648D] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {copy.explore}
                      </span>

                      <button
                        type="button"
                        aria-label={`${copy.explore} ${card.title}`}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9DFEE] bg-white/90 text-[#07518B] shadow-sm backdrop-blur-md transition-all duration-300 group-hover:border-[#35B8FF] group-hover:bg-[#35B8FF] group-hover:text-white"
                      >
                        <ArrowIcon />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}