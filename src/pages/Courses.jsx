/**
 * Courses page — the searchable, filterable course catalogue.
 *
 * Filters live in the URL (?q=…&cat=…&level=…&sort=…) instead of plain state, so:
 *   - a filtered view can be shared or bookmarked,
 *   - the home-page search and footer links can open it pre-filtered,
 *   - the browser back button works as expected.
 * useSearchParams() reads/writes those URL values. useMemo avoids re-filtering on every render.
 */
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SearchX, X } from 'lucide-react';
import CourseCard from '../components/course/CourseCard.jsx';
import CategoryFilter from '../components/course/CategoryFilter.jsx';
import Select from '../components/ui/Select.jsx';
import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { courses } from '../data/courses.js';
import { categories, mentors } from '../data/catalog.js';
import '../components/ui/SectionHeader.css';
import '../components/home/Featured.css';
import './Courses.css';

// Sort functions for Array.sort(): negative → a first, positive → b first.
const SORTERS = {
  popular: (a, b) => b.learners - a.learners,
  rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  newest: (a, b) => b.addedOrder - a.addedOrder,
  price: (a, b) => a.price - b.price,
};

export default function Courses() {
  const { t, n } = useLanguage();
  useDocumentTitle(t('nav.courses'));
  const [params, setParams] = useSearchParams();
  // Read each filter from the URL. `??` gives a default when it's missing.
  const q = params.get('q') ?? '';
  const cat = params.get('cat') ?? 'all';
  const level = params.get('level') ?? 'all';
  const sort = params.get('sort') ?? 'popular';

  // Change one URL filter. Default values are removed to keep the URL clean.
  const update = (key, value, fallback) => {
    const next = new URLSearchParams(params);
    if (!value || value === fallback) next.delete(key); else next.set(key, value);
    setParams(next, { replace: true });
  };

  // Build a function that checks whether a course matches the search text
  // (looks in titles, tagline, mentor name and category; ignores upper/lower case).
  const matchesQuery = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return () => true;
    return (c) => [c.title.en, c.title.bn, c.tagline.en, mentors[c.mentor].name, c.category,
      categories.find((x) => x.id === c.category)?.label.en]
      .some((s) => s?.toLowerCase().includes(needle));
  }, [q]);

  // Courses matching search + level (before category), used for the chip counts.
  const base = useMemo(() => courses.filter((c) => matchesQuery(c) && (level === 'all' || c.level === level)), [matchesQuery, level]);

  // How many courses each category chip would show, e.g. { all: 10, tech: 2, … }
  const counts = useMemo(() => base.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] ?? 0) + 1;
    acc.all += 1;
    return acc;
  }, { all: 0 }), [base]);

  // Final list: apply the category filter, then sort.
  const results = useMemo(() => (
    base.filter((c) => cat === 'all' || c.category === cat).sort(SORTERS[sort] ?? SORTERS.popular)
  ), [base, cat, sort]);

  // Decides whether to show the "Clear filters" button.
  const hasFilters = q || cat !== 'all' || level !== 'all';

  return (
    <>
      {/* Top area: title, search box and dropdowns. */}
      <section className="catalog-hero">
        <div className="container">
          <Reveal>
            <p className="eyebrow">{t('catalog.eyebrow')}</p>
            <h1>{t('catalog.title')}</h1>
          </Reveal>
          <Reveal delay={100} className="catalog-toolbar">
            <div className="catalog-search">
              <Search size={20} aria-hidden="true" />
              <label htmlFor="catalog-q" className="sr-only">{t('catalog.search')}</label>
              <input id="catalog-q" type="search" value={q} placeholder={t('catalog.search')} onChange={(e) => update('q', e.target.value, '')} />
              {q && <button type="button" onClick={() => update('q', '', '')} aria-label={t('catalog.clear')}><X size={18} /></button>}
            </div>
            <Select id="level" label={t('catalog.level')} value={level} onChange={(v) => update('level', v, 'all')}
              options={['all', 'beginner', 'intermediate', 'advanced'].map((l) => ({ value: l, label: t(`level.${l}`) }))} />
            <Select id="sort" label={t('catalog.sort')} value={sort} onChange={(v) => update('sort', v, 'popular')}
              options={Object.keys(SORTERS).map((s) => ({ value: s, label: t(`catalog.sort.${s}`) }))} />
          </Reveal>
        </div>
      </section>

      {/* Results: category chips, count, then the grid (or a "nothing found" message). */}
      <section className="catalog-body">
        <div className="container">
          <div className="catalog-filters">
            <CategoryFilter value={cat} onChange={(v) => update('cat', v, 'all')} counts={counts} />
          </div>
          <p className="catalog-count" aria-live="polite"><strong>{n(results.length)}</strong> {t('catalog.results')}</p>

          {/* Any results? → grid. None? → empty state. */}
          {results.length ? (
            <div className="course-grid" key={`${cat}-${level}-${sort}`}>
              {results.map((course, i) => (
                <div key={course.slug} className="featured__item" style={{ '--i': Math.min(i, 8) }}>
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          ) : (
            <div className="catalog-empty">
              <span className="catalog-empty__icon"><SearchX size={28} aria-hidden="true" /></span>
              <h2>{t('catalog.empty.t')}</h2>
              <p>{t('catalog.empty.d')}</p>
              {hasFilters && <Button variant="dark" onClick={() => setParams({}, { replace: true })}>{t('catalog.clear')}</Button>}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
