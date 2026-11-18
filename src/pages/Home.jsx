/**
 * Home page — just stacks the home sections in order. Each section is its own component in
 * components/home/, so you can reorder, remove or edit a section without touching the others.
 */
import Hero from '../components/home/Hero.jsx';
import Paths from '../components/home/Paths.jsx';
import Featured from '../components/home/Featured.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import QuizSection from '../components/home/QuizSection.jsx';
import Features from '../components/home/Features.jsx';
import Mentors from '../components/home/Mentors.jsx';
import Faq from '../components/home/Faq.jsx';
import CtaBand from '../components/home/CtaBand.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

// useDocumentTitle() with no title sets the default browser-tab title.
export default function Home() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <Paths />
      <Featured />
      <HowItWorks />
      <QuizSection />
      <Features />
      <Mentors />
      <Faq />
      <CtaBand />
    </>
  );
}
