/**
 * LanguageSwitch — the EN | বাং toggle. The sliding white "thumb" moves with CSS
 * (.is-bn class). aria-pressed tells screen readers which language is active.
 */
import { useLanguage } from '../../context/LanguageContext.jsx';
import { cn } from '../../utils/format.js';
import './primitives.css';

export default function LanguageSwitch({ tone = 'light' }) {
  // Read the current language and the function that changes it.
  const { lang, setLang, t } = useLanguage();
  return (
    <div className={cn('lang-switch', `lang-switch--${tone}`, lang === 'bn' && 'is-bn')} role="group" aria-label={t('common.lang')}>
      {/* The sliding pill behind the active button (moved with CSS). */}
      <span className="lang-switch__thumb" aria-hidden="true" />
      {/* Clicking a button sets that language for the whole app (every component re-renders with new text). */}
      <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
      <button type="button" aria-pressed={lang === 'bn'} onClick={() => setLang('bn')} lang="bn">বাং</button>
    </div>
  );
}
