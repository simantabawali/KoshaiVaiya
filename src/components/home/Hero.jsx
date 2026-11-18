/**
 * Hero — the large dark top section of the home page.
 *
 * Left: announcement pill, headline, search box, popular searches and stats.
 * Right: a decorative "app preview" collage (fake lesson card, quiz chip, streak, live badge).
 * Background: soft moving colour glows, a faint grid and floating "fireflies" (all CSS).
 * Bottom: an endless scrolling strip of exam/skill names (a CSS marquee).
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Flame, Play, Search, Sparkles } from 'lucide-react';
import Avatar from '../ui/Avatar.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { heroStats, popularSearches } from '../../data/catalog.js';
import './Hero.css';

// [left %, top %, animation delay in seconds] for each glowing dot.
const FIREFLIES = [
  [8, 22, 0], [18, 70, 2.1], [32, 12, 4.2], [44, 84, 1.3], [57, 30, 3.4], [66, 62, 0.6],
  [74, 16, 2.7], [83, 78, 4.8], [91, 40, 1.8], [26, 46, 5.2], [50, 56, 3.9], [96, 8, 0.9],
];

const TRACKS = ['SSC', 'HSC', 'Medical admission', 'Engineering admission', 'BCS', 'Bank jobs', 'IELTS', 'Spoken English', 'React', 'Python', 'Figma', 'Freelancing'];

// The component. t() gives text and n() gives numbers in the current language.
export default function Hero() {
  const { t, n } = useLanguage();
  const navigate = useNavigate();
  // The search box is a "controlled input": React state holds its text.
  const [query, setQuery] = useState('');

  // On submit, open the catalogue with the search term in the URL: /courses?q=ielts
  const submit = (e) => {
    e.preventDefault();
    // encodeURIComponent makes the text safe inside a URL (a space becomes %20).
    navigate(query.trim() ? `/courses?q=${encodeURIComponent(query.trim())}` : '/courses');
  };

  return (
    <section className="hero grain">
      {/* Decorative background layers, drawn behind the content. */}
      <div className="hero__sky" aria-hidden="true">
        <span className="hero__aurora hero__aurora--a" />
        <span className="hero__aurora hero__aurora--b" />
        <span className="hero__grid" />
        {FIREFLIES.map(([x, y, d]) => (
          <span key={`${x}-${y}`} className="firefly" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }} />
        ))}
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <Link to="/courses?cat=school" className="hero__eyebrow">
            <span className="hero__pulse" aria-hidden="true" />
            {t('hero.eyebrow')}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>

          {/* The headline is split into 3 parts so each can animate in one after another (--d = delay). */}
          <h1 className="hero__title">
            <span className="hero__line" style={{ '--d': '80ms' }}>{t('hero.title.a')}</span>{' '}
            <span className="hero__line" style={{ '--d': '160ms' }}><em className="serif-accent text-glow">{t('hero.title.b')}</em></span>{' '}
            <span className="hero__line" style={{ '--d': '240ms' }}>{t('hero.title.c')}</span>
          </h1>

          <p className="hero__sub">{t('hero.sub')}</p>

          {/* Search form. onSubmit runs when the user presses Enter or the Search button. */}
          <form className="hero__search" onSubmit={submit} role="search">
            <Search size={20} className="hero__search-icon" aria-hidden="true" />
            <label htmlFor="hero-search" className="sr-only">{t('hero.search')}</label>
            <input
              id="hero-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('hero.search')}
              autoComplete="off"
            />
            <button type="submit" className="hero__search-btn">
              <span>{t('hero.searchBtn')}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </form>

          {/* Quick links for common searches. */}
          <div className="hero__popular">
            <span>{t('hero.popular')}:</span>
            {popularSearches.map((s) => (
              <Link key={s} to={`/courses?q=${encodeURIComponent(s)}`} className="hero__tag">{s}</Link>
            ))}
          </div>

          {/* <dl> is a "description list": each <dt> is a label and each <dd> its value. */}
          <dl className="hero__stats">
            <div><dt>{t('hero.stat.learners')}</dt><dd>{n(heroStats.learners)}</dd></div>
            <div><dt>{t('hero.stat.mentors')}</dt><dd>{n(heroStats.mentors)}</dd></div>
            <div><dt>{t('hero.stat.complete')}</dt><dd>{n(heroStats.completion)}</dd></div>
          </dl>
        </div>

        {/* Decorative preview — hidden from screen readers (aria-hidden) because it's not real content. */}
        <div className="hero__visual" aria-hidden="true">
          <div className="hv-card hv-main">
            <div className="hv-main__screen">
              <span className="hv-main__formula">v = u + at</span>
              <span className="hv-main__curve" />
              <span className="hv-main__play"><Play size={22} fill="currentColor" /></span>
              <span className="hv-main__time">08:42 / 14:10</span>
            </div>
            <div className="hv-main__info">
              <span className="hv-main__label">{t('hero.card.now')}</span>
              <strong>Projectile motion, intuitively</strong>
              <div className="hv-main__bar"><span /></div>
              <div className="hv-main__mentor">
                <Avatar name="Farhana Rahman" tone="jade" size={28} />
                <span>Dr. Farhana Rahman</span>
              </div>
            </div>
          </div>

          <div className="hv-card hv-quiz">
            <span className="hv-quiz__icon"><Sparkles size={16} /></span>
            <span>{t('hero.card.correct')}</span>
          </div>

          <div className="hv-card hv-streak">
            <span className="hv-streak__flame"><Flame size={20} /></span>
            <div>
              <strong>{n(12)}</strong> <span>{t('hero.card.streak')}</span>
              <div className="hv-streak__week">
                {[1, 1, 1, 1, 1, 0.4, 0].map((v, i) => <i key={i} style={{ opacity: v || 0.15 }} />)}
              </div>
            </div>
          </div>

          <div className="hv-card hv-live">
            <span className="hv-live__dot" /> LIVE
            <span className="hv-live__faces">
              <Avatar name="Sadia Islam" tone="amber" size={24} />
              <Avatar name="Tanvir Hasan" tone="iris" size={24} />
              <Avatar name="Nusrat Jahan" tone="clay" size={24} />
            </span>
            <span className="hv-live__count">+{n(326)}</span>
          </div>
        </div>
      </div>

      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__track">
          {/* The list is doubled so the marquee can loop seamlessly (CSS moves it by -50%). */}
          {[...TRACKS, ...TRACKS].map((tr, i) => <span key={i}>{tr}</span>)}
        </div>
      </div>
    </section>
  );
}
