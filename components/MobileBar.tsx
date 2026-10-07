"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/config";
import { CloseIcon, WhatsAppIcon } from "./icons";

/*
 * Session-wide dismissal.
 * Once dismissed, the bar stays hidden for the current session.
 */
let dismissed = false;

export const MOBILE_BAR_DISMISSED_EVENT =
  "musbak:mobilebar-dismiss";

export function isMobileBarDismissed(): boolean {
  return dismissed;
}

export function MobileBar() {
  const { t } = useLang();
  const [visible, setVisible] = useState(!dismissed);

  if (!visible) return null;

  const dismiss = () => {
    dismissed = true;
    setVisible(false);

    window.dispatchEvent(
      new Event(MOBILE_BAR_DISMISSED_EVENT)
    );
  };

  return (
    <div
      className="
        fixed
        inset-x-0
        bottom-0
        z-40
        px-3
        pb-[calc(10px+env(safe-area-inset-bottom))]
        md:hidden
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-[520px]
          items-center
          gap-2
          rounded-[22px]
          border
          border-white/10
          bg-[#001A3F]/95
          px-2.5
          py-2.5
          shadow-[0_-8px_40px_rgba(0,0,0,0.22)]
          backdrop-blur-2xl
        "
      >
        {/* ================================================
            PRIMARY CTA
        ================================================= */}

        <a
          href={waLink(t.wa.trial)}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            flex
            min-h-[52px]
            flex-1
            items-center
            justify-center
            gap-3
            rounded-[16px]
            bg-[#35B8FF]
            px-4
            text-[#001A3F]
            shadow-[0_8px_25px_rgba(53,184,255,0.18)]
            transition-all
            duration-200
            active:scale-[0.98]
            hover:bg-white
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#35B8FF]
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#001A3F]
          "
        >
          <WhatsAppIcon
            className="
              h-[19px]
              w-[19px]
              shrink-0
            "
          />

          <span className="flex flex-col leading-tight">
            <span
              className="
                text-[14px]
                font-bold
                tracking-[-0.01em]
              "
            >
              {t.nav.cta}
            </span>

            <span
              className="
                mt-0.5
                text-[10px]
                font-medium
                opacity-65
              "
            >
              {t.cta.small}
            </span>
          </span>

          {/* Arrow */}
          <span
            className="
              ml-1
              text-[17px]
              transition-transform
              duration-200
              group-hover:translate-x-0.5
            "
            aria-hidden="true"
          >
            →
          </span>
        </a>

        {/* ================================================
            DISMISS
        ================================================= */}

        <button
          type="button"
          onClick={dismiss}
          aria-label={t.barDismiss}
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            text-white/50
            transition-all
            duration-200
            hover:bg-white/10
            hover:text-white
            active:scale-95
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#35B8FF]
          "
        >
          <CloseIcon className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}