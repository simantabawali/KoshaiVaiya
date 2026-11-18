/**
 * MainLayout.jsx — the shared frame for normal pages: header on top, page in the middle,
 * footer at the bottom, and the phone tab bar.
 *
 * <Outlet /> is a React Router placeholder: it renders whichever child route matches the URL
 * (Home, Courses, …). See App.jsx for the list of routes that use this layout.
 *
 * `key={pathname}` makes React treat each page as brand-new when the URL changes, which
 * replays the fade-in animation (`page-enter` class in base.css) and resets page state.
 */
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import MobileTabBar from '../components/layout/MobileTabBar.jsx';

export default function MainLayout({ footer = true }) {
  const { pathname } = useLocation();
  return (
    <>
      {/* Hidden link that appears on keyboard focus so keyboard users can skip the menu. */}
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main" key={pathname} className="page-enter">
        <Outlet />
      </main>
      {footer && <Footer />}
      <div className="tabbar-spacer" aria-hidden="true" />
      <MobileTabBar />
    </>
  );
}
