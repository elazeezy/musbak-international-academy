import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { getDictionary } from "@/lib/dictionaries";
import { LANGS } from "@/lib/dictionaries";
import { waLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "404 — Musbak International Academy",
  robots: { index: false },
};

/* Global 404 for URLs that match no route at all (e.g. /xyz). The app has no
   app/layout.tsx (the [lang] layout is the root layout), so this page must
   render its own full HTML document. Requires experimental.globalNotFound. */
export default function GlobalNotFound() {
  const en = getDictionary("en");

  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body
        style={{ background: "#FBF8F2", color: "#292022" }}
        className="flex min-h-full flex-col items-center justify-center px-5 py-24 text-center"
      >
        <p style={{ color: "#B96E04" }} className="text-xs font-bold uppercase tracking-[0.3em]">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{en.seo.notFoundTitle}</h1>
        <p className="mt-4 max-w-md text-[#5a4f52]">{en.seo.notFoundBody}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {LANGS.map((lang) => (
            <a
              key={lang}
              href={`/${lang}`}
              className="rounded-full border border-[#e9dfce] bg-white px-5 py-2.5 text-sm font-semibold"
            >
              {getDictionary(lang).seo.home}
            </a>
          ))}
          <a
            href={waLink(en.wa.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-5 py-2.5 text-sm font-bold text-white"
            style={{ background: "#F8A008" }}
          >
            {en.seo.notFoundCta}
          </a>
        </div>
      </body>
    </html>
  );
}
