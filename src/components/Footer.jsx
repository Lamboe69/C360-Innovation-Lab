import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../data/navItems.js';
import './siteChrome.css';

export default function Footer() {
  const isLoggedIn = !!localStorage.getItem('c360_logged_in');
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-grid" aria-hidden="true" />
      <p className="site-footer-watermark">C360</p>

      <div className="site-footer-top">
        <div className="site-footer-brand">
          <p className="site-footer-kicker">Signal Out</p>
          <h2>
            Build with
            <span> C360</span>
          </h2>
          <p className="site-footer-lede">
            Empowering the next generation of innovators through clubs, mentorship, and enterprise development.
          </p>
          <div className="site-footer-coords">
            <span>EST. 2020</span>
            <span>GLOBAL NETWORK</span>
            <span>LAB STATUS · LIVE</span>
          </div>
        </div>

        <div className="site-footer-lattice" aria-label="Footer navigation">
          <div className="site-footer-col">
            <h3>Navigate</h3>
            <ul>
              {navItems.map(([label, path], index) => (
                <li key={path}>
                  <Link to={path}>
                    <em>{String(index + 1).padStart(2, '0')}</em>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer-col">
            <h3>Account</h3>
            <ul>
              {isLoggedIn ? (
                <li><Link to="/dashboard"><em>A1</em>Dashboard</Link></li>
              ) : (
                <>
                  <li><Link to="/login"><em>A1</em>Login</Link></li>
                  <li><Link to="/register"><em>A2</em>Register</Link></li>
                </>
              )}
              <li><Link to="/privacy"><em>A3</em>Privacy</Link></li>
              <li><Link to="/terms"><em>A4</em>Terms</Link></li>
            </ul>
          </div>
          <div className="site-footer-col">
            <h3>Continue</h3>
            <ul>
              <li><Link to="/learn"><em>C1</em>Learn Workspace</Link></li>
              <li><Link to="/programs"><em>C2</em>Programs</Link></li>
              <li><Link to="/partnerships"><em>C3</em>Partnerships</Link></li>
              <li><Link to="/contact"><em>C4</em>Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer-ticker" aria-hidden="true">
        <div className="site-footer-ticker-track">
          <span>CLUBS</span><span>MENTORSHIP</span><span>COMPETITIONS</span><span>RESEARCH</span>
          <span>INCUBATION</span><span>RESOURCES</span><span>FINANCIAL LITERACY</span>
          <span>CLUBS</span><span>MENTORSHIP</span><span>COMPETITIONS</span><span>RESEARCH</span>
          <span>INCUBATION</span><span>RESOURCES</span><span>FINANCIAL LITERACY</span>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>&copy; {year} C360 Innovation Lab</span>
        <span className="site-footer-slash">/</span>
        <span>All rights reserved</span>
        <span className="site-footer-slash">/</span>
        <Link to="/contact">Open a channel</Link>
      </div>
    </footer>
  );
}
