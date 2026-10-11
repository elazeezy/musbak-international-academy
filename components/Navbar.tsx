"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
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
          flex min-h-11 items-center gap-1.5 rounded-full
          border border-white/15
          bg-white/[0.035]
          px-2
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

        <span className="hidden min-[380px]:inline">
          {LANGUAGES.find((language) => language.code === lang)?.label}
        </span>
        <span className="min-[380px]:hidden">{lang.toUpperCase()}</span>

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
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

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
    const toggle = toggleRef.current;
    const backgroundRoots = Array.from(document.body.children)
      .filter((node): node is HTMLElement => node instanceof HTMLElement && !node.contains(menuRef.current))
      .map((node) => ({ node, inert: node.inert }));

    document.body.style.overflow = "hidden";
    backgroundRoots.forEach(({ node }) => { node.inert = true; });

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
      backgroundRoots.forEach(({ node, inert }) => { node.inert = inert; });

      document.removeEventListener("keydown", onKey);

      mediaQuery.removeEventListener(
        "change",
        onViewportChange
      );

      toggle?.focus();
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
          scrolled
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
          px-3
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
  h-[54px]
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

        <div className="flex shrink-0 items-center gap-1.5 min-[380px]:gap-2.5 sm:gap-3">
          {/* Language */}
          <LangSwitcher />

          <Link
            href={`/${lang}/portal`}
            className="flex min-h-11 items-center justify-center rounded-full bg-[#35B8FF] px-2.5 text-[11px] font-bold text-[#001A3F] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF] min-[380px]:px-3.5 sm:px-4"
          >
            <span className="hidden min-[380px]:inline">{t.nav.signIn}</span>
            <span className="min-[380px]:hidden">{lang === "ar" ? "دخول" : lang === "fr" ? "Entrer" : "Login"}</span>
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
            aria-haspopup="dialog"
            aria-label={
              open
                ? t.nav.closeMenu
                : t.nav.openMenu
            }
            className="
              flex
              min-h-11
              min-w-11
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

      {mounted && open && createPortal(
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.openMenu}
          className="fixed inset-0 z-[100] flex min-h-[100dvh] flex-col overflow-y-auto bg-[#001A3F] px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-[max(16px,env(safe-area-inset-top))] text-white animate-[menu-in_220ms_ease-out_both] motion-reduce:animate-none lg:hidden"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-[#35B8FF]/10 blur-[100px]" />
            <div className="absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-[#35B8FF]/5 blur-[110px]" />
          </div>

          <div className="relative z-10 flex min-h-14 items-center justify-between border-b border-white/10 pb-4">
            <Link href={`/${lang}`} onClick={() => setOpen(false)} aria-label="Musbak International Academy" className="rounded-xl focus-visible:outline-2 focus-visible:outline-[#35B8FF]">
              <Image src="/musbak-logo.jpeg" alt="Musbak International Academy" width={320} height={230} className="h-12 w-auto object-contain" />
            </Link>
            <button type="button" onClick={() => setOpen(false)} aria-label={t.nav.closeMenu} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#35B8FF]">
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label={t.nav.openMenu} className="relative z-10 flex flex-col gap-1 pt-5">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: `${index * 28}ms` }}
                className="flex min-h-[60px] items-center justify-between rounded-xl border-b border-white/[0.08] px-3 py-3 text-xl font-semibold tracking-[-0.02em] text-white/90 transition duration-200 hover:bg-white/[0.05] hover:text-white focus-visible:outline-2 focus-visible:outline-[#35B8FF] motion-safe:animate-[menu-item-in_240ms_ease-out_both] motion-reduce:animate-none"
              >
                <span>{link.label}</span>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true" className={isArabic ? "rotate-180 text-[#35B8FF]" : "text-[#35B8FF]"}>
                  <path d="M3.5 8.5h10M9 4l4.5 4.5L9 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </nav>

          <div className="relative z-10 mt-auto flex flex-col gap-3 border-t border-white/10 pt-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-white/60">{t.nav.switchLang}</span>
              <LangSwitcher />
            </div>
            <Link href={`/${lang}/portal`} onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-[#35B8FF]">
              {t.nav.signIn}
            </Link>
            <a href={waLink(t.wa.trial)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#35B8FF] px-5 text-sm font-bold text-[#001A3F] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35B8FF]">
              {t.nav.cta}
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" className={isArabic ? "rotate-180" : ""}>
                <path d="M3 7.5h9M8 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>,
        document.body,
      )}

    </header>
  );
}
