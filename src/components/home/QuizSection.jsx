/**
 * QuizSection — "Try it now" block: short explanation on the left, the interactive <Quiz> on the right.
 */
import { CheckCircle2 } from 'lucide-react';
import Reveal from '../ui/Reveal.jsx';
import Quiz from '../learn/Quiz.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { sampleQuiz } from '../../data/content.js';
import '../ui/SectionHeader.css';
import './QuizSection.css';

export default function QuizSection() {
  const { t } = useLanguage();
  return (
    <section className="section quiz-section">
      <div className="container quiz-section__inner">
        <Reveal className="quiz-section__copy">
          <p className="eyebrow">{t('quiz.eyebrow')}</p>
          <h2>{t('quiz.title')}</h2>
          <p className="quiz-section__sub">{t('quiz.sub')}</p>
          <ul className="quiz-section__points">
            {/* Three benefit lines, each with a check icon. */}
            {['quiz.point1', 'quiz.point2', 'quiz.point3'].map((k) => (
              <li key={k}><CheckCircle2 size={20} aria-hidden="true" />{t(k)}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={150} className="quiz-section__stage">
          <span className="quiz-section__halo" aria-hidden="true" />
          {/* The same Quiz component is reused inside the lesson player. */}
          <Quiz questions={sampleQuiz} />
        </Reveal>
      </div>
    </section>
  );
}
