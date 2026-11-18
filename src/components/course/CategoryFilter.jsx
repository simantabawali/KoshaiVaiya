/**
 * CategoryFilter — a horizontal row of chips (All, SSC & HSC, Admission, …).
 * `value` = selected category id, `onChange(id)` is called on click, `counts` optionally shows how
 * many courses are in each. On phones the row scrolls sideways.
 */
import { useLanguage } from '../../context/LanguageContext.jsx';
import { categories } from '../../data/catalog.js';
import '../ui/primitives.css';
import './CategoryFilter.css';

export default function CategoryFilter({ value, onChange, counts }) {
  const { t, p, n } = useLanguage();
  // "All" first, then every category with its label in the current language.
  const items = [{ id: 'all', label: t('cat.all') }, ...categories.map((c) => ({ id: c.id, label: p(c.label) }))];
  return (
    <div className="cat-filter" role="toolbar" aria-label="Filter by category">
      {/* aria-pressed marks the selected chip; the CSS colours it dark. */}
      {items.map((item) => (
        <button key={item.id} type="button" className="chip" aria-pressed={value === item.id} onClick={() => onChange(item.id)}>
          {item.label}
          {counts && <span className="chip__count">{n(counts[item.id] ?? 0)}</span>}
        </button>
      ))}
    </div>
  );
}
