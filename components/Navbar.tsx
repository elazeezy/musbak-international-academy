"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LANGUAGES, useLang, type Lang } from "@/lib/i18n";
import { waLink } from "@/lib/config";
import { ChevronDownIcon, CloseIcon, GlobeIcon, MenuIcon, WhatsAppIcon } from "./icons";

/* Swap the locale prefix of the current path: /en/courses/tajweed → /ar/courses/tajweed.
   The bare homepage "/" never reaches the switcher (proxy redirects it to /en). */
function localePath(pathname: string, target: Lang): string {
  const rest = pathname.replace(/^\/(en|ar|fr)(?=\/|$)/, "");
  return `/${target}${rest}`;
}

function LangSwitcher() {
  const { lang, t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={t.nav.switchLang}
        className="flex min-h-11 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-cream transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golddeep"
      >
        <GlobeIcon className="h-3.5 w-3.5" />
        {LANGUAGES.find((l) => l.code === lang)?.label}
        <ChevronDownIcon
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute end-0 top-full mt-2 w-36 overflow-hidden rounded-xl border border-line bg-white shadow-xl shadow-black/10">
          {LANGUAGES.map((l) => (
            <Link
              key={l.code}
              href={localePath(pathname, l.code)}
              onClick={() => setOpen(false)}
              aria-current={l.code === lang ? "true" : undefined}
              className={`block min-h-11 w-full px-4 py-2.5 text-start text-xs font-semibold transition-colors ${
                l.code === lang
                  ? "bg-gold/15 text-gold"
                  : "text-cream hover:bg-ink2"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const { lang, t } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const focusables = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []
      );
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const toggle = toggleRef.current;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onViewportChange = () => setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onViewportChange);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onViewportChange);
      toggle?.focus();
    };
  }, [open]);

  /* Anchor sections (#how, #pricing…) only exist on the homepage. From any
     other page, prefix them with the locale so they land back on the right
     section instead of a dead anchor. */
  const onHome = pathname === `/${lang}`;
  const anchor = (id: string) => (onHome ? id : `/${lang}${id}`);
  const links = [
    { href: `/${lang}/courses`, label: t.nav.programs },
    { href: anchor("#how"), label: t.nav.how },
    { href: anchor("#why"), label: t.nav.why },
    { href: anchor("#pricing"), label: t.nav.pricing },
    { href: anchor("#faq"), label: t.nav.faq },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-ink/85 backdrop-blur-xl border-b border-line shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <a href={`/${lang}`} className="flex items-center gap-3">
          <Image
            src="/musbak-logo.png"
            alt="Musbak International Academy"
            width={220}
            height={130}
            className="h-11 w-auto"
            priority
          />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LangSwitcher />

          <a
            href={waLink(t.wa.trial)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-cream transition-all hover:bg-gold2 hover:shadow-lg hover:shadow-gold/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golddeep sm:flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t.nav.cta}
          </a>

          <button
            ref={toggleRef}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full p-2 text-cream transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golddeep lg:hidden"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={menuRef}
        aria-hidden={!open}
        className={`fixed inset-0 flex flex-col bg-ink px-5 pb-10 pt-24 transition-all duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
              className={`flex min-h-11 items-center rounded-xl px-4 py-3 text-lg font-semibold text-cream transition-all duration-300 hover:bg-ink2 hover:text-golddeep focus-visible:outline-2 focus-visible:outline-golddeep ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div
          className={`mt-auto flex flex-col gap-5 transition-all delay-200 duration-300 ${
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between border-t border-line pt-5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-golddeep">
              {t.nav.switchLang}
            </span>
            <LangSwitcher />
          </div>
          <a
            href={waLink(t.wa.trial)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 text-sm font-bold text-cream transition-all hover:bg-gold2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golddeep"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
