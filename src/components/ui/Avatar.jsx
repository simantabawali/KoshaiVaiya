/**
 * Avatar — a coloured circle with a person's initials (no photos needed).
 * size is in pixels; tone picks the colour family.
 */
import { cn } from '../../utils/format.js';
import './primitives.css';

// "Dr. Farhana Rahman" → "FR" (drops the title, keeps the first two initials)
const initials = (name = '') => name.replace(/^Dr\.\s*/, '').split(' ').map((w) => w[0]).slice(0, 2).join('');

// --size is a CSS variable; Avatar's CSS uses it for the width, height and font size.
export default function Avatar({ name, tone = 'jade', size = 44, className }) {
  return (
    <span className={cn('avatar', `tone-${tone}`, className)} style={{ '--size': `${size}px` }} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
