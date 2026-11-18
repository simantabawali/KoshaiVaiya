/**
 * ProgressBar — thin horizontal progress bar (value 0–100). role="progressbar" makes it accessible.
 */
import './primitives.css';

export default function ProgressBar({ value = 0, tone = 'jade', label }) {
  return (
    <span className={`progress-bar progress-bar--${tone}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      {/* The coloured part; its width is the percentage. */}
      <span className="progress-bar__fill" style={{ width: `${value}%` }} />
    </span>
  );
}
