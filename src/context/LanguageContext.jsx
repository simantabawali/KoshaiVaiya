/**
 * LanguageContext.jsx — shares the chosen language across the whole app.
 *
 * "Context" lets any component read a value without passing it down through every prop.
 * Components call useLanguage() and get:
 *   lang    → 'en' or 'bn'
 *   setLang → change the language
 *   t(key)  → translated UI text, e.g. t('nav.courses') → "Courses" / "কোর্স"
 *   p(obj)  → pick the right language from data objects like { en: '…', bn: '…' }
 *   n(num)  → show numbers with Bangla digits when the language is Bangla (১২৩)
 * The choice is saved in localStorage so it is remembered next visit.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from '../data/locales/en.js';
import bn from '../data/locales/bn.js';
import { readStorage, writeStorage } from '../utils/storage.js';
import { localizeNumber, pick } from '../utils/format.js';

// All UI text: one big object per language.
const dictionaries = { en, bn };
// createContext makes a "shared box". Any component inside the Provider below can read it.
const LanguageContext = createContext(null);

// The Provider component. Whatever is placed inside it (`children`) can use the language.
// `{ children }` is "destructuring": it takes the children prop out of the props object.
export function LanguageProvider({ children }) {
  // Start with the saved language (or English the first time).
  const [lang, setLang] = useState(() => readStorage('jonaki:lang', 'en'));

  // Whenever the language changes: update <html lang="…"> (fonts/line-height react to it) and save it.
  useEffect(() => {
    document.documentElement.lang = lang;
    writeStorage('jonaki:lang', lang);
  }, [lang]);

  // useCallback keeps the same function between renders unless `lang` changes (avoids extra re-renders).
  // Fallback order: chosen language → English → the key itself (so a missing text is easy to spot).
  const t = useCallback((key) => dictionaries[lang][key] ?? en[key] ?? key, [lang]);
  const p = useCallback((value) => pick(value, lang), [lang]);
  const n = useCallback((value) => localizeNumber(value, lang), [lang]);
  // Switch between English and Bangla.
  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'bn' : 'en')), []);

  // useMemo builds the shared object only when something inside it changes.
  const value = useMemo(() => ({ lang, setLang, toggle, t, p, n }), [lang, toggle, t, p, n]);
  // Hand `value` to every component inside.
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// Custom hook: the easy way for components to read this context.
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  // Clear error message if someone forgets to wrap the app in <LanguageProvider>.
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
