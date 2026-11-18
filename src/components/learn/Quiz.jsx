/**
 * Quiz — interactive multiple-choice quiz with instant feedback.
 *
 * Flow: pick an option → "Check answer" → see correct/wrong + explanation → "Next question"
 *       → after the last one, a score screen with a progress ring and "Try again".
 * State:
 *   index    which question is showing
 *   selected which option the learner picked (null = none yet)
 *   checked  has the answer been checked?
 *   score    number of correct answers
 *   finished show the result screen
 * Questions can be plain strings or bilingual objects ({ en, bn }); p() handles both.
 * `onFinish(score)` lets the parent react (the lesson player marks the lesson complete).
 */
import { useState } from 'react';
import { Check, RotateCcw, Sparkles, X, ArrowRight } from 'lucide-react';
import Button from '../ui/Button.jsx';
import ProgressRing from '../ui/ProgressRing.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { cn } from '../../utils/format.js';
import './Quiz.css';

// Labels shown next to the options.
const LETTERS = ['A', 'B', 'C', 'D'];

export default function Quiz({ questions, onFinish, className }) {
  const { t, p, n } = useLanguage();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // The question currently on screen.
  const current = questions[index];
  // Is this the final question?
  const isLast = index === questions.length - 1;
  // true only after checking, and only if the picked option is the right one.
  const isCorrect = checked && selected === current.answer;

  // Lock the answer and add a point if it's right.
  const check = () => {
    if (selected == null) return;
    setChecked(true);
    if (selected === current.answer) setScore((s) => s + 1);
  };

  // Go to the next question, or show the result after the last one.
  const next = () => {
    if (isLast) {
      setFinished(true);
      onFinish?.(score);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setChecked(false);
  };

  // Start again from question 1.
  const reset = () => {
    setIndex(0); setSelected(null); setChecked(false); setScore(0); setFinished(false);
  };

  // Result screen. This is an "early return": we show this instead of a question.
  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className={cn('quiz quiz--result', className)} aria-live="polite">
        <ProgressRing value={pct} size={120} stroke={9} color="var(--amber-400)">
          <span className="quiz__pct">{n(pct)}%</span>
        </ProgressRing>
        <p className="quiz__score-label">{t('quiz.score')} <strong>{n(score)} / {n(questions.length)}</strong></p>
        <p className="quiz__verdict">{pct >= 67 ? t('quiz.great') : t('quiz.good')}</p>
        <Button variant="secondary" iconLeft={RotateCcw} onClick={reset}>{t('quiz.retry')}</Button>
      </div>
    );
  }

  // The options in the current language.
  const options = p(current.options);

  return (
    <div className={cn('quiz', className)}>
      <div className="quiz__top">
        <span className="quiz__counter">
          {t('quiz.question')} {n(index + 1)} {t('quiz.of')} {n(questions.length)}
        </span>
        {current.topic && <span className="badge tone-jade">{p(current.topic)}</span>}
      </div>
      {/* Little bars at the top: done / current / not yet. */}
      <div className="quiz__steps" aria-hidden="true">
        {questions.map((_, i) => <span key={i} className={cn(i < index && 'is-done', i === index && 'is-current')} />)}
      </div>

      <h3 className="quiz__question" key={`q-${index}`}>{p(current.q)}</h3>

      {/* Answer buttons. role="radio" makes them behave like radio buttons for screen readers. */}
      <div className="quiz__options" role="radiogroup" aria-label={p(current.q)}>
        {options.map((opt, i) => {
          // Decide how each option looks: before checking only the picked one is highlighted;
          // after checking, the correct one turns green and a wrong pick turns red.
          const state = checked
            ? (i === current.answer ? 'correct' : i === selected ? 'wrong' : 'muted')
            : (i === selected ? 'selected' : '');
          return (
            <button
              key={`${index}-${opt}`}
              type="button"
              role="radio"
              aria-checked={selected === i}
              disabled={checked}
              className={cn('quiz__option', state && `is-${state}`)}
              style={{ '--i': i }}
              onClick={() => setSelected(i)}
            >
              <span className="quiz__letter">
                {state === 'correct' ? <Check size={16} strokeWidth={3} /> : state === 'wrong' ? <X size={16} strokeWidth={3} /> : LETTERS[i]}
              </span>
              <span className="quiz__text">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback box (filled after checking). aria-live makes screen readers read it out. */}
      <div className={cn('quiz__feedback', checked && 'is-shown', isCorrect ? 'is-correct' : 'is-wrong')} aria-live="polite">
        {checked && (
          <>
            <strong>{isCorrect ? <><Sparkles size={16} aria-hidden="true" /> {t('quiz.correct')}</> : t('quiz.wrong')}</strong>
            <p>{p(current.explain)}</p>
          </>
        )}
      </div>

      {/* Before checking: "Check answer" (disabled until something is picked). After: "Next" or "See result". */}
      <div className="quiz__actions">
        {checked
          ? <Button variant="dark" icon={ArrowRight} onClick={next}>{isLast ? t('quiz.finish') : t('quiz.next')}</Button>
          : <Button variant="primary" onClick={check} disabled={selected == null}>{t('quiz.check')}</Button>}
      </div>
    </div>
  );
}
