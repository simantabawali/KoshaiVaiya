/**
 * Learn page — the lesson player: /learn/:slug/:lessonId
 *
 * Layout: top bar (back, course name, progress, language, sidebar toggle) → main area → sidebar.
 * The main area shows one of: a locked screen (not enrolled and not a free preview), a quiz,
 * a reading article, or the video player. Below: lesson title, Previous / Mark complete / Next,
 * and tabs (Overview, My notes, Resources).
 * If the URL has no or a wrong lessonId, <Navigate> redirects to the last-visited/first lesson.
 */
import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, Download, FileText, Lock, PanelRightClose, PanelRightOpen, PartyPopper,
} from 'lucide-react';
import VideoPlayer from '../components/learn/VideoPlayer.jsx';
import Quiz from '../components/learn/Quiz.jsx';
import LessonSidebar from '../components/learn/LessonSidebar.jsx';
import Button from '../components/ui/Button.jsx';
import ProgressRing from '../components/ui/ProgressRing.jsx';
import LanguageSwitch from '../components/ui/LanguageSwitch.jsx';
import Logo from '../components/ui/Logo.jsx';
import NotFound from './NotFound.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useLearning } from '../context/LearningContext.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { getCourse } from '../data/courses.js';
import { mentors } from '../data/catalog.js';
import { cn } from '../utils/format.js';
import './Learn.css';

// Outer component: checks the URL, then shows LessonView with the right course and lesson.
export default function Learn() {
  const { slug, lessonId } = useParams();
  const course = getCourse(slug);
  const { lastLesson } = useLearning();
  if (!course) return <NotFound message="course.notFound" />;
  const lesson = course.lessons.find((l) => l.id === lessonId);
  // Wrong or missing lesson id → redirect. `replace` means it won't add an extra Back-button step.
  if (!lesson) return <Navigate to={`/learn/${slug}/${lastLesson[slug] ?? course.lessons[0].id}`} replace />;
  return <LessonView course={course} lesson={lesson} />;
}

// Inner component: the actual lesson page.
function LessonView({ course, lesson }) {
  const { t, n } = useLanguage();
  const learning = useLearning();
  const navigate = useNavigate();
  // Which tab is open under the lesson.
  const [tab, setTab] = useState('overview');
  // Sidebar starts open on large screens and closed on phones/tablets.
  const [sidebarOpen, setSidebarOpen] = useState(() => window.matchMedia('(min-width: 1081px)').matches);
  useDocumentTitle(lesson.title);

  const { visitLesson } = learning;
  // Remember this lesson as the place to resume.
  useEffect(() => { visitLesson(course.slug, lesson.id); }, [visitLesson, course.slug, lesson.id]);

  // This lesson's position — used to find the previous and next lessons.
  const index = course.lessons.findIndex((l) => l.id === lesson.id);
  const prev = course.lessons[index - 1];
  const next = course.lessons[index + 1];
  const module = course.modules.find((m) => m.lessons.some((l) => l.id === lesson.id));
  const completed = learning.completedFor(course.slug);
  const isDone = completed.includes(lesson.id);
  const progress = learning.progressFor(course);
  const enrolled = learning.isEnrolled(course.slug);
  // Free previews can be watched without enrolling; everything else needs enrolment.
  const locked = !enrolled && !lesson.preview;
  const mentor = mentors[course.mentor];

  // Open another lesson; on small screens also close the drawer.
  const goTo = (l) => {
    navigate(`/learn/${course.slug}/${l.id}`);
    if (window.matchMedia('(max-width: 1080px)').matches) setSidebarOpen(false);
  };

  // "Next lesson": mark this one as done, then move on.
  const completeAndNext = () => {
    learning.markComplete(course.slug, lesson.id);
    if (next) goTo(next);
  };

  const noteKey = `${course.slug}/${lesson.id}`;

  return (
    <div className={cn('learn', sidebarOpen && 'has-sidebar')}>
      {/* Top bar of the player */}
      <header className="learn-bar">
        <div className="learn-bar__left">
          <Logo className="learn-bar__logo" />
          <Link to={`/courses/${course.slug}`} className="learn-bar__back">
            <ArrowLeft size={18} aria-hidden="true" /><span>{t('learn.back')}</span>
          </Link>
          <span className="learn-bar__divider" aria-hidden="true" />
          <span className="learn-bar__course">{course.title.en}</span>
        </div>
        <div className="learn-bar__right">
          <span className="learn-bar__progress">
            <ProgressRing value={progress} size={36} stroke={4} />
            <span><strong>{n(progress)}%</strong> {t('learn.progress')}</span>
          </span>
          <LanguageSwitch />
          <button type="button" className="learn-bar__toggle" onClick={() => setSidebarOpen((o) => !o)} aria-expanded={sidebarOpen} aria-label={t('learn.contents')}>
            {sidebarOpen ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
          </button>
        </div>
      </header>

      <div className="learn__body">
        {/* key={lesson.id} rebuilds this area for each lesson, replaying the fade-in. */}
        <div className="learn__main" key={lesson.id}>
          {/* Celebration banner when the whole course is finished */}
          {progress === 100 && (
            <div className="learn-done">
              <PartyPopper size={22} aria-hidden="true" />
              <div><strong>{t('learn.done.t')}</strong><p>{t('learn.done.d')}</p></div>
              <Button to="/dashboard" size="sm" variant="glow">{t('nav.dashboard')}</Button>
            </div>
          )}

          {/* What we show depends on the lesson: locked screen / quiz / reading / video. */}
          <div className="learn__stage">
            {locked ? (
              <div className={`learn-locked tone-${course.tone}`}>
                <span className="learn-locked__icon"><Lock size={26} aria-hidden="true" /></span>
                <h2>{lesson.title}</h2>
                <Button variant="glow" onClick={() => learning.enroll(course.slug)}>{t('course.enroll')}</Button>
              </div>
            ) : lesson.type === 'quiz' ? (
              <div className="learn-quiz">
                <p className="learn-quiz__intro">{t('learn.quizIntro')}</p>
                <Quiz questions={course.quiz} onFinish={() => learning.markComplete(course.slug, lesson.id)} />
              </div>
            ) : lesson.type === 'reading' ? (
              <article className="learn-reading">
                <span className="badge tone-iris"><FileText size={13} aria-hidden="true" /> Reading · {lesson.minutes} min</span>
                <h2>{lesson.title}</h2>
                <p>This reading walks through a complete, exam-style example from start to finish. Read it once quickly for the big picture, then a second time with a pen, pausing at each step to predict what comes next.</p>
                <h3>How to use this page</h3>
                <ol>
                  <li>Cover the solution and try the first step on your own.</li>
                  <li>Compare your step with the worked answer and note any differences.</li>
                  <li>Write one sentence in “My notes” about what you would do differently next time.</li>
                </ol>
                <blockquote>Understanding why a step works is worth more than remembering the step itself.</blockquote>
              </article>
            ) : (
              <VideoPlayer lesson={lesson} course={course} onEnded={() => learning.markComplete(course.slug, lesson.id)} />
            )}
          </div>

          {/* Lesson title + Previous / Mark complete / Next buttons */}
          <div className="learn-head">
            <div>
              <p className="learn-head__module">{module.title} · {n(index + 1)}/{n(course.lessonCount)}</p>
              <h1>{lesson.title}</h1>
            </div>
            <div className="learn-head__actions">
              <Button variant="secondary" iconLeft={ArrowLeft} disabled={!prev} onClick={() => prev && goTo(prev)} aria-label={t('learn.prev')} className="learn-head__prev">
                <span className="learn-hide-sm">{t('learn.prev')}</span>
              </Button>
              <Button
                variant={isDone ? 'secondary' : 'dark'}
                iconLeft={isDone ? CheckCircle2 : Check}
                onClick={() => learning.toggleComplete(course.slug, lesson.id)}
                disabled={locked}
                className={cn(isDone && 'is-done')}
              >
                {isDone ? t('learn.completed') : t('learn.complete')}
              </Button>
              {next && <Button variant="primary" icon={ArrowRight} onClick={completeAndNext} disabled={locked}>{t('learn.next')}</Button>}
            </div>
          </div>

          {/* Tabs: clicking one sets `tab`; only the matching panel below is shown. */}
          <div className="learn-tabs" role="tablist" aria-label="Lesson details">
            {['overview', 'notes', 'resources'].map((id) => (
              <button key={id} type="button" role="tab" id={`tab-${id}`} aria-selected={tab === id} aria-controls={`panel-${id}`} onClick={() => setTab(id)} className="learn-tabs__tab">
                {t(`learn.${id}`)}
              </button>
            ))}
          </div>
          <div className="learn-panel" role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
            {tab === 'overview' && (
              <div className="learn-overview">
                <p>In this lesson, {mentor.name} explains <strong>{lesson.title.toLowerCase()}</strong> step by step, with worked examples you can pause and try yourself. Finish with the checkpoint quiz to lock it in.</p>
                <ul>
                  <li><Check size={16} aria-hidden="true" />Key idea explained visually</li>
                  <li><Check size={16} aria-hidden="true" />Two worked examples from past exams</li>
                  <li><Check size={16} aria-hidden="true" />Common mistakes to avoid</li>
                </ul>
              </div>
            )}
            {tab === 'notes' && <NotesEditor key={noteKey} initial={learning.notes[noteKey] ?? ''} onSave={(text) => learning.saveNote(noteKey, text)} />}
            {tab === 'resources' && (
              <ul className="learn-resources">
                {['Lesson notes (PDF)', 'Practice worksheet', 'Formula sheet'].map((r) => (
                  <li key={r}><FileText size={18} aria-hidden="true" /><span>{r}</span><button type="button" aria-label={`Download ${r}`}><Download size={17} /></button></li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Course content list (right column on desktop, drawer on phones) */}
        <LessonSidebar course={course} currentId={lesson.id} completed={completed} enrolled={enrolled} open={sidebarOpen} onSelect={goTo} onClose={() => setSidebarOpen(false)} />
      </div>
    </div>
  );
}

// Notes textarea with auto-save: waits 600ms after you stop typing, then saves ("debounce").
// `key={noteKey}` on the parent resets it for each lesson.
function NotesEditor({ initial, onSave }) {
  const { t } = useLanguage();
  const [text, setText] = useState(initial);
  const [saved, setSaved] = useState(false);
  // dirty = there are changes that haven't been saved yet.
  const dirty = text !== initial;

  useEffect(() => {
    if (!dirty) return undefined;
    setSaved(false);
    // Save 600 ms after the last key press. Typing again cancels the old timer (the cleanup below).
    const id = window.setTimeout(() => { onSave(text); setSaved(true); }, 600);
    return () => window.clearTimeout(id);
  }, [text, dirty, onSave]);

  // Word count shown under the box.
  const count = useMemo(() => (text.trim() ? text.trim().split(/\s+/).length : 0), [text]);

  return (
    <div className="learn-notes">
      <label htmlFor="lesson-notes" className="sr-only">{t('learn.notes')}</label>
      <textarea id="lesson-notes" rows={7} value={text} onChange={(e) => setText(e.target.value)} placeholder={t('learn.notesPh')} />
      <div className="learn-notes__foot">
        <span>{count} words</span>
        {saved && <span className="learn-notes__saved"><Check size={14} aria-hidden="true" />{t('learn.saved')}</span>}
      </div>
    </div>
  );
}
