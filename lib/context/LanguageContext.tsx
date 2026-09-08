"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type Language = "en" | "kn";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  isKn: boolean;
  t: (enText: string, knText?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
  isKn: false,
  t: (enText) => enText,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Language;
      if (saved === "en" || saved === "kn") {
        setLangState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const applyLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    const kn = newLang === "kn";
    if (typeof document !== "undefined") {
      document.documentElement.lang = kn ? "kn" : "en";
      document.documentElement.classList.toggle("lang-kn", kn);
      try {
        localStorage.setItem("lang", newLang);
      } catch {
        // ignore
      }
      document.dispatchEvent(new CustomEvent("i18n:changed", { detail: { lang: newLang } }));
    }
  }, []);

  const toggleLang = useCallback(() => {
    applyLang(lang === "kn" ? "en" : "kn");
  }, [lang, applyLang]);

  const t = useCallback(
    (enText: string, knText?: string) => {
      if (lang === "kn" && knText) return knText;
      return enText;
    },
    [lang]
  );

  useEffect(() => {
    applyLang(lang);
  }, [lang, applyLang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: applyLang, toggleLang, isKn: lang === "kn", t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
