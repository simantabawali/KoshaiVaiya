/**
 * Reveal — wraps content so it fades up when scrolled into view.
 * <Reveal delay={100}>…</Reveal>  — delay (ms) lets you stagger several items one after another.
 * `as` lets you choose the HTML tag (default <div>), e.g. as="li" inside a list.
 * The animation itself is the .reveal / .is-visible CSS in styles/base.css.
 */
import { useReveal } from '../../hooks/useReveal.js';
import { cn } from '../../utils/format.js';

/** Fades and lifts children into view. `delay` in ms staggers siblings. */
export default function Reveal({ as: Tag = 'div', delay = 0, className, children, style, ...rest }) {
  // ref goes on the element; visible becomes true when it scrolls into view.
  const [ref, visible] = useReveal();
  // <Tag> is whichever element was requested (div, li, section…).
  // The CSS variable --d holds the delay; the class "is-visible" starts the animation.
  return (
    <Tag
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ '--d': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
