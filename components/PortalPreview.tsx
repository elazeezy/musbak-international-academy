"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
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
      className="h-4 w-4"
    >
      <path d="M4 5a2 2 0 0 1 2-2h13v17H6a2 2 0 0 0-2 2V5Z" />
      <path d="M4 20a2 2 0 0 1 2-2h13" />
      <path d="M8 7h7M8 10h6" />
    </svg>
  );
}

function QuranIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="M4 5a2 2 0 0 1 2-2h13v17H6a2 2 0 0 0-2 2V5Z" />
      <path d="M4 20a2 2 0 0 1 2-2h13" />
      <path d="M8 7h7M8 10h6M8 13h4" />
    </svg>
  );
}

function AssignmentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V2h6v2M8 9h8M8 13h6M8 17h4" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8 8 0 0 1-4-.9L4 20l1.5-3.5A7.5 7.5 0 1 1 20 11.5Z" />
      <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" />
    </svg>
  );
}

function CertificateIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="M5 3h14v14H5z" />
      <path d="m9 21 3-2 3 2v-4H9v4Z" />
      <path d="M8 7h8M8 10h5" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" />
      <path d="M10 21h4" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3.5 10h17" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6" />
      <path d="M16 5.5a3 3 0 0 1 0 5.5M18 14c2 .7 3 2.5 3 6" />
    </svg>
  );
}

function PortalLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#35B8FF] text-[#001A3F] shadow-[0_6px_18px_rgba(53,184,255,0.25)]">
        <span className="text-sm font-black">M</span>
      </div>

      <div className="hidden sm:block">
        <p className="text-[10px] font-black tracking-[0.2em] text-[#001A3F]">
          MUSBAK
        </p>
        <p className="text-[7px] font-medium uppercase tracking-[0.18em] text-[#7790A1]">
          Academy
        </p>
      </div>
    </div>
  );
}

function Avatar({
  type,
  small = false,
}: {
  type: number;
  small?: boolean;
}) {
  const initials = ["AH", "PA", "TM"][type] ?? "MS";

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#DDF4FF] to-[#74CFFF] font-bold text-[#07518B] ring-2 ring-white ${
        small ? "h-7 w-7 text-[8px]" : "h-9 w-9 text-[10px]"
      }`}
    >
      {initials}
    </div>
  );
}

function ProgressBar({
  value,
  color = "cyan",
}: {
  value: number;
  color?: "cyan" | "blue";
}) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E4EFF5]">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`h-full rounded-full ${
          color === "blue" ? "bg-[#2589D1]" : "bg-[#35B8FF]"
        }`}
      />
    </div>
  );
}

function MiniCalendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="mt-4">
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day, index) => (
          <span
            key={`${day}-${index}`}
            className="pb-1 text-[7px] font-semibold text-[#9AAEBB]"
          >
            {day}
          </span>
        ))}

        {dates.map((date) => (
          <span
            key={date}
            className={`flex h-5 items-center justify-center rounded-md text-[7px] ${
              date === 18
                ? "bg-[#087CC1] font-bold text-white shadow-sm"
                : date === 21
                  ? "bg-[#E4F6FF] font-bold text-[#087CC1]"
                  : "text-[#607C8E]"
            }`}
          >
            {date}
          </span>
        ))}
      </div>
    </div>
  );
}

function DashboardSidebar({
  activeTab,
  isArabic,
}: {
  activeTab: number;
  isArabic: boolean;
}) {
  const nav = [
    {
      icon: <HomeIcon />,
      en: "Dashboard",
      ar: "الرئيسية",
    },
    {
      icon: <BookIcon />,
      en: "My Classes",
      ar: "فصولي",
    },
    {
      icon: <QuranIcon />,
      en: "Qur'an Progress",
      ar: "تقدم القرآن",
    },
    {
      icon: <AssignmentIcon />,
      en: "Assignments",
      ar: "الواجبات",
    },
    {
      icon: <MessageIcon />,
      en: "Messages",
      ar: "الرسائل",
    },
    {
      icon: <CertificateIcon />,
      en: "Certificates",
      ar: "الشهادات",
    },
  ];

  return (
    <aside className="hidden w-[165px] shrink-0 border-e border-[#E5EEF3] bg-white/70 p-3 md:block">
      <div className="px-2 py-3">
        <PortalLogo />
      </div>

      <nav className="mt-5 space-y-1">
        {nav.map((item, index) => (
          <div
            key={item.en}
            className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[9px] font-medium transition-colors ${
              index === 0
                ? "bg-[#E6F6FF] font-bold text-[#087CC1]"
                : "text-[#708797] hover:bg-[#F2F8FB]"
            }`}
          >
            {item.icon}
            <span>{isArabic ? item.ar : item.en}</span>
          </div>
        ))}
      </nav>

      <div className="mt-7 rounded-2xl bg-[#001A3F] p-3">
        <p className="text-[8px] font-bold text-[#72CFFF]">
          {activeTab === 0
            ? isArabic
              ? "تقدمك"
              : "Your progress"
            : activeTab === 1
              ? isArabic
                ? "متابعة الأسرة"
                : "Family view"
              : isArabic
                ? "جدولك اليوم"
                : "Today's schedule"}
        </p>

        <p className="mt-1 text-[8px] leading-4 text-white/55">
          {activeTab === 0
            ? isArabic
              ? "استمر في بناء عادات تعلم رائعة."
              : "Keep building great learning habits."
            : activeTab === 1
              ? isArabic
                ? "كل ما تحتاجه لمتابعة رحلة التعلم."
                : "Everything you need to follow progress."
              : isArabic
                ? "جميع حصصك ومهامك في مكان واحد."
                : "Classes and tasks in one place."}
        </p>
      </div>
    </aside>
  );
}

function StudentDashboard({
  points,
  isArabic,
}: {
  points: string[];
  isArabic: boolean;
}) {
  return (
    <div className="space-y-3">
      {/* Greeting + next lesson */}
      <div className="grid gap-3 lg:grid-cols-[1fr_250px]">
        <div className="rounded-2xl bg-[#F7FBFD] p-4">
          <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#35A7DF]">
            {isArabic ? "لوحة الطالب" : "STUDENT DASHBOARD"}
          </p>

          <h3 className="mt-1.5 text-base font-bold tracking-[-0.025em] text-[#001A3F] sm:text-lg">
            {isArabic ? "السلام عليكم، أحمد" : "Assalamu Alaikum, Ahmed"}
          </h3>

          <p className="mt-1 text-[9px] text-[#7991A1]">
            {isArabic
              ? "استمر، أنت تحقق تقدمًا رائعًا."
              : "Keep going — you're making great progress."}
          </p>

          <div className="mt-4 space-y-2.5">
            {[
              {
                name: points[0] || (isArabic ? "حفظ القرآن" : "Qur'an Hifz"),
                value: 78,
              },
              {
                name: points[1] || (isArabic ? "العربية" : "Arabic"),
                value: 64,
              },
              {
                name:
                  points[2] ||
                  (isArabic ? "الرياضيات" : "Mathematics"),
                value: 72,
              },
            ].map((item, index) => (
              <div key={item.name}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[8px] font-medium text-[#526F82]">
                    {item.name}
                  </span>

                  <span className="text-[8px] font-bold text-[#087CC1]">
                    {item.value}%
                  </span>
                </div>

                <ProgressBar
                  value={item.value}
                  color={index === 0 ? "cyan" : "blue"}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#001A3F] p-4 text-white shadow-[0_10px_30px_rgba(0,26,63,0.12)]">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-[#72CFFF]">
              {isArabic ? "الدرس القادم" : "NEXT LESSON"}
            </span>

            <span className="rounded-full bg-white/10 px-2 py-1 text-[7px] text-white/65">
              5:20 PM
            </span>
          </div>

          <p className="mt-5 text-sm font-bold">
            {isArabic ? "التجويد" : "Tajweed"}
          </p>

          <p className="mt-1 text-[8px] text-white/50">
            {isArabic
              ? "مع الأستاذ أحمد"
              : "with Ustadh Ahmad"}
          </p>

          <button
            type="button"
            className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#35B8FF] py-2 text-[8px] font-bold text-[#001A3F] transition-transform hover:scale-[1.02]"
          >
            {isArabic ? "انضم للحصة" : "Join class"}
          </button>
        </div>
      </div>

      {/* Lower cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-4 shadow-[0_8px_25px_rgba(0,40,70,0.04)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#8299A8]">
                {isArabic ? "المهام القادمة" : "UPCOMING TASKS"}
              </p>

              <p className="mt-1.5 text-xs font-bold text-[#001A3F]">
                {isArabic
                  ? "مراجعة سورة الملك"
                  : "Surah Al-Mulk revision"}
              </p>
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E8F7FF] text-[#087CC1]">
              <AssignmentIcon />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E7F0F4]">
              <div className="h-full w-[68%] rounded-full bg-[#35B8FF]" />
            </div>

            <span className="text-[8px] font-bold text-[#087CC1]">
              68%
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-[0_8px_25px_rgba(0,40,70,0.04)]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#E8F7FF] text-[#087CC1]">
              <CalendarIcon />
            </div>

            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#8299A8]">
                {isArabic ? "التقويم" : "CALENDAR"}
              </p>

              <p className="mt-0.5 text-xs font-bold text-[#001A3F]">
                September 2026
              </p>
            </div>
          </div>

          <MiniCalendar />
        </div>
      </div>
    </div>
  );
}

function ParentDashboard({
  points,
  isArabic,
}: {
  points: string[];
  isArabic: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            label: isArabic ? "تقدم التعلم" : "Learning progress",
            value: "76%",
          },
          {
            label: isArabic ? "الحضور" : "Attendance",
            value: "94%",
          },
          {
            label: isArabic ? "الحصص هذا الشهر" : "Classes this month",
            value: "18",
          },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white p-4 shadow-[0_8px_25px_rgba(0,40,70,0.04)]"
          >
            <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#8299A8]">
              {stat.label}
            </p>

            <p className="mt-2 text-xl font-bold tracking-[-0.03em] text-[#001A3F]">
              {stat.value}
            </p>

            <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#E7F0F4]">
              <div
                className="h-full rounded-full bg-[#35B8FF]"
                style={{
                  width:
                    index === 0
                      ? "76%"
                      : index === 1
                        ? "94%"
                        : "72%",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_230px]">
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#8299A8]">
                {isArabic ? "رحلة الطالب" : "STUDENT JOURNEY"}
              </p>

              <h3 className="mt-1 text-sm font-bold text-[#001A3F]">
                {isArabic
                  ? "أحمد — التقدم الأكاديمي"
                  : "Ahmed — learning progress"}
              </h3>
            </div>

            <span className="text-[8px] font-semibold text-[#087CC1]">
              View details
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {[
              {
                name:
                  points[0] ||
                  (isArabic ? "القرآن الكريم" : "Qur'an"),
                value: 82,
              },
              {
                name:
                  points[1] ||
                  (isArabic ? "اللغة العربية" : "Arabic"),
                value: 71,
              },
              {
                name:
                  points[2] ||
                  (isArabic ? "المواد الأكاديمية" : "Academics"),
                value: 76,
              },
            ].map((item) => (
              <div key={item.name}>
                <div className="mb-1 flex justify-between">
                  <span className="text-[8px] font-medium text-[#5B7587]">
                    {item.name}
                  </span>

                  <span className="text-[8px] font-bold text-[#087CC1]">
                    {item.value}%
                  </span>
                </div>

                <ProgressBar value={item.value} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#001A3F] p-4 text-white">
          <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#72CFFF]">
            {isArabic ? "ملاحظات المعلم" : "TEACHER FEEDBACK"}
          </p>

          <p className="mt-3 text-xs font-semibold leading-5">
            {isArabic
              ? "أحمد يظهر تقدمًا رائعًا في التلاوة والمراجعة."
              : "Ahmed is showing excellent progress in recitation and revision."}
          </p>

          <div className="mt-5 flex items-center gap-2">
            <Avatar type={0} small />

            <div>
              <p className="text-[8px] font-bold">Ustadh Ahmad</p>
              <p className="text-[7px] text-white/45">
                Qur'an • Tajweed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeacherDashboard({
  points,
  isArabic,
}: {
  points: string[];
  isArabic: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            value: "4",
            label: isArabic ? "حصص اليوم" : "Classes today",
          },
          {
            value: "24",
            label: isArabic ? "الطلاب" : "Students",
          },
          {
            value: "8",
            label: isArabic ? "مهام تحتاج مراجعة" : "Tasks to review",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl bg-white p-4 shadow-[0_8px_25px_rgba(0,40,70,0.04)]"
          >
            <p className="text-[8px] font-semibold uppercase tracking-[0.13em] text-[#8299A8]">
              {item.label}
            </p>

            <p className="mt-2 text-xl font-bold tracking-[-0.03em] text-[#001A3F]">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#8299A8]">
                {isArabic ? "الجدول اليومي" : "TODAY'S SCHEDULE"}
              </p>

              <h3 className="mt-1 text-sm font-bold text-[#001A3F]">
                {isArabic ? "حصصك القادمة" : "Your upcoming classes"}
              </h3>
            </div>

            <CalendarIcon />
          </div>

          <div className="mt-4 space-y-2">
            {[
              {
                time: "04:00 PM",
                name:
                  points[0] ||
                  (isArabic ? "حلقة القرآن" : "Qur'an class"),
              },
              {
                time: "05:20 PM",
                name:
                  points[1] ||
                  (isArabic ? "التجويد" : "Tajweed"),
              },
              {
                time: "07:00 PM",
                name:
                  points[2] ||
                  (isArabic ? "اللغة العربية" : "Arabic"),
              },
            ].map((item, index) => (
              <div
                key={item.time}
                className={`flex items-center gap-3 rounded-xl p-2.5 ${
                  index === 1
                    ? "bg-[#EAF7FF]"
                    : "bg-[#F7FBFD]"
                }`}
              >
                <span className="w-12 text-[8px] font-bold text-[#087CC1]">
                  {item.time}
                </span>

                <span className="h-7 w-px bg-[#D6E8F1]" />

                <div>
                  <p className="text-[9px] font-bold text-[#193C52]">
                    {item.name}
                  </p>

                  <p className="mt-0.5 text-[7px] text-[#8198A7]">
                    {isArabic
                      ? "جلسة مباشرة"
                      : "Live session"}
                  </p>
                </div>

                <span className="ms-auto rounded-full bg-white px-2 py-1 text-[7px] font-semibold text-[#087CC1] shadow-sm">
                  {index === 1
                    ? isArabic
                      ? "التالي"
                      : "Next"
                    : isArabic
                      ? "قادم"
                      : "Upcoming"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#001A3F] p-4 text-white">
          <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[#72CFFF]">
            {isArabic ? "الطلاب" : "STUDENTS"}
          </p>

          <div className="mt-4 flex items-center">
            <Avatar type={0} small />
            <div className="-ms-2">
              <Avatar type={1} small />
            </div>
            <div className="-ms-2">
              <Avatar type={2} small />
            </div>

            <div className="ms-3">
              <p className="text-[9px] font-bold">
                24 students
              </p>

              <p className="text-[7px] text-white/45">
                {isArabic
                  ? "في مجموعاتك التعليمية"
                  : "Across your classes"}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2 text-[8px] font-semibold text-white transition-colors hover:bg-white/15"
          >
            <UsersIcon />
            {isArabic ? "عرض الطلاب" : "View students"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function PortalPreview() {
  const { t, lang } = useLang();
  const portal = t.landing.portal;

  const [active, setActive] = useState(0);

  const isArabic = lang === "ar";
  const current = portal.tabs[active];

  const dashboardPoints = current?.points ?? [];

  return (
    <section
      id="portal"
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
        <div className="absolute left-1/2 top-0 h-[450px] w-[850px] -translate-x-1/2 rounded-full bg-white/80 blur-[120px]" />

        <div className="absolute -left-40 bottom-0 h-[350px] w-[450px] rounded-full bg-[#35B8FF]/8 blur-[100px]" />

        <div className="absolute -right-40 top-1/3 h-[400px] w-[500px] rounded-full bg-[#DFF4FF] blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* =======================================================
            HEADER
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17639A] sm:text-xs">
              {isArabic ? "منصة مسباك" : "THE MUSBAK PLATFORM"}
            </span>

            <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.045em] text-[#001A3F] sm:text-4xl lg:text-[46px]">
            {portal.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#5D788D] sm:text-[15px] sm:leading-7">
            {portal.sub}
          </p>
        </motion.div>

        {/* =======================================================
            PORTAL SWITCHER
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="mx-auto mt-8 max-w-[570px]"
        >
          <div
            role="tablist"
            className="grid grid-cols-3 rounded-2xl border border-[#D8EAF3] bg-white/70 p-1.5 shadow-[0_10px_35px_rgba(0,50,90,0.05)] backdrop-blur-md"
          >
            {portal.tabs.map((tab, index) => (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={index === active}
                onClick={() => setActive(index)}
                className="relative rounded-xl px-3 py-3 text-[10px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF] sm:text-xs"
              >
                {index === active && (
                  <motion.div
                    layoutId="portal-tab-active"
                    className="absolute inset-0 rounded-xl bg-[#001A3F] shadow-[0_7px_20px_rgba(0,26,63,0.15)]"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}

                <span
                  className={`relative z-10 ${
                    index === active
                      ? "text-white"
                      : "text-[#6A8495]"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* =======================================================
            BROWSER / PRODUCT FRAME
        ======================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.985,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.8,
            delay: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-8 max-w-[1180px]"
        >
          <div className="overflow-hidden rounded-[24px] border border-white bg-white shadow-[0_30px_90px_rgba(0,43,75,0.13)]">
            {/* ===================================================
                BROWSER BAR
            =================================================== */}

            <div className="flex h-11 items-center border-b border-[#E6EFF4] bg-white px-4 sm:px-5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D8E5EB]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D8E5EB]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D8E5EB]" />
              </div>

              <div className="mx-auto flex h-6 w-[55%] max-w-[400px] items-center justify-center rounded-lg bg-[#F3F7F9] text-[7px] font-medium text-[#91A5B1] sm:text-[8px]">
                portal.musbak.academy
              </div>

              <div className="w-[42px]" />
            </div>

            {/* ===================================================
                DASHBOARD
            =================================================== */}

            <div className="flex min-h-[510px] bg-[#F5FAFC]">
              <DashboardSidebar
                activeTab={active}
                isArabic={isArabic}
              />

              <div className="min-w-0 flex-1">
                {/* Top navigation */}
                <div className="flex h-14 items-center justify-between border-b border-[#E3EDF2] bg-white/80 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="md:hidden">
                      <PortalLogo />
                    </div>

                    <div className="hidden items-center gap-2 rounded-lg bg-[#F5F9FB] px-3 py-2 sm:flex">
                      <SearchIcon />

                      <span className="text-[8px] text-[#91A4B0]">
                        {isArabic
                          ? "ابحث في المنصة..."
                          : "Search the platform..."}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#F1F7FA] text-[#638092]"
                    >
                      <BellIcon />

                      <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#35B8FF]" />
                    </button>

                    <div className="flex items-center gap-2">
                      <Avatar type={active} />

                      <div className="hidden sm:block">
                        <p className="text-[8px] font-bold text-[#193C52]">
                          {active === 0
                            ? "Ahmed"
                            : active === 1
                              ? "Parent account"
                              : "Ustadh Ahmad"}
                        </p>

                        <p className="text-[7px] text-[#91A4B0]">
                          {active === 0
                            ? "Student"
                            : active === 1
                              ? "Parent"
                              : "Teacher"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main dashboard */}
                <div className="p-4 sm:p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.label}
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    >
                      {active === 0 && (
                        <StudentDashboard
                          points={dashboardPoints}
                          isArabic={isArabic}
                        />
                      )}

                      {active === 1 && (
                        <ParentDashboard
                          points={dashboardPoints}
                          isArabic={isArabic}
                        />
                      )}

                      {active === 2 && (
                        <TeacherDashboard
                          points={dashboardPoints}
                          isArabic={isArabic}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =======================================================
            SMALL PRODUCT STATEMENT
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7894A5]"
        >
          <span>
            {isArabic ? "الطلاب" : "Students"}
          </span>

          <span className="h-1 w-1 rounded-full bg-[#35B8FF]" />

          <span>
            {isArabic ? "أولياء الأمور" : "Parents"}
          </span>

          <span className="h-1 w-1 rounded-full bg-[#35B8FF]" />

          <span>
            {isArabic ? "المعلمون" : "Teachers"}
          </span>

          <span className="h-1 w-1 rounded-full bg-[#35B8FF]" />

          <span>
            {isArabic
              ? "كل شيء في مكان واحد"
              : "Everything in one place"}
          </span>
        </motion.div>
      </div>
    </section>
  );
}