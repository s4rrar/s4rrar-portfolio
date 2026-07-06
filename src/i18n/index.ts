import { en } from "./en";
import type { Translation } from "./en";
import { ar } from "./ar";
import { he } from "./he";

type Language = "en" | "ar" | "he";

const translations: Record<Language, Translation> = { en, ar, he };

const dirs: Record<Language, "ltr" | "rtl"> = { en: "ltr", ar: "rtl", he: "rtl" };

function getTranslations(locale: string): Translation {
  return translations[locale as Language] || en;
}

function getDir(locale: string): "ltr" | "rtl" {
  return dirs[locale as Language] || "ltr";
}

export type { Translation, Language };
export { en, ar, he, translations, getTranslations, getDir, dirs };
