import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fontVariables } from "@/lib/fonts";
import { getDictionary, isLang, LANGS, type Lang } from "@/lib/dictionaries";
import { buildMetadata, jsonLdScriptTag, organizationJsonLd } from "@/lib/seo";
import { LanguageProvider } from "@/lib/i18n";
import { Analytics } from "@/components/Analytics";
import "../globals.css";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata(isLang(lang) ? lang : "en");
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const dir = getDictionary(lang).dir;

  return (
    <html lang={lang} dir={dir} className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScriptTag(organizationJsonLd(lang)) }}
        />
        <LanguageProvider initialLang={lang}>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
