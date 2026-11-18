/**
 * MobileTabBar.jsx — app-style navigation bar fixed to the bottom of the screen on phones.
 *
 * Why: on small screens the header links are hidden behind the menu button, so learners could
 * not easily find "Courses" or their dashboard. This bar keeps the most important pages one tap
 * away, like a mobile app. It is hidden on screens wider than 960px (see MobileTabBar.css).
 *
 * NavLink (from React Router) gives us `isActive`, so the current tab is highlighted.
 */
import { Link, NavLink } from 'react-router-dom';
import { BookOpen, Compass, Home, LayoutDashboard, UserRound } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { useLearning } from '../../context/LearningContext.jsx';
import { cn } from '../../utils/format.js';
import './MobileTabBar.css';

export default function MobileTabBar() {
  const { t } = useLanguage();
  const { user } = useLearning();

  // Each tab: where it goes, its label and icon. `end` means "/" is only active on the home page.
  const tabs = [
    { to: '/', label: t('nav.home'), icon: Home, end: true },
    { to: '/courses', label: t('nav.courses'), icon: BookOpen },
    { to: '/dashboard', label: t('nav.learning'), icon: LayoutDashboard },
    // 4th tab: logged-out users get "Log in"; logged-in users get "Paths" (a section of the home page).
    user
      ? { to: '/#paths', label: t('nav.paths'), icon: Compass, plain: true }
      : { to: '/login', label: t('nav.login'), icon: UserRound },
  ];

  return (
    <nav className="tabbar" aria-label="Quick navigation">
      {tabs.map(({ to, label, icon: Icon, end, plain }) => {
        const content = (
          <>
            <span className="tabbar__icon"><Icon size={21} strokeWidth={1.9} aria-hidden="true" /></span>
            <span className="tabbar__label">{label}</span>
          </>
        );
        // A "#section" link is never highlighted, so it uses a plain <Link> instead of <NavLink>.
        return plain
          ? <Link key={label} to={to} className="tabbar__item">{content}</Link>
          : (
            <NavLink key={label} to={to} end={end} className={({ isActive }) => cn('tabbar__item', isActive && 'is-active')}>
              {content}
            </NavLink>
          );
      })}
    </nav>
  );
}
