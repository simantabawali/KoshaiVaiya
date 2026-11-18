/**
 * SectionHeader — the small eyebrow label + big heading + optional subtitle used at the top
 * of most sections. `action` can hold a button shown on the right (e.g. "Browse all courses").
 * `align="center"` centres it; `tone="dark"` is for dark backgrounds.
 */
import Reveal from './Reveal.jsx';
import { cn } from '../../utils/format.js';
import './SectionHeader.css';

// All props are optional except title. Extra classes (e.g. section-header--center) change the layout.
export default function SectionHeader({ eyebrow, title, sub, align = 'left', tone = 'light', action, className }) {
  return (
    <div className={cn('section-header', `section-header--${align}`, `section-header--${tone}`, className)}>
      <Reveal className="section-header__text">
        {/* Only show the small label if one was passed. */}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="section-header__title">{title}</h2>
        {sub && <p className="section-header__sub">{sub}</p>}
      </Reveal>
      {/* Optional button on the right side. */}
      {action && <Reveal delay={120} className="section-header__action">{action}</Reveal>}
    </div>
  );
}
