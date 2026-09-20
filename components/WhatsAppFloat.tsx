"use client";

import { useLang } from "@/lib/i18n";
import { waLink } from "@/lib/config";
import { WhatsAppIcon } from "./icons";

export function WhatsAppFloat() {
  const { t } = useLang();

  return (
    <a
      href={waLink(t.wa.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.float}
      className="group fixed bottom-6 end-6 z-50 flex items-center gap-0 rounded-full bg-[#25D366] p-4 text-white shadow-2xl shadow-black/40 transition-all hover:scale-105 hover:shadow-[#25D366]/30"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="max-w-0 overflow-hidden text-sm font-bold transition-all duration-300 group-hover:max-w-40 group-hover:ps-2">
        {t.float}
      </span>
    </a>
  );
}
