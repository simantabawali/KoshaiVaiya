/**
 * AccordionItem — a collapsible row (FAQ, course curriculum).
 * It is "controlled": the parent decides whether it is open (`open` prop) and what happens on click
 * (`onToggle`). That lets parents build "only one open" (FAQ) or "expand all" (curriculum).
 * useId() creates a unique id linking the button to its panel for screen readers.
 * The smooth open/close uses a CSS grid trick (grid-template-rows 0fr → 1fr) in primitives.css.
 */
import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/format.js';
import './primitives.css';

/** Controlled disclosure item. Parent owns which items are open. */
// Props: title (row text), meta (small text on the right), open (true/false),
// onToggle (function to run on click), children (the content shown when open).
export function AccordionItem({ title, meta, open, onToggle, children, className }) {
  // A unique id such as ":r3:" — React guarantees no two components get the same one.
  const id = useId();
  return (
    <div className={cn('acc', open && 'is-open', className)}>
      <h3 className="acc__heading">
        {/* The clickable row. aria-expanded tells screen readers whether it is open. */}
        <button type="button" className="acc__trigger" aria-expanded={open} aria-controls={id} onClick={onToggle}>
          <span className="acc__title">{title}</span>
          {meta && <span className="acc__meta">{meta}</span>}
          <ChevronDown className="acc__chevron" size={20} aria-hidden="true" />
        </button>
      </h3>
      {/* The panel. CSS animates its height between closed (0) and open. */}
      <div id={id} className="acc__panel" role="region">
        <div className="acc__inner"><div className="acc__content">{children}</div></div>
      </div>
    </div>
  );
}
