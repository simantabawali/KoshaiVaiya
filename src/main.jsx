/**
 * main.jsx — the starting point of the app (Vite loads this from index.html).
 *
 * It "mounts" React into <div id="root"> and wraps the whole app in providers:
 *   - StrictMode        → React dev-mode checks (runs some code twice in development to catch bugs).
 *   - BrowserRouter     → enables page navigation without full reloads (React Router).
 *   - LanguageProvider  → shares the current language (EN / বাংলা) with every component.
 *   - LearningProvider  → shares the user, enrolled courses and lesson progress.
 * Any component inside can read these with hooks like useLanguage() or useLearning().
 */
// 1) IMPORTS — bring in code from React, the router, our providers and the main App component.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { LearningProvider } from './context/LearningContext.jsx';
import App from './App.jsx';
// Global CSS (colours, fonts, resets). Vite lets us import a CSS file straight from JavaScript.
import './styles/index.css';

// 2) START THE APP — find <div id="root"> in index.html and draw the React app inside it.
// The providers are nested like boxes: everything inside a provider can use what it shares.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <LearningProvider>
          <App />
        </LearningProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);
