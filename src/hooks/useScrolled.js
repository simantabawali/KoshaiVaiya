/**
 * useScrolled — returns true when the page has been scrolled more than `offset` pixels.
 * The header uses it to switch from transparent to a solid frosted bar.
 */
import { useEffect, useState } from 'react';

export function useScrolled(offset = 12) {
  // Remember whether we are past the offset.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    // Runs on every scroll: compare how far down we are (window.scrollY) with the offset.
    const onScroll = () => setScrolled(window.scrollY > offset);
        // Check once right away (after a refresh the page may already be scrolled).
    onScroll();
    // passive: true tells the browser we won't block scrolling → smoother on phones.
    window.addEventListener('scroll', onScroll, { passive: true });
    // Cleanup: remove the listener when the component disappears (prevents memory leaks).
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return scrolled;
}
