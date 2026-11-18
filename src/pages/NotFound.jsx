/**
 * NotFound — the 404 page. Also used when a course slug doesn't exist (`message` prop).
 */
import { ArrowLeft, Compass } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import './NotFound.css';

export default function NotFound({ message }) {
  const { t } = useLanguage();
  useDocumentTitle('404');
  return (
    <section className="not-found">
      <div className="container not-found__inner">
        {/* "404" where the 0 is replaced by a glowing compass. */}
        <span className="not-found__code" aria-hidden="true">4<span className="not-found__orb"><Compass size={44} strokeWidth={1.5} /></span>4</span>
        <h1>{t('notfound.t')}</h1>
        <p>{message ? t(message) : t('notfound.d')}</p>
        <div className="not-found__actions">
          <Button to="/" variant="dark" iconLeft={ArrowLeft}>{t('notfound.home')}</Button>
          <Button to="/courses" variant="secondary">{t('nav.courses')}</Button>
        </div>
      </div>
    </section>
  );
}
