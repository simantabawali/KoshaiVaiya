/**
 * App.jsx — the list of pages (routes) and which layout each one uses.
 *
 *   <Route element={<MainLayout />}> … </Route>  → pages with the header + footer.
 *   <Route element={<BareLayout />}> … </Route>  → full-screen pages (lesson player, login, signup).
 *   ":slug" and ":lessonId" are URL parameters, read in the page with useParams().
 *   "lessonId?" means the parameter is optional.
 *
 * Pages other than Home are loaded with lazy(): their code is downloaded only when the user
 * first visits them, which makes the first page load faster. <Suspense> shows a fallback
 * (an empty full-height block) while that code is downloading.
 */
// lazy + Suspense let us load a page's code only when that page is first opened.
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import BareLayout from './layouts/BareLayout.jsx';
import ScrollManager from './components/layout/ScrollManager.jsx';
// Home is imported normally because it's the first page most people see.
import Home from './pages/Home.jsx';

// The other pages are "lazy": their code downloads the first time someone visits them.
const Courses = lazy(() => import('./pages/Courses.jsx'));
const CourseDetail = lazy(() => import('./pages/CourseDetail.jsx'));
const Learn = lazy(() => import('./pages/Learn.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Auth = lazy(() => import('./pages/Auth.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// A React component is just a function that returns what to show on screen (JSX looks like HTML).
// `export default` means: this is the main thing other files get when they import App.jsx.
export default function App() {
  return (
    <>
      {/* Scrolls to the top (or to a #section) whenever the page changes. */}
      <ScrollManager />
      <Suspense fallback={<div className="route-loading" aria-hidden="true" />}>
        <Routes>
          {/* These pages share the header + footer (MainLayout). */}
          <Route element={<MainLayout />}>
            {/* "index" = the home page at "/" */}
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:slug" element={<CourseDetail />} />
            <Route path="dashboard" element={<Dashboard />} />
            {/* "*" matches any URL not listed above → 404 page */}
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* These pages fill the whole screen with no global header/footer. */}
          <Route element={<BareLayout />}>
            <Route path="learn/:slug/:lessonId?" element={<Learn />} />
            <Route path="login" element={<Auth mode="login" />} />
            <Route path="signup" element={<Auth mode="signup" />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
