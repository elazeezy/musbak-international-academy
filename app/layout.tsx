import type { Metadata } from "next";
import { Sora, Cairo } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "Musbak International Academy | Qur'an, Arabic & Academic Tutoring Online",
  description:
    "Live online classes in Qur'an memorization, Arabic, Islamic sciences and school subjects for kids and adults (ages 4+). 1-on-1 and group classes with qualified tutors. Book a free trial on WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${cairo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-cream">{children}</body>
    </html>
  );
}
