import type { MetadataRoute } from "next";
import { site } from "@/lib/config";
import { COURSE_IDS, LANGS } from "@/lib/dictionaries";

/* Sitemap with alternates.languages per entry — a second hreflang channel
   alongside the link tags rendered from generateMetadata. Add new static
   paths to `paths` and they appear for every locale automatically. */
const paths = ["", "/courses", ...COURSE_IDS.map((id) => `/courses/${id}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGS.flatMap((lang) =>
    paths.map((path) => ({
      url: `${site.url}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/courses" ? 0.9 : 0.8,
      alternates: {
        languages: Object.fromEntries([
          ...LANGS.map((l) => [l, `${site.url}/${l}${path}`]),
          ["x-default", `${site.url}/en${path}`],
        ]),
      },
    }))
  );
}
