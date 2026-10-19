"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useLang } from "@/lib/i18n";

function ArrowIcon({ direction = "right" }: { direction?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      {direction === "left" ? (
        <>
          <path d="M19 12H6" />
          <path d="m11 6-6 6 6 6" />
        </>
      ) : (
        <>
          <path d="M5 12h13" />
          <path d="m13 6 6 6-6 6" />
        </>
      )}
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-5 w-5"
    >
      <path d="m4 12 12-6 12 6-12 6-12-6Z" />
      <path d="M8 14.5V21c4 3 12 3 16 0v-6.5" />
      <path d="M28 12v9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function MaleIcon() {
  // Head wearing a kufi/taqiyah cap, with shoulders.
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-20 w-20"
    >
      {/* Kufi cap */}
      <path d="M22 21c0-7 4-12 10-12s10 5 10 12" />
      <path d="M19 21h26" />
      {/* Face below the cap */}
      <path d="M24 21v5c0 4.8 3.6 8.5 8 8.5s8-3.7 8-8.5v-5" />
      {/* Shoulders */}
      <path d="M14 55c2-10 8-15 18-15s16 5 18 15" />
    </svg>
  );
}

function FemaleIcon() {
  // Face framed by a hijab, with shoulders.
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-20 w-20"
    >
      {/* Hijab drape */}
      <path d="M32 9c-9 0-15 7-15 17 0 5.5 1.8 9.7 4.6 12.7L18 55h28l-3.6-16.3C45.2 35.7 47 31.5 47 26c0-10-6-17-15-17Z" />
      {/* Face opening */}
      <path d="M32 15c-6 0-9.2 5-9.2 11S26 37 32 37s9.2-5 9.2-11S38 15 32 15Z" />
    </svg>
  );
}

const TEACHER_PHOTOS: (string | null)[] = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

function TeacherPlaceholder({
  index,
  name,
  gender,
}: {
  index: number;
  name: string;
  gender: string;
}) {
  const gradients = [
    "from-[#0B416D] via-[#07518B] to-[#35B8FF]",
    "from-[#092C52] via-[#17639A] to-[#5BC7FF]",
    "from-[#123C61] via-[#07518B] to-[#8BD9FF]",
    "from-[#062B50] via-[#0A4776] to-[#35B8FF]",
    "from-[#0A355C] via-[#12679A] to-[#74D0FF]",
  ];

  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-gradient-to-br ${
        gradients[index % gradients.length]
      }`}
    >
      {/* Background atmosphere */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#001A3F]/35 blur-3xl" />

      {/* Architectural curves */}
      <div className="absolute -bottom-20 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full border border-white/10" />
      <div className="absolute -bottom-10 left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full border border-white/10" />

      {/* Person silhouette */}
      <div className="absolute bottom-[18%] left-1/2 flex -translate-x-1/2 items-center justify-center text-white/80">
        <div className="relative">
          <div className="absolute left-1/2 top-[7px] h-20 w-20 -translate-x-1/2 rounded-full bg-white/10 blur-xl" />
          {gender === "female" ? <FemaleIcon /> : <MaleIcon />}
        </div>
      </div>

      {/* Placeholder label */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="rounded-2xl border border-white/15 bg-[#001A3F]/30 p-4 backdrop-blur-md">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#8AD9FF]">
            Faculty profile
          </p>

          <p className="mt-1 text-sm font-semibold text-white">
            {name}
          </p>

          <p className="mt-1 text-[10px] text-white/55">
            Professional photo coming soon
          </p>
        </div>
      </div>
    </div>
  );
}

export function Teachers() {
  const { t, lang } = useLang();
  const { title, sub, items } = t.landing.teachers;

  const isArabic = lang === "ar";

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  /*
   * ============================================================
   * TEACHER PHOTOS
   * ============================================================
   *
   * Keep these as null until you receive the real staff photos.
   *
   * Replace null entries with verified, consented public image paths when
   * staff portraits are approved for publication.
   */

  const teachers = useMemo(() => {
    return items.map((item, index) => ({
      ...item,
      photo: TEACHER_PHOTOS[index] ?? null,
    }));
  }, [items]);

  const count = teachers.length;

  if (!count) return null;

  const teacher = teachers[active];

  const previousIndex =
    (active - 1 + count) % count;

  const nextIndex =
    (active + 1) % count;

  const previousTeacher = teachers[previousIndex];
  const nextTeacher = teachers[nextIndex];

  const goTo = (next: number, movement: number) => {
    setDirection(movement);
    setActive((next + count) % count);
  };

  const next = () => {
    goTo(active + 1, 1);
  };

  const previous = () => {
    goTo(active - 1, -1);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const distance = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(distance) > 80 || Math.abs(velocity) > 500) {
      /*
       * Dragging left → next teacher
       * Dragging right → previous teacher
       */
      if (distance < 0) {
        next();
      } else {
        previous();
      }
    }
  };

  return (
    <section
      id="teachers"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative scroll-mt-24 overflow-hidden bg-[#F4FAFD] py-20 sm:py-24 lg:py-28"
    >
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-32 top-0 h-[450px] w-[450px] rounded-full bg-[#DDF2FF] blur-[120px]" />

        <div className="absolute -right-32 bottom-0 h-[450px] w-[450px] rounded-full bg-[#E4F6FF] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 50% 35%, rgba(53,184,255,0.12), transparent 38%)",
          }}
        />
      </div>

      {/* =========================================================
          MAIN
      ========================================================= */}

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* =======================================================
            HEADER
        ======================================================= */}

        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17639A] sm:text-xs">
                {isArabic ? "هيئة التدريس" : "OUR FACULTY"}
              </span>

              <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />
            </div>

            <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#001A3F] sm:text-4xl lg:text-[46px]">
              {title}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#5D788D] sm:text-[15px] sm:leading-7">
              {sub}
            </p>
          </motion.div>
        </div>

        {/* =======================================================
            FACULTY SHOWCASE
        ======================================================= */}

        <div className="relative mt-12 lg:mt-14">
          {/* Desktop side profile preview */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between lg:flex">
            {/* Previous */}
            <motion.div
              initial={false}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`relative h-[300px] w-[180px] overflow-hidden rounded-[28px] border border-white/80 bg-white/60 opacity-70 shadow-[0_15px_50px_rgba(0,50,90,0.06)] ${
                isArabic ? "order-3" : ""
              }`}
            >
              {previousTeacher.photo ? (
                <Image
                  src={previousTeacher.photo}
                  alt=""
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              ) : (
                <TeacherPlaceholder
                  index={previousIndex}
                  name={previousTeacher.name}
                  gender={previousTeacher.gender}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-[#F4FAFD] via-transparent to-transparent" />
            </motion.div>

            {/* Next */}
            <motion.div
              initial={false}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative h-[300px] w-[180px] overflow-hidden rounded-[28px] border border-white/80 bg-white/60 opacity-70 shadow-[0_15px_50px_rgba(0,50,90,0.06)]"
            >
              {nextTeacher.photo ? (
                <Image
                  src={nextTeacher.photo}
                  alt=""
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              ) : (
                <TeacherPlaceholder
                  index={nextIndex}
                  name={nextTeacher.name}
                  gender={nextTeacher.gender}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-l from-[#F4FAFD] via-transparent to-transparent" />
            </motion.div>
          </div>

          {/* =====================================================
              CENTER CARD
          ===================================================== */}

          <div className="relative mx-auto max-w-[930px]">
            <AnimatePresence
              initial={false}
              mode="wait"
              custom={direction}
            >
              <motion.div
                key={teacher.name}
                custom={direction}
                initial={false}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: direction * -80,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                drag="x"
                dragConstraints={{
                  left: 0,
                  right: 0,
                }}
                dragElastic={0.18}
                onDragEnd={handleDragEnd}
                className="grid cursor-grab touch-pan-y overflow-hidden rounded-[30px] border border-white/90 bg-white/90 shadow-[0_25px_80px_rgba(0,49,85,0.12)] backdrop-blur-xl active:cursor-grabbing lg:grid-cols-[0.85fr_1.15fr]"
              >
                {/* =================================================
                    PORTRAIT
                ================================================= */}

                <div className="relative min-h-[340px] overflow-hidden bg-[#082D52] sm:min-h-[400px] lg:min-h-[455px]">
                  {teacher.photo ? (
                    <Image
                      src={teacher.photo}
                      alt={teacher.name}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <TeacherPlaceholder
                      index={active}
                      name={teacher.name}
                      gender={teacher.gender}
                    />
                  )}

                  {/* Blue edge fade */}
                  <div className="absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-white/20 to-transparent lg:block" />

                  {/* Number */}
                  <div className="absolute left-5 top-5 flex h-10 min-w-10 items-center justify-center rounded-full border border-white/20 bg-[#001A3F]/45 px-3 text-[10px] font-bold tracking-[0.15em] text-white backdrop-blur-md">
                    {String(active + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* =================================================
                    PROFILE INFORMATION
                ================================================= */}

                <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-11">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E4F6FF] text-[#07518B]">
                      <GraduationIcon />
                    </span>

                    <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#17639A]">
                      {isArabic
                        ? "عضو في هيئة التدريس"
                        : "FACULTY MEMBER"}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold tracking-[-0.035em] text-[#001A3F] sm:text-3xl lg:text-[34px]">
                    {teacher.name}
                  </h3>

                  {teacher.creds ? (
                    <p className="mt-3 text-sm font-semibold leading-6 text-[#087CC1]">
                      {teacher.creds}
                    </p>
                  ) : null}

                  {/* Credentials */}
                  <div className="mt-7 grid gap-2 sm:grid-cols-2">
                    <div className="flex items-center gap-2 text-xs text-[#49677B]">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF7FF] text-[#168DDD]">
                        <CheckIcon />
                      </span>

                      {isArabic
                        ? "مؤهلات موثوقة"
                        : "Qualified educator"}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#49677B]">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF7FF] text-[#168DDD]">
                        <CheckIcon />
                      </span>

                      {isArabic
                        ? "تعليم شخصي"
                        : "Personalized teaching"}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#49677B]">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF7FF] text-[#168DDD]">
                        <CheckIcon />
                      </span>

                      {isArabic
                        ? "خبرة تعليمية"
                        : "Teaching experience"}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#49677B]">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EAF7FF] text-[#168DDD]">
                        <CheckIcon />
                      </span>

                      {isArabic
                        ? "طلاب من حول العالم"
                        : "Students worldwide"}
                    </div>
                  </div>

                  {/* Swipe hint */}
                  <div className="mt-8 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8AA0AF]">
                    <span className="h-px w-7 bg-[#C8DDE9]" />

                    <span>
                      {isArabic
                        ? "اسحب للتصفح"
                        : "Swipe to explore"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* =====================================================
                NAVIGATION
            ===================================================== */}

            <div className="mt-7 flex items-center justify-center gap-5">
              {/* Previous */}
              <button
                type="button"
                onClick={previous}
                aria-label={
                  isArabic ? "المعلم السابق" : "Previous teacher"
                }
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CDE3EE] bg-white text-[#17639A] shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-[#35B8FF] hover:bg-[#EAF8FF] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#35B8FF]"
              >
                <ArrowIcon direction="left" />
              </button>

              {/* Progress */}
              <div className="flex items-center gap-2">
                {teachers.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() =>
                      goTo(index, index > active ? 1 : -1)
                    }
                    aria-label={item.name}
                    aria-current={index === active}
                    className="group flex h-5 items-center"
                  >
                    <span
                      className={`block rounded-full transition-all duration-400 ${
                        index === active
                          ? "h-1.5 w-8 bg-[#35B8FF]"
                          : "h-1.5 w-1.5 bg-[#B9D4E3] group-hover:bg-[#75C7EA]"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={next}
                aria-label={
                  isArabic ? "المعلم التالي" : "Next teacher"
                }
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#CDE3EE] bg-white text-[#17639A] shadow-sm transition-all duration-300 hover:translate-x-1 hover:border-[#35B8FF] hover:bg-[#EAF8FF] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#35B8FF]"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>
        </div>

        {/* =======================================================
            TRUST STRIP
        ======================================================= */}

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7591A2]"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#35B8FF]" />
            {isArabic ? "معلمون مؤهلون" : "Qualified teachers"}
          </span>

          <span className="hidden h-3 w-px bg-[#C7DDE8] sm:block" />

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#35B8FF]" />
            {isArabic ? "تعلم شخصي" : "Personalized learning"}
          </span>

          <span className="hidden h-3 w-px bg-[#C7DDE8] sm:block" />

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#35B8FF]" />
            {isArabic ? "تعلم عالمي" : "Global learning"}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
