import { Sora, Cairo, Amiri, Fraunces } from "next/font/google";

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

/* Editorial display serif for major statements (Latin faces). */
export const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const fontVariables = `${sora.variable} ${cairo.variable} ${amiri.variable} ${fraunces.variable}`;
