import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navItems } from '../data/navItems.js';
import './siteChrome.css';

const LOGO_SRC = '/brand/c360-logo.png';

export default function SiteNav({ authMode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('c360_logged_in'));
  }, [location.pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const showLogin = authMode !== 'login';
  const showRegister = authMode !== 'register';

  return (
    <>
      <nav className="site-nav" data-open={mobileOpen ? 'true' : 'false'} aria-label="Site">
        <div className="site-nav-inner">
          <Link to="/" className="site-nav-brand" aria-label="C360 Innovation Lab home">
            <img src={LOGO_SRC} alt="C360 Innovation Lab" className="site-nav-logo" width="260" height="120" />
          </Link>

          <div className="site-nav-links">
            <ul>
              {navItems.filter(([, path]) => path !== '/').map(([label, path]) => (
                <li key={path}>
                  <NavLink to={path} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-nav-end">
            {isLoggedIn ? (
              <Link to="/dashboard" className="site-nav-cta site-nav-cta-fill">Dashboard</Link>
            ) : (
              <>
                {showLogin && <Link to="/login" className="site-nav-cta site-nav-cta-ghost">Sign in</Link>}
                {showRegister && <Link to="/register" className="site-nav-cta site-nav-cta-fill">Get started</Link>}
              </>
            )}
            <button
              type="button"
              className="site-nav-burger"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <i /><i /><i />
            </button>
          </div>
        </div>
      </nav>

      <div className={`site-nav-drawer${mobileOpen ? ' is-open' : ''}`}>
        {navItems.filter(([, path]) => path !== '/').map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            onClick={() => setMobileOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        {isLoggedIn ? (
          <Link to="/dashboard" className="site-nav-cta site-nav-cta-fill" onClick={() => setMobileOpen(false)}>Dashboard</Link>
        ) : (
          <div className="site-nav-drawer-auth">
            {showLogin && <Link to="/login" className="site-nav-cta site-nav-cta-ghost" onClick={() => setMobileOpen(false)}>Sign in</Link>}
            {showRegister && <Link to="/register" className="site-nav-cta site-nav-cta-fill" onClick={() => setMobileOpen(false)}>Get started</Link>}
          </div>
        )}
      </div>
    </>
  );
}
