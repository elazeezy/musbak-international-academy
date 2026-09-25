import { Sora, Cairo, Amiri } from "next/font/google";

export const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const fontVariables = `${sora.variable} ${cairo.variable} ${amiri.variable}`;
