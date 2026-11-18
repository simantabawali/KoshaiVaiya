/**
 * ScrollManager — fixes scrolling for a single-page app.
 * Normal websites jump to the top on every new page; React apps don't, so this does it manually.
 * If the URL has a #hash (e.g. /#paths), it smoothly scrolls to that section instead.
 * It renders nothing (returns null) — it only runs an effect.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to top on navigation, or to the #hash target when present. */
export default function ScrollManager() {
  // pathname = "/courses", hash = "#paths" (or "" when there is none).
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Wait a moment so the new page has been drawn before we look for the section.
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
      return () => window.clearTimeout(timer);
    }
    // No hash → jump to the top immediately.
    window.scrollTo({ top: 0, behavior: 'instant' });
    return undefined;
  }, [pathname, hash]);
  // This component draws nothing on screen.
  return null;
}
