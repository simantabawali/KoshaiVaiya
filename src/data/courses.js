/**
 * courses.js — sample course catalogue.
 *
 * Each raw course lists its modules; each lesson is a short tuple: [title, minutes, type].
 * At the bottom, `courses` "normalises" the raw data once: it gives every lesson an id like "2-3"
 * (module 2, lesson 3), works out totals (lessonCount, totalMinutes, hours) and marks the first
 * two lessons as free previews. Pages then use these ready-made fields.
 */
// Tiny helper so module definitions stay short.
const mod = (title, lessons) => ({ title, lessons });

// The hand-written course list. Main fields:
//   slug (used in the URL), category, level, mentor (id), tone (colour), glyph (text on the cover),
//   title / tagline ({ en, bn }), price / oldPrice (in Taka), rating, reviews, learners, badge,
//   outcomes ("what you will learn"), modules (lessons), quiz (optional own questions).
const raw = [
  {
    slug: 'hsc-physics-first-paper',
    category: 'school', level: 'intermediate', mentor: 'farhana', tone: 'jade', glyph: 'F=ma',
    title: { en: 'HSC Physics 1st Paper: Complete Prep', bn: 'এইচএসসি পদার্থবিজ্ঞান ১ম পত্র: পূর্ণ প্রস্তুতি' },
    tagline: { en: 'Every chapter, every creative question pattern, explained with drawings first.', bn: 'প্রতিটি অধ্যায়, সৃজনশীল প্রশ্নের প্রতিটি ধরন — ছবি এঁকে বোঝানো।' },
    price: 2450, oldPrice: 3500, rating: 4.9, reviews: 3120, learners: 18400, badge: 'bestseller', updated: 'Oct 2026',
    outcomes: ['Solve vector and motion problems with a reliable 4-step method', 'Master Newtonian mechanics, work, energy and power', 'Write full-mark answers for creative questions', 'Handle gravitation and periodic motion with confidence', 'Avoid the 10 most common board-exam mistakes', 'Revise the full syllabus in two weeks before the exam'],
    modules: [
      mod('Vectors & physical world', [['Why physics needs vectors', 12, 'video'], ['Adding vectors the visual way', 14, 'video'], ['Dot and cross product, intuitively', 16, 'video'], ['Checkpoint: vectors', 6, 'quiz']]),
      mod('Dynamics', [['Newton’s laws in daily life', 15, 'video'], ['Friction and inclined planes', 18, 'video'], ['Momentum and collisions', 14, 'video'], ['Board question walkthrough', 10, 'reading'], ['Checkpoint: dynamics', 8, 'quiz']]),
      mod('Work, energy & power', [['Work done by a variable force', 13, 'video'], ['Conservation of energy', 15, 'video'], ['Power and efficiency problems', 11, 'video'], ['Checkpoint: energy', 6, 'quiz']]),
      mod('Gravitation', [['Kepler to Newton', 12, 'video'], ['Escape velocity and satellites', 16, 'video'], ['Final mock: creative questions', 20, 'quiz']]),
    ],
    quiz: [
      { q: 'A ball is thrown straight up. At the highest point, its acceleration is…', options: ['Zero', '9.8 m/s² downward', '9.8 m/s² upward', 'It depends on the speed'], answer: 1, explain: 'Gravity never switches off. Velocity is zero at the top, but acceleration stays g, downward.' },
      { q: 'The dot product of two perpendicular vectors is…', options: ['1', 'The product of their magnitudes', '0', 'Undefined'], answer: 2, explain: 'A·B = |A||B|cos θ, and cos 90° = 0.' },
      { q: 'Kinetic energy doubles when speed increases by a factor of…', options: ['2', '√2', '4', '1/2'], answer: 1, explain: 'KE ∝ v². To double KE, v must grow by √2.' },
    ],
  },
  {
    slug: 'ssc-general-math-mastery',
    category: 'school', level: 'beginner', mentor: 'tanvir', tone: 'amber', glyph: 'x²',
    title: { en: 'SSC General Math Mastery', bn: 'এসএসসি সাধারণ গণিত মাস্টারি' },
    tagline: { en: 'From algebra fear to geometry flow — a calm, step-by-step path to an A+.', bn: 'বীজগণিতের ভয় থেকে জ্যামিতির স্বচ্ছন্দ — ধাপে ধাপে A+ এর পথ।' },
    price: 1850, oldPrice: 2600, rating: 4.8, reviews: 4210, learners: 22600, badge: 'bestseller', updated: 'Sep 2026',
    outcomes: ['Factorise any algebraic expression quickly', 'Solve equations and inequalities step by step', 'Prove geometry theorems with clear logic', 'Use trigonometric ratios without memorising tables', 'Tackle mensuration and statistics problems', 'Manage time across the full exam paper'],
    modules: [
      mod('Algebra foundations', [['Patterns behind formulas', 11, 'video'], ['Factorisation tricks', 14, 'video'], ['Practice set: algebra', 8, 'quiz']]),
      mod('Equations', [['Linear equations made visual', 12, 'video'], ['Quadratic equations', 16, 'video'], ['Word problems decoded', 13, 'reading'], ['Checkpoint: equations', 7, 'quiz']]),
      mod('Geometry & trigonometry', [['Theorems as stories', 15, 'video'], ['Circle theorems', 14, 'video'], ['Trigonometric ratios', 13, 'video'], ['Final mock test', 18, 'quiz']]),
    ],
    quiz: [
      { q: 'What is the value of (a + b)² − (a − b)²?', options: ['2ab', '4ab', 'a² + b²', '0'], answer: 1, explain: 'Expanding both squares and subtracting leaves 4ab.' },
      { q: 'sin² θ + cos² θ equals…', options: ['0', '1', 'tan θ', '2'], answer: 1, explain: 'This is the Pythagorean identity — true for every angle.' },
    ],
  },
  {
    slug: 'university-admission-science',
    category: 'admission', level: 'advanced', mentor: 'nusrat', tone: 'iris', glyph: 'A+',
    title: { en: 'University Admission: Science Crash Course', bn: 'বিশ্ববিদ্যালয় ভর্তি: বিজ্ঞান ক্র্যাশ কোর্স' },
    tagline: { en: 'Speed, accuracy and strategy for MCQ-based admission tests.', bn: 'এমসিকিউ ভিত্তিক ভর্তি পরীক্ষার জন্য গতি, নির্ভুলতা ও কৌশল।' },
    price: 3200, oldPrice: 4500, rating: 4.9, reviews: 1870, learners: 9800, badge: 'new', updated: 'Nov 2026',
    outcomes: ['Answer MCQs 40% faster with elimination techniques', 'Revise physics, chemistry and biology high-yield topics', 'Practise under real time pressure', 'Build a 60-day revision plan', 'Analyse mock results to target weak areas', 'Stay calm on exam day'],
    modules: [
      mod('Strategy first', [['How admission tests are scored', 10, 'video'], ['Elimination and educated guessing', 12, 'video'], ['Your 60-day plan', 8, 'reading']]),
      mod('High-yield science', [['Physics: 20 must-know formulas', 18, 'video'], ['Chemistry: reactions that repeat', 17, 'video'], ['Biology: diagrams that score', 16, 'video'], ['Mixed MCQ drill', 12, 'quiz']]),
      mod('Mock tests', [['Full mock 1', 25, 'quiz'], ['Reviewing your mistakes', 12, 'video'], ['Full mock 2', 25, 'quiz']]),
    ],
  },
  {
    slug: 'bcs-preliminary-complete',
    category: 'jobs', level: 'intermediate', mentor: 'arif', tone: 'clay', glyph: 'BCS',
    title: { en: 'BCS Preliminary: Complete Course', bn: 'বিসিএস প্রিলিমিনারি: পূর্ণাঙ্গ কোর্স' },
    tagline: { en: 'The full 200-mark syllabus, broken into a daily routine you can keep.', bn: '২০০ নম্বরের পুরো সিলেবাস — মেনে চলা যায় এমন দৈনিক রুটিনে।' },
    price: 2999, oldPrice: 4200, rating: 4.7, reviews: 2650, learners: 15200, updated: 'Oct 2026',
    outcomes: ['Cover Bangla, English, math and mental ability', 'Remember Bangladesh and international affairs with memory maps', 'Practise with previous-year question analysis', 'Take weekly timed model tests', 'Build a daily 2-hour study routine', 'Track your score trend toward the cut-off'],
    modules: [
      mod('Getting started', [['How to read the syllabus', 9, 'video'], ['A routine that survives a job', 11, 'reading']]),
      mod('Bangla & English', [['Grammar patterns that repeat', 16, 'video'], ['Literature timeline', 14, 'video'], ['Checkpoint: language', 10, 'quiz']]),
      mod('Affairs & mental ability', [['Bangladesh affairs memory map', 18, 'video'], ['International affairs essentials', 15, 'video'], ['Mental ability shortcuts', 13, 'video'], ['Weekly model test', 30, 'quiz']]),
    ],
  },
  {
    slug: 'ielts-band-seven-blueprint',
    category: 'language', level: 'intermediate', mentor: 'sadia', tone: 'jade', glyph: '7+',
    title: { en: 'IELTS Band 7+ Blueprint', bn: 'আইইএলটিএস ব্যান্ড ৭+ ব্লুপ্রিন্ট' },
    tagline: { en: 'A focused plan for all four modules, with weekly speaking practice.', bn: 'চারটি মডিউলের জন্য পরিকল্পনা, সাপ্তাহিক স্পিকিং অনুশীলনসহ।' },
    price: 3500, oldPrice: 5000, rating: 4.9, reviews: 2980, learners: 12100, badge: 'bestseller', updated: 'Oct 2026',
    outcomes: ['Understand exactly what examiners score', 'Write Task 1 and Task 2 essays with clear structure', 'Read faster with skimming and scanning', 'Catch every detail in listening sections', 'Speak fluently without memorised answers', 'Sit two full mock tests with feedback'],
    modules: [
      mod('Understanding the test', [['Band descriptors decoded', 12, 'video'], ['Your starting point', 15, 'quiz']]),
      mod('Writing', [['Task 1: describing data', 16, 'video'], ['Task 2: building an argument', 18, 'video'], ['Model answers explained', 12, 'reading']]),
      mod('Reading & listening', [['Skimming vs scanning', 13, 'video'], ['True / False / Not Given', 14, 'video'], ['Listening traps', 12, 'video'], ['Practice set', 15, 'quiz']]),
      mod('Speaking', [['Part 2 cue cards', 14, 'video'], ['Fluency without fillers', 11, 'video']]),
    ],
    quiz: [
      { q: 'In Reading, choose “Not Given” when the passage…', options: ['Contradicts the statement', 'Agrees with the statement', 'Has no information about it', 'Uses different words'], answer: 2, explain: 'Not Given means the passage neither confirms nor contradicts the statement.' },
      { q: 'The recommended length for Writing Task 2 is at least…', options: ['150 words', '200 words', '250 words', '400 words'], answer: 2, explain: 'Task 2 asks for at least 250 words; Task 1 asks for 150.' },
    ],
  },
  {
    slug: 'spoken-english-confidence',
    category: 'language', level: 'beginner', mentor: 'sadia', tone: 'amber', glyph: 'Hi!',
    title: { en: 'Spoken English for Everyday Confidence', bn: 'প্রতিদিনের আত্মবিশ্বাসী স্পোকেন ইংলিশ' },
    tagline: { en: 'Short daily speaking drills for class, interviews and real life.', bn: 'ক্লাস, ইন্টারভিউ আর জীবনের জন্য ছোট দৈনিক অনুশীলন।' },
    price: 0, rating: 4.6, reviews: 5400, learners: 31000, updated: 'Aug 2026',
    outcomes: ['Introduce yourself naturally', 'Ask and answer everyday questions', 'Fix the most common pronunciation slips', 'Hold a five-minute conversation', 'Prepare for basic interview questions', 'Think in English instead of translating'],
    modules: [
      mod('First words', [['Introducing yourself', 8, 'video'], ['Sounds Bangla speakers mix up', 10, 'video'], ['Quick check', 5, 'quiz']]),
      mod('Conversations', [['Small talk that flows', 9, 'video'], ['Asking for help', 8, 'video'], ['Phone and video calls', 9, 'video']]),
      mod('Interviews', [['Tell me about yourself', 11, 'video'], ['Common questions', 10, 'reading'], ['Mock interview', 8, 'quiz']]),
    ],
  },
  {
    slug: 'modern-web-development-react',
    category: 'tech', level: 'beginner', mentor: 'mehedi', tone: 'iris', glyph: '</>',
    title: { en: 'Modern Web Development with React', bn: 'রিঅ্যাক্ট দিয়ে আধুনিক ওয়েব ডেভেলপমেন্ট' },
    tagline: { en: 'Build and ship three real projects — from HTML basics to a deployed React app.', bn: 'তিনটি বাস্তব প্রজেক্ট — এইচটিএমএল থেকে ডিপ্লয় করা রিঅ্যাক্ট অ্যাপ।' },
    price: 4200, oldPrice: 6000, rating: 4.8, reviews: 1430, learners: 8700, badge: 'new', updated: 'Nov 2026',
    outcomes: ['Write semantic HTML and modern CSS layouts', 'Understand JavaScript the way interviews test it', 'Build components with React hooks', 'Fetch data and handle loading states', 'Use Git and GitHub like a team', 'Deploy a portfolio project online'],
    modules: [
      mod('The web platform', [['How the browser renders a page', 12, 'video'], ['Flexbox and grid', 18, 'video'], ['Checkpoint: CSS layout', 6, 'quiz']]),
      mod('JavaScript essentials', [['Values, functions and scope', 16, 'video'], ['Arrays and objects in practice', 15, 'video'], ['Async and fetch', 17, 'video'], ['Checkpoint: JavaScript', 8, 'quiz']]),
      mod('React', [['Thinking in components', 14, 'video'], ['State and effects', 18, 'video'], ['Routing and forms', 16, 'video'], ['Project: course catalog', 20, 'reading']]),
    ],
    quiz: [
      { q: 'In React, which hook stores a value that triggers a re-render when it changes?', options: ['useRef', 'useState', 'useMemo', 'useId'], answer: 1, explain: 'useState returns state and a setter; calling the setter re-renders the component.' },
      { q: 'Which CSS property turns an element into a grid container?', options: ['display: flex', 'position: grid', 'display: grid', 'grid: on'], answer: 2, explain: 'display: grid creates a grid formatting context for its children.' },
    ],
  },
  {
    slug: 'python-data-analysis',
    category: 'tech', level: 'beginner', mentor: 'ayesha', tone: 'jade', glyph: 'py',
    title: { en: 'Python & Data Analysis from Zero', bn: 'শূন্য থেকে পাইথন ও ডেটা অ্যানালাইসিস' },
    tagline: { en: 'Learn Python by answering real questions with real data.', bn: 'বাস্তব ডেটা দিয়ে বাস্তব প্রশ্নের উত্তর খুঁজে পাইথন শিখুন।' },
    price: 3800, oldPrice: 5200, rating: 4.7, reviews: 980, learners: 6400, updated: 'Sep 2026',
    outcomes: ['Write clean Python from the first day', 'Load and clean data with pandas', 'Create clear charts that tell a story', 'Answer business questions with data', 'Automate repetitive spreadsheet work', 'Present a portfolio analysis'],
    modules: [
      mod('Python basics', [['Your first program', 10, 'video'], ['Lists, loops and functions', 16, 'video'], ['Checkpoint: Python', 6, 'quiz']]),
      mod('Working with data', [['pandas DataFrames', 17, 'video'], ['Cleaning messy data', 15, 'video'], ['Group, filter, summarise', 14, 'video']]),
      mod('Telling the story', [['Charts that explain', 13, 'video'], ['Project: district rainfall', 20, 'reading'], ['Final quiz', 8, 'quiz']]),
    ],
  },
  {
    slug: 'ui-ux-design-figma',
    category: 'design', level: 'beginner', mentor: 'rafiq', tone: 'clay', glyph: 'Aa',
    title: { en: 'UI/UX Design with Figma', bn: 'ফিগমা দিয়ে ইউআই/ইউএক্স ডিজাইন' },
    tagline: { en: 'Design beautiful, usable apps — and build a portfolio clients trust.', bn: 'সুন্দর ও ব্যবহারযোগ্য অ্যাপ ডিজাইন — ক্লায়েন্টের আস্থার পোর্টফোলিও।' },
    price: 2800, oldPrice: 3900, rating: 4.8, reviews: 1210, learners: 7300, updated: 'Oct 2026',
    outcomes: ['Use Figma auto layout and components', 'Apply typography, color and spacing systems', 'Run quick user research', 'Prototype interactions', 'Design a mobile app end to end', 'Present a case study'],
    modules: [
      mod('Design foundations', [['What makes design feel right', 12, 'video'], ['Type, color and space', 16, 'video'], ['Checkpoint: foundations', 6, 'quiz']]),
      mod('Figma in depth', [['Frames and auto layout', 15, 'video'], ['Components and variants', 17, 'video'], ['Prototyping', 13, 'video']]),
      mod('Portfolio project', [['Research and wireframes', 14, 'video'], ['Polish and hand-off', 15, 'video'], ['Writing your case study', 10, 'reading']]),
    ],
  },
  {
    slug: 'freelancing-digital-marketing',
    category: 'design', level: 'beginner', mentor: 'rafiq', tone: 'amber', glyph: '↗',
    title: { en: 'Freelancing & Digital Marketing', bn: 'ফ্রিল্যান্সিং ও ডিজিটাল মার্কেটিং' },
    tagline: { en: 'Find your first clients, price your work and grow with honest marketing.', bn: 'প্রথম ক্লায়েন্ট খোঁজা, দাম ঠিক করা আর সৎ মার্কেটিংয়ে বেড়ে ওঠা।' },
    price: 1500, oldPrice: 2200, rating: 4.5, reviews: 2210, learners: 11200, updated: 'Jul 2026',
    outcomes: ['Choose a service you can sell', 'Write a profile that wins trust', 'Price projects with confidence', 'Run simple social media campaigns', 'Communicate professionally with clients', 'Get paid safely'],
    modules: [
      mod('Getting ready', [['Picking your service', 10, 'video'], ['Profile and portfolio', 13, 'video']]),
      mod('Winning work', [['Proposals that get replies', 12, 'video'], ['Pricing your time', 11, 'reading'], ['Checkpoint', 6, 'quiz']]),
      mod('Marketing', [['Content that attracts clients', 14, 'video'], ['Measuring what works', 12, 'video']]),
    ],
  },
];

// Used for courses that don't define their own quiz questions.
const fallbackQuiz = [
  { q: 'What is the best way to remember a new idea for longer?', options: ['Read it many times in one night', 'Recall it from memory over several days', 'Highlight every line', 'Copy the notes neatly'], answer: 1, explain: 'Spaced, active recall strengthens memory far more than re-reading.' },
  { q: 'When you get a practice question wrong, you should…', options: ['Skip it', 'Memorise the answer', 'Understand why, then retry it later', 'Start a new chapter'], answer: 2, explain: 'Understanding the mistake and revisiting it later turns errors into mastery.' },
];

// Build the final course objects (runs once when the file is first imported).
export const courses = raw.map((course, index) => {
  // Running lesson number across the whole course (1, 2, 3 …).
  let order = 0;
  const modules = course.modules.map((m, mi) => ({
    ...m,
    id: `m${mi + 1}`,
    lessons: m.lessons.map(([title, minutes, type], li) => {
      order += 1;
            // Module 2, lesson 3 → id "2-3". The first two lessons of module 1 are free previews.
      return { id: `${mi + 1}-${li + 1}`, title, minutes, type, order, preview: mi === 0 && li < 2 };
    }),
  }));
  const lessons = modules.flatMap((m) => m.lessons);
  // reduce adds up every lesson's minutes into one total.
  const totalMinutes = lessons.reduce((sum, l) => sum + l.minutes, 0);
  return {
    ...course,
    modules,
    lessons,
    lessonCount: lessons.length,
    totalMinutes,
    hours: Math.max(1, Math.round(totalMinutes / 60)),
    quiz: course.quiz ?? fallbackQuiz,
    addedOrder: index,
  };
});

// Find one course by its URL slug, e.g. getCourse('ielts-band-seven-blueprint').
export const getCourse = (slug) => courses.find((c) => c.slug === slug);

export const countByCategory = (categoryId) => courses.filter((c) => c.category === categoryId).length;

// Suggest other courses: same category first, then most popular.
export const relatedCourses = (course, limit = 3) =>
  courses
    .filter((c) => c.slug !== course.slug)
    .sort((a, b) => (b.category === course.category) - (a.category === course.category) || b.learners - a.learners)
    .slice(0, limit);
