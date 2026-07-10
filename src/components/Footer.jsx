import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../data/navItems.js';

export default function Footer() {
  const isLoggedIn = !!localStorage.getItem('c360_logged_in');

  return (
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
          <ul>{navItems.map(([label, path]) => <li key={path}><Link to={path}>{label}</Link></li>)}</ul>
        </div>
        <div className="footer-links">
          <h4>Account</h4>
          <ul>
            {isLoggedIn ? (
              <li><Link to="/dashboard">Dashboard</Link></li>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Use</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">&copy; {new Date().getFullYear()} C360 Innovation Lab. All rights reserved.</div>
    </footer>
  );
}
