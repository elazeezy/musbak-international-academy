"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LANGUAGES, useLang, type Lang } from "@/lib/i18n";
import { waLink } from "@/lib/config";

import {
  ChevronDownIcon,
  CloseIcon,
  GlobeIcon,
  MenuIcon,
} from "./icons";

/* ================================================================
   LOCALE ROUTING
================================================================ */

function localePath(pathname: string, target: Lang): string {
  const rest = pathname.replace(/^\/(en|ar|fr)(?=\/|$)/, "");
  return `/${target}${rest}`;
}

/* ================================================================
   LANGUAGE SWITCHER
================================================================ */

function LangSwitcher() {
  const { lang, t } = useLang();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);

    return () => {
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t.nav.switchLang}
        className="
          flex min-h-10 items-center gap-2 rounded-full
          border border-white/15
          bg-white/[0.035]
          px-3.5
          text-[11px] font-semibold
          tracking-wide
          text-white/80
          backdrop-blur-md
          transition-all duration-300
          hover:border-white/30
          hover:bg-white/[0.07]
          hover:text-white
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#35B8FF]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[#001A3F]
        "
      >
        <GlobeIcon className="h-3.5 w-3.5 text-[#35B8FF]" />

        <span>
          {LANGUAGES.find((language) => language.code === lang)?.label}
        </span>

        <ChevronDownIcon
          className={`h-3 w-3 text-white/45 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="
            absolute end-0 top-full z-50 mt-2
            w-40 overflow-hidden
            rounded-2xl
            border border-[#001A3F]/10
            bg-white
            p-1.5
            shadow-[0_20px_50px_rgba(0,0,0,0.18)]
          "
        >
          {LANGUAGES.map((language) => {
            const active = language.code === lang;

            return (
              <Link
                key={language.code}
                href={localePath(pathname, language.code)}
                onClick={() => setOpen(false)}
                role="menuitem"
                aria-current={active ? "page" : undefined}
                className={`
                  flex min-h-10 items-center
                  rounded-xl px-3.5 py-2
                  text-start text-xs font-semibold
                  transition-colors duration-200
                  ${
                    active
                      ? "bg-[#35B8FF]/10 text-[#001A3F]"
                      : "text-[#001A3F]/65 hover:bg-[#001A3F]/5 hover:text-[#001A3F]"
                  }
                `}
              >
                {language.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ================================================================
   NAVBAR
================================================================ */

export function Navbar() {
  const { lang, t } = useLang();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* --------------------------------------------------------------
     SCROLL STATE
  -------------------------------------------------------------- */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* --------------------------------------------------------------
     MOBILE MENU ACCESSIBILITY
  -------------------------------------------------------------- */

  useEffect(() => {
    if (!open) return;

    const focusables = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button"
        ) ?? []
      );

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusables();

      const first = items[0];
      const last = items[items.length - 1];

      if (!first || !last) return;

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    const mediaQuery = window.matchMedia(
      "(min-width: 1024px)"
    );

    const onViewportChange = () => {
      setOpen(false);
    };

    document.addEventListener("keydown", onKey);

    mediaQuery.addEventListener(
      "change",
      onViewportChange
    );

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener("keydown", onKey);

      mediaQuery.removeEventListener(
        "change",
        onViewportChange
      );

      toggleRef.current?.focus();
    };
  }, [open]);

  /* --------------------------------------------------------------
     ROUTES
  -------------------------------------------------------------- */

  const onHome = pathname === `/${lang}`;

  const anchor = (id: string) =>
    onHome ? id : `/${lang}${id}`;

  const links = [
    {
      href: `/${lang}/courses`,
      label: t.nav.programs,
    },
    {
      href: anchor("#journey"),
      label: t.nav.how,
    },
    {
      href: anchor("#teachers"),
      label: t.footer.teachers,
    },
    {
      href: anchor("#why"),
      label: t.nav.why,
    },
    {
      href: anchor("#pricing"),
      label: t.nav.pricing,
    },
    {
      href: anchor("#faq"),
      label: t.nav.faq,
    },
  ];

  /* --------------------------------------------------------------
     DIRECTION
  -------------------------------------------------------------- */

  const isArabic = lang === "ar";

  return (
    <header
      dir={isArabic ? "rtl" : "ltr"}
      className={`
        fixed inset-x-0 top-0 z-50
        transition-all duration-500
        ${
          scrolled || open
            ? `
              border-b border-white/[0.08]
              bg-[#001A3F]/82
              shadow-[0_10px_40px_rgba(0,0,0,0.14)]
              backdrop-blur-2xl
            `
            : `
              border-b border-transparent
              bg-transparent
            `
        }
      `}
    >
      {/* ==========================================================
          DESKTOP / MAIN NAV
      =========================================================== */}

      <nav
        className="
          relative z-10 mx-auto
          flex h-[76px]
          w-full max-w-[1480px]
          items-center
          justify-between
          px-5
          sm:px-8
          lg:px-10
          xl:px-14
        "
      >
        {/* --------------------------------------------------------
            LOGO
        --------------------------------------------------------- */}

        <Link
          href={`/${lang}`}
          aria-label="Musbak International Academy"
          className="
            group flex shrink-0 items-center
            transition-opacity duration-300
            hover:opacity-90
          "
        >
          <Image
            src="/musbak-logo.jpeg"
            alt="Musbak International Academy"
            width={320}
            height={230}
            priority
            className="
  h-20
  w-auto
  object-contain
  sm:h-[76px]
"
          />
        </Link>

        {/* --------------------------------------------------------
            DESKTOP LINKS
        --------------------------------------------------------- */}

        <div
          className="
            hidden items-center
            gap-6
            lg:flex
            xl:gap-7
          "
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="
                relative
                py-2
                text-[12px]
                font-medium
                tracking-[0.01em]
                text-white/65
                transition-colors
                duration-300
                hover:text-white
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#35B8FF]
                focus-visible:ring-offset-4
                focus-visible:ring-offset-[#001A3F]
              "
            >
              {link.label}

              {/* Hover underline */}
              <span
                className="
                  absolute inset-x-0 -bottom-0.5
                  h-px
                  origin-center
                  scale-x-0
                  bg-[#35B8FF]
                  transition-transform
                  duration-300
                  group-hover:scale-x-100
                "
              />
            </a>
          ))}
        </div>

        {/* --------------------------------------------------------
            RIGHT ACTIONS
        --------------------------------------------------------- */}

        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language */}
          <LangSwitcher />

          {/* Login */}
          <Link
            href={`/${lang}/login`}
            className="
              hidden
              min-h-10
              items-center
              justify-center
              rounded-full
              px-4
              text-[12px]
              font-semibold
              text-white/75
              transition-all
              duration-300
              hover:bg-white/[0.06]
              hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#35B8FF]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#001A3F]
              sm:flex
            "
          >
            {isArabic ? "تسجيل الدخول" : lang === "fr" ? "Connexion" : "Log in"}
          </Link>

          {/* Primary CTA */}
          <a
            href={waLink(t.wa.trial)}
            target="_blank"
            rel="noopener noreferrer"
            className="
              hidden
              min-h-10
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#35B8FF]
              px-5
              text-[12px]
              font-bold
              text-[#001A3F]
              shadow-[0_8px_30px_rgba(53,184,255,0.16)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-white
              hover:shadow-[0_12px_35px_rgba(53,184,255,0.22)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#35B8FF]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#001A3F]
              sm:flex
            "
          >
            {t.nav.cta}

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className={isArabic ? "rotate-180" : ""}
            >
              <path
                d="M2.75 7h8.5M7.5 3.25 11.25 7 7.5 10.75"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Mobile menu button */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={
              open
                ? t.nav.closeMenu
                : t.nav.openMenu
            }
            className="
              flex
              min-h-10
              min-w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/[0.035]
              text-white
              transition-all
              duration-300
              hover:border-white/25
              hover:bg-white/[0.07]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#35B8FF]
              lg:hidden
            "
          >
            {open ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* ==========================================================
          MOBILE MENU
      =========================================================== */}

      <div
        id="mobile-menu"
        ref={menuRef}
        aria-hidden={!open}
        className={`
          fixed inset-0
          flex flex-col
          bg-[#001A3F]
          px-5
          pb-8
          pt-[96px]
          transition-all
          duration-500
          lg:hidden
          ${
            open
              ? "visible opacity-100"
              : "invisible opacity-0 pointer-events-none"
          }
        `}
      >
        {/* Atmospheric background */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#35B8FF]/10 blur-[100px]" />

          <div className="absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-[#35B8FF]/5 blur-[110px]" />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        {/* Mobile navigation */}
        <nav
          className="
            relative z-10
            flex flex-col
            gap-1
          "
        >
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                transitionDelay: open
                  ? `${index * 45}ms`
                  : "0ms",
              }}
              className={`
                flex
                min-h-14
                items-center
                justify-between
                rounded-2xl
                border
                border-transparent
                px-4
                py-3
                text-xl
                font-semibold
                tracking-[-0.02em]
                text-white/90
                transition-all
                duration-300
                hover:border-white/10
                hover:bg-white/[0.05]
                hover:text-white
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#35B8FF]
                ${
                  open
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }
              `}
            >
              <span>{link.label}</span>

              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                aria-hidden="true"
                className={
                  isArabic ? "rotate-180 text-[#35B8FF]" : "text-[#35B8FF]"
                }
              >
                <path
                  d="M3.5 8.5h10M9 4l4.5 4.5L9 13"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ))}
        </nav>

        {/* Mobile bottom actions */}
        <div
          className={`
            relative z-10
            mt-auto
            flex flex-col gap-5
            border-t border-white/10
            pt-6
            transition-all
            delay-200
            duration-500
            ${
              open
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }
          `}
        >
          {/* Language */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
              {t.nav.switchLang}
            </span>

            <LangSwitcher />
          </div>

          {/* Login */}
          <Link
            href={`/${lang}/login`}
            onClick={() => setOpen(false)}
            className="
              flex
              min-h-12
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-white/[0.035]
              px-5
              text-sm
              font-semibold
              text-white
              transition-all
              hover:border-white/30
              hover:bg-white/[0.07]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#35B8FF]
            "
          >
            {isArabic
              ? "تسجيل الدخول"
              : lang === "fr"
                ? "Connexion"
                : "Log in"}
          </Link>

          {/* CTA */}
          <a
            href={waLink(t.wa.trial)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="
              flex
              min-h-12
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#35B8FF]
              px-5
              text-sm
              font-bold
              text-[#001A3F]
              transition-all
              hover:bg-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#35B8FF]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#001A3F]
            "
          >
            {t.nav.cta}

            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              aria-hidden="true"
              className={isArabic ? "rotate-180" : ""}
            >
              <path
                d="M3 7.5h9M8 3.5l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}