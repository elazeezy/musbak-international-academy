"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  dictionaries,
  type CourseId,
  type Dict,
  type Lang,
} from "./dictionaries";

export { dictionaries, LANGUAGES, COURSE_IDS } from "./dictionaries";
export type { CourseId, Dict, Lang };

type LangCtxValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
};

const LangCtx = createContext<LangCtxValue | null>(null);

/* The server-rendered locale owns the initial <html lang dir>; this effect
   mirrors locale switches done via client-side navigation (the root layout
   itself does not re-render its <html> attributes between /en, /ar and /fr).
   initialLang must match the server-rendered locale to avoid mismatches. */
export function LanguageProvider({
  initialLang = "en",
  children,
}: {
  initialLang?: Lang;
  children: ReactNode;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dictionaries[lang].dir;
    localStorage.setItem("musbak-lang", lang);
  }, [lang]);

  const t = dictionaries[lang];

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>
  );
}

export function useLang(): LangCtxValue {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
