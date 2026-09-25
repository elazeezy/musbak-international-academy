import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLang } from "@/lib/dictionaries";
import { listCourses } from "@/lib/courses";
import { buildMetadata, courseListJsonLd, jsonLdScriptTag } from "@/lib/seo";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return buildMetadata("en");
  const t = getDictionary(lang);
  return buildMetadata(lang, "/courses", {
    title: t.seo.catalogTitle,
    description: t.seo.catalogSub,
  });
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang = raw;
  const t = getDictionary(lang);
  const courses = listCourses(lang);
  const groups = [...new Set(courses.map((c) => c.group))];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScriptTag(courseListJsonLd(lang, courses)) }}
      />
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-5 pb-24 pt-28 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-golddeep">
          {t.tracks.eyebrow}
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight text-cream sm:text-5xl">
          {t.seo.catalogH1}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-body">{t.seo.catalogSub}</p>

        {groups.map((group) => (
          <section key={group} className="mt-14">
            <h2 className="text-xl font-bold text-cream">{group}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((c) => c.group === group)
                .map((course) => (
                  <Link
                    key={course.id}
                    href={`/${lang}/courses/${course.id}`}
                    className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-xl hover:shadow-gold/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golddeep"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-golddeep">
                      {course.group}
                    </span>
                    <span className="mt-2 text-lg font-bold text-cream group-hover:text-golddeep">
                      {course.name}
                    </span>
                    <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                      {course.description}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                      {t.seo.trialNote}
                      <span className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                        →
                      </span>
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
