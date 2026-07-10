import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AuthPage from './components/AuthPage.jsx';
import DashboardPage from './components/DashboardPage.jsx';
import LearnPage from './components/LearnPage.jsx';
import HomePage from './pages/HomePage.jsx';
import PublicContentPage from './pages/PublicContentPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { publicPages } from './pages/publicPages.js';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
};

function AnimatedPage({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
          <Route path="/login" element={<AnimatedPage><AuthPage mode="login" /></AnimatedPage>} />
          <Route path="/register" element={<AnimatedPage><AuthPage mode="register" /></AnimatedPage>} />
          <Route path="/dashboard" element={<AnimatedPage><DashboardPage /></AnimatedPage>} />
          <Route path="/learn" element={<AnimatedPage><LearnPage /></AnimatedPage>} />
          {Object.entries(publicPages).map(([path, page]) => (
            <Route key={path} path={path} element={<AnimatedPage><PublicContentPage page={page} path={path} /></AnimatedPage>} />
          ))}
          <Route path="*" element={<AnimatedPage><NotFoundPage /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </ErrorBoundary>
  );
}
