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
  { label: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: site.socials.tiktok, Icon: TikTokIcon },
  { label: "YouTube", href: site.socials.youtube, Icon: YoutubeIcon },
  { label: "X", href: site.socials.x, Icon: XIcon },
];

export function Footer() {
  const { lang, t } = useLang();
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const dict = getDictionary(lang);

  /* Section anchors live only on the homepage; from sub-pages, route back
     through the locale-prefixed homepage. */
  const onHome = pathname === `/${lang}`;
  const anchor = (id: string) => (onHome ? id : `/${lang}${id}`);

  /* Full course sitemap — doubles as SEO internal linking across the 51
     course pages, per the CRO benchmark recommendation. */
  const catalog = `/${lang}/courses`;
  const courseLinks = COURSE_IDS.map((id) => {
    const idx = COURSE_IDS.indexOf(id);
    const { groupIndex, itemIndex } =
      idx < 11
        ? { groupIndex: 0 as const, itemIndex: idx }
        : { groupIndex: 1 as const, itemIndex: idx - 11 };
    return {
      label: dict.hero.courses[groupIndex].items[itemIndex],
      href: `${catalog}/${id}`,
    };
  });
  const academyLinks = [
    { label: t.nav.how, href: anchor("#how") },
    { label: t.nav.why, href: anchor("#why") },
    { label: t.nav.pricing, href: anchor("#pricing") },
    { label: t.nav.faq, href: anchor("#faq") },
  ];

  return (
    <footer className="border-t border-line bg-ink2 pb-20 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <a href={`/${lang}`} aria-label="Musbak International Academy">
            <Image
              src="/musbak-logo.png"
              alt="Musbak International Academy"
              width={200}
              height={118}
              className="h-12 w-auto"
            />
          </a>          <p className="mt-5 text-sm leading-relaxed text-muted">
            {t.footer.about}
          </p>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-golddeep">
            {t.footer.follow}
          </p>
          <div className="mt-3 flex items-center gap-2.5">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-muted transition-all hover:border-gold hover:text-golddeep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golddeep"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <nav>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-golddeep">
            <a href={catalog} className="transition-colors hover:text-gold">
              {t.footer.programs}
            </a>
          </h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {courseLinks.map((l) => (
              <li key={l.href}>
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

      {/* Payment method logos go here (Paystack, Flutterwave, card marks).
          Hidden until real assets are ready — add <Image> badges inside. */}
      <div className="hidden border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-5 py-6 lg:px-8" />
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-5 py-6 text-xs text-muted/70 sm:flex-row sm:justify-between lg:px-8">
          <p>
            © {year} {t.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golddeep"
            >
              {t.footer.privacy}
            </a>
            <a
              href="#"
              className="transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golddeep"
            >
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
