"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { COURSE_IDS, getDictionary } from "@/lib/dictionaries";
import { site, waLink } from "@/lib/config";
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  XIcon,
  YoutubeIcon,
} from "./icons";

const SOCIALS = [
  {
    label: "Instagram",
    href: site.socials.instagram,
    Icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: site.socials.tiktok,
    Icon: TikTokIcon,
  },
  {
    label: "YouTube",
    href: site.socials.youtube,
    Icon: YoutubeIcon,
  },
  {
    label: "X",
    href: site.socials.x,
    Icon: XIcon,
  },
];

export function Footer() {
  const { lang, t } = useLang();
  const pathname = usePathname();

  const year = new Date().getFullYear();
  const dict = getDictionary(lang);

  const onHome = pathname === `/${lang}`;

  const anchor = (id: string) =>
    onHome ? id : `/${lang}${id}`;

  /* ============================================================
     COURSE CATALOG
  ============================================================ */

  const catalog = `/${lang}/courses`;

  const courseLinks = COURSE_IDS.map((id) => {
    const idx = COURSE_IDS.indexOf(id);

    const { groupIndex, itemIndex } =
      idx < 11
        ? {
            groupIndex: 0 as const,
            itemIndex: idx,
          }
        : {
            groupIndex: 1 as const,
            itemIndex: idx - 11,
          };

    return {
      label: dict.hero.courses[groupIndex].items[itemIndex],
      href: `${catalog}/${id}`,
    };
  });

  /* ============================================================
     NAVIGATION
  ============================================================ */

  const academyLinks = [
    {
      label: t.footer.academy,
      href: `/${lang}`,
    },
    {
      label: t.footer.teachers,
      href: anchor("#teachers"),
    },
    {
      label: t.footer.admissions,
      href: waLink(t.wa.trial),
      external: true,
    },
    {
      label: t.nav.faq,
      href: anchor("#faq"),
    },
  ];

  const portalLinks = [
    {
      label: t.footer.studentPortal,
      href: anchor("#portal"),
    },
    {
      label: t.footer.parentPortal,
      href: anchor("#portal"),
    },
    {
      label: t.footer.teacherPortal,
      href: anchor("#portal"),
    },
  ];

  return (
    <footer
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#001A3F] text-white"
    >
      {/* ==========================================================
          ATMOSPHERE
      ========================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Top cyan glow */}
        <div className="absolute left-1/2 top-0 h-[280px] w-[800px] -translate-x-1/2 rounded-full bg-[#35B8FF]/8 blur-[120px]" />

        {/* Side glow */}
        <div className="absolute -left-40 bottom-0 h-[400px] w-[450px] rounded-full bg-[#35B8FF]/5 blur-[110px]" />

        <div className="absolute -right-40 top-1/3 h-[350px] w-[400px] rounded-full bg-[#1C7EB2]/10 blur-[100px]" />

        {/* Very subtle dot texture */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #8DDCFF 0.7px, transparent 0.7px)",
            backgroundSize: "28px 28px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />
      </div>

      {/* ==========================================================
          TOP ACCENT
      ========================================================== */}

      <div
        aria-hidden
        className="relative h-px bg-gradient-to-r from-transparent via-[#35B8FF] to-transparent opacity-70"
      />

      {/* ==========================================================
          MAIN FOOTER
      ========================================================== */}

      <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ======================================================
              BRAND
          ====================================================== */}

          <div className="lg:col-span-4">
            <a
              href={`/${lang}`}
              aria-label="Musbak International Academy"
              className="inline-flex items-center"
            >
              <Image
                src="/musbak-logo.png"
                alt="Musbak International Academy"
                width={200}
                height={118}
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </a>

            <p className="mt-6 max-w-sm text-sm leading-7 text-[#A9C0CF]">
              {t.footer.about}
            </p>

            {/* ====================================================
                FOLLOW
            ==================================================== */}

            <div className="mt-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#72CFFF]">
                {t.footer.follow}
              </p>

              <div className="mt-4 flex items-center gap-2.5">
                {SOCIALS.map(
                  ({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#A9C0CF] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#35B8FF]/50 hover:bg-[#35B8FF]/10 hover:text-[#72CFFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF]"
                    >
                      <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* ======================================================
              PROGRAMS
          ====================================================== */}

          <nav className="lg:col-span-2">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#72CFFF]">
              <a
                href={catalog}
                className="transition-colors hover:text-white"
              >
                {t.footer.programs}
              </a>
            </h3>

            <ul className="mt-5 space-y-3">
              {courseLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs text-[#9EB6C6] transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ======================================================
              ACADEMY
          ====================================================== */}

          <nav className="lg:col-span-2">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#72CFFF]">
              {t.footer.academy}
            </h3>

            <ul className="mt-5 space-y-3">
              {academyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...("external" in link &&
                    link.external
                      ? {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    className="text-xs text-[#9EB6C6] transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ======================================================
              PORTALS
          ====================================================== */}

          <nav className="lg:col-span-2">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#72CFFF]">
              {t.footer.portals}
            </h3>

            <ul className="mt-5 space-y-3">
              {portalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-[#9EB6C6] transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ======================================================
              CONTACT
          ====================================================== */}

          <div className="lg:col-span-2">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#72CFFF]">
              {t.footer.contact}
            </h3>

            <ul className="mt-5 space-y-4 text-xs text-[#9EB6C6]">
              <li>
                <a
                  href={waLink(t.wa.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/10 text-[#5BE58A] transition-colors group-hover:bg-[#25D366]/20">
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                  </span>

                  <span>{site.whatsappDisplay}</span>
                </a>
              </li>

              <li>
                <a
                  href={waLink(
                    t.wa.general,
                    site.whatsappSecondary,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366]/10 text-[#5BE58A] transition-colors group-hover:bg-[#25D366]/20">
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                  </span>

                  <span>
                    {site.whatsappSecondaryDisplay}
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="block break-all transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================================
            FOOTER CTA STRIP
        ======================================================== */}

        <div className="mt-14 border-t border-white/10 pt-8 lg:mt-16">
          <div className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-white/[0.035] px-5 py-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-xs font-bold text-white">
                {lang === "ar"
                  ? "جاهز لبدء رحلتك؟"
                  : "Ready to begin your journey?"}
              </p>

              <p className="mt-1 text-[10px] text-[#7895A7]">
                {lang === "ar"
                  ? "ابدأ بخطوة بسيطة مع مسباك."
                  : "Start with one simple step at Musbak."}
              </p>
            </div>

            <a
              href={waLink(t.wa.trial)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#35B8FF] px-5 py-2.5 text-[10px] font-bold text-[#001A3F] transition-all duration-300 hover:bg-[#72CFFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF]"
            >
              {lang === "ar"
                ? "ابدأ الآن"
                : "Get Started"}

              <span
                className={`transition-transform duration-300 ${
                  lang === "ar"
                    ? "group-hover:-translate-x-0.5"
                    : "group-hover:translate-x-0.5"
                }`}
              >
                {lang === "ar" ? "←" : "→"}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ==========================================================
          BOTTOM BAR
      ========================================================== */}

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-5 py-6 text-[10px] text-[#718C9E] sm:flex-row sm:justify-between sm:px-8 lg:px-12">
          <p>
            © {year} {t.footer.rights}
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF]"
            >
              {t.footer.privacy}
            </a>

            <a
              href="#"
              className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF]"
            >
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}