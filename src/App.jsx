import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage.jsx';
import DashboardPage from './components/DashboardPage.jsx';
import LearnPage from './components/LearnPage.jsx';
import HomePage from './pages/HomePage.jsx';
import PublicContentPage from './pages/PublicContentPage.jsx';
import { publicPages } from './pages/publicPages.js';
import { pages } from './data/pages.js';

function cleanPathForFilename(filename) {
  return filename === 'index.html' ? '/' : `/${filename.replace(/\.html$/, '')}`;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/learn" element={<LearnPage />} />
      {Object.entries(publicPages).map(([path, page]) => (
        <Route key={path} path={path} element={<PublicContentPage page={page} path={path} />} />
      ))}
      {Object.values(pages).map(page => (
        <Route
          key={page.filename}
          path={`/${page.filename}`}
          element={<Navigate to={cleanPathForFilename(page.filename)} replace />}
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
