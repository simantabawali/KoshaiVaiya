/**
 * Mentors — cards for four featured mentors (data from data/catalog.js).
 */
import { Star } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';
import Avatar from '../ui/Avatar.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { mentors } from '../../data/catalog.js';
import { formatCompact } from '../../utils/format.js';
import './Mentors.css';

// Which mentors to show (ids from data/catalog.js).
const FEATURED = ['farhana', 'sadia', 'tanvir', 'mehedi'];

export default function Mentors() {
  const { t, p, n, lang } = useLanguage();
  return (
    <section className="section mentors">
      <div className="container">
        <SectionHeader eyebrow={t('mentors.eyebrow')} title={t('mentors.title')} />
        <div className="mentors__grid">
          {FEATURED.map((id, i) => {
            // Look up the mentor's full details by id.
            const m = mentors[id];
            return (
              <Reveal key={id} delay={i * 90} className={`mentor-card tone-${m.tone}`}>
                <div className="mentor-card__top">
                  <Avatar name={m.name} tone={m.tone} size={64} />
                  <span className="mentor-card__rating"><Star size={13} fill="currentColor" strokeWidth={0} aria-hidden="true" />{n(m.rating)}</span>
                </div>
                <h3>{m.name}</h3>
                <p className="mentor-card__role">{p(m.role)}</p>
                <p className="mentor-card__bio">{p(m.bio)}</p>
                <div className="mentor-card__stats">
                  <span><strong>{formatCompact(m.learners, lang)}</strong> {t('mentors.learners')}</span>
                  <span><strong>{n(m.courses)}</strong> {t('nav.courses').toLowerCase()}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
