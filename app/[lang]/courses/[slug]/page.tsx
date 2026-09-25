import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COURSE_IDS,
  getDictionary,
  isLang,
  LANGS,
  type Lang,
} from "@/lib/dictionaries";
import { getCourse } from "@/lib/courses";
import type { CourseId } from "@/lib/dictionaries";
import { breadcrumbJsonLd, buildMetadata, jsonLdScriptTag } from "@/lib/seo";
import { waLink } from "@/lib/config";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { WhatsAppIcon } from "@/components/icons";

export const dynamic = "force-static";
export const dynamicParams = false;

type Params = { lang: string; slug: string };

export function generateStaticParams(): Params[] {
  return LANGS.flatMap((lang) =>
    COURSE_IDS.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang) || !COURSE_IDS.includes(slug as CourseId)) {
    return buildMetadata("en");
  }
  const course = getCourse(slug as CourseId, lang);
  return buildMetadata(lang, `/courses/${course.id}`, {
    title: course.metaTitle,
    description: course.description,
  });
}

export default async function CoursePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang: raw, slug } = await params;
  if (!isLang(raw) || !COURSE_IDS.includes(slug as CourseId)) notFound();
  const lang: Lang = raw;
  const course = getCourse(slug as CourseId, lang);
  const t = getDictionary(lang);

  const breadcrumb = breadcrumbJsonLd(lang, [
    { name: t.seo.home, path: "" },
    { name: t.seo.courses, path: "/courses" },
    { name: course.name },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScriptTag(breadcrumb) }}
      />
      <Navbar />
      <main className="mx-auto w-full max-w-4xl px-5 pb-24 pt-28 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <li>
              <Link href={`/${lang}`} className="transition-colors hover:text-gold">
                {t.seo.home}
              </Link>
            </li>
            <li aria-hidden className="text-line">/</li>
            <li>
              <Link href={`/${lang}/courses`} className="transition-colors hover:text-gold">
                {t.seo.courses}
              </Link>
            </li>
            <li aria-hidden className="text-line">/</li>
            <li aria-current="page" className="font-semibold text-cream">
              {course.name}
            </li>
          </ol>
        </nav>

        <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-golddeep">
          {course.group}
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-cream sm:text-5xl">
          {course.name}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-body">{course.description}</p>

        <p className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ink2 px-3 py-2 text-sm font-semibold text-golddeep">
          {t.seo.trialNote}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={waLink(t.wa.learn(course.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-cream transition-all hover:bg-gold2 hover:shadow-lg hover:shadow-gold/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golddeep"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t.nav.cta}
          </a>
          <Link
            href={`/${lang}/courses`}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-golddeep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golddeep"
          >
            {t.seo.backToCourses}
          </Link>
        </div>

        <p className="mt-10 text-sm text-muted">
          {t.pricing.note}{" "}
          <Link
            href={`/${lang}#pricing`}
            className="font-semibold text-golddeep underline-offset-2 hover:underline"
          >
            {t.nav.pricing}
          </Link>
        </p>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
