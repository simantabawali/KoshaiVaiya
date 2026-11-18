/**
 * Rating — star icon + score + optional review count, e.g. ★ 4.9 (3,120).
 */
import { Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './primitives.css';

export default function Rating({ value, count, tone = 'light' }) {
  // n() shows digits in Bangla when the site is in Bangla.
  const { n } = useLanguage();
  return (
    <span className={`rating rating--${tone}`}>
      <Star size={14} fill="currentColor" strokeWidth={0} className="rating__star" aria-hidden="true" />
      <strong>{n(value.toFixed(1))}</strong>
      {/* Show the review count only if it was given. */}
      {count != null && <span className="rating__count">({n(count.toLocaleString('en-US'))})</span>}
      {/* Text only for screen readers — the sr-only class hides it visually. */}
      <span className="sr-only">out of 5</span>
    </span>
  );
}
