/**
 * Faq — frequently asked questions. `open` stores the index of the open item (-1 = none),
 * so opening one question closes the previous one.
 */
import { useState } from 'react';
import SectionHeader from '../ui/SectionHeader.jsx';
import Reveal from '../ui/Reveal.jsx';
import { AccordionItem } from '../ui/Accordion.jsx';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { faqs } from '../../data/content.js';
import './Faq.css';

export default function Faq() {
  const { t, p } = useLanguage();
  // The first question (index 0) starts open.
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section section--tint faq">
      <div className="container faq__inner">
        <SectionHeader eyebrow={t('faq.eyebrow')} title={t('faq.title')} className="faq__header" />
        <Reveal delay={100} className="faq__list">
          {/* Clicking the open question closes it (-1); clicking another one opens that one instead. */}
          {faqs.map((f, i) => (
            <AccordionItem key={i} title={p(f.q)} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)}>
              <p>{p(f.a)}</p>
            </AccordionItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
