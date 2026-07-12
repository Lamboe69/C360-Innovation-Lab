import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navItems } from '../data/navItems.js';
import './siteChrome.css';

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
            <span className="site-nav-emblem" aria-hidden="true">
              <span className="site-nav-orbit" />
              <span className="site-nav-orbit site-nav-orbit-b" />
              <span className="site-nav-mark">C360</span>
            </span>
            <span className="site-nav-name">Innovation Lab</span>
          </Link>

          <div className="site-nav-links">
            <ul>
              {navItems.map(([label, path]) => (
                <li key={path}>
                  <NavLink to={path} end={path === '/'} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
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
                {showLogin && <Link to="/login" className="site-nav-cta site-nav-cta-ghost">Login</Link>}
                {showRegister && <Link to="/register" className="site-nav-cta site-nav-cta-fill">Register</Link>}
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
        {navItems.map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
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
            {showLogin && <Link to="/login" className="site-nav-cta site-nav-cta-ghost" onClick={() => setMobileOpen(false)}>Login</Link>}
            {showRegister && <Link to="/register" className="site-nav-cta site-nav-cta-fill" onClick={() => setMobileOpen(false)}>Register</Link>}
          </div>
        )}
      </div>
    </>
  );
}
