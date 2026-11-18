/**
 * HowItWorks — four numbered steps. Text comes from locales ('how.1.t', 'how.1.d', …).
 */
import { Compass, MonitorPlay, PencilLine, TrendingUp } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './HowItWorks.css';

// One icon per step. The step text comes from the locale files.
const STEPS = [Compass, MonitorPlay, PencilLine, TrendingUp];

export default function HowItWorks() {
  const { t, n } = useLanguage();
  return (
    <section id="how" className="section how">
      <div className="container">
        <SectionHeader eyebrow={t('how.eyebrow')} title={t('how.title')} align="center" />
        <ol className="how__steps">
          {/* Draw the 4 steps. n(`0${i + 1}`) shows 01, 02 … (Bangla digits in Bangla). */}
          {STEPS.map((StepIcon, i) => (
            <Reveal as="li" key={i} delay={i * 110} className="how__step">
              <div className="how__marker">
                <span className="how__icon"><StepIcon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
                <span className="how__num">{n(`0${i + 1}`)}</span>
              </div>
              <h3>{t(`how.${i + 1}.t`)}</h3>
              <p>{t(`how.${i + 1}.d`)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
