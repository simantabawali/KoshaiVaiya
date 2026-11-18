/**
 * Logo — the Jonaki mark (a glowing firefly drawn in SVG) + wordmark. Always links home.
 * tone="light" is for dark backgrounds. The soft halo pulse is a CSS animation in primitives.css.
 */
import { Link } from 'react-router-dom';
import { cn } from '../../utils/format.js';
import './primitives.css';

export default function Logo({ tone = 'dark', className }) {
  return (
    <Link to="/" className={cn('logo', `logo--${tone}`, className)} aria-label="Jonaki home">
      {/* The icon, drawn with SVG shapes: rounded square, glowing halo, firefly body and wing line. */}
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="32" height="32">
          <rect width="32" height="32" rx="10" className="logo__bg" />
          <circle cx="16" cy="18" r="9" className="logo__halo" />
          <circle cx="16" cy="18" r="4.5" className="logo__core" />
          <path d="M10.5 11.5c2.8-3.6 8.2-3.6 11 0" className="logo__wing" />
        </svg>
      </span>
      {/* The brand name */}
      <span className="logo__word">Jonaki</span>
    </Link>
  );
}
