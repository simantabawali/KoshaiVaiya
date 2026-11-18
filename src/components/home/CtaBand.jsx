/**
 * CtaBand — the final dark "call to action" banner with a glowing orb and sign-up buttons.
 */
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Reveal from '../ui/Reveal.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './CtaBand.css';

export default function CtaBand() {
  const { t } = useLanguage();
  return (
    <section className="section cta">
      <div className="container">
        <Reveal className="cta__band grain">
          {/* Decorative glow and rings (pure CSS). */}
          <span className="cta__orb" aria-hidden="true" />
          <span className="cta__rings" aria-hidden="true" />
          <div className="cta__content">
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.sub')}</p>
            <div className="cta__actions">
              <Button to="/signup" variant="glow" size="lg" icon={ArrowRight}>{t('cta.primary')}</Button>
              <Button to="/courses" variant="outline-light" size="lg">{t('cta.secondary')}</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
