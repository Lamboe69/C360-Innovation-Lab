import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { photos } from '../data/media.js';
import AuthTopBar from './AuthTopBar.jsx';
import './authChamber.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('c360_users') || '{}');
  } catch {
    return {};
  }
}

function saveSession({ name, email }) {
  localStorage.setItem('c360_logged_in', 'true');
  localStorage.setItem('c360_username', name);
  localStorage.setItem('c360_email', email);
  localStorage.removeItem('c360_role');
}

function Chronograph({ mode, progress, focused }) {
  const isLogin = mode === 'login';
  const angle = progress * 270;
  const spin = 18 + progress * 42;

  return (
    <div
      className={`auth-chrono${focused ? ' is-focused' : ''}`}
      style={{
        '--auth-progress': progress,
        '--auth-angle': `${angle}deg`,
        '--auth-spin': `${spin}s`,
      }}
      aria-hidden="true"
    >
      <div className="auth-chrono-halo" />
      <div className="auth-chrono-ring auth-chrono-ring-a" />
      <div className="auth-chrono-ring auth-chrono-ring-b" />
      <div className="auth-chrono-ring auth-chrono-ring-c" />
      <svg className="auth-chrono-ticks" viewBox="0 0 320 320">
        {Array.from({ length: 60 }, (_, i) => {
          const a = (i / 60) * Math.PI * 2;
          const outer = 148;
          const inner = i % 5 === 0 ? 128 : 138;
          return (
            <line
              key={i}
              x1={160 + Math.cos(a) * inner}
              y1={160 + Math.sin(a) * inner}
              x2={160 + Math.cos(a) * outer}
              y2={160 + Math.sin(a) * outer}
              className={i % 5 === 0 ? 'major' : 'minor'}
            />
          );
        })}
        <circle className="auth-chrono-track" cx="160" cy="160" r="118" />
        <circle
          className="auth-chrono-arc"
          cx="160"
          cy="160"
          r="118"
          style={{ strokeDashoffset: 742 - 742 * progress }}
        />
      </svg>
      <div className="auth-chrono-core">
        <span className="auth-chrono-brand">C360</span>
        <strong>{isLogin ? 'INGRESS' : 'GENESIS'}</strong>
        <em>{Math.round(progress * 100).toString().padStart(2, '0')}%</em>
      </div>
      <div className="auth-chrono-needle" />
      <div className="auth-chrono-orbit">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export default function AuthPage({ mode }) {
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focused, setFocused] = useState('');
  const [clock, setClock] = useState(() => new Date());

  useEffect(() => {
    document.title = isLogin ? 'Login - C360 Innovation Lab' : 'Sign Up - C360 Innovation Lab';
  }, [isLogin]);

  useEffect(() => {
    const html = document.documentElement;
    const { body } = document;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyHeight = body.style.height;

    html.style.overflow = '';
    body.style.overflow = '';
    body.style.overflowY = 'auto';
    body.style.height = 'auto';
    body.classList.add('auth-page-active');

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.overflowY = '';
      body.style.height = prevBodyHeight;
      body.classList.remove('auth-page-active');
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setClock(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const progress = useMemo(() => {
    if (isLogin) {
      let score = 0;
      if (EMAIL_RE.test(form.email.trim())) score += 0.5;
      if (form.password.length >= 8) score += 0.5;
      return score;
    }
    const checks = [
      form.firstName.trim(),
      form.lastName.trim(),
      form.username.trim(),
      EMAIL_RE.test(form.email.trim()),
      form.password.length >= 8,
      form.confirmPassword && form.confirmPassword === form.password,
      form.terms,
    ];
    return checks.filter(Boolean).length / checks.length;
  }, [form, isLogin]);

  const stamp = useMemo(() => {
    const hh = String(clock.getHours()).padStart(2, '0');
    const mm = String(clock.getMinutes()).padStart(2, '0');
    const ss = String(clock.getSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }, [clock]);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm(current => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setErrors(current => ({ ...current, [name]: '' }));
    setFormError('');
  }

  function continueWithProvider(provider) {
    setFormError(`${provider} sign-in is coming soon. Please use email to continue.`);
  }

  function validateLogin() {
    const nextErrors = {};
    if (!EMAIL_RE.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    return nextErrors;
  }

  function validateRegister() {
    const nextErrors = validateLogin();
    if (!form.firstName.trim()) nextErrors.firstName = 'Enter your first name.';
    if (!form.lastName.trim()) nextErrors.lastName = 'Enter your last name.';
    if (!form.username.trim()) nextErrors.username = 'Choose a username.';
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match.';
    if (!form.terms) nextErrors.terms = 'You must agree to continue.';
    return nextErrors;
  }

  async function handleLogin(event) {
    event.preventDefault();
    const nextErrors = validateLogin();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    const users = getUsers();
    const user = users[form.email.trim()];
    const passwordHash = await hashPassword(form.password);
    if (!user || user.password !== passwordHash) {
      setFormError('Incorrect email or password. Please try again.');
      setIsSubmitting(false);
      return;
    }

    saveSession({ name: user.name, email: form.email.trim() });
    setTimeout(() => navigate(redirectTo), 500);
  }

  async function handleRegister(event) {
    event.preventDefault();
    const nextErrors = validateRegister();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);
    const email = form.email.trim();
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const username = form.username.trim();
    const users = getUsers();
    const passwordHash = await hashPassword(form.password);
    users[email] = {
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      username,
      email,
      password: passwordHash,
    };
    localStorage.setItem('c360_users', JSON.stringify(users));
    navigate('/login');
    setIsSubmitting(false);
  }

  const planeSrc = isLogin
    ? photos.c360ShirtsWalk
    : photos.armsRaisedDrone;

  return (
    <div className={`auth-chamber auth-chamber--${isLogin ? 'ingress' : 'genesis'}`}>
      <AuthTopBar mode={mode} />

      <div className="auth-chamber-plane" aria-hidden="true">
        <img src={planeSrc} alt="" className="auth-chamber-photo" />
        <div className="auth-chamber-veil" />
        <div className="auth-chamber-grid" />
        <div className="auth-chamber-scan" />
        <div className="auth-chamber-noise" />
      </div>

      <main className="auth-chamber-stage">
        <header className="auth-chamber-brand">
          <p className="auth-chamber-coord">
            <span>LAB · ACCESS</span>
            <span>{isLogin ? 'CHAMBER 01' : 'CHAMBER 02'}</span>
            <span>{stamp}</span>
          </p>
          <p className="auth-chamber-mark">C360</p>
          <h1>
            {isLogin ? (
              <>
                Return to
                <br />
                the signal.
              </>
            ) : (
              <>
                Open your
                <br />
                origin lane.
              </>
            )}
          </h1>
          <p className="auth-chamber-lede">
            {isLogin
              ? 'Re-enter C360 — your lab, AI Career Platform membership, network links, and projects wait on the other side.'
              : 'Create one identity for C360 Labs, the premium AI Career Platform, the Global Network, and Projects.'}
          </p>

          <ul className="auth-chamber-signals">
            {(isLogin
              ? ['Resume your lab', 'Career Platform access', 'Network & projects']
              : ['Join a C360 Lab', 'Unlock Career Platform', 'Enter the network']
            ).map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item}
              </li>
            ))}
          </ul>
        </header>

        <div className="auth-chamber-instrument">
          <Chronograph mode={mode} progress={progress} focused={Boolean(focused)} />
          <div className="auth-chamber-meter">
            <span>FIELD INTEGRITY</span>
            <div className="auth-chamber-meter-track">
              <i style={{ width: `${progress * 100}%` }} />
            </div>
            <span>{isLogin ? 'LOCK SEQUENCE' : 'FORGE SEQUENCE'}</span>
          </div>
        </div>

        <section className={`auth-rail${isSubmitting ? ' is-busy' : ''}`} aria-label={isLogin ? 'Login form' : 'Registration form'}>
          <div className="auth-rail-head">
            <div className="auth-rail-mode" role="tablist" aria-label="Auth mode">
              <Link to="/login" className={isLogin ? 'is-active' : undefined} role="tab" aria-selected={isLogin}>
                Ingress
              </Link>
              <Link to="/register" className={!isLogin ? 'is-active' : undefined} role="tab" aria-selected={!isLogin}>
                Genesis
              </Link>
            </div>
            <p className="auth-rail-kicker">{isLogin ? 'Welcome back' : 'Create identity'}</p>
          </div>

          <div className="auth-rail-providers">
            <button type="button" className="auth-rail-provider" onClick={() => continueWithProvider('Google')}>
              <span className="google-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.37c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.37 12 5.37z" />
                </svg>
              </span>
              Google
            </button>
            <button type="button" className="auth-rail-provider" onClick={() => continueWithProvider('Apple')}>
              <span aria-hidden="true"></span>
              Apple
            </button>
          </div>

          <div className="auth-rail-split">
            <span>or transmit by email</span>
          </div>

          {formError && <div className="auth-rail-alert" role="alert">{formError}</div>}

          <form className="auth-rail-form" onSubmit={isLogin ? handleLogin : handleRegister} noValidate>
            {!isLogin && (
              <div className="auth-rail-pair">
                <label className={`auth-slot${errors.firstName ? ' is-invalid' : ''}${focused === 'firstName' ? ' is-live' : ''}`}>
                  <span>First name</span>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={updateField}
                    onFocus={() => setFocused('firstName')}
                    onBlur={() => setFocused('')}
                    placeholder="Jane"
                    autoComplete="given-name"
                  />
                  {errors.firstName && <em>{errors.firstName}</em>}
                </label>
                <label className={`auth-slot${errors.lastName ? ' is-invalid' : ''}${focused === 'lastName' ? ' is-live' : ''}`}>
                  <span>Last name</span>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={updateField}
                    onFocus={() => setFocused('lastName')}
                    onBlur={() => setFocused('')}
                    placeholder="Doe"
                    autoComplete="family-name"
                  />
                  {errors.lastName && <em>{errors.lastName}</em>}
                </label>
              </div>
            )}

            {!isLogin && (
              <label className={`auth-slot${errors.username ? ' is-invalid' : ''}${focused === 'username' ? ' is-live' : ''}`}>
                <span>Username</span>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={updateField}
                  onFocus={() => setFocused('username')}
                  onBlur={() => setFocused('')}
                  placeholder="janedoe"
                  autoComplete="username"
                />
                {errors.username && <em>{errors.username}</em>}
              </label>
            )}

            <label className={`auth-slot${errors.email ? ' is-invalid' : ''}${focused === 'email' ? ' is-live' : ''}`}>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && <em>{errors.email}</em>}
            </label>

            <label className={`auth-slot${errors.password ? ' is-invalid' : ''}${focused === 'password' ? ' is-live' : ''}`}>
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={updateField}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused('')}
                placeholder={isLogin ? 'Enter password' : 'Create password'}
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />
              {errors.password && <em>{errors.password}</em>}
              {!isLogin && (
                <div className="auth-freq" aria-hidden="true">
                  <i style={{ width: `${Math.min(form.password.length / 12, 1) * 100}%` }} />
                </div>
              )}
            </label>

            {!isLogin && (
              <label className={`auth-slot${errors.confirmPassword ? ' is-invalid' : ''}${focused === 'confirmPassword' ? ' is-live' : ''}`}>
                <span>Confirm</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={updateField}
                  onFocus={() => setFocused('confirmPassword')}
                  onBlur={() => setFocused('')}
                  placeholder="Repeat password"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && <em>{errors.confirmPassword}</em>}
              </label>
            )}

            {!isLogin && (
              <label className={`auth-terms${errors.terms ? ' is-invalid' : ''}`}>
                <input type="checkbox" name="terms" checked={form.terms} onChange={updateField} />
                <span>
                  I agree to the <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.
                </span>
              </label>
            )}

            {isLogin && (
              <p className="auth-rail-help">
                Forgot password? <Link to="/contact">Contact support</Link>
              </p>
            )}

            <button type="submit" className="auth-rail-submit" disabled={isSubmitting}>
              <span>{isSubmitting ? (isLogin ? 'Opening aperture…' : 'Forging identity…') : (isLogin ? 'Enter Chamber' : 'Seal Identity')}</span>
              <i aria-hidden="true" />
            </button>
          </form>

          <p className="auth-rail-switch">
            {isLogin ? 'New to the lab?' : 'Already inside?'}{' '}
            <Link to={isLogin ? '/register' : '/login'}>
              {isLogin ? 'Begin genesis' : 'Return via ingress'}
            </Link>
          </p>

          <nav className="auth-rail-links" aria-label="Helpful links">
            {(isLogin
              ? [
                  ['C360 Labs', '/labs'],
                  ['Career Platform', '/career'],
                  ['Home', '/'],
                ]
              : [
                  ['Labs', '/labs'],
                  ['Projects', '/projects'],
                  ['About', '/about'],
                  ['Home', '/'],
                ]
            ).map(([label, to], index, list) => (
              <React.Fragment key={to}>
                <Link to={to}>{label}</Link>
                {index < list.length - 1 && <span aria-hidden="true">/</span>}
              </React.Fragment>
            ))}
          </nav>
        </section>
      </main>
    </div>
  );
}
