"use client";

import { useLang } from "@/lib/i18n";
import { StarMark } from "./icons";

export function Marquee() {
  const { t } = useLang();
  const items = [...t.marquee, ...t.marquee];

  return (
    <div className="relative overflow-hidden border-y border-line bg-ink2 py-5">
      <div className="flex w-max animate-marquee items-center gap-8 rtl:[animation-direction:reverse]">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="text-sm font-semibold uppercase tracking-widest text-cream/70">
              {item}
            </span>
            <StarMark className="h-4 w-4 text-gold/50" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-ink2 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-ink2 to-transparent" />
    </div>
  );
}
