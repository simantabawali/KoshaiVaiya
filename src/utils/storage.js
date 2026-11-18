/**
 * storage.js — safe wrappers around localStorage.
 * localStorage can throw (private browsing, storage full, blocked cookies), so every call is
 * inside try/catch. If it fails the app still works; data just isn't remembered.
 */
// Read a saved value. localStorage only stores text, so JSON.parse turns it back into objects/arrays.
// If nothing is saved (or reading fails) we return `fallback` instead.
export const readStorage = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

// Save a value. JSON.stringify turns objects/arrays into text.
export const writeStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) — state stays in memory */
  }
};
