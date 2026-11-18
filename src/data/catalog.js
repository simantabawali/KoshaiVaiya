/**
 * catalog.js — sample data for categories (learning paths), mentors and home-page numbers.
 * Text that appears in both languages is stored as { en: '…', bn: '…' } and read with p() from
 * useLanguage(). `tone` picks a colour family (jade / amber / clay / iris — see styles/tones.css).
 * `icon` is the name of a Lucide icon mapped in components/ui/Icon.jsx.
 * NOTE: names and numbers here are placeholders — replace with real data before launch.
 */

// Learning paths: shown on the home page and as filter chips in the catalogue.
export const categories = [
  { id: 'school', icon: 'BookOpen', tone: 'jade', label: { en: 'SSC & HSC', bn: 'এসএসসি ও এইচএসসি' }, blurb: { en: 'Board-exam ready science, math and humanities.', bn: 'বোর্ড পরীক্ষার জন্য বিজ্ঞান, গণিত ও মানবিক।' } },
  { id: 'admission', icon: 'GraduationCap', tone: 'iris', label: { en: 'Admission', bn: 'ভর্তি প্রস্তুতি' }, blurb: { en: 'University, medical and engineering admission.', bn: 'বিশ্ববিদ্যালয়, মেডিকেল ও ইঞ্জিনিয়ারিং ভর্তি।' } },
  { id: 'jobs', icon: 'Briefcase', tone: 'clay', label: { en: 'Job prep', bn: 'চাকরি প্রস্তুতি' }, blurb: { en: 'BCS, bank and government job preparation.', bn: 'বিসিএস, ব্যাংক ও সরকারি চাকরির প্রস্তুতি।' } },
  { id: 'language', icon: 'Languages', tone: 'amber', label: { en: 'Languages', bn: 'ভাষা' }, blurb: { en: 'IELTS, spoken English and confident writing.', bn: 'আইইএলটিএস, স্পোকেন ইংলিশ ও লেখা।' } },
  { id: 'tech', icon: 'Code2', tone: 'iris', label: { en: 'Tech skills', bn: 'টেক দক্ষতা' }, blurb: { en: 'Web development, programming and data.', bn: 'ওয়েব ডেভেলপমেন্ট, প্রোগ্রামিং ও ডেটা।' } },
  { id: 'design', icon: 'PenTool', tone: 'jade', label: { en: 'Design & business', bn: 'ডিজাইন ও ব্যবসা' }, blurb: { en: 'UI/UX, freelancing and digital marketing.', bn: 'ইউআই/ইউএক্স, ফ্রিল্যান্সিং ও মার্কেটিং।' } },
];

// Mentors stored by id, so a course can point to one with mentor: 'sadia'.
export const mentors = {
  farhana: { id: 'farhana', name: 'Dr. Farhana Rahman', role: { en: 'Physics mentor · PhD in Physics', bn: 'পদার্থবিজ্ঞান মেন্টর · পিএইচডি' }, bio: { en: 'Twelve years of turning formulas into intuition. Known for drawing every problem before solving it.', bn: 'বারো বছর ধরে সূত্রকে সহজ বোধে পরিণত করছেন। প্রতিটি সমস্যা আগে এঁকে বোঝান।' }, learners: 41200, courses: 4, rating: 4.9, tone: 'jade' },
  tanvir: { id: 'tanvir', name: 'Tanvir Hasan', role: { en: 'Mathematics mentor', bn: 'গণিত মেন্টর' }, bio: { en: 'Makes algebra feel like a puzzle game. Former olympiad trainer for school students.', bn: 'বীজগণিতকে ধাঁধার খেলার মতো করে তোলেন। সাবেক অলিম্পিয়াড প্রশিক্ষক।' }, learners: 38900, courses: 3, rating: 4.8, tone: 'amber' },
  nusrat: { id: 'nusrat', name: 'Nusrat Jahan', role: { en: 'Admission strategist', bn: 'ভর্তি কৌশলবিদ' }, bio: { en: 'Coaches students on speed, accuracy and calm under exam pressure.', bn: 'গতি, নির্ভুলতা আর পরীক্ষার চাপে শান্ত থাকার কৌশল শেখান।' }, learners: 19400, courses: 2, rating: 4.9, tone: 'iris' },
  arif: { id: 'arif', name: 'Arif Mahmud', role: { en: 'Civil service exam trainer', bn: 'সিভিল সার্ভিস পরীক্ষা প্রশিক্ষক' }, bio: { en: 'Breaks the huge BCS syllabus into a daily routine you can actually follow.', bn: 'বিশাল বিসিএস সিলেবাসকে মেনে চলা যায় এমন দৈনিক রুটিনে ভাগ করেন।' }, learners: 27300, courses: 3, rating: 4.7, tone: 'clay' },
  sadia: { id: 'sadia', name: 'Sadia Islam', role: { en: 'IELTS & English coach', bn: 'আইইএলটিএস ও ইংরেজি কোচ' }, bio: { en: 'Helps learners think in English rather than translate — the fastest path to fluency.', bn: 'অনুবাদ নয়, ইংরেজিতে ভাবতে শেখান — সাবলীলতার দ্রুততম পথ।' }, learners: 52800, courses: 2, rating: 4.9, tone: 'amber' },
  mehedi: { id: 'mehedi', name: 'Mehedi Hasan', role: { en: 'Software engineer', bn: 'সফটওয়্যার ইঞ্জিনিয়ার' }, bio: { en: 'Builds products for global clients and teaches the way real teams ship code.', bn: 'বিদেশি ক্লায়েন্টদের জন্য প্রোডাক্ট বানান, বাস্তব দলের মতো করে কোড শেখান।' }, learners: 15600, courses: 2, rating: 4.8, tone: 'iris' },
  ayesha: { id: 'ayesha', name: 'Ayesha Siddiqua', role: { en: 'Data analyst', bn: 'ডেটা অ্যানালিস্ট' }, bio: { en: 'Turns messy spreadsheets into clear decisions. Loves a good chart.', bn: 'এলোমেলো ডেটাকে পরিষ্কার সিদ্ধান্তে রূপ দেন।' }, learners: 9100, courses: 1, rating: 4.7, tone: 'jade' },
  rafiq: { id: 'rafiq', name: 'Rafiq Chowdhury', role: { en: 'Product designer', bn: 'প্রোডাক্ট ডিজাইনার' }, bio: { en: 'Designs apps used by millions and mentors freelancers starting their careers.', bn: 'লাখো মানুষের ব্যবহৃত অ্যাপ ডিজাইন করেন, নতুন ফ্রিল্যান্সারদের গাইড করেন।' }, learners: 17800, courses: 2, rating: 4.6, tone: 'clay' },
};

// Numbers shown in the home hero (placeholders).
export const heroStats = { learners: '120k+', mentors: '80+', completion: '87%' };

// Quick search links under the hero search box.
export const popularSearches = ['HSC Physics', 'IELTS', 'BCS', 'React'];
