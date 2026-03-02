import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Language } from "@/lib/translations";

const STORAGE_KEY = "siteLanguage";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const getInitialLang = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "zh") return stored;
  } catch {}
  return "en";
};

const LanguageContext = createContext<LanguageContextType>({ lang: "en", setLang: () => {} });

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try { localStorage.setItem(STORAGE_KEY, newLang); } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
