import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navItems } from '../data/navItems.js';

export default function AuthTopBar({ mode }) {
  const [isOpen, setIsOpen] = useState(false);
  const authLink = mode === 'login'
    ? { to: '/register', label: 'Sign Up' }
    : { to: '/login', label: 'Login' };

  return (
    <>
      <nav className="auth-topbar">
        <Link to="/" className="nav-logo">
          <div className="logo-mark">C360</div>
          Innovation Lab
        </Link>

        <ul className="nav-links">
          {navItems.map(([label, to]) => (
            <li key={to}>
              <NavLink to={to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to={authLink.to} className={mode === 'login' ? 'btn-auth-register' : 'btn-auth-login'}>
              {authLink.label}
            </Link>
          </li>
        </ul>

        <button className="hamburger" onClick={() => setIsOpen(value => !value)} aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu auth-mobile-menu${isOpen ? ' open' : ''}`}>
        {navItems.map(([label, to]) => (
          <NavLink key={to} to={to} onClick={() => setIsOpen(false)}>
            {label}
          </NavLink>
        ))}
        <Link to={authLink.to} className={mode === 'login' ? 'btn-auth-register' : 'btn-auth-login'} onClick={() => setIsOpen(false)}>
          {authLink.label}
        </Link>
      </div>
    </>
  );
}
