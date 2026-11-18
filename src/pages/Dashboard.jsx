/**
 * Dashboard page — the learner's home: greeting, stats, courses in progress,
 * weekly activity chart (pure CSS bars), upcoming live classes with reminders and achievements.
 * The weekly minutes and streak are sample numbers; connect them to real data later.
 */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Award, Bell, BellRing, BookOpenCheck, Clock3, Flame, Moon, Play, Sparkles, Target, Trophy, Zap,
} from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import ProgressRing from '../components/ui/ProgressRing.jsx';
import CourseCover from '../components/course/CourseCover.jsx';
import CourseCard from '../components/course/CourseCard.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useLearning } from '../context/LearningContext.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { courses, getCourse } from '../data/courses.js';
import { liveClasses } from '../data/content.js';
import { mentors } from '../data/catalog.js';
import { cn } from '../utils/format.js';
import '../components/home/Featured.css';
import './Dashboard.css';

// Minutes studied per day (Bangladesh week starts on Saturday).
const WEEK = [
  { en: 'Sat', bn: 'শনি', m: 45 }, { en: 'Sun', bn: 'রবি', m: 62 }, { en: 'Mon', bn: 'সোম', m: 38 },
  { en: 'Tue', bn: 'মঙ্গল', m: 74 }, { en: 'Wed', bn: 'বুধ', m: 55 }, { en: 'Thu', bn: 'বৃহ', m: 20 }, { en: 'Fri', bn: 'শুক্র', m: 0 },
];
// Weekly study goal in minutes.
const GOAL_MINUTES = 360;

// Choose "Good morning / afternoon / evening" from the current hour.
const greetingKey = () => {
  const h = new Date().getHours();
  if (h < 12) return 'dash.greeting.morning';
  if (h < 17) return 'dash.greeting.afternoon';
  return 'dash.greeting.evening';
};

export default function Dashboard() {
  const { t, p, n, lang } = useLanguage();
  const learning = useLearning();
  useDocumentTitle(t('nav.dashboard'));

  // Turn enrolled slugs into full course objects (filter(Boolean) drops any that weren't found).
  const enrolledCourses = learning.enrolled.map(getCourse).filter(Boolean);
  // Total lessons finished across all courses.
  const totalDone = Object.values(learning.completed).reduce((s, l) => s + l.length, 0);
  const weekMinutes = WEEK.reduce((s, d) => s + d.m, 0);
  const maxMinutes = Math.max(...WEEK.map((d) => d.m));
  // First name of the logged-in user, or a friendly default.
  const name = learning.user?.name?.split(' ')[0] ?? (lang === 'bn' ? 'শিক্ষার্থী' : 'Learner');

  // Up to 3 top-rated courses the user isn't enrolled in yet.
  const recommended = useMemo(() => courses.filter((c) => !learning.enrolled.includes(c.slug)).sort((a, b) => b.rating - a.rating).slice(0, 3), [learning.enrolled]);

  // The four stat cards at the top. Each has an icon, label, value and colour tone.
  const stats = [
    { icon: Flame, label: t('dash.streak'), value: n(12), tone: 'amber' },
    { icon: Clock3, label: t('dash.hours'), value: n((weekMinutes / 60).toFixed(1)), tone: 'jade' },
    { icon: Zap, label: t('dash.xp'), value: n((totalDone * 40 + 1280).toLocaleString('en-US')), tone: 'iris' },
    { icon: BookOpenCheck, label: t('dash.lessonsDone'), value: n(totalDone), tone: 'clay' },
  ];

  // Badges. Ones with earned: false are shown faded.
  const achievements = [
    { icon: Flame, label: { en: '7-day streak', bn: '৭ দিনের ধারা' }, earned: true, tone: 'amber' },
    { icon: Target, label: { en: 'Perfect quiz', bn: 'নিখুঁত কুইজ' }, earned: true, tone: 'jade' },
    { icon: Moon, label: { en: 'Night owl', bn: 'রাতজাগা পাখি' }, earned: true, tone: 'iris' },
    { icon: Trophy, label: { en: 'First course', bn: 'প্রথম কোর্স' }, earned: enrolledCourses.some((c) => learning.progressFor(c) === 100), tone: 'clay' },
  ];

  return (
    <div className="dash">
      {/* Greeting + stat cards */}
      <section className="dash-hero">
        <div className="container dash-hero__inner">
          <Reveal>
            <p className="dash-hero__date">{new Date().toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            <h1>{t(greetingKey())}, <em className="serif-accent">{name}</em></h1>
            <p className="dash-hero__sub">{t('dash.sub')}</p>
          </Reveal>
          <div className="dash-stats">
            {stats.map(({ icon: I, label, value, tone }, i) => (
              <Reveal key={label} delay={i * 70} className={`dash-stat tone-${tone}`}>
                <span className="dash-stat__icon"><I size={18} aria-hidden="true" /></span>
                <strong>{value}</strong>
                <span>{label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="container dash-grid">
        <section className="dash-main">
          <div className="dash-section-head"><h2>{t('dash.continue')}</h2></div>
          {enrolledCourses.length ? (
            <div className="dash-continue">
              {enrolledCourses.map((c, i) => {
                const progress = learning.progressFor(c);
                const lessonId = learning.lastLesson[c.slug] ?? c.lessons[0].id;
                const lesson = c.lessons.find((l) => l.id === lessonId) ?? c.lessons[0];
                return (
                  <Reveal key={c.slug} delay={i * 80} className="dash-course">
                    <CourseCover course={c} className="dash-course__cover" />
                    <div className="dash-course__body">
                      <span className="dash-course__mentor">{mentors[c.mentor].name}</span>
                      <h3><Link to={`/courses/${c.slug}`}>{p(c.title)}</Link></h3>
                      <p className="dash-course__next"><Play size={13} fill="currentColor" aria-hidden="true" /> {lesson.title}</p>
                      <div className="dash-course__foot">
                        <ProgressRing value={progress} size={44} stroke={4}><span>{n(progress)}%</span></ProgressRing>
                        <Button to={`/learn/${c.slug}/${lesson.id}`} size="sm" variant="dark" icon={ArrowRight}>{t('dash.continue')}</Button>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="dash-empty">
              <Sparkles size={26} aria-hidden="true" />
              <h3>{t('dash.empty.t')}</h3>
              <p>{t('dash.empty.d')}</p>
              <Button to="/courses" icon={ArrowRight}>{t('nav.courses')}</Button>
            </div>
          )}

          <Reveal as="section" className="dash-card dash-activity">
            <div className="dash-card__head">
              <h2>{t('dash.activity')}</h2>
              <span className="dash-activity__goal"><Target size={15} aria-hidden="true" />{t('dash.goal')}: {n(Math.round((weekMinutes / GOAL_MINUTES) * 100))}%</span>
            </div>
            {/* Bar chart: each bar's height = that day's minutes compared with the busiest day (--h). */}
            <div className="dash-bars" role="img" aria-label={`${weekMinutes} minutes studied this week`}>
              {WEEK.map((d, i) => (
                <div key={d.en} className={cn('dash-bars__col', i === (new Date().getDay() + 1) % 7 && 'is-today')}>
                  <span className="dash-bars__value">{d.m ? n(d.m) : ''}</span>
                  <span className="dash-bars__bar" style={{ '--h': `${(d.m / maxMinutes) * 100}%`, '--i': i }} />
                  <span className="dash-bars__day">{p(d)}</span>
                </div>
              ))}
            </div>
            <p className="dash-activity__total"><strong>{n(weekMinutes)}</strong> {t('dash.minutes')} · {t('dash.goal')} {n(GOAL_MINUTES)}</p>
          </Reveal>
        </section>

        <aside className="dash-side">
          <Reveal as="section" className="dash-card">
            <div className="dash-card__head"><h2>{t('dash.upcoming')}</h2></div>
            {/* Live classes with a bell button that turns a reminder on/off. */}
            <ul className="dash-live">
              {liveClasses.map((lc) => {
                const on = learning.reminders.includes(lc.id);
                return (
                  <li key={lc.id}>
                    <Avatar name={mentors[lc.mentor].name} tone={lc.tone} size={40} />
                    <div className="dash-live__info">
                      <strong>{p(lc.title)}</strong>
                      <span>{p(lc.day)} · {n(lc.time)}</span>
                    </div>
                    <button type="button" className={cn('dash-live__bell', on && 'is-on')} onClick={() => learning.toggleReminder(lc.id)} aria-pressed={on} aria-label={on ? t('dash.reminded') : t('dash.join')}>
                      {on ? <BellRing size={17} /> : <Bell size={17} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal as="section" delay={80} className="dash-card">
            <div className="dash-card__head"><h2>{t('dash.achievements')}</h2><Award size={18} className="dash-card__icon" aria-hidden="true" /></div>
            <ul className="dash-badges">
              {achievements.map(({ icon: I, label, earned, tone }) => (
                <li key={label.en} className={cn(`tone-${tone}`, !earned && 'is-locked')}>
                  <span><I size={20} aria-hidden="true" /></span>
                  {p(label)}
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </div>

      <section className="section section--tint dash-reco">
        <div className="container">
          <div className="dash-section-head"><h2>{t('dash.recommended')}</h2><Link to="/courses" className="dash-link">{t('common.viewAll')} <ArrowRight size={16} aria-hidden="true" /></Link></div>
          <div className="course-grid">
            {recommended.map((c, i) => <Reveal key={c.slug} delay={i * 80}><CourseCard course={c} /></Reveal>)}
          </div>
        </div>
      </section>
    </div>
  );
}
