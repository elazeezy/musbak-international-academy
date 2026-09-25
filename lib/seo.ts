import type { Metadata } from "next";
import { site, waLink } from "./config";
import { getDictionary, type Dict, type Lang } from "./dictionaries";
import type { Course } from "./courses";

const OG_LOCALES: Record<Lang, string> = { en: "en_US", ar: "ar_SA", fr: "fr_FR" };

export function localeAlternates(path = ""): Record<string, string> {
  return {
    en: `/en${path}`,
    ar: `/ar${path}`,
    fr: `/fr${path}`,
    "x-default": `/en${path}`,
  };
}

/* Shared per-locale metadata. `path` is the locale-relative path, e.g. "" for
   the homepage or "/courses/quran-memorization". Canonical always points at
   the localized URL. `overrides` lets sub-pages (catalog, course pages)
   replace title/description while keeping hreflang/canonical intact. */
export function buildMetadata(
  lang: Lang,
  path = "",
  overrides?: { title?: string; description?: string }
): Metadata {
  const t = getDictionary(lang);
  const title = overrides?.title ?? t.meta.title;
  const description = overrides?.description ?? t.meta.description;
  const canonical = `/${lang}${path}`;
  const ogLocale = OG_LOCALES[lang];
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical,
      languages: localeAlternates(path),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: ogLocale,
      type: "website",
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image.jpg"],
    },
  };
}

export function jsonLdScriptTag(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd(lang: Lang): object {
  const t = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${site.url}/#org`,
    name: site.name,
    alternateName: site.nameAr,
    url: site.url,
    logo: `${site.url}/musbak-logo.png`,
    description: t.meta.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: waLink(t.wa.general),
      availableLanguage: ["English", "Arabic", "French"],
    },
    // sameAs omitted: social URLs in lib/config.ts are "#" placeholders.
    areaServed: ["NG", "SA", "AE", "GB", "US", "CA", "FR"],
  };
}

export function faqJsonLd(t: Dict): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/* Course catalog structured data — one ItemList of Course entities per locale.
   No AggregateRating (reviews must be visible, first-party and per-course
   before any rating markup is added). No offers until real prices land. */
export function courseListJsonLd(lang: Lang, courses: Course[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((course, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        url: `${site.url}/${lang}/courses/${course.id}`,
        name: course.name,
        description: course.description,
        inLanguage: lang,
        provider: { "@type": "Organization", "@id": `${site.url}/#org` },
        educationalLevel: "Beginner to Advanced",
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseSchedule: { "@type": "Schedule", repeatFrequency: "Weekly" },
          instructor: { "@type": "Person", name: "Musbak certified tutor" },
        },
      },
    })),
  };
}

export function breadcrumbJsonLd(lang: Lang, trail: { name: string; path?: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${site.url}/${lang}${item.path}` } : {}),
    })),
  };
}
