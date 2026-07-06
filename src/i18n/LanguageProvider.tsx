"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { en, ar, he } from "./index";
import type { Translation, Language } from "./index";

const translations: Record<Language, Translation> = { en, ar, he };

type LanguageContextType = {
  locale: Language;
  t: Translation;
  dir: "ltr" | "rtl";
  setLocale: (locale: Language) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  t: en,
  dir: "ltr",
  setLocale: () => {},
});

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value};path=/;max-age=31536000;SameSite=Lax`;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Language | null;
    if (saved && translations[saved]) {
      setLocaleState(saved);
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((l: Language) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
    setCookie("locale", l);
    document.documentElement.lang = l;
    const dir = l === "en" ? "ltr" : "rtl";
    document.documentElement.dir = dir;
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === "en" ? "ltr" : "rtl";
    }
  }, [locale, mounted]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        t: translations[locale],
        dir: locale === "en" ? "ltr" : "rtl",
        setLocale,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
