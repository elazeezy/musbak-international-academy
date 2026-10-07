"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/config";
import { CloseIcon, WhatsAppIcon } from "./icons";

export function WhatsAppFloat() {
  const { t } = useLang();
  const [showTip, setShowTip] = useState(false);

  /*
   * Show the desktop tooltip after a short delay.
   * The entire component is hidden on mobile, so this only
   * matters on md+ screens.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTip(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="
        fixed
        end-4
        bottom-6
        z-50
        hidden
        items-center
        gap-3
        md:flex
        md:end-6
      "
    >
      {/* ================================================
          DESKTOP TOOLTIP
      ================================================= */}

      {showTip && (
        <div
          role="status"
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-[#001A3F]/10
            bg-white
            px-4
            py-2.5
            text-sm
            font-semibold
            text-[#001A3F]
            shadow-[0_15px_45px_rgba(0,0,0,0.12)]
          "
        >
          <span>{t.floatTooltip}</span>

          <button
            type="button"
            onClick={() => setShowTip(false)}
            aria-label={t.floatDismiss}
            className="
              flex
              min-h-8
              min-w-8
              items-center
              justify-center
              rounded-full
              text-[#001A3F]/45
              transition-colors
              hover:bg-[#001A3F]/5
              hover:text-[#001A3F]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#35B8FF]
            "
          >
            <CloseIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* ================================================
          WHATSAPP BUTTON
      ================================================= */}

      <a
        href={waLink(t.wa.general)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.float}
        onClick={() => setShowTip(false)}
        className="
          group
          flex
          items-center
          gap-0
          rounded-full
          bg-[#25D366]
          p-4
          text-white
          shadow-[0_15px_45px_rgba(0,0,0,0.25)]
          transition-all
          duration-200
          hover:scale-105
          hover:shadow-[0_15px_45px_rgba(37,211,102,0.25)]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#25D366]
          focus-visible:ring-offset-4
          focus-visible:ring-offset-[#001A3F]
        "
      >
        <WhatsAppIcon className="h-7 w-7 shrink-0" />

        <span
          className="
            max-w-0
            overflow-hidden
            text-sm
            font-bold
            opacity-0
            transition-all
            duration-300
            group-hover:max-w-40
            group-hover:ps-2
            group-hover:opacity-100
            group-focus-visible:max-w-40
            group-focus-visible:ps-2
            group-focus-visible:opacity-100
          "
        >
          {t.float}
        </span>
      </a>
    </div>
  );
}