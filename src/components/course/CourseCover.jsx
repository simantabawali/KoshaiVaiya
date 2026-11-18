/**
 * CourseCover — generated artwork for a course (no image files needed).
 * Built from the course's colour `tone`, a background pattern chosen per tone, a large italic
 * `glyph` (e.g. "F=ma") and the category icon. All drawing is CSS in CourseCover.css.
 */
import { categories } from '../../data/catalog.js';
import Icon from '../ui/Icon.jsx';
import { cn } from '../../utils/format.js';
import './CourseCover.css';

// Which background pattern each colour tone uses.
const PATTERNS = {
  jade: 'rings',
  amber: 'dots',
  clay: 'waves',
  iris: 'grid',
};

/** Generated course artwork — no images needed, unique per course tone + glyph. */
export default function CourseCover({ course, size = 'card', className }) {
  // Find this course's category so we can show its icon.
  const category = categories.find((c) => c.id === course.category);
  const pattern = PATTERNS[course.tone] ?? 'dots';
  return (
    <div className={cn('cover', `cover--${size}`, `cover--${pattern}`, `tone-${course.tone}`, className)} aria-hidden="true">
      <span className="cover__glow" />
      <span className="cover__pattern" />
      <span className="cover__glyph">{course.glyph}</span>
      <span className="cover__icon"><Icon name={category?.icon} size={size === 'large' ? 22 : 18} strokeWidth={1.8} /></span>
    </div>
  );
}
