import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthTopBar from './AuthTopBar.jsx';
import CustomCursor from './CustomCursor.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem('c360_users') || '{}');
  } catch {
    return {};
  }
}

function saveDemoSession({ name, email }) {
  localStorage.setItem('c360_logged_in', 'true');
  localStorage.setItem('c360_username', name);
  localStorage.setItem('c360_email', email);
  localStorage.removeItem('c360_role');
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
  const [createdEmail, setCreatedEmail] = useState('');

  useEffect(() => {
    document.title = isLogin ? 'Login - C360 Innovation Lab' : 'Sign Up - C360 Innovation Lab';
  }, [isLogin]);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm(current => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setErrors(current => ({ ...current, [name]: '' }));
    setFormError('');
  }

  function continueWithProvider(provider) {
    if (!isLogin) {
      navigate('/login');
      return;
    }

    const name = provider === 'Google' ? 'Google User' : 'Apple User';
    const email = `${provider.toLowerCase()}@c360.local`;
    saveDemoSession({ name, email });
    navigate(redirectTo);
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

  function handleLogin(event) {
    event.preventDefault();
    const nextErrors = validateLogin();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (form.email.trim().toLowerCase() === 'david@gmail.com') {
      setIsSubmitting(true);
      saveDemoSession({ name: 'David', email: 'david@gmail.com' });
      setTimeout(() => navigate('/dashboard'), 500);
      return;
    }

    const users = getUsers();
    const user = users[form.email.trim()];
    if (!user || user.password !== form.password) {
      setFormError('Incorrect email or password. Please try again.');
      return;
    }

    setIsSubmitting(true);
    saveDemoSession({ name: user.name, email: form.email.trim() });
    setTimeout(() => navigate(redirectTo), 500);
  }

  function handleRegister(event) {
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
    users[email] = {
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      username,
      email,
      password: form.password,
    };
    localStorage.setItem('c360_users', JSON.stringify(users));
    navigate('/login');
    setIsSubmitting(false);
  }

  return (
    <div className="auth-page-shell">
      <CustomCursor />
      <AuthTopBar mode={mode} />

      <main className="auth-main">
        <aside className="auth-visual-panel">
          <div className="auth-visual-art">
            <img
              className="human-photo human-photo-main"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
              alt="Young people collaborating around a laptop"
            />
            <img
              className="human-photo human-photo-top"
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=420&q=80"
              alt="Mentor working with young innovators"
            />
            <img
              className="human-photo human-photo-bottom"
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=420&q=80"
              alt="A group of smiling young people"
            />
            <div className="visual-card visual-card-main">
              <div className="visual-card-icon">{isLogin ? '🚀' : '💡'}</div>
              <div>
                <span>{isLogin ? 'Welcome Back' : 'New Journey'}</span>
                <strong>{isLogin ? 'Continue building' : 'Start innovating'}</strong>
              </div>
            </div>
            <div className="visual-card visual-card-top">
              <span>Clubs</span>
              <strong>40+</strong>
            </div>
            <div className="visual-card visual-card-bottom">
              <span>Mentors</span>
              <strong>80+</strong>
            </div>
            <div className="visual-orbit visual-orbit-one" />
            <div className="visual-orbit visual-orbit-two" />
          </div>

          <div className="auth-benefits-panel">
            <div className="auth-benefits-badge">{isLogin ? 'Member Access' : 'Individual Access'}</div>
            <h2>{isLogin ? 'Pick up where you left off.' : 'Start building with C360.'}</h2>
            <p>
              {isLogin
                ? 'Access your programs, saved resources, mentorship sessions, and innovation community from one personal dashboard.'
                : 'Create one personal account for clubs, mentorship, resources, and program applications.'}
            </p>
            <div className="auth-benefits-list">
              <div><span>01</span> {isLogin ? 'Resume applications and learning' : 'Save resources and applications'}</div>
              <div><span>02</span> {isLogin ? 'Check club and program updates' : 'Join clubs and innovation programs'}</div>
              <div><span>03</span> {isLogin ? 'Connect with mentors and peers' : 'Connect with mentors and peers'}</div>
            </div>
          </div>
        </aside>

        <div className="auth-section-divider" aria-hidden="true" />

        <section className={`auth-card${!isLogin ? ' signup-card' : ''}`}>
          {createdEmail ? (
            <div className="confirm-screen show">
              <div className="confirm-icon">✉️</div>
              <h2>Check Your Email</h2>
              <p>
                We sent a verification link to <strong>{createdEmail}</strong>. Click the link to activate your account.
              </p>
              <Link to="/login" className="btn-back">
                Continue to Login →
              </Link>
            </div>
          ) : (
            <>
              <div className="auth-card-tag">{isLogin ? 'Welcome Back' : 'Individual Account'}</div>
              <h1>{isLogin ? 'Login' : 'Create your account'}</h1>
              <p className="auth-card-sub">
                {isLogin
                  ? 'Sign in to your individual C360 Innovation Lab account.'
                  : 'Sign up as an individual to access programs, clubs, mentorship, and resources.'}
              </p>

              <div className="social-auth-grid">
                <button type="button" className="social-auth-btn google" onClick={() => continueWithProvider('Google')}>
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
                <button type="button" className="social-auth-btn apple" onClick={() => continueWithProvider('Apple')}>
                  <span></span>
                  Apple
                </button>
              </div>

              <div className="auth-divider">
                <span>or use email</span>
              </div>

              {formError && <div className="alert-error show">{formError}</div>}

              <form className={!isLogin ? 'signup-form' : undefined} onSubmit={isLogin ? handleLogin : handleRegister} noValidate>
                {!isLogin ? (
                  <div className="signup-field-grid">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={updateField}
                        placeholder="Jane"
                        autoComplete="given-name"
                        className={errors.firstName ? 'invalid' : undefined}
                      />
                      {errors.firstName && <span className="field-error show">{errors.firstName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={updateField}
                        placeholder="Doe"
                        autoComplete="family-name"
                        className={errors.lastName ? 'invalid' : undefined}
                      />
                      {errors.lastName && <span className="field-error show">{errors.lastName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={updateField}
                        placeholder="janedoe"
                        autoComplete="username"
                        className={errors.username ? 'invalid' : undefined}
                      />
                      {errors.username && <span className="field-error show">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={updateField}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className={errors.email ? 'invalid' : undefined}
                      />
                      {errors.email && <span className="field-error show">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={updateField}
                        placeholder="Create password"
                        autoComplete="new-password"
                        className={errors.password ? 'invalid' : undefined}
                      />
                      {errors.password && <span className="field-error show">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={updateField}
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        className={errors.confirmPassword ? 'invalid' : undefined}
                      />
                      {errors.confirmPassword && <span className="field-error show">{errors.confirmPassword}</span>}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={updateField}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className={errors.email ? 'invalid' : undefined}
                      />
                      {errors.email && <span className="field-error show">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={updateField}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className={errors.password ? 'invalid' : undefined}
                      />
                      {errors.password && <span className="field-error show">{errors.password}</span>}
                    </div>
                  </>
                )}

                {!isLogin && (
                  <>
                    <label className="terms-row">
                      <input type="checkbox" name="terms" checked={form.terms} onChange={updateField} />
                      <span>
                        I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
                      </span>
                    </label>
                    {errors.terms && <span className="field-error show auth-terms-error">{errors.terms}</span>}
                  </>
                )}

                {isLogin && (
                  <div className="forgot-row">
                    <a href="#">Forgot password?</a>
                  </div>
                )}

                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? (isLogin ? 'Signing in...' : 'Creating account...') : (isLogin ? 'Login' : 'Create Account')}
                </button>
              </form>

              <p className="auth-switch">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <Link to={isLogin ? '/register' : '/login'}>
                  {isLogin ? 'Sign up' : 'Login'}
                </Link>
              </p>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
