export const site = {
  name: "Musbak International Academy",
  nameAr: "أكاديمية مسباك العالمية",
  // Canonical site URL — single source of truth for metadata, sitemap, JSON-LD.
  // Swap to the custom domain here when it's purchased.
  url: "https://musbak-international-academy.vercel.app",
  // Primary WhatsApp line — used by all CTA buttons (country code + number, no "+")
  whatsapp: "966599748264",
  whatsappDisplay: "+966 59 974 8264",
  whatsappSecondary: "2348103645835",
  whatsappSecondaryDisplay: "+234 810 364 5835",
  email: "Musbakinternational@gmail.com",
  // Hero background video (MP4 in /public/videos). Empty = use the poster
  // image fallback (/images/hero-poster.jpg).
  heroVideo: "",
  // YouTube embed URL for the hero video (VSL). Empty = show poster placeholder.
  // Example: "https://www.youtube.com/embed/VIDEO_ID"
  vslUrl: "",
  // Per-locale intro videos (MP4 files in /public/videos) — take precedence
  // over vslUrl for that locale. Add en/fr entries when their videos exist.
  vslLocal: {
    ar: {
      src: "/videos/musbak-introductory-video-arabic.mp4",
      duration: "0:51",
    },
  } as Record<string, { src: string; duration: string }>,
  socials: {
    instagram: "#",
    tiktok: "#",
    x: "#",
    youtube: "#",
  },
};

export function waLink(message: string, number: string = site.whatsapp): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
