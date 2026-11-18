/**
 * useLockBody — stops the page behind a menu or drawer from scrolling while `locked` is true.
 * It restores the previous overflow style when unlocked or when the component unmounts.
 */
import { useEffect } from 'react';

export function useLockBody(locked) {
  useEffect(() => {
    // Nothing to do when not locked.
    if (!locked) return undefined;
    // Remember the old value so we can put it back later.
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Cleanup: runs when `locked` becomes false or the component is removed.
    return () => { document.body.style.overflow = prev; };
  }, [locked]);
}
