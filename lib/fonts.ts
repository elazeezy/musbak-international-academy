import localFont from "next/font/local";

export const sora = localFont({
  src: "../public/fonts/Sora-Variable.ttf",
  variable: "--font-sora",
  display: "swap",
  weight: "100 900",
});

export const cairo = localFont({
  src: "../public/fonts/Cairo-Variable.ttf",
  variable: "--font-cairo",
  display: "swap",
  weight: "200 1000",
});

export const amiri = localFont({
  src: [
    { path: "../public/fonts/Amiri-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Amiri-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
});

/* Editorial display serif for major statements (Latin faces). */
export const fraunces = localFont({
  src: "../public/fonts/Fraunces-Variable.ttf",
  variable: "--font-fraunces",
  display: "swap",
  weight: "100 900",
  preload: false,
});

export const fontVariables = `${sora.variable} ${cairo.variable} ${amiri.variable} ${fraunces.variable}`;
