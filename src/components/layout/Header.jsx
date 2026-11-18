/**
 * Header.jsx — the top navigation bar shown on every main page.
 *
 * What it does:
 *  - Shows the logo, page links, language switch and log in / account buttons.
 *  - Turns transparent over dark hero sections and becomes a frosted light bar after you scroll.
 *  - On phones (≤ 960px) the links are hidden and a menu button (☰) opens a full-screen menu.
 *
 * React ideas used here:
 *  - useState   → remembers whether the mobile menu is open.
 *  - useEffect  → closes the menu automatically when the page (URL) changes.
 *  - createPortal → renders the mobile menu directly inside <body>, outside the header.
 *    (Bug fix: the header uses a blur effect, and on iPhone Safari / Firefox a blurred parent
 *     "traps" position:fixed children, so the menu collapsed to 0px height and looked empty.
 *     Rendering it in <body> avoids that completely.)
 */
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import Button from '../ui/Button.jsx';
import Avatar from '../ui/Avatar.jsx';
import LanguageSwitch from '../ui/LanguageSwitch.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useLearning } from '../../context/LearningContext.jsx';
import { useScrolled } from '../../hooks/useScrolled.js';
import { useLockBody } from '../../hooks/useLockBody.js';
import { cn } from '../../utils/format.js';
import './Header.css';

// Pages that start with a dark hero. On these, the header is transparent with light text
// until the user scrolls. The patterns are regular expressions matched against the URL path.
const DARK_ROUTES = [/^\/$/, /^\/courses\/[^/]+$/];

export default function Header() {
  const { t } = useLanguage();               // t('key') returns the text in the current language
  const { user, logout } = useLearning();    // the logged-in user (or null)
  const { pathname } = useLocation();        // current URL path, e.g. "/courses"
  const navigate = useNavigate();            // function to change page from code
  const scrolled = useScrolled(24);          // true once the page is scrolled more than 24px
  const [open, setOpen] = useState(false);   // is the mobile menu open?
  useLockBody(open);                         // stop the page behind the menu from scrolling

  // Close the menu whenever the route changes (e.g. after tapping a link).
  useEffect(() => { setOpen(false); }, [pathname]);

  // Let keyboard users close the menu with the Escape key.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey); // cleanup when menu closes
  }, [open]);

  // Decide the colour scheme: dark (transparent) only over a dark hero, before scrolling,
  // and never while the mobile menu is open (the menu has a light background).
  const overDark = DARK_ROUTES.some((r) => r.test(pathname)) && !scrolled && !open;
  const tone = overDark ? 'dark' : 'light';

  // One list of links used by both the desktop nav and the mobile menu.
  // `hash: true` links jump to a section on the home page (handled by ScrollManager).
  const links = [
    { to: '/courses', label: t('nav.courses') },
    { to: '/#paths', label: t('nav.paths'), hash: true },
    { to: '/#how', label: t('nav.how'), hash: true },
    { to: '/dashboard', label: t('nav.dashboard') },
  ];

  const handleLogout = () => { logout(); navigate('/'); };

  // The full-screen phone menu. It is portalled into <body> (see note at the top of the file).
  const mobileMenu = (
    <div id="mobile-menu" className="mobile-menu" hidden={!open}>
      <nav className="container mobile-menu__nav" aria-label="Mobile">
        {links.map((l, i) => (
          // --i is a CSS variable used to stagger each link's entrance animation.
          <Link key={l.to} to={l.to} className="mobile-menu__link" style={{ '--i': i }} onClick={() => setOpen(false)}>
            {l.label}
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        ))}
        <div className="mobile-menu__footer">
          {user ? (
            <>
              <Button to="/dashboard" variant="dark" block iconLeft={LayoutDashboard}>{t('nav.dashboard')}</Button>
              <Button variant="secondary" block iconLeft={LogOut} onClick={handleLogout}>{t('nav.logout')}</Button>
            </>
          ) : (
            <>
              <Button to="/signup" variant="primary" block>{t('nav.signup')}</Button>
              <Button to="/login" variant="secondary" block>{t('nav.login')}</Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );

  return (
    <>
      <header className={cn('header', `header--${tone}`, scrolled && 'is-scrolled', open && 'is-open')}>
        <div className="container header__bar">
          <Logo tone={overDark ? 'light' : 'dark'} />

          {/* Desktop links (hidden on phones by CSS). NavLink adds "is-active" on the current page. */}
          <nav className="header__nav" aria-label="Primary">
            {links.map((l) => (
              l.hash
                ? <Link key={l.to} to={l.to} className="header__link">{l.label}</Link>
                : <NavLink key={l.to} to={l.to} className={({ isActive }) => cn('header__link', isActive && 'is-active')}>{l.label}</NavLink>
            ))}
          </nav>

          <div className="header__actions">
            <LanguageSwitch tone={overDark ? 'dark' : 'light'} />
            {user ? (
              // Logged in: avatar links to the dashboard, plus a log-out icon button.
              <div className="header__user">
                <Link to="/dashboard" className="header__avatar" aria-label={t('nav.dashboard')}>
                  <Avatar name={user.name} tone="amber" size={38} />
                </Link>
                <button type="button" className="header__icon-btn" onClick={handleLogout} aria-label={t('nav.logout')}>
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="header__link header__login">{t('nav.login')}</Link>
                <Button to="/signup" size="sm" variant={overDark ? 'glow' : 'dark'} className="header__cta">{t('nav.signup')}</Button>
              </>
            )}
            {/* Phone-only menu button. aria-expanded tells screen readers if the menu is open. */}
            <button
              type="button"
              className="header__toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={t('nav.menu')}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
              <span className="header__toggle-label">{t('nav.menu')}</span>
            </button>
          </div>
        </div>
      </header>
      {createPortal(mobileMenu, document.body)}
    </>
  );
}
