import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { site, waLink } from "@/lib/config";
import { LANGS } from "@/lib/dictionaries";

export const dynamic = "force-static";

/* Rendered inside app/[lang]/layout.tsx, so it inherits the locale's
   <html lang dir> shell. Shown for unmatched paths under a locale. */
export default function NotFound() {
  const en = getDictionary("en");
  const ar = getDictionary("ar");
  const fr = getDictionary("fr");
  const t = en.seo;

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#72CFFF]">404</p>
      <h1 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-bold text-white sm:text-4xl">
        {t.notFoundTitle}
      </h1>
      <p className="mt-4 max-w-md text-white/70">{t.notFoundBody}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {LANGS.map((lang) => (
          <Link
            key={lang}
            href={`/${lang}`}
            className="min-h-11 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-[#8DDCFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-deep"
          >
            {getDictionary(lang).seo.home}
          </Link>
        ))}
        <a
          href={waLink(en.wa.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-11 rounded-full bg-accent-deep px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#17639A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t.notFoundCta}
        </a>
      </div>
      <p className="mt-6 text-sm text-muted" dir="rtl" lang="ar">
        {ar.seo.notFoundTitle} ·{" "}
      </p>
      <p className="mt-1 text-sm text-muted">{fr.seo.notFoundTitle}</p>
      <span className="sr-only">{site.name}</span>
    </main>
  );
}
