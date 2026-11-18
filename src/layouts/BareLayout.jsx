/**
 * BareLayout.jsx — a minimal frame with no global header or footer.
 * Used by the lesson player and the log in / sign up pages, which have their own top bars.
 * <Outlet /> renders the matching child route (see App.jsx).
 */
import { Outlet, useLocation } from 'react-router-dom';

/** Full-screen layout without global header/footer (auth, lesson player). */
export default function BareLayout() {
  // The current URL path. Used as a `key` so each new page replays the fade-in animation.
  const { pathname } = useLocation();
  return (
    <main id="main" key={pathname} className="page-enter">
      <Outlet />
    </main>
  );
}
