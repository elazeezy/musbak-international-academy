"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

type MediaTile = {
  type: "video" | "image" | "placeholder";
  src?: string;
  label: string;
  className: string;
  accent?: string;
};

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m10 8 6 4-6 4V8Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-8 w-8"
    >
      <rect x="3" y="6.5" width="18" height="14" rx="3" />
      <path d="m8 6.5 1.4-2h5.2l1.4 2" />
      <circle cx="12" cy="13.5" r="3.5" />
    </svg>
  );
}

function MediaPlaceholder({
  label,
  large = false,
}: {
  label: string;
  large?: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#EAF7FF] via-[#D9EFFC] to-[#B9DCF1]">
      {/* Abstract background atmosphere */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/60 blur-3xl" />
      <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#35B8FF]/10 blur-3xl" />

      {/* Soft architectural shapes */}
      <div className="absolute bottom-0 left-[12%] h-[58%] w-[22%] rounded-t-full border border-white/40 bg-white/20" />
      <div className="absolute bottom-0 left-[34%] h-[43%] w-[17%] rounded-t-full border border-white/30 bg-white/15" />
      <div className="absolute bottom-0 right-[13%] h-[67%] w-[19%] rounded-t-full border border-white/35 bg-white/20" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center text-center text-[#17639A]/70">
          <div
            className={`flex items-center justify-center rounded-full border border-white/70 bg-white/55 backdrop-blur-md ${
              large ? "h-16 w-16" : "h-12 w-12"
            }`}
          >
            <CameraIcon />
          </div>

          <span className="mt-3 text-[9px] font-bold uppercase tracking-[0.2em]">
            {label}
          </span>

          <span className="mt-1 text-[9px] text-[#52748B]/70">
            Media coming soon
          </span>
        </div>
      </div>
    </div>
  );
}

function VideoTile({
  src,
  label,
  className,
  featured = false,
}: {
  src: string;
  label: string;
  className: string;
  featured?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggleVideo = async () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      try {
        await videoRef.current.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.figure
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_14px_45px_rgba(0,50,90,0.08)] ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
      />

      {/* Video readability layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#001A3F]/55 via-transparent to-[#001A3F]/5" />

      {/* Play button */}
      <button
        type="button"
        onClick={toggleVideo}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[#07518B] shadow-[0_12px_35px_rgba(0,35,70,0.22)] backdrop-blur-md transition-all duration-300 ${
          featured ? "h-16 w-16" : "h-12 w-12"
        } ${
          playing
            ? "scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            : "scale-100"
        }`}
      >
        <PlayIcon />
      </button>

      {/* Label */}
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/70">
            {featured ? "Featured video" : "Learning in action"}
          </p>
          <p className="mt-1 text-sm font-semibold">{label}</p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
          <ArrowIcon />
        </div>
      </figcaption>
    </motion.figure>
  );
}

function ImageTile({
  src,
  label,
  className,
}: {
  src: string;
  label: string;
  className: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_14px_45px_rgba(0,50,90,0.08)] ${className}`}
    >
      <img
        src={src}
        alt={label}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#001A3F]/55 via-transparent to-transparent" />

      <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white">
        {label}
      </figcaption>
    </motion.figure>
  );
}

function PlaceholderTile({
  label,
  className,
  large = false,
}: {
  label: string;
  className: string;
  large?: boolean;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-[24px] border border-white/80 bg-white/60 shadow-[0_14px_45px_rgba(0,50,90,0.06)] backdrop-blur-sm ${className}`}
    >
      <MediaPlaceholder label={label} large={large} />

      <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 to-transparent px-5 pb-5 pt-12">
        <span className="text-xs font-semibold text-[#315D79]">
          {label}
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function ProofMosaic() {
  const { t, lang } = useLang();
  const proof = t.landing.proof;

  const isArabic = lang === "ar";

  /*
   * ============================================================
   * MEDIA SETUP
   * ============================================================
   *
   * VIDEO:
   * Put your real videos inside:
   *
   * public/videos/
   *
   * Example:
   * public/videos/learning-1.mp4
   * public/videos/learning-2.mp4
   *
   * Then change type to "video" and add the src.
   *
   * IMAGE:
   * When you receive your real photos, put them inside:
   *
   * public/images/
   *
   * and change the relevant tile to type: "image".
   */

  const media: MediaTile[] = [
    {
      type: "video",
      src: "/videos/learning-1.mp4",
      label: isArabic ? "درس مباشر" : "Live learning",
      className: "lg:col-span-2 lg:row-span-2",
      accent: "featured",
    },

    {
      type: "placeholder",
      label: isArabic ? "طلابنا" : "Our students",
      className: "lg:row-span-2",
    },

    {
      type: "video",
      src: "/videos/learning-2.mp4",
      label: isArabic ? "داخل الفصل" : "Inside the classroom",
      className: "",
    },

    {
      type: "placeholder",
      label: isArabic ? "التعلم عن بُعد" : "Learning online",
      className: "",
    },

    {
      type: "placeholder",
      label: isArabic ? "القرآن والتعلم" : "Qur’an learning",
      className: "",
    },

    {
      type: "placeholder",
      label: isArabic ? "مجتمع مسباك" : "The Musbak community",
      className: "lg:col-span-2",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[900px] -translate-x-1/2 rounded-full bg-[#DDF1FF]/80 blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-0 h-[400px] w-[500px] rounded-full bg-[#E8F7FF] blur-[100px]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* =======================================================
            HEADER
        ======================================================= */}

        <div className="grid items-end gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#17639A] sm:text-xs">
                {isArabic ? "داخل تجربة مسباك" : "INSIDE MUSBAK"}
              </span>
            </div>

            <h2 className="max-w-xl text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-[#001A3F] sm:text-4xl lg:text-[46px]">
              {proof.title}
            </h2>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className={`flex flex-col ${
              isArabic ? "lg:items-start" : "lg:items-end"
            }`}
          >
            <p className="max-w-xl text-sm leading-6 text-[#5D788D] sm:text-[15px] sm:leading-7">
              {proof.sub}
            </p>

            <button
              type="button"
              className="mt-5 inline-flex w-fit items-center gap-3 rounded-full bg-[#001A3F] px-5 py-3 text-xs font-bold text-white shadow-[0_10px_30px_rgba(0,26,63,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#07518B]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <PlayIcon />
              </span>

              <span>
                {isArabic ? "شاهد الفيديو" : "Watch Video"}
              </span>

              <ArrowIcon />
            </button>
          </motion.div>
        </div>

        {/* =======================================================
            MEDIA MOSAIC
        ======================================================= */}

        <div className="mt-12 grid auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 lg:mt-14 lg:auto-rows-[185px] lg:grid-cols-4">
          {media.map((tile, index) => {
            if (tile.type === "video" && tile.src) {
              return (
                <VideoTile
                  key={`${tile.label}-${index}`}
                  src={tile.src}
                  label={tile.label}
                  className={tile.className}
                  featured={tile.accent === "featured"}
                />
              );
            }

            if (tile.type === "image" && tile.src) {
              return (
                <ImageTile
                  key={`${tile.label}-${index}`}
                  src={tile.src}
                  label={tile.label}
                  className={tile.className}
                />
              );
            }

            return (
              <PlaceholderTile
                key={`${tile.label}-${index}`}
                label={tile.label}
                className={tile.className}
                large={index === 0}
              />
            );
          })}
        </div>

        {/* =======================================================
            BOTTOM MICRO COPY
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7892A4]"
        >
          <span className="h-px w-10 bg-[#C8E0EE]" />

          <span>
            {isArabic
              ? "تعلم حقيقي. تقدم حقيقي."
              : "REAL LEARNING. REAL PROGRESS."}
          </span>

          <span className="h-px w-10 bg-[#C8E0EE]" />
        </motion.div>
      </div>
    </section>
  );
}