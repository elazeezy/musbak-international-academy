export const site = {
  name: "Musbak International Academy",
  nameAr: "أكاديمية مسباك العالمية",
  // Primary WhatsApp line — used by all CTA buttons (country code + number, no "+")
  whatsapp: "966599748264",
  whatsappDisplay: "+966 59 974 8264",
  whatsappSecondary: "2348103645835",
  whatsappSecondaryDisplay: "+234 810 364 5835",
  email: "Musbakinternational@gmail.com",
  // YouTube embed URL for the hero video (VSL). Empty = show poster placeholder.
  // Example: "https://www.youtube.com/embed/VIDEO_ID"
  vslUrl: "",
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
