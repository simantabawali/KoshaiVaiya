# Beginner guide to the Jonaki code

This guide explains how the project works, step by step. Read it once, then open the files it
points to — every file also has comments at the top and next to the important lines.

---

## 1. Running the project

Open a terminal in the project folder and run:

```bash
npm install     # downloads the libraries listed in package.json (only needed once)
npm run dev     # starts a local server → open http://localhost:5173
```

While `npm run dev` is running, every time you save a file the browser updates by itself.
Press `Ctrl + C` in the terminal to stop it.

To see the site on your phone: `npm run dev -- --host`, then open the "Network" address it prints
(phone and computer must be on the same Wi-Fi).

---

## 2. How a page gets onto the screen

Follow this chain — it is the most important thing to understand:

```
index.html            has an empty <div id="root"> and loads src/main.jsx
   ↓
src/main.jsx          tells React: "draw <App /> inside #root", wrapped in providers
   ↓
src/App.jsx           looks at the URL and picks a layout + a page
   ↓
layouts/MainLayout    draws Header, then the page, then Footer
   ↓
pages/Courses.jsx     the page itself, built from smaller components
   ↓
components/…          small reusable pieces: Button, CourseCard, Quiz …
```

Example: you visit `/courses`.
`App.jsx` has `<Route path="courses" element={<Courses />} />`, so React Router shows the
`Courses` page inside `MainLayout`. The page reads the course list from `data/courses.js`
and draws one `<CourseCard>` for each course.

---

## 3. Where things live

| Folder | What's inside | Example |
| --- | --- | --- |
| `src/pages/` | One file per page (a whole screen) | `Dashboard.jsx` |
| `src/components/` | Reusable pieces used by pages | `ui/Button.jsx`, `course/CourseCard.jsx` |
| `src/layouts/` | The frame around pages (header/footer) | `MainLayout.jsx` |
| `src/context/` | Data shared by the whole app | `LanguageContext.jsx` |
| `src/hooks/` | Reusable logic (custom hooks) | `useScrolled.js` |
| `src/data/` | Sample data and all UI text | `courses.js`, `locales/en.js` |
| `src/styles/` | Global CSS: colours, fonts, resets | `tokens.css` |
| `src/utils/` | Small helper functions | `format.js` |

Each component usually has a CSS file with the same name next to it
(`Button.jsx` + `Button.css`).

---

## 4. React ideas used in this project (with real examples)

### Component
A function that returns what to show. Its name starts with a capital letter.
```jsx
export default function NotFound() {
  return <h1>This page wandered off</h1>;
}
```
→ see `pages/NotFound.jsx`

### JSX
HTML-like code inside JavaScript. Differences from HTML:
- `className` instead of `class`
- `{ }` puts JavaScript inside: `<p>{course.price}</p>`
- comments inside JSX are written `{/* like this */}`

### Props (inputs to a component)
Like function arguments. The parent passes them, the child reads them.
```jsx
<Button variant="primary" to="/signup">Start free</Button>   // parent
export default function Button({ variant, to, children }) {…} // child
```
`children` = whatever you put between the opening and closing tags. → `components/ui/Button.jsx`

### State — `useState`
A value the component remembers. Changing it re-draws the component.
```jsx
const [open, setOpen] = useState(false);   // starts false
<button onClick={() => setOpen(true)}>Menu</button>
```
→ the phone menu in `components/layout/Header.jsx`, the quiz in `components/learn/Quiz.jsx`

### Showing things conditionally
```jsx
{user ? <Avatar /> : <Button>Log in</Button>}   // if / else
{course.badge && <span>Bestseller</span>}       // only if badge exists
```

### Lists — `.map()` and `key`
```jsx
{courses.map((course) => <CourseCard key={course.slug} course={course} />)}
```
`key` must be unique; React uses it to track which item is which. → `pages/Courses.jsx`

### Events
`onClick`, `onChange`, `onSubmit` take a function. In forms we call `e.preventDefault()` so the
browser doesn't reload the page. → `pages/Auth.jsx`

### Effects — `useEffect`
Code that runs *after* the component is drawn, e.g. to talk to the browser.
```jsx
useEffect(() => {
  document.title = 'Courses';      // runs when `title` changes
}, [title]);                       // ← the "dependency list"
```
If the effect returns a function, React runs it to clean up (remove listeners, stop timers).
→ `hooks/useScrolled.js`, the timer in `components/learn/VideoPlayer.jsx`

### Refs — `useRef`
A box that holds a real HTML element (or any value) without causing re-draws.
→ `hooks/useReveal.js`

### Custom hooks
Your own functions starting with `use` that bundle hooks together and can be reused.
→ `useScrolled`, `useReveal`, `useLockBody`, `useDocumentTitle` in `src/hooks/`

### Context (sharing data everywhere)
Instead of passing props through every level, a Provider shares data and any component reads it.
```jsx
const { t, lang } = useLanguage();          // text + current language
const { user, enroll } = useLearning();     // user + learning progress
```
→ `context/LanguageContext.jsx`, `context/LearningContext.jsx`

### Routing (React Router)
- `<Link to="/courses">` — go to a page without reloading
- `useParams()` — read parts of the URL, e.g. `:slug` → `pages/CourseDetail.jsx`
- `useSearchParams()` — read `?q=ielts&cat=tech` → `pages/Courses.jsx`
- `useNavigate()` — change page from code (after login) → `pages/Auth.jsx`
- `<Navigate>` — redirect → `pages/Learn.jsx`

### `useMemo` and `useCallback` (performance helpers)
They remember a calculated value / a function until its inputs change, so React doesn't redo
work on every draw. You can ignore them at first — the app would work without them.

---

## 5. How the styling works

- **Design tokens** — all colours, font sizes, spacing and corner radii are CSS variables in
  `styles/tokens.css`. Use them like `color: var(--jade-600);`. Change one value there and the
  whole site updates.
- **One CSS file per component** — `CourseCard.jsx` imports `CourseCard.css`.
- **Class names** follow `block__element` and `block--variant`:
  `.course-card` (block) → `.course-card__title` (part of it) → `.btn--primary` (a variant).
  `is-…` classes are states added by React, e.g. `.is-open`, `.is-active`.
- **Responsive design** — `@media (max-width: 960px) { … }` blocks change the layout on tablets
  and phones. Search a CSS file for `@media` to see what changes on small screens.
- **Animations** — plain CSS `transition` and `@keyframes`. Elements with the `reveal` class fade
  in when scrolled into view (the `<Reveal>` component adds `is-visible`).

---

## 6. Common changes (recipes)

**Change some text** → open `src/data/locales/en.js` (English) and `bn.js` (Bangla), find the
key (e.g. `'hero.sub'`) and edit the text. Components never contain the text directly.

**Add new text** → add the same key to both `en.js` and `bn.js`, then use it in a component:
`{t('my.new.key')}`.

**Add a course** → copy one course object in `src/data/courses.js` (inside `raw = [ … ]`),
give it a new unique `slug`, and change the fields. Lesson ids and totals are created for you.

**Change the main colour** → in `src/styles/tokens.css` change `--jade-600` (and its lighter/
darker neighbours). For the yellow highlight change `--amber-400`.

**Add a new page**
1. Create `src/pages/About.jsx`:
   ```jsx
   export default function About() {
     return <section className="section"><div className="container"><h1>About us</h1></div></section>;
   }
   ```
2. In `src/App.jsx` add `const About = lazy(() => import('./pages/About.jsx'));`
   and inside the MainLayout routes: `<Route path="about" element={<About />} />`
3. Link to it anywhere: `<Link to="/about">About</Link>`

**Add a section to the home page** → create a component in `src/components/home/`, then add it
to the list in `src/pages/Home.jsx`.

---

## 7. When something goes wrong

- **Look at the terminal** running `npm run dev` and the **browser console** (F12 → Console).
  Error messages include the file name and line number.
- Install the **React Developer Tools** browser extension to see components, props and state.
- Progress and login are saved in the browser. To reset them: F12 → Application →
  Local Storage → delete the `jonaki:…` entries, then refresh.
- If the page is blank after an edit, you probably have a typo in JSX (a missing `}` or `)`, or
  an unclosed tag). The terminal will point to the line.

---

## 8. Suggested reading order

1. `src/main.jsx` → `src/App.jsx` → `src/layouts/MainLayout.jsx`  (how pages are shown)
2. `src/components/ui/Button.jsx`  (props and a simple reusable component)
3. `src/components/home/Faq.jsx`  (useState + lists + a child component)
4. `src/context/LanguageContext.jsx`  (context and how translation works)
5. `src/pages/Courses.jsx`  (filtering, URL parameters, useMemo)
6. `src/components/learn/Quiz.jsx`  (a component with several pieces of state)
7. `src/pages/Learn.jsx` + `src/components/learn/VideoPlayer.jsx`  (effects, timers, redirects)
8. `src/context/LearningContext.jsx`  (where all progress is stored)

Try small experiments as you read: change a text, a colour or a number, save, and watch the
browser update. That is the fastest way to learn how each part works.
