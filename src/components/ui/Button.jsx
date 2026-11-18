/**
 * Button — one reusable button used across the whole site.
 *
 * Props:
 *   variant  'primary' | 'secondary' | 'dark' | 'ghost' | 'glow' | 'outline-light'  (colour style)
 *   size     'sm' | 'md' | 'lg'
 *   to       if given, renders a React Router <Link> (in-app page navigation)
 *   href     if given, renders a normal <a> (external link)
 *   icon / iconLeft  a Lucide icon component shown after / before the text
 *   block    full width
 *   ...rest  any other props (onClick, disabled, type, aria-label…) are passed straight through.
 */
// Link = an <a> tag that changes page without reloading the whole browser tab.
import { Link } from 'react-router-dom';
import { cn } from '../../utils/format.js';
import './Button.css';

// Props are "destructured" right in the parameter list, with defaults (variant = 'primary').
// `icon: Icon` renames the prop with a capital letter — React components must start with a capital.
export default function Button({
  children, to, href, variant = 'primary', size = 'md', icon: Icon, iconLeft: IconLeft,
  block = false, className, ...rest
}) {
  // Build the class list, e.g. "btn btn--primary btn--md". The CSS for each lives in Button.css.
  const classes = cn('btn', `btn--${variant}`, `btn--${size}`, block && 'btn--block', className);
  // What goes inside: optional left icon, the text, optional right icon.
  // `{IconLeft && <IconLeft … />}` means "only draw the icon if one was given".
  const content = (
    <>
      {IconLeft && <IconLeft className="btn__icon" size={18} strokeWidth={2} aria-hidden="true" />}
      <span className="btn__label">{children}</span>
      {Icon && <Icon className="btn__icon btn__icon--trail" size={18} strokeWidth={2} aria-hidden="true" />}
    </>
  );
  // Pick the right element: Link for app pages, <a> for external URLs, otherwise <button>.
  if (to) return <Link to={to} className={classes} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={classes} {...rest}>{content}</a>;
  // Default: a real <button>. type="button" stops it submitting a form by accident
  // (a caller can still pass type="submit", because ...rest comes after and overrides it).
  return <button type="button" className={classes} {...rest}>{content}</button>;
}
