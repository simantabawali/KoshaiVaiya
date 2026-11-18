/**
 * LearningContext.jsx — the app's "learning state", shared with every component.
 *
 * Holds:  user (logged-in person or null), enrolled course slugs, completed lesson ids per course,
 *         the last lesson opened per course, lesson notes and live-class reminders.
 * Gives:  helper functions such as enroll(), markComplete(), progressFor(course), login(), logout().
 *
 * There is no backend yet, so everything is saved in the browser's localStorage. When a real API
 * exists, replace the bodies of these functions with API calls — components won't need to change.
 *
 * State is updated "immutably": we never edit the old object, we create a new one with {...s}.
 * React compares old vs new to know what to re-render.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { readStorage, writeStorage } from '../utils/storage.js';

// The shared box for learning data (same idea as LanguageContext).
const LearningContext = createContext(null);
// The name under which we save this data in localStorage.
const KEY = 'jonaki:learning';

// Demo starting data so the dashboard isn't empty on first visit.
const initialState = {
  user: null,
  enrolled: ['hsc-physics-first-paper', 'ielts-band-seven-blueprint'],
  completed: {
    'hsc-physics-first-paper': ['1-1', '1-2', '1-3', '1-4', '2-1', '2-2'],
    'ielts-band-seven-blueprint': ['1-1', '1-2', '2-1'],
  },
  lastLesson: { 'hsc-physics-first-paper': '2-3', 'ielts-band-seven-blueprint': '2-2' },
  notes: {},
  reminders: [],
};

export function LearningProvider({ children }) {
  // Merge saved data over the defaults (saved values win).
  const [state, setState] = useState(() => ({ ...initialState, ...readStorage(KEY, {}) }));

  // Save to localStorage every time the state changes.
  useEffect(() => { writeStorage(KEY, state); }, [state]);

  // Save the user (name, email, goal). Called by the Auth page after the form is valid.
  // `setState((s) => ({ ...s, user }))` = copy the old state and replace only `user`.
  const login = useCallback((user) => setState((s) => ({ ...s, user })), []);
  const logout = useCallback(() => setState((s) => ({ ...s, user: null })), []);

  // Add a course to the enrolled list (only if it's not there already).
  const enroll = useCallback((slug) => setState((s) => (
    s.enrolled.includes(slug) ? s : { ...s, enrolled: [slug, ...s.enrolled] }
  )), []);

  // Mark a lesson done, or undo it if it was already done.
  const toggleComplete = useCallback((slug, lessonId) => setState((s) => {
    const list = s.completed[slug] ?? [];
    const next = list.includes(lessonId) ? list.filter((id) => id !== lessonId) : [...list, lessonId];
    return { ...s, completed: { ...s.completed, [slug]: next } };
  }), []);

  // Mark a lesson done (does nothing if it already is).
  const markComplete = useCallback((slug, lessonId) => setState((s) => {
    const list = s.completed[slug] ?? [];
    if (list.includes(lessonId)) return s;
    return { ...s, completed: { ...s.completed, [slug]: [...list, lessonId] } };
  }), []);

  // Remember the last lesson opened, so "Continue learning" returns there.
  const visitLesson = useCallback((slug, lessonId) => setState((s) => (
    s.lastLesson[slug] === lessonId ? s : { ...s, lastLesson: { ...s.lastLesson, [slug]: lessonId } }
  )), []);

  // Save one lesson's notes. key looks like "course-slug/2-3".
  const saveNote = useCallback((key, text) => setState((s) => ({ ...s, notes: { ...s.notes, [key]: text } })), []);

  // Turn a live-class reminder on or off.
  const toggleReminder = useCallback((id) => setState((s) => ({
    ...s,
    reminders: s.reminders.includes(id) ? s.reminders.filter((r) => r !== id) : [...s.reminders, id],
  })), []);

  // Everything components can use: all state values (...state) plus the helper functions.
  const value = useMemo(() => ({
    ...state,
        // true if the user is enrolled in this course
    isEnrolled: (slug) => state.enrolled.includes(slug),
        // list of finished lesson ids for a course, e.g. ['1-1', '1-2']
    completedFor: (slug) => state.completed[slug] ?? [],
    // Percentage of lessons completed in a course (0–100).
    progressFor: (course) => {
      if (!course) return 0;
      const done = (state.completed[course.slug] ?? []).length;
      return Math.round((done / course.lessonCount) * 100);
    },
    login, logout, enroll, toggleComplete, markComplete, visitLesson, saveNote, toggleReminder,
  }), [state, login, logout, enroll, toggleComplete, markComplete, visitLesson, saveNote, toggleReminder]);

  // Share `value` with every component inside this provider.
  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  const ctx = useContext(LearningContext);
  if (!ctx) throw new Error('useLearning must be used inside LearningProvider');
  return ctx;
}
