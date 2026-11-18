/**
 * Features — a "bento" grid of product benefits. The big dark card lists upcoming live classes;
 * smaller cards have tiny illustrations made only with CSS (signal bars, chart bars, letters).
 */
import { BarChart3, MessageCircleQuestion, Radio, Timer, Wifi } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';
import Avatar from '../ui/Avatar.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { liveClasses } from '../../data/content.js';
import { mentors } from '../../data/catalog.js';
import './Features.css';

// Heights (in %) of the mini chart in the "Progress you can see" card.
const BARS = [42, 58, 36, 72, 64, 88, 76];

export default function Features() {
  const { t, p, n } = useLanguage();
  return (
    <section className="section section--tint features">
      <div className="container">
        <SectionHeader eyebrow={t('features.eyebrow')} title={t('features.title')} />
        <div className="bento">
          <Reveal className="bento__card bento__card--live grain">
            <span className="bento__icon bento__icon--dark"><Radio size={20} aria-hidden="true" /></span>
            <h3>{t('features.live.t')}</h3>
            <p>{t('features.live.d')}</p>
            <ul className="bento__schedule">
              {/* One row per live class: mentor avatar, title and time. */}
              {liveClasses.map((lc, i) => (
                <li key={lc.id} style={{ '--i': i }}>
                  <Avatar name={mentors[lc.mentor].name} tone={lc.tone} size={36} />
                  <div>
                    <strong>{p(lc.title)}</strong>
                    <span>{mentors[lc.mentor].name}</span>
                  </div>
                  <time>{p(lc.day)} · {n(lc.time)}</time>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80} className="bento__card">
            <span className="bento__icon tone-jade"><Wifi size={20} aria-hidden="true" /></span>
            <h3>{t('features.offline.t')}</h3>
            <p>{t('features.offline.d')}</p>
            <div className="bento__signal" aria-hidden="true">{[1, 2, 3, 4].map((b) => <i key={b} />)}<span>240p · 480p · 720p</span></div>
          </Reveal>

          <Reveal delay={140} className="bento__card bento__card--lang">
            <span className="bento__glyphs" aria-hidden="true"><b lang="bn">অ</b><b>A</b></span>
            <h3>{t('features.bilingual.t')}</h3>
            <p>{t('features.bilingual.d')}</p>
          </Reveal>

          <Reveal delay={60} className="bento__card">
            <span className="bento__icon tone-amber"><MessageCircleQuestion size={20} aria-hidden="true" /></span>
            <h3>{t('features.doubt.t')}</h3>
            <p>{t('features.doubt.d')}</p>
          </Reveal>

          <Reveal delay={120} className="bento__card">
            <span className="bento__icon tone-clay"><Timer size={20} aria-hidden="true" /></span>
            <h3>{t('features.mock.t')}</h3>
            <p>{t('features.mock.d')}</p>
          </Reveal>

          <Reveal delay={180} className="bento__card">
            <span className="bento__icon tone-iris"><BarChart3 size={20} aria-hidden="true" /></span>
            <h3>{t('features.analytics.t')}</h3>
            <p>{t('features.analytics.d')}</p>
            <div className="bento__bars" aria-hidden="true">
              {BARS.map((h, i) => <i key={i} style={{ '--h': `${h}%`, '--i': i }} />)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
