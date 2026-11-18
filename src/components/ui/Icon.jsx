/**
 * Icon — turns an icon *name* stored in data (e.g. 'BookOpen') into the Lucide component.
 * Only the icons listed here are imported, which keeps the bundle small.
 * To use a new icon from data: import it and add it to the `icons` object.
 */
import {
  BookOpen, GraduationCap, Briefcase, Languages, Code2, PenTool,
} from 'lucide-react';

// Lookup table: icon name → icon component.
const icons = { BookOpen, GraduationCap, Briefcase, Languages, Code2, PenTool };

export default function Icon({ name, ...props }) {
  // `??` means: if the name isn't in the table, use BookOpen.
  const Component = icons[name] ?? BookOpen;
  // Draw the chosen icon and pass any extra props (size, strokeWidth…) through.
  return <Component aria-hidden="true" {...props} />;
}
