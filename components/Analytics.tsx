"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/* GA4 infrastructure only — renders nothing until NEXT_PUBLIC_GA_ID is set.
   WhatsApp clicks are tracked as conversion events with the current locale
   and page path, fired by delegation so every wa.me link is covered. */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.("a");
      if (!anchor || !anchor.href.includes("wa.me")) return;
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", "whatsapp_click", {
        lang: document.documentElement.lang,
        path: pathname,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });`}
      </Script>
    </>
  );
}
