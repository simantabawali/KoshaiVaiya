/**
 * Footer — site footer with category links, company/support links and copyright.
 * Category links point to the catalogue pre-filtered, e.g. /courses?cat=tech.
 */
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { categories } from '../../data/catalog.js';
import './Footer.css';

export default function Footer() {
  const { t, p, n } = useLanguage();
  // The footer's link columns. Category links are built from the categories data.
  const groups = [
    { title: t('footer.learn'), links: categories.slice(0, 5).map((c) => ({ label: p(c.label), to: `/courses?cat=${c.id}` })) },
    { title: t('footer.company'), links: [{ label: t('footer.about'), to: '/#how' }, { label: t('footer.careers'), to: '/' }, { label: t('footer.teach'), to: '/signup' }] },
    { title: t('footer.support'), links: [{ label: t('footer.help'), to: '/#faq' }, { label: t('footer.contact'), to: '/' }, { label: t('footer.privacy'), to: '/' }, { label: t('footer.terms'), to: '/' }] },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo tone="light" />
            <p>{t('footer.tag')}</p>
          </div>
          {/* Draw one column per group. */}
          {groups.map((g) => (
            <div key={g.title} className="footer__col">
              <h3>{g.title}</h3>
              <ul>
                {g.links.map((l) => <li key={l.label}><Link to={l.to}>{l.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        {/* Copyright line. new Date().getFullYear() always shows the current year. */}
        <div className="footer__bottom">
          <span>© {n(new Date().getFullYear())} Jonaki. {t('footer.rights')}</span>
          <span className="footer__made"><Heart size={14} aria-hidden="true" /> {t('footer.made')}</span>
        </div>
      </div>
    </footer>
  );
}
