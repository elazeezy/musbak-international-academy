"use client";

import { CreditCard, Gift, RefreshCw } from "lucide-react";
import { useLang } from "@/lib/i18n";

const ICONS = [Gift, CreditCard, RefreshCw] as const;

/* Risk-reversal micro-copy rendered beside every major CTA. */
export function RiskRow({
  className = "",
  iconClassName = "text-golddeep",
}: {
  className?: string;
  iconClassName?: string;
}) {
  const { t } = useLang();

  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium ${className}`}
    >
      {t.risk.items.map((item, i) => {
        const Icon = ICONS[i] ?? Gift;
        return (
          <li key={item} className="flex items-center gap-1.5">
            <Icon className={`h-3.5 w-3.5 ${iconClassName}`} strokeWidth={2} />
            {item}
          </li>
        );
      })}
    </ul>
  );
}
