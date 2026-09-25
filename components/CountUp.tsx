"use client";

import { useEffect, useRef, useState } from "react";

const NUMERIC = /^(\D*)(\d+)(\D*)$/;

/* Counts the numeric part of a stat ("15+", "+15", "100%") up from 0 when
   scrolled into view. Non-numeric or trivial values render as-is. */
export function CountUp({
  value,
  className = "",
  duration = 1400,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const m = NUMERIC.exec(value);
    const target = m ? Number.parseInt(m[2] ?? "", 10) : Number.NaN;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!m || !Number.isFinite(target) || target <= 1 || reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(value);
      return;
    }
    const prefix = m[1] ?? "";
    const suffix = m[3] ?? "";
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.disconnect();
          const t0 = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(`${prefix}${Math.round(eased * target)}${suffix}`);
            if (p < 1) requestAnimationFrame(step);
          };
          setDisplay(`${prefix}0${suffix}`);
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
