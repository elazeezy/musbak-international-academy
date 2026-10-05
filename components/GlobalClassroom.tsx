"use client";

import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

function Pin({
  x,
  y,
  delay,
  active = true,
}: {
  x: number;
  y: number;
  delay: number;
  active?: boolean;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{
        opacity: active ? 1 : 0.35,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        transformOrigin: `${x}px ${y}px`,
      }}
    >
      {/* pulse */}
      <motion.circle
        cx={x}
        cy={y}
        r="10"
        fill="#35B8FF"
        opacity="0.12"
        animate={{
          r: [7, 15, 7],
          opacity: [0.18, 0, 0.18],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          delay,
          ease: "easeOut",
        }}
      />

      {/* outer ring */}
      <circle
        cx={x}
        cy={y}
        r="5.5"
        fill="white"
        stroke="#35B8FF"
        strokeWidth="2"
      />

      {/* center */}
      <circle
        cx={x}
        cy={y}
        r="2.5"
        fill="#087CC1"
      />
    </motion.g>
  );
}

function WorldMap() {
  /*
   * A deliberately simplified academic world silhouette.
   * It is SVG rather than a raster image, so it stays sharp and
   * allows the location pins to animate independently.
   */

  return (
    <svg
      viewBox="0 0 900 430"
      className="h-auto w-full"
      role="img"
      aria-label="World map showing Musbak's global learning community"
    >
      <defs>
        <pattern
          id="mapDots"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="2.2"
            cy="2.2"
            r="1.25"
            fill="#238BC7"
            opacity="0.38"
          />
        </pattern>

        <linearGradient
          id="mapFade"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#0D7FBD" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#63C9F5" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* =======================================================
          NORTH AMERICA
      ======================================================= */}

      <path
        d="
          M78 96
          C91 73 119 60 148 63
          C166 66 180 78 188 91
          C177 99 165 107 157 119
          C149 131 143 147 130 155
          C118 160 106 151 99 142
          C92 133 87 125 78 119
          C70 113 69 104 78 96Z

          M126 156
          C139 154 151 160 158 171
          C165 182 161 194 153 204
          C146 213 138 218 130 214
          C123 208 120 197 119 186
          C118 175 119 164 126 156Z
        "
        fill="url(#mapDots)"
      />

      {/* =======================================================
          SOUTH AMERICA
      ======================================================= */}

      <path
        d="
          M176 211
          C193 211 205 223 209 239
          C212 255 207 270 200 284
          C194 298 188 315 180 329
          C173 341 165 350 158 348
          C150 345 149 331 151 317
          C153 302 159 290 159 277
          C159 262 151 251 154 239
          C157 226 165 216 176 211Z
        "
        fill="url(#mapDots)"
      />

      {/* =======================================================
          EUROPE
      ======================================================= */}

      <path
        d="
          M350 98
          C361 88 377 84 392 87
          C404 89 415 96 418 105
          C410 111 401 114 391 113
          C381 112 373 116 365 113
          C357 110 349 106 350 98Z
        "
        fill="url(#mapDots)"
      />

      {/* =======================================================
          AFRICA
      ======================================================= */}

      <path
        d="
          M354 131
          C370 122 393 122 408 132
          C423 143 427 161 424 180
          C421 198 414 214 405 230
          C397 244 388 259 377 267
          C367 273 355 265 349 252
          C343 238 342 221 345 207
          C348 192 350 180 346 167
          C342 152 344 139 354 131Z
        "
        fill="url(#mapDots)"
      />

      {/* =======================================================
          ASIA
      ======================================================= */}

      <path
        d="
          M420 91
          C438 74 463 66 489 68
          C516 70 539 77 558 85
          C579 94 601 99 618 108
          C631 115 640 127 634 137
          C625 145 611 143 599 141
          C585 139 571 141 558 148
          C544 155 533 164 520 166
          C505 168 491 161 480 154
          C468 146 455 143 442 141
          C429 139 417 130 414 119
          C411 109 414 99 420 91Z

          M540 165
          C555 160 570 165 580 176
          C587 184 591 194 586 202
          C580 210 568 208 558 202
          C548 196 538 188 534 178
          C531 172 534 167 540 165Z
        "
        fill="url(#mapDots)"
      />

      {/* =======================================================
          INDIA / SOUTH ASIA
      ======================================================= */}

      <path
        d="
          M486 151
          C496 151 506 159 510 170
          C514 181 509 195 501 207
          C495 216 488 220 482 214
          C476 206 475 193 477 181
          C478 169 478 157 486 151Z
        "
        fill="url(#mapDots)"
      />

      {/* =======================================================
          SOUTHEAST ASIA
      ======================================================= */}

      <path
        d="
          M545 201
          C557 199 570 204 579 213
          C586 221 590 232 585 238
          C579 244 569 240 560 234
          C551 228 542 220 539 212
          C537 207 540 203 545 201Z
        "
        fill="url(#mapDots)"
      />

      {/* =======================================================
          AUSTRALIA
      ======================================================= */}

      <path
        d="
          M655 274
          C672 264 699 263 718 271
          C735 278 746 291 742 305
          C738 319 722 326 706 330
          C688 334 669 331 657 322
          C646 313 643 298 648 286
          C650 281 652 277 655 274Z
        "
        fill="url(#mapDots)"
      />

      {/* =======================================================
          JAPAN / EAST ASIA ACCENTS
      ======================================================= */}

      <ellipse
        cx="625"
        cy="144"
        rx="5"
        ry="10"
        fill="url(#mapDots)"
      />

      <ellipse
        cx="636"
        cy="160"
        rx="4"
        ry="7"
        fill="url(#mapDots)"
      />

      {/* =======================================================
          GREENLAND
      ======================================================= */}

      <path
        d="
          M214 45
          C226 32 248 28 266 34
          C279 39 286 50 282 61
          C277 72 263 77 249 76
          C234 75 218 69 212 59
          C208 53 209 49 214 45Z
        "
        fill="url(#mapDots)"
      />

      {/* =======================================================
          GLOBAL CONNECTION LINES
      ======================================================= */}

      <motion.path
        d="M118 150 C250 74 398 96 486 171"
        fill="none"
        stroke="#35B8FF"
        strokeWidth="1"
        strokeDasharray="3 8"
        opacity="0.22"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.22 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.6 }}
      />

      <motion.path
        d="M200 275 C350 330 540 230 698 298"
        fill="none"
        stroke="#35B8FF"
        strokeWidth="1"
        strokeDasharray="3 8"
        opacity="0.18"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.18 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.9 }}
      />

      {/* =======================================================
          LOCATION PINS
      ======================================================= */}

      <Pin x={128} y={132} delay={0.35} />
      <Pin x={177} y={173} delay={0.5} />
      <Pin x={378} y={151} delay={0.65} />
      <Pin x={474} y={177} delay={0.8} />
      <Pin x={528} y={202} delay={0.95} />
      <Pin x={673} y={296} delay={1.1} />
      <Pin x={410} y={225} delay={1.25} />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-5 w-5"
    >
      <circle cx="16" cy="16" r="12" />
      <path d="M4 16h24" />
      <path d="M16 4c3.2 3.3 4.8 7.3 4.8 12S19.2 24.7 16 28" />
      <path d="M16 4c-3.2 3.3-4.8 7.3-4.8 12S12.8 24.7 16 28" />
    </svg>
  );
}

const FLAGS = [
  "🇬🇧",
  "🇳🇬",
  "🇸🇦",
  "🇺🇸",
  "🇫🇷",
  "🇦🇪",
];

export function GlobalClassroom() {
  const { t, lang } = useLang();
  const globe = t.landing.globe;

  const isArabic = lang === "ar";

  /*
   * We use the existing dictionary regions so you can later replace
   * these placeholder countries with the ACTUAL countries where
   * Musbak students are located.
   */

  const regions = globe.regions.slice(0, 7);

  return (
    <section
      id="global-classroom"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative scroll-mt-24 overflow-hidden bg-[#EAF7FF] py-20 sm:py-24 lg:py-28"
    >
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-white/70 blur-[120px]" />

        <div className="absolute -bottom-40 -left-20 h-[400px] w-[500px] rounded-full bg-[#35B8FF]/10 blur-[100px]" />

        <div className="absolute -right-20 top-20 h-[350px] w-[450px] rounded-full bg-white/70 blur-[100px]" />

        {/* extremely subtle dot atmosphere */}
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #238BC7 0.7px, transparent 0.7px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse 65% 60% at 50% 50%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 60% at 50% 50%, black, transparent 75%)",
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
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#17639A] sm:text-xs">
              {isArabic ? "مجتمع عالمي" : "A GLOBAL COMMUNITY"}
            </span>

            <span className="h-2 w-2 rounded-full bg-[#35B8FF]" />
          </div>

          <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#001A3F] sm:text-4xl lg:text-[46px]">
            {globe.title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#5A788E] sm:text-[15px] sm:leading-7">
            {globe.sub}
          </p>
        </motion.div>

        {/* =======================================================
            MAP + COUNTRIES
        ======================================================= */}

        <div className="mt-10 grid items-center gap-8 lg:mt-12 lg:grid-cols-[1fr_250px] lg:gap-10">
          {/* =====================================================
              MAP
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* Map glow */}
            <div className="absolute left-1/2 top-1/2 h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#35B8FF]/10 blur-[70px]" />

            <div className="relative mx-auto w-full max-w-[900px]">
              <WorldMap />
            </div>
          </motion.div>

          {/* =====================================================
              COUNTRY LIST
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: isArabic ? -25 : 25,
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
              duration: 0.65,
              delay: 0.15,
            }}
            className="mx-auto w-full max-w-[300px] lg:max-w-none"
          >
            <div className="rounded-[24px] border border-white/80 bg-white/65 p-5 shadow-[0_15px_45px_rgba(0,70,110,0.06)] backdrop-blur-md">
              <div className="mb-4 flex items-center gap-2 border-b border-[#D8EAF3] pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E3F5FF] text-[#087CC1]">
                  <GlobeIcon />
                </div>

                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#55748A]">
                  {isArabic ? "من حول العالم" : "STUDENTS AROUND THE WORLD"}
                </span>
              </div>

              <ul className="space-y-2.5">
                {regions.map((region, index) => (
                  <motion.li
                    key={region}
                    initial={{
                      opacity: 0,
                      x: isArabic ? 12 : -12,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.3,
                    }}
                    transition={{
                      delay: 0.3 + index * 0.08,
                      duration: 0.4,
                    }}
                    className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#EAF7FF]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F3FAFD] text-base shadow-sm">
                      {FLAGS[index]}
                    </span>

                    <span className="text-xs font-medium text-[#365D74]">
                      {region}
                    </span>

                    <span
                      className={`ms-auto h-1.5 w-1.5 rounded-full ${
                        index < 3
                          ? "bg-[#35B8FF]"
                          : "bg-[#B8D9E8]"
                      }`}
                    />
                  </motion.li>
                ))}

                <motion.li
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center gap-3 border-t border-[#D8EAF3] pt-3"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF7FF] text-xs font-bold text-[#087CC1]">
                    •••
                  </span>

                  <span className="text-xs font-semibold text-[#55748A]">
                    {isArabic ? "والمزيد..." : "and more..."}
                  </span>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* =======================================================
            BOTTOM STATEMENT
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.25em] text-[#7896A9]"
        >
          <span className="h-px w-10 bg-[#BBD9E8]" />

          <span>
            {isArabic
              ? "المعرفة بلا حدود"
              : "KNOWLEDGE HAS NO TIMEZONE"}
          </span>

          <span className="h-px w-10 bg-[#BBD9E8]" />
        </motion.div>
      </div>
    </section>
  );
}