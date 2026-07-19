import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../data/navItems.js';
import './siteChrome.css';

const LOGO_SRC = '/brand/c360-logo.png';

export default function Footer() {
  const isLoggedIn = !!localStorage.getItem('c360_logged_in');
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="site-footer-brand">
          <img src={LOGO_SRC} alt="C360 Innovation Lab" className="site-footer-logo" width="300" height="140" />
          <h2>
            Build with
            <span> C360</span>
          </h2>
          <p className="site-footer-lede">
            AI-powered career intelligence and innovation ecosystem for Uganda’s youth and beyond. Based in Gulu City, Northern Uganda.
          </p>
          <div className="site-footer-coords">
            <Link to="/contact">Gulu City, Northern Uganda</Link>
          </div>
        </div>

        <div className="site-footer-lattice" aria-label="Footer navigation">
          <div className="site-footer-col">
            <h3>Navigate</h3>
            <ul>
              {navItems.map(([label, path]) => (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="site-footer-col">
            <h3>Platform</h3>
            <ul>
              <li><Link to="/career">AI Career Engine</Link></li>
              <li><Link to="/learn">Member workspace</Link></li>
              <li><Link to="/labs">C360 Labs</Link></li>
              <li><Link to="/network">Global Network</Link></li>
              <li><Link to="/projects">C360 Projects</Link></li>
            </ul>
          </div>
          <div className="site-footer-col">
            <h3>Organisation</h3>
            <ul>
              <li><Link to="/about">About C360</Link></li>
              <li><Link to="/projects">REVEL Roots Uganda</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
              {isLoggedIn ? (
                <li><Link to="/dashboard">Dashboard</Link></li>
              ) : (
                <li><Link to="/login">Sign in</Link></li>
              )}
              <li><Link to="/privacy">Privacy</Link></li>
              <li><Link to="/terms">Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p>© {year} C360 Innovation Lab. All rights reserved.</p>
        <p>
          <Link to="/privacy">Privacy policy</Link>
          <span className="site-footer-slash"> · </span>
          <Link to="/terms">Terms of use</Link>
        </p>
        <p><a href="https://finemind.org" rel="noreferrer" target="_blank">A sister initiative of Finemind Uganda</a></p>
      </div>
    </footer>
  );
}
