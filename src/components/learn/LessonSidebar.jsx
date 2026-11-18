/**
 * LessonSidebar — the "Course content" list in the lesson player.
 * Shows every module and lesson with its state: done (✓), current (dark row), locked (🔒) or not started.
 * Desktop: a sticky column on the right. Phones/tablets: a drawer that slides in from the right.
 * The drawer sits inside .ls-layer, a fixed, overflow-hidden layer, so the hidden drawer can never
 * make the page scroll sideways.
 */
import { Check, FileText, HelpCircle, Lock, PlayCircle, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useLockBody } from '../../hooks/useLockBody.js';
import { cn } from '../../utils/format.js';
import './LessonSidebar.css';

// Icon for each lesson type.
const ICONS = { video: PlayCircle, reading: FileText, quiz: HelpCircle };

export default function LessonSidebar({ course, currentId, completed, enrolled, open, onSelect, onClose }) {
  const { t, n } = useLanguage();
  // On phones/tablets the open drawer covers the page, so we lock page scrolling.
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 1080px)').matches;
  useLockBody(open && isMobile);

  return (
    <div className={cn('ls-layer', open && 'is-open')}>
      {/* Dark see-through layer behind the drawer on phones; tapping it closes the drawer. */}
      <div className={cn('ls-backdrop', open && 'is-open')} onClick={onClose} aria-hidden="true" />
      <aside className={cn('ls', open && 'is-open')} aria-label={t('learn.contents')}>
        <div className="ls__head">
          <h2>{t('learn.contents')}</h2>
          <button type="button" className="ls__close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>
        <div className="ls__scroll">
          {course.modules.map((m, mi) => {
            // Count finished lessons in this module for the "2/5" label.
            const done = m.lessons.filter((l) => completed.includes(l.id)).length;
            return (
              <section key={m.id} className="ls__module">
                <header className="ls__module-head">
                  <span className="ls__module-num">{n(String(mi + 1).padStart(2, '0'))}</span>
                  <div>
                    <h3>{m.title}</h3>
                    <span>{n(done)}/{n(m.lessons.length)}</span>
                  </div>
                </header>
                <ol className="ls__lessons">
                  {m.lessons.map((l) => {
                    const Icon = ICONS[l.type];
                    const isDone = completed.includes(l.id);
                    const isCurrent = l.id === currentId;
                    // Locked = not enrolled AND not a free preview.
                    const locked = !enrolled && !l.preview;
                    return (
                      <li key={l.id}>
                        <button
                          type="button"
                          className={cn('ls__lesson', isCurrent && 'is-current', isDone && 'is-done')}
                          aria-current={isCurrent ? 'step' : undefined}
                          onClick={() => onSelect(l)}
                        >
                          <span className="ls__state" aria-hidden="true">
                            {isDone ? <Check size={14} strokeWidth={3} /> : locked ? <Lock size={13} /> : <Icon size={15} />}
                          </span>
                          <span className="ls__title">{l.title}</span>
                          <span className="ls__time">{n(l.minutes)}{t('common.min') === 'min' ? 'm' : ` ${t('common.min')}`}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
