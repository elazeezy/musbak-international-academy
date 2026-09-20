"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { site, waLink } from "@/lib/config";
import { WhatsAppIcon } from "./icons";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const programLinks = t.tracks.items.map((tr) => ({
    label: tr.title,
    href: "#programs",
  }));
  const academyLinks = [
    { label: t.nav.how, href: "#how" },
    { label: t.nav.why, href: "#why" },
    { label: t.nav.pricing, href: "#pricing" },
    { label: t.nav.faq, href: "#faq" },
  ];

  return (
    <footer className="border-t border-line bg-ink2">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Image
            src="/musbak-logo.png"
            alt="Musbak International Academy"
            width={200}
            height={118}
            className="h-12 w-auto"
          />
          <p className="mt-5 text-sm leading-relaxed text-muted">
            {t.footer.about}
          </p>
        </div>

        <nav>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-golddeep">
            {t.footer.programs}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {programLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-golddeep">
            {t.footer.academy}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {academyLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-golddeep">
            {t.footer.contact}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <a
                href={waLink(t.wa.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-gold"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={waLink(t.wa.general, site.whatsappSecondary)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-gold"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {site.whatsappSecondaryDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="break-all transition-colors hover:text-gold"
              >
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-5 py-6 text-center text-xs text-muted/70 lg:px-8">
          © {year} {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
