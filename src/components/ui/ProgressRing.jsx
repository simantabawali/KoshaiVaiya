/**
 * ProgressRing — a circular progress indicator drawn with SVG.
 * How it works: the coloured circle's outline is a dashed line whose dash is exactly the full
 * circumference (c). Shifting it with strokeDashoffset hides part of it, so offset = c × (1 − value%).
 * Anything passed as children is shown in the centre (e.g. "38%").
 */
export default function ProgressRing({ value = 0, size = 56, stroke = 5, color = 'var(--jade-500)', track = 'var(--line)', children }) {
  // Radius: half the size minus the line thickness, so the ring fits inside its box.
  const r = (size - stroke) / 2;
  // Circumference = 2πr (the full length of the circle's outline).
  const c = 2 * Math.PI * r;
  // How much of the outline to hide. Math.min / Math.max keep the value between 0 and 100.
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <span className="progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        {/* 1st circle: the grey "track". 2nd circle: the coloured progress, rotated -90° so it starts at 12 o'clock. */}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 900ms var(--ease-out)' }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {/* Optional text in the middle, e.g. "38%" */}
      {children && <span className="progress-ring__label">{children}</span>}
    </span>
  );
}
