/**
 * useDocumentTitle — sets the browser tab title, e.g. "Courses · Jonaki".
 * Call it at the top of a page component: useDocumentTitle('Courses').
 */
import { useEffect } from 'react';

export function useDocumentTitle(title) {
  // useEffect runs after React has drawn the page — here, whenever `title` changes.
  useEffect(() => {
    document.title = title ? `${title} · Jonaki` : 'Jonaki — Learn with light';
  }, [title]);
}
