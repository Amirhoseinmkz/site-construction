'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, translations, Translations } from '@/data/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fa');

  useEffect(() => {
    const saved = localStorage.getItem('mirkazemi_locale') as Locale;
    if (saved && (saved === 'fa' || saved === 'en')) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('mirkazemi_locale', newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'fa' ? 'rtl' : 'ltr';
  };

  const t = translations[locale];
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      locale: 'fa' as Locale,
      setLocale: () => {},
      t: translations.fa,
      dir: 'rtl' as 'rtl' | 'ltr',
    };
  }
  return context;
}
