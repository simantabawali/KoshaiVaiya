/**
 * Paths — "Choose your path" grid: one card per category, linking to the filtered catalogue.
 * Each card fades in with a small delay (i * 70ms) so they appear one after another.
 */
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';
import Icon from '../ui/Icon.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { categories } from '../../data/catalog.js';
import { countByCategory } from '../../data/courses.js';
import './Paths.css';

export default function Paths() {
  const { t, p, n } = useLanguage();
  return (
    <section id="paths" className="section paths">
      <div className="container">
        <SectionHeader eyebrow={t('paths.eyebrow')} title={t('paths.title')} sub={t('paths.sub')} />
        <div className="paths__grid">
          {/* One card per category. `i` (its position) delays each card's animation a little more. */}
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 70}>
              <Link to={`/courses?cat=${c.id}`} className={`path-card tone-${c.tone}`}>
                <span className="path-card__icon"><Icon name={c.icon} size={22} strokeWidth={1.8} /></span>
                <span className="path-card__count">{n(countByCategory(c.id))} {countByCategory(c.id) === 1 ? t('paths.course') : t('paths.courses')}</span>
                <h3 className="path-card__title">{p(c.label)}</h3>
                <p className="path-card__blurb">{p(c.blurb)}</p>
                <ArrowUpRight className="path-card__arrow" size={20} aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
