import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const menuItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/programs', label: 'Programs' },
  { to: '/clubs', label: 'Clubs' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
];

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
          {menuItems.map(item => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
                {item.label}
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
        {menuItems.map(item => (
          <NavLink key={item.to} to={item.to} onClick={() => setIsOpen(false)}>
            {item.label}
          </NavLink>
        ))}
        <Link to={authLink.to} className={mode === 'login' ? 'btn-auth-register' : 'btn-auth-login'} onClick={() => setIsOpen(false)}>
          {authLink.label}
        </Link>
      </div>
    </>
  );
}
