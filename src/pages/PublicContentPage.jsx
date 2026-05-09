import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor.jsx';

const navItems = [
  ['Home', '/'],
  ['About', '/about'],
  ['Programs', '/programs'],
  ['Clubs', '/clubs'],
  ['Resources', '/resources'],
  ['Contact', '/contact'],
];

export default function PublicContentPage({ page, path }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.title = `${page.title} — C360 Innovation Lab`;
  }, [page.title]);

  return (
    <div className="public-page-shell">
      <CustomCursor />

      <nav>
        <Link to="/" className="nav-logo">
          <div className="logo-mark">C360</div>
          Innovation Lab
        </Link>
        <ul className="nav-links">
          {navItems.map(([label, itemPath]) => (
            <li key={itemPath}>
              <Link to={itemPath} className={path === itemPath ? 'active' : undefined}>{label}</Link>
            </li>
          ))}
          <li><Link to="/login" className="btn-auth-login">Login</Link></li>
          <li><Link to="/register" className="btn-auth-register">Register</Link></li>
        </ul>
        <button className="hamburger" onClick={() => setMobileOpen(current => !current)} aria-label="Toggle menu" type="button">
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {navItems.map(([label, itemPath]) => <Link key={itemPath} to={itemPath} onClick={() => setMobileOpen(false)}>{label}</Link>)}
        <Link to="/login" className="btn-auth-login" onClick={() => setMobileOpen(false)}>Login</Link>
        <Link to="/register" className="btn-auth-register" onClick={() => setMobileOpen(false)}>Register</Link>
      </div>

      <main className="public-page-main">
        <section className="public-hero">
          <div className="public-hero-copy">
            <div className="section-tag">{page.eyebrow}</div>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
            <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
          </div>
          <div className="public-hero-stats">
            {page.stats.map(([value, label]) => (
              <div className="public-stat-card" key={`${value}-${label}`}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="public-section-grid">
          {page.sections.map(([title, body]) => (
            <article className="public-info-card" key={title}>
              <span>Focus</span>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </section>

        <section className="public-detail-section">
          <div>
            <div className="section-tag">What You Can Do</div>
            <h2>Practical pathways for learning, building, and growing.</h2>
          </div>
          <div className="public-card-list">
            {page.cards.map(([title, body]) => (
              <article className="public-list-card" key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo">
              <div className="logo-mark">C360</div>
              Innovation Lab
            </div>
            <p>Empowering the next generation of innovators through clubs, mentorship, and enterprise development.</p>
            <div className="footer-tagline"><span /> Est. 2020 <span /></div>
          </div>
          <div className="footer-links">
            <h4>Navigate</h4>
            <ul>{navItems.map(([label, itemPath]) => <li key={itemPath}><Link to={itemPath}>{label}</Link></li>)}</ul>
          </div>
          <div className="footer-links">
            <h4>Account</h4>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© 2025 C360 Innovation Lab. All rights reserved.</div>
      </footer>
    </div>
  );
}
