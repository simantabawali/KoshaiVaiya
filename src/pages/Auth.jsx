/**
 * Auth page — log in and sign up share this one component (mode="login" | "signup").
 *
 * Form handling: one `form` state object, set('field') returns an onChange handler for that field,
 * validate() returns an errors object, and errors are shown under each input.
 * Accepts an email or a Bangladeshi mobile number (01XXXXXXXXX, optional +88).
 * There is no server yet: after a short fake delay it "logs in" through LearningContext and opens
 * the dashboard. Replace the setTimeout with a real API call later.
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock, Mail, Target, User } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Logo from '../components/ui/Logo.jsx';
import LanguageSwitch from '../components/ui/LanguageSwitch.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useLearning } from '../context/LearningContext.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { categories } from '../data/catalog.js';
import { cn } from '../utils/format.js';
import '../components/ui/Field.css';
import './Auth.css';

// Regular expressions (text patterns) used to check the email and phone formats.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(\+?88)?01[3-9]\d{8}$/;

// Reusable labelled input with an icon, an optional trailing button and an error message.
function Field({ id, label, icon: Icon, error, trail, ...input }) {
  return (
    <div className={cn('field', error && 'has-error')}>
      <label htmlFor={id} className="field__label">{label}</label>
      <div className="field__control">
        <Icon size={18} className="field__icon" aria-hidden="true" />
        <input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...input} />
        {trail}
      </div>
      {error && <p id={`${id}-err`} className="field__error" role="alert">{error}</p>}
    </div>
  );
}

export default function Auth({ mode }) {
  // One component, two modes: log in or sign up.
  const isSignup = mode === 'signup';
  const { t, p } = useLanguage();
  const { login } = useLearning();
  const navigate = useNavigate();
  useDocumentTitle(isSignup ? t('nav.signup') : t('nav.login'));

  // All form fields kept together in one state object.
  const [form, setForm] = useState({ name: '', email: '', password: '', goal: 'school', remember: true });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // set('email') returns a change handler for the email field.
  // Checkboxes use e.target.checked; other inputs use e.target.value. Typing clears that field's error.
  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  // Check every field and collect messages in an object, e.g. { email: 'Enter a valid email…' }.
  const validate = () => {
    const next = {};
    if (isSignup && form.name.trim().length < 2) next.name = t('auth.err.name');
    const id = form.email.trim().replace(/[\s-]/g, '');
    if (!EMAIL_RE.test(id) && !PHONE_RE.test(id)) next.email = t('auth.err.email');
    if (form.password.length < 6) next.password = t('auth.err.password');
    return next;
  };

  // Runs when the form is submitted: validate, then pretend to log in.
  const submit = (e) => {
        // Stop the browser's default behaviour (reloading the page).
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;
    setSubmitting(true);
    window.setTimeout(() => {
      const fallbackName = form.email.includes('@') ? form.email.split('@')[0] : 'Learner';
      login({ name: isSignup ? form.name.trim() : fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1), email: form.email.trim(), goal: form.goal });
      navigate('/dashboard');
    }, 700);
  };

  return (
    <div className="auth">
      <div className="auth__form-side">
        <div className="auth__top">
          <Logo />
          <LanguageSwitch />
        </div>

        {/* noValidate: we show our own error messages instead of the browser's pop-ups. */}
        <form className="auth__form" onSubmit={submit} noValidate>
          <Link to="/" className="auth__back"><ArrowLeft size={16} aria-hidden="true" />Jonaki</Link>
          <h1>{isSignup ? t('auth.signup.t') : t('auth.login.t')}</h1>
          <p className="auth__sub">{isSignup ? t('auth.signup.s') : t('auth.login.s')}</p>

          <div className="auth__fields">
            {isSignup && (
              <Field id="name" label={t('auth.name')} icon={User} value={form.name} onChange={set('name')} autoComplete="name" error={errors.name} />
            )}
            <Field id="email" label={t('auth.email')} icon={Mail} value={form.email} onChange={set('email')} autoComplete="username" inputMode="email" placeholder="you@example.com" error={errors.email} />
            <Field
              id="password" label={t('auth.password')} icon={Lock} type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')}
              autoComplete={isSignup ? 'new-password' : 'current-password'} error={errors.password}
              trail={(
                <button type="button" className="field__trail" onClick={() => setShowPw((s) => !s)} aria-label={showPw ? t('auth.hide') : t('auth.show')}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            />
            {isSignup && (
              <div className="field">
                <label htmlFor="goal" className="field__label">{t('auth.goal')}</label>
                <div className="field__control">
                  <Target size={18} className="field__icon" aria-hidden="true" />
                  <select id="goal" value={form.goal} onChange={set('goal')}>
                    {categories.map((c) => <option key={c.id} value={c.id}>{p(c.label)}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>

          {!isSignup && (
            <div className="auth__row">
              <label className="auth__check">
                <input type="checkbox" checked={form.remember} onChange={set('remember')} />
                <span>{t('auth.remember')}</span>
              </label>
              <a href="#forgot" className="auth__link" onClick={(e) => e.preventDefault()}>{t('auth.forgot')}</a>
            </div>
          )}

          <Button type="submit" size="lg" block icon={submitting ? undefined : ArrowRight} disabled={submitting} className={cn(submitting && 'is-loading')}>
            {submitting ? <span className="auth__spinner" aria-label="Loading" /> : (isSignup ? t('auth.signupBtn') : t('auth.loginBtn'))}
          </Button>

          <p className="auth__switch">
            {isSignup ? t('auth.haveAccount') : t('auth.noAccount')}{' '}
            <Link to={isSignup ? '/login' : '/signup'} className="auth__link">{isSignup ? t('nav.login') : t('nav.signup')}</Link>
          </p>
          {isSignup && <p className="auth__terms">{t('auth.terms')}</p>}
        </form>
      </div>

      {/* Decorative right panel (hidden on phones by CSS). */}
      <aside className="auth__panel grain" aria-hidden="true">
        <span className="auth__orb" />
        <div className="auth__panel-inner">
          <span className="auth__quote-mark">“</span>
          <blockquote>{t('auth.panel.quote')}</blockquote>
          <p>{t('auth.panel.sub')}</p>
          <div className="auth__faces">
            {['Farhana Rahman', 'Sadia Islam', 'Tanvir Hasan', 'Mehedi Hasan', 'Nusrat Jahan'].map((nm, i) => (
              <Avatar key={nm} name={nm} tone={['jade', 'amber', 'iris', 'clay', 'jade'][i]} size={44} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
