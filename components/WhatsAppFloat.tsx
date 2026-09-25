"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/config";
import {
  isMobileBarDismissed,
  MOBILE_BAR_DISMISSED_EVENT,
} from "./MobileBar";
import { CloseIcon, WhatsAppIcon } from "./icons";

export function WhatsAppFloat() {
  const { t } = useLang();
  const [showTip, setShowTip] = useState(false);
  /* While the mobile bar is visible, keep the bubble above it (mobile only). */
  const [barVisible, setBarVisible] = useState(!isMobileBarDismissed());

  useEffect(() => {
    const timer = setTimeout(() => setShowTip(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onBarDismissed = () => setBarVisible(false);
    window.addEventListener(MOBILE_BAR_DISMISSED_EVENT, onBarDismissed);
    return () =>
      window.removeEventListener(MOBILE_BAR_DISMISSED_EVENT, onBarDismissed);
  }, []);

  return (
    <div
      className={`fixed end-4 z-50 flex items-center gap-3 transition-[bottom] duration-300 sm:end-6 md:bottom-6 ${
        barVisible ? "bottom-28" : "bottom-6"
      }`}
    >
      {showTip && (
        <div
          role="status"
          className="flex items-center gap-2 rounded-2xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-cream shadow-xl shadow-black/10"
        >
          {t.floatTooltip}
          <button
            type="button"
            onClick={() => setShowTip(false)}
            aria-label={t.floatDismiss}
            className="flex min-h-8 min-w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-golddeep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golddeep"
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      <a
        href={waLink(t.wa.general)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.float}
        onClick={() => setShowTip(false)}
        className="group flex items-center gap-0 rounded-full bg-[#25D366] p-4 text-white shadow-2xl shadow-black/40 transition-all hover:scale-105 hover:shadow-[#25D366]/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-golddeep"
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className="max-w-0 overflow-hidden text-sm font-bold transition-all duration-300 group-hover:max-w-40 group-hover:ps-2 group-focus-visible:max-w-40 group-focus-visible:ps-2">
          {t.float}
        </span>
      </a>
    </div>
  );
}
