"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D6E8F1] bg-white text-[#087CC1] shadow-sm transition-all duration-300 group-hover:border-[#35B8FF] group-hover:bg-[#EAF8FF]">
      <span
        className={`absolute h-[1.5px] w-3 bg-current transition-transform duration-300 ${
          open ? "rotate-45" : ""
        }`}
      />

      <span
        className={`absolute h-[1.5px] w-3 bg-current transition-transform duration-300 ${
          open ? "-rotate-45" : "rotate-90"
        }`}
      />
    </span>
  );
}

export function FAQ() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(0);

  const isArabic = lang === "ar";

  return (
    <section
      id="faq"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative z-10 -mt-8 scroll-mt-24 overflow-hidden rounded-t-[42px] bg-[#F2FAFD] py-20 sm:-mt-10 sm:rounded-t-[52px] sm:py-24 lg:-mt-14 lg:rounded-t-[64px] lg:py-28"
    >
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-0 h-[380px] w-[850px] -translate-x-1/2 rounded-full bg-white/85 blur-[120px]" />

        <div className="absolute -left-40 top-1/3 h-[350px] w-[450px] rounded-full bg-[#35B8FF]/8 blur-[100px]" />

        <div className="absolute -right-40 bottom-0 h-[400px] w-[500px] rounded-full bg-white/80 blur-[110px]" />

        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #258BC3 0.7px, transparent 0.7px)",
            backgroundSize: "24px 24px",
            maskImage:
              "radial-gradient(ellipse 65% 60% at 50% 45%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 60% at 50% 45%, black, transparent 75%)",
          }}
        />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-10">
        {/* =======================================================
            HEADER
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17639A] sm:text-xs">
              {t.faq.eyebrow}
            </p>

            <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.045em] text-[#001A3F] sm:text-4xl lg:text-[46px] lg:leading-[1.05]">
            {t.faq.title}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#6B8494] sm:text-[15px]">
            {isArabic
              ? "إجابات واضحة على الأسئلة التي قد تكون في ذهنك."
              : "Clear answers to the questions you may have before getting started."}
          </p>
        </motion.div>

        {/* =======================================================
            FAQ LIST
        ======================================================= */}

        <div className="mx-auto mt-10 max-w-4xl space-y-3 sm:mt-12">
          {t.faq.items.map((item, index) => {
            const isOpen = open === index;

            return (
              <motion.div
                key={item.q}
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
                  amount: 0.15,
                }}
                transition={{
                  delay: index * 0.055,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group overflow-hidden rounded-[20px] border transition-all duration-300 ${
                  isOpen
                    ? "border-[#B9E5F8] bg-white shadow-[0_15px_40px_rgba(0,65,100,0.07)]"
                    : "border-white/90 bg-white/65 shadow-[0_7px_25px_rgba(0,50,90,0.035)] hover:border-[#D5EAF3] hover:bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-4 py-4 text-start sm:px-6 sm:py-5"
                >
                  {/* number */}
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[9px] font-black transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#001A3F] text-[#35B8FF]"
                        : "bg-[#EAF7FF] text-[#087CC1]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* question */}
                  <span
                    className={`flex-1 text-sm font-bold leading-6 transition-colors duration-300 sm:text-[15px] ${
                      isOpen
                        ? "text-[#001A3F]"
                        : "text-[#294C61]"
                    }`}
                  >
                    {item.q}
                  </span>

                  {/* plus */}
                  <PlusIcon open={isOpen} />
                </button>

                {/* =================================================
                    ANSWER
                ================================================= */}

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        height: {
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        opacity: {
                          duration: 0.2,
                        },
                      }}
                    >
                      <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                        <div className="ms-[52px] border-s border-[#D8EAF2] ps-4 sm:ps-5">
                          <p className="max-w-2xl text-sm leading-7 text-[#6B8494]">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* =======================================================
            BOTTOM HELP CARD
        ======================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.25,
            duration: 0.6,
          }}
          className="mx-auto mt-10 max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-[24px] bg-[#001A3F] px-6 py-7 text-white shadow-[0_20px_55px_rgba(0,26,63,0.12)] sm:px-8 sm:py-8">
            {/* glow */}
            <div
              aria-hidden
              className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#35B8FF]/15 blur-[60px]"
            />

            <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#72CFFF]">
                  {isArabic
                    ? "ما زلت بحاجة للمساعدة؟"
                    : "STILL HAVE QUESTIONS?"}
                </p>

                <h3 className="mt-2 text-lg font-bold tracking-[-0.02em] sm:text-xl">
                  {isArabic
                    ? "نحن هنا لمساعدتك."
                    : "We're here to help."}
                </h3>

                <p className="mt-1.5 max-w-md text-xs leading-5 text-white/50">
                  {isArabic
                    ? "تواصل معنا وسيساعدك فريق مسباك في معرفة الخطوة المناسبة لك."
                    : "Reach out and the Musbak team can help you find the right next step."}
                </p>
              </div>

              <a
                href="#contact"
                className="group flex shrink-0 items-center gap-2 rounded-xl bg-[#35B8FF] px-5 py-3 text-xs font-bold text-[#001A3F] transition-all hover:scale-[1.02] hover:bg-[#61C8FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF]"
              >
                {isArabic ? "تواصل معنا" : "Talk to us"}

                <span className="transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180">
                  →
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* =======================================================
            BOTTOM LABEL
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.25em] text-[#8299A8]"
        >
          <span className="h-px w-10 bg-[#C7E0EB]" />

          <span>
            {isArabic
              ? "نبدأ معك بخطوة بسيطة"
              : "START WITH ONE SIMPLE STEP"}
          </span>

          <span className="h-px w-10 bg-[#C7E0EB]" />
        </motion.div>
      </div>
    </section>
  );
}