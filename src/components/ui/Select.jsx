/**
 * Select — a styled dropdown with a small label, e.g. "Sort by  Most popular ▾".
 * It's a real <select>, so it works with keyboards and native phone pickers.
 */
import { ChevronDown } from 'lucide-react';
import './Field.css';

export default function Select({ label, value, onChange, options, id }) {
  return (
    <label className="select" htmlFor={id}>
      <span className="select__label">{label}</span>
      {/* Controlled select: `value` comes from the parent; on change we send the new value back up with onChange. */}
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {/* One <option> per item. `key` helps React keep track of list items. */}
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown size={16} className="select__chevron" aria-hidden="true" />
    </label>
  );
}
