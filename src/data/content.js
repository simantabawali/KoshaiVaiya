/**
 * content.js — other sample content: the home-page quiz, FAQ answers and upcoming live classes.
 * Quiz `answer` is the index (0-based) of the correct option.
 */
// The 3 questions in the home-page "Try it now" quiz (bilingual).
export const sampleQuiz = [
  {
    topic: { en: 'Physics', bn: 'পদার্থবিজ্ঞান' },
    q: { en: 'A ball is thrown straight up. At its highest point, the acceleration is…', bn: 'একটি বল সোজা উপরে ছোড়া হলো। সর্বোচ্চ বিন্দুতে এর ত্বরণ কত?' },
    options: { en: ['Zero', '9.8 m/s² downward', '9.8 m/s² upward', 'Depends on the speed'], bn: ['শূন্য', '৯.৮ মি/সে² নিচের দিকে', '৯.৮ মি/সে² উপরের দিকে', 'বেগের উপর নির্ভর করে'] },
    answer: 1,
    explain: { en: 'Velocity is zero at the top, but gravity still pulls — acceleration stays g, downward.', bn: 'শীর্ষে বেগ শূন্য, কিন্তু অভিকর্ষ থেমে থাকে না — ত্বরণ g, নিচের দিকে।' },
  },
  {
    topic: { en: 'English', bn: 'ইংরেজি' },
    q: { en: 'Choose the correct sentence.', bn: 'সঠিক বাক্যটি বেছে নিন।' },
    options: { en: ['She don’t like tea.', 'She doesn’t likes tea.', 'She doesn’t like tea.', 'She not like tea.'], bn: ['She don’t like tea.', 'She doesn’t likes tea.', 'She doesn’t like tea.', 'She not like tea.'] },
    answer: 2,
    explain: { en: 'With “doesn’t”, the main verb returns to its base form: like.', bn: '“doesn’t” এর পরে মূল ক্রিয়া মূল রূপে বসে: like।' },
  },
  {
    topic: { en: 'Math', bn: 'গণিত' },
    q: { en: 'If 3x − 7 = 11, what is x?', bn: '৩x − ৭ = ১১ হলে x এর মান কত?' },
    options: { en: ['4', '6', '18', '3'], bn: ['৪', '৬', '১৮', '৩'] },
    answer: 1,
    explain: { en: 'Add 7 to both sides: 3x = 18, so x = 6.', bn: 'উভয় পাশে ৭ যোগ করুন: ৩x = ১৮, তাই x = ৬।' },
  },
];

// FAQ questions (q) and answers (a) in both languages.
export const faqs = [
  { q: { en: 'Can I try a course before paying?', bn: 'টাকা দেওয়ার আগে কি কোর্স দেখা যাবে?' }, a: { en: 'Yes. The first lessons of every course are free to watch, and many courses are free in full.', bn: 'হ্যাঁ। প্রতিটি কোর্সের প্রথম লেসনগুলো ফ্রি, আর অনেক কোর্স পুরোটাই ফ্রি।' } },
  { q: { en: 'How do I pay?', bn: 'কীভাবে পেমেন্ট করব?' }, a: { en: 'You can pay with mobile financial services or a bank card. Payment opens your course instantly.', bn: 'মোবাইল ব্যাংকিং বা ব্যাংক কার্ড দিয়ে পেমেন্ট করা যায়। সাথে সাথে কোর্স খুলে যায়।' } },
  { q: { en: 'Will it work on my phone with slow internet?', bn: 'ধীর ইন্টারনেটে ফোনে চলবে তো?' }, a: { en: 'Videos adapt to your connection, and notes can be downloaded for offline reading.', bn: 'ভিডিও আপনার সংযোগ অনুযায়ী মানিয়ে নেয়, আর নোট অফলাইনে পড়ার জন্য ডাউনলোড করা যায়।' } },
  { q: { en: 'How long do I keep access?', bn: 'কতদিন অ্যাক্সেস থাকবে?' }, a: { en: 'Courses stay in your account until your exam is over — most for a full year, many for life.', bn: 'পরীক্ষা শেষ হওয়া পর্যন্ত কোর্স আপনার অ্যাকাউন্টে থাকে — বেশিরভাগ এক বছর, অনেকগুলো আজীবন।' } },
  { q: { en: 'What if I get stuck on a problem?', bn: 'কোনো সমস্যায় আটকে গেলে?' }, a: { en: 'Post your question with a photo. A mentor replies with a worked solution, usually within a day.', bn: 'ছবিসহ প্রশ্ন পোস্ট করুন। মেন্টর সাধারণত এক দিনের মধ্যে সমাধানসহ উত্তর দেন।' } },
];

// Upcoming live classes (dashboard + home features card).
export const liveClasses = [
  { id: 'lc1', title: { en: 'Projectile motion: problem marathon', bn: 'প্রক্ষেপক গতি: সমস্যা ম্যারাথন' }, mentor: 'farhana', day: { en: 'Today', bn: 'আজ' }, time: '8:30 PM', tone: 'jade' },
  { id: 'lc2', title: { en: 'IELTS speaking: live mock', bn: 'আইইএলটিএস স্পিকিং: লাইভ মক' }, mentor: 'sadia', day: { en: 'Tomorrow', bn: 'আগামীকাল' }, time: '7:00 PM', tone: 'amber' },
  { id: 'lc3', title: { en: 'React state: Q&A session', bn: 'রিঅ্যাক্ট স্টেট: প্রশ্নোত্তর' }, mentor: 'mehedi', day: { en: 'Thu', bn: 'বৃহঃ' }, time: '9:00 PM', tone: 'iris' },
];
