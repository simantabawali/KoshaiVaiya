/**
 * CourseCard — the card used in every course grid.
 *
 * Shows generated cover art, badge, rating, level, title, mentor, lesson count, duration, learners,
 * and either the price or (if `progress` is given) a progress bar.
 * The whole card is clickable: an invisible <Link> is stretched over it (.course-card__link).
 * memo() skips re-rendering a card when its props haven't changed — useful in long lists.
 */
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, PlayCircle, Users } from 'lucide-react';
import CourseCover from './CourseCover.jsx';
import Rating from '../ui/Rating.jsx';
import Avatar from '../ui/Avatar.jsx';
import ProgressBar from '../ui/ProgressBar.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { mentors } from '../../data/catalog.js';
import { formatCompact, formatDuration, formatPrice } from '../../utils/format.js';
import './CourseCard.css';

// course = one course object from data/courses.js; progress = optional % (used on the dashboard).
function CourseCard({ course, progress }) {
  const { t, p, n, lang } = useLanguage();
  // course.mentor is only an id like 'sadia'; look up the full mentor object.
  const mentor = mentors[course.mentor];
  return (
    <article className="course-card">
      {/* Invisible link stretched over the whole card, so clicking anywhere opens the course. */}
      <Link to={`/courses/${course.slug}`} className="course-card__link" aria-label={p(course.title)} />
      <div className="course-card__media">
        <CourseCover course={course} />
        {/* Badge only for courses that have one ("bestseller" or "new"). */}
        {course.badge && (
          <span className={`badge course-card__badge tone-${course.badge === 'new' ? 'iris' : 'amber'}`}>
            {t(`course.${course.badge}`)}
          </span>
        )}
      </div>
      <div className="course-card__body">
        <div className="course-card__meta">
          <Rating value={course.rating} count={course.reviews} />
          <span className="course-card__dot" aria-hidden="true" />
          <span className="course-card__level">{t(`level.${course.level}`)}</span>
        </div>
        <h3 className="course-card__title">{p(course.title)}</h3>
        <div className="course-card__mentor">
          <Avatar name={mentor.name} tone={mentor.tone} size={26} />
          <span>{mentor.name}</span>
        </div>
        <ul className="course-card__facts">
          <li><PlayCircle size={15} aria-hidden="true" />{n(course.lessonCount)} {t('course.lessons')}</li>
          <li><Clock size={15} aria-hidden="true" />{formatDuration(course.totalMinutes, lang)}</li>
          <li><Users size={15} aria-hidden="true" />{formatCompact(course.learners, lang)}</li>
        </ul>
        {/* Progress given → show a progress bar. Otherwise → show the price. */}
        {progress != null ? (
          <div className="course-card__progress">
            <ProgressBar value={progress} label={`${progress}%`} />
            <span>{n(progress)}%</span>
          </div>
        ) : (
          <div className="course-card__price">
            <strong>{formatPrice(course.price, lang)}</strong>
            {course.oldPrice && <s>{formatPrice(course.oldPrice, lang)}</s>}
          </div>
        )}
      </div>
    </article>
  );
}

// memo: only re-draw this card if `course` or `progress` changed.
export default memo(CourseCard);
