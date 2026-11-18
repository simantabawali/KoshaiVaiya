/**
 * Featured — the six most popular courses, with category chips to filter them.
 * useMemo recalculates the list only when the selected category changes.
 * `key={active}` on the grid re-mounts it on every filter change, so the cards animate in again.
 */
import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';
import Button from '../ui/Button.jsx';
import CourseCard from '../course/CourseCard.jsx';
import CategoryFilter from '../course/CategoryFilter.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { courses } from '../../data/courses.js';
import './Featured.css';

export default function Featured() {
  const { t } = useLanguage();
  // Which category chip is selected. Starts as 'all'.
  const [active, setActive] = useState('all');

  // Filter by category → sort by learners (most first) → keep the first 6.
  // .slice() copies the array first, because .sort() would otherwise change the original list.
  const list = useMemo(() => (
    (active === 'all' ? courses : courses.filter((c) => c.category === active))
      .slice()
      .sort((a, b) => b.learners - a.learners)
      .slice(0, 6)
  ), [active]);

  return (
    <section className="section section--tint featured">
      <div className="container">
        <SectionHeader
          eyebrow={t('featured.eyebrow')}
          title={t('featured.title')}
          action={<Button to="/courses" variant="secondary" icon={ArrowRight}>{t('featured.all')}</Button>}
        />
        {/* When a chip is clicked, CategoryFilter calls setActive with that chip's id → the list updates. */}
        <Reveal><CategoryFilter value={active} onChange={setActive} /></Reveal>
        <div className="course-grid featured__grid" key={active}>
          {list.map((course, i) => (
            <div key={course.slug} className="featured__item" style={{ '--i': i }}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
