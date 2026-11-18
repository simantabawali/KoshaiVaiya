/**
 * CourseDetail page — /courses/:slug
 *
 * Dark header with title and facts, a sticky purchase card (enrol / continue + progress),
 * learning outcomes, an expandable curriculum, mentor profile and related courses.
 *
 * Split in two components: CourseDetail looks up the course from the URL and shows 404 if it
 * doesn't exist; CourseView holds the hooks. (Hooks must always run in the same order, so we never
 * call them after an early `return`.)
 */
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Award, BarChart2, Check, ChevronRight, Clock, FileText, Globe2, HelpCircle, MessageCircle,
  PlayCircle, RefreshCw, ShieldCheck, Smartphone, Users,
} from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Rating from '../components/ui/Rating.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import ProgressBar from '../components/ui/ProgressBar.jsx';
import { AccordionItem } from '../components/ui/Accordion.jsx';
import CourseCover from '../components/course/CourseCover.jsx';
import CourseCard from '../components/course/CourseCard.jsx';
import NotFound from './NotFound.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useLearning } from '../context/LearningContext.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { getCourse, relatedCourses } from '../data/courses.js';
import { categories, mentors } from '../data/catalog.js';
import { formatCompact, formatDuration, formatPrice } from '../utils/format.js';
import '../components/home/Featured.css';
import '../components/ui/SectionHeader.css';
import './CourseDetail.css';

// Icon for each lesson type (exported so other files can reuse it).
export const LESSON_ICONS = { video: PlayCircle, reading: FileText, quiz: HelpCircle };

export default function CourseDetail() {
  // :slug from the URL, e.g. "ielts-band-seven-blueprint".
  const { slug } = useParams();
  const course = getCourse(slug);
  // Unknown slug → show the 404 page.
  if (!course) return <NotFound message="course.notFound" />;
  return <CourseView course={course} />;
}

function CourseView({ course }) {
  const { t, p, n, lang } = useLanguage();
  const learning = useLearning();
  const navigate = useNavigate();
  // A Set of open module ids. The first module starts open.
  const [openModules, setOpenModules] = useState(() => new Set([course.modules[0].id]));
  useDocumentTitle(p(course.title));

  const mentor = mentors[course.mentor];
  const category = categories.find((c) => c.id === course.category);
  // Facts we need to draw the page.
  const enrolled = learning.isEnrolled(course.slug);
  const progress = learning.progressFor(course);
  const allOpen = openModules.size === course.modules.length;
  // e.g. 3500 → 2450 is a 30% discount.
  const discount = course.oldPrice ? Math.round((1 - course.price / course.oldPrice) * 100) : 0;

  // Open/close one module. We copy the Set (new Set(prev)) because React state must never be changed in place.
  const toggleModule = (id) => setOpenModules((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  // Enrol if needed, then open the last lesson visited (or the first lesson).
  const start = () => {
    if (!enrolled) learning.enroll(course.slug);
    const lessonId = learning.lastLesson[course.slug] ?? course.lessons[0].id;
    navigate(`/learn/${course.slug}/${lessonId}`);
  };

  // Rows for the "This course includes" list.
  const includes = [
    { icon: PlayCircle, text: `${formatDuration(course.totalMinutes, lang)} ${t('course.inc.video')}` },
    { icon: HelpCircle, text: `${n(course.lessons.filter((l) => l.type === 'quiz').length)} ${t('course.inc.quiz')}` },
    { icon: MessageCircle, text: t('course.inc.doubt') },
    { icon: Smartphone, text: t('course.inc.mobile') },
    { icon: Award, text: t('course.inc.cert') },
  ];

  return (
    <>
      {/* Dark top section: breadcrumbs, title, facts, mentor */}
      <section className={`cd-hero grain tone-${course.tone}`}>
        <span className="cd-hero__glow" aria-hidden="true" />
        <div className="container cd-hero__inner">
          <nav className="cd-crumbs" aria-label="Breadcrumb">
            <Link to="/courses">{t('nav.courses')}</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link to={`/courses?cat=${course.category}`}>{p(category.label)}</Link>
          </nav>
          {course.badge && <span className="badge tone-amber cd-hero__badge">{t(`course.${course.badge}`)}</span>}
          <h1>{p(course.title)}</h1>
          <p className="cd-hero__tagline">{p(course.tagline)}</p>
          <ul className="cd-hero__meta">
            <li><Rating value={course.rating} count={course.reviews} tone="dark" /></li>
            <li><Users size={16} aria-hidden="true" />{formatCompact(course.learners, lang)} {t('course.learners')}</li>
            <li><Clock size={16} aria-hidden="true" />{formatDuration(course.totalMinutes, lang)}</li>
            <li><BarChart2 size={16} aria-hidden="true" />{t(`level.${course.level}`)}</li>
            <li><Globe2 size={16} aria-hidden="true" />{t('course.language')}</li>
            <li><RefreshCw size={16} aria-hidden="true" />{t('course.updated')} {course.updated}</li>
          </ul>
          <div className="cd-hero__mentor">
            <Avatar name={mentor.name} tone={mentor.tone} size={40} />
            <div><span>{t('course.mentor')}</span><strong>{mentor.name}</strong></div>
          </div>
        </div>
      </section>

      <div className="container cd-layout">
        {/* Purchase / continue card (sticks while scrolling on desktop) */}
        <aside className="cd-aside">
          <div className="buy-card">
            <CourseCover course={course} size="large" />
            <div className="buy-card__body">
              {/* Enrolled → show progress. Not enrolled → show price and discount. */}
              {enrolled ? (
                <div className="buy-card__enrolled">
                  <span className="badge tone-jade"><Check size={13} aria-hidden="true" /> {t('course.enrolled')}</span>
                  <div className="buy-card__progress"><ProgressBar value={progress} /><strong>{n(progress)}%</strong></div>
                </div>
              ) : (
                <div className="buy-card__price">
                  <strong>{formatPrice(course.price, lang)}</strong>
                  {course.oldPrice && <s>{formatPrice(course.oldPrice, lang)}</s>}
                  {discount > 0 && <span className="badge tone-clay">−{n(discount)}%</span>}
                </div>
              )}
              <Button variant={enrolled ? 'dark' : 'primary'} size="lg" block onClick={start}>
                {enrolled ? t('course.continue') : t('course.enroll')}
              </Button>
              {!enrolled && <p className="buy-card__guarantee"><ShieldCheck size={16} aria-hidden="true" />{t('course.guarantee')}</p>}
              <h2 className="buy-card__heading">{t('course.includes')}</h2>
              <ul className="buy-card__list">
                {includes.map(({ icon: I, text }) => <li key={text}><I size={18} aria-hidden="true" />{text}</li>)}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main column: outcomes, curriculum, mentor */}
        <div className="cd-main">
          <Reveal as="section" className="cd-block">
            <h2>{t('course.learn')}</h2>
            <ul className="cd-outcomes">
              {course.outcomes.map((o) => <li key={o}><span><Check size={14} strokeWidth={3} aria-hidden="true" /></span>{o}</li>)}
            </ul>
          </Reveal>

          <Reveal as="section" className="cd-block">
            <div className="cd-block__head">
              <div>
                <h2>{t('course.curriculum')}</h2>
                <p>{n(course.modules.length)} {t('course.modules')} · {n(course.lessonCount)} {t('course.lessons')} · {formatDuration(course.totalMinutes, lang)}</p>
              </div>
              <button type="button" className="cd-link-btn" onClick={() => setOpenModules(allOpen ? new Set() : new Set(course.modules.map((m) => m.id)))}>
                {allOpen ? t('course.collapse') : t('course.expand')}
              </button>
            </div>
            {/* One accordion per module; inside, one row per lesson. */}
            <div className="cd-curriculum">
              {course.modules.map((m, mi) => (
                <AccordionItem
                  key={m.id}
                  open={openModules.has(m.id)}
                  onToggle={() => toggleModule(m.id)}
                  title={<><span className="cd-mod-num">{n(String(mi + 1).padStart(2, '0'))}</span>{m.title}</>}
                  meta={`${n(m.lessons.length)} ${t('course.lessons')}`}
                >
                  <ul className="cd-lessons">
                    {m.lessons.map((l) => {
                      const LessonIcon = LESSON_ICONS[l.type];
                      const done = learning.completedFor(course.slug).includes(l.id);
                      return (
                        <li key={l.id} className={done ? 'is-done' : undefined}>
                          {done ? <Check size={18} className="cd-lessons__done" aria-hidden="true" /> : <LessonIcon size={18} aria-hidden="true" />}
                          <span className="cd-lessons__title">{l.title}</span>
                          {(l.preview || enrolled) && (
                            <Link to={`/learn/${course.slug}/${l.id}`} className="cd-lessons__preview" onClick={() => !enrolled && learning.visitLesson(course.slug, l.id)}>
                              {enrolled ? <PlayCircle size={16} aria-label="Play" /> : t('course.preview')}
                            </Link>
                          )}
                          <span className="cd-lessons__time">{n(l.minutes)} {t('common.min')}</span>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionItem>
              ))}
            </div>
          </Reveal>

          <Reveal as="section" className="cd-block">
            <h2>{t('course.mentor')}</h2>
            <div className={`cd-mentor tone-${mentor.tone}`}>
              <Avatar name={mentor.name} tone={mentor.tone} size={72} />
              <div>
                <h3>{mentor.name}</h3>
                <p className="cd-mentor__role">{p(mentor.role)}</p>
                <div className="cd-mentor__stats">
                  <Rating value={mentor.rating} />
                  <span><Users size={15} aria-hidden="true" />{formatCompact(mentor.learners, lang)} {t('course.learners')}</span>
                  <span><PlayCircle size={15} aria-hidden="true" />{n(mentor.courses)} {t('nav.courses')}</span>
                </div>
                <p className="cd-mentor__bio">{p(mentor.bio)}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Related courses at the bottom */}
      <section className="section section--tint cd-related">
        <div className="container">
          <h2 className="cd-related__title">{t('course.related')}</h2>
          <div className="course-grid">
            {relatedCourses(course).map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}><CourseCard course={c} /></Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
