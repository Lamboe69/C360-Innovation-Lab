import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomCursor from '../components/CustomCursor.jsx';
import Footer from '../components/Footer.jsx';
import { navItems } from '../data/navItems.js';

export default function PublicContentPage({ page, path }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.title = `${page.title} — C360 Innovation Lab`;
    setIsLoggedIn(!!localStorage.getItem('c360_logged_in'));
  }, [page.title]);

  return (
    <div className="public-page-shell">
      <CustomCursor />
      <a href="#main-content" className="skip-link">Skip to content</a>

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
          {isLoggedIn ? (
            <li><Link to="/dashboard" className="btn-auth-register">Dashboard</Link></li>
          ) : (
            <>
              <li><Link to="/login" className="btn-auth-login">Login</Link></li>
              <li><Link to="/register" className="btn-auth-register">Register</Link></li>
            </>
          )}
        </ul>
        <button className="hamburger" onClick={() => setMobileOpen(current => !current)} aria-label="Toggle menu" type="button">
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {navItems.map(([label, itemPath]) => <Link key={itemPath} to={itemPath} onClick={() => setMobileOpen(false)}>{label}</Link>)}
        {isLoggedIn ? (
          <Link to="/dashboard" className="btn-auth-register" onClick={() => setMobileOpen(false)}>Dashboard</Link>
        ) : (
          <>
            <Link to="/login" className="btn-auth-login" onClick={() => setMobileOpen(false)}>Login</Link>
            <Link to="/register" className="btn-auth-register" onClick={() => setMobileOpen(false)}>Register</Link>
          </>
        )}
      </div>

      <main id="main-content" className="public-page-main">
        <section className="public-hero">
          <div className="public-hero-copy">
            <div className="section-tag">{page.eyebrow}</div>
            <h1 className="gradient-text">{page.title}</h1>
            <p>{page.description}</p>
            <Link to={page.cta[1]} className="btn-hero-primary">{page.cta[0]} <span className="btn-arrow">→</span></Link>
          </div>
          <div className="public-hero-stats">
            {page.stats.map(([value, label]) => (
              <div className="public-stat-card glass-card" key={`${value}-${label}`}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="public-section-grid">
          {page.sections.map(([title, body, image]) => (
            <article className="public-info-card glass-card" key={title}>
              {image && <img src={image} alt="" className="public-section-img" loading="lazy" />}
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
            {page.cards.map((card) => {
              const [title, body, cardPath] = card.length === 3 ? card : [card[0], card[1], null];
              const Wrapper = cardPath ? Link : 'article';
              const wrapperProps = cardPath ? { to: cardPath, className: 'public-list-card public-list-card-link glass-card card-3d-inner' } : { className: 'public-list-card glass-card', key: title };
              return (
                <Wrapper key={title} {...wrapperProps}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  {cardPath && <span className="card-link-arrow" style={{ marginTop: 8, display: 'inline-block' }}>→</span>}
                </Wrapper>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
