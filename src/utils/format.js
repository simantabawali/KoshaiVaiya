/**
 * format.js — small helper functions for displaying values.
 * Pure functions: same input → same output, no React involved, easy to reuse and test.
 */
// Bangla digits ০–৯ in order, so BN_DIGITS[3] is '৩'.
const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

// 2026 → ২০২৬ (replaces each Latin digit with its Bangla digit)
export const toBnDigits = (value) => String(value).replace(/\d/g, (d) => BN_DIGITS[d]);

// Use Bangla digits only when the language is Bangla.
export const localizeNumber = (value, lang) => (lang === 'bn' ? toBnDigits(value) : String(value));

// 18400 → "18.4k", 120000 → "120k"
export const formatCompact = (n, lang = 'en') => {
  const out = n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '')}k` : `${n}`;
  return localizeNumber(out, lang);
};

// 2450 → "৳2,450", 0 → "Free" / "ফ্রি"
export const formatPrice = (amount, lang = 'en') => {
  if (!amount) return lang === 'bn' ? 'ফ্রি' : 'Free';
  return `৳${localizeNumber(amount.toLocaleString('en-US'), lang)}`;
};

// 206 minutes → "3h 26m" (or "৩ ঘণ্টা ২৬ মি.")
export const formatDuration = (minutes, lang = 'en') => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const str = lang === 'bn'
    ? `${h ? `${h} ঘণ্টা ` : ''}${m ? `${m} মি.` : ''}`
    : `${h ? `${h}h ` : ''}${m ? `${m}m` : ''}`;
  return localizeNumber(str.trim(), lang);
};

// 522 seconds → "8:42" (used by the video player)
export const formatClock = (seconds) => {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

// Join CSS class names, skipping false/empty ones: cn('a', isOn && 'b') → "a b" or "a"
export const cn = (...parts) => parts.filter(Boolean).join(' ');

// From { en: 'Hello', bn: 'হ্যালো' } return the text for the current language.
// Plain strings and arrays are returned unchanged.
export const pick = (value, lang) => (value && typeof value === 'object' && !Array.isArray(value) ? value[lang] ?? value.en : value);
