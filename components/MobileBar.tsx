"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/config";
import { CloseIcon, WhatsAppIcon } from "./icons";

/* Session-wide dismissal: module-level flag so a dismissed bar stays gone
   without touching localStorage, plus an event so the floating WhatsApp
   bubble can drop back down to its usual offset. */
let dismissed = false;

export const MOBILE_BAR_DISMISSED_EVENT = "musbak:mobilebar-dismiss";

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
    window.dispatchEvent(new Event(MOBILE_BAR_DISMISSED_EVENT));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 animate-bar-in md:hidden">
      <div className="border-t border-line bg-ink/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(41,32,34,0.12)] backdrop-blur-xl">
        <div className="flex items-center gap-2.5 px-4 py-3">
          <a
            href={waLink(t.wa.trial)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-full bg-gold px-5 text-sm font-bold text-cream transition-colors hover:bg-gold2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golddeep"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            <span className="flex flex-col items-center leading-tight">
              <span>{t.nav.cta}</span>
              <span className="text-[11px] font-medium text-cream/85">
                {t.cta.small}
              </span>
            </span>
          </a>
          <button
            type="button"
            onClick={dismiss}
            aria-label={t.barDismiss}
            className="flex min-h-11 min-w-11 shrink-0 items-center justify-center self-center rounded-full text-muted transition-colors hover:bg-ink2 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-golddeep"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
