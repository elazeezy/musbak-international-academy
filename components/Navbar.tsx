"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LANGUAGES, useLang, type Lang } from "@/lib/i18n";
import { waLink } from "@/lib/config";
import { ChevronDownIcon, CloseIcon, GlobeIcon, MenuIcon, WhatsAppIcon } from "./icons";

function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const pick = (l: Lang) => {
    setLang(l);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
        aria-label="Switch language"
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
            <button
              key={l.code}
              onClick={() => pick(l.code)}
              className={`block w-full px-4 py-2.5 text-start text-xs font-semibold transition-colors ${
                l.code === lang
                  ? "bg-gold/15 text-gold"
                  : "text-cream hover:bg-ink2"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#programs", label: t.nav.programs },
    { href: "#how", label: t.nav.how },
    { href: "#why", label: t.nav.why },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#faq", label: t.nav.faq },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-xl border-b border-line shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
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
            className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-cream transition-all hover:bg-gold2 hover:shadow-lg hover:shadow-gold/25 sm:flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t.nav.cta}
          </a>

          <button
            className="text-cream lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-ink/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-cream hover:bg-ink2"
              >
                {l.label}
              </a>
            ))}
            <a
              href={waLink(t.wa.trial)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-cream"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
