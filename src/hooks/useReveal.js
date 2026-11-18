/**
 * useReveal — a custom hook that tells you when an element scrolls into view.
 *
 * Returns [ref, visible]. Attach `ref` to an element; `visible` becomes true the first time
 * at least 15% of it is on screen. Used by <Reveal> for fade-in-on-scroll animations.
 * IntersectionObserver is a browser API that watches visibility efficiently (no scroll listeners).
 */
import { useEffect, useRef, useState } from 'react';

/** Adds `is-visible` once the element scrolls into view. */
// Custom hooks are normal functions whose name starts with "use" and that use other hooks inside.
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  // useRef gives us a box that holds the real DOM element after React renders it.
  const ref = useRef(null);
  // false until the element has been seen on screen.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    // Very old browsers: just show the content.
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }
    // The browser calls this function when the element enters or leaves the screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Only animate once, then stop watching.
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    // Cleanup: stop observing if the component is removed from the page.
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Give both back: the component attaches `ref` and reads `visible`.
  return [ref, visible];
}
