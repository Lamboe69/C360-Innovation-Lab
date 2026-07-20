import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AuthPage from './components/AuthPage.jsx';
import DashboardPage from './components/DashboardPage.jsx';
import LearnPage from './components/LearnPage.jsx';
import HomePage from './pages/HomePage.jsx';
import PublicContentPage from './pages/PublicContentPage.jsx';
import RevelRootsApplyPage from './pages/RevelRootsApplyPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import RouteLoader from './components/RouteLoader.jsx';
import { publicPages } from './pages/publicPages.js';

const LOADER_MIN_MS = 560;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function NavigationLoader() {
  const location = useLocation();
  const [state, setState] = useState({ key: location.key, active: false });

  // Sync during render so the overlay covers the first painted frame of the new route.
  if (location.key !== state.key) {
    setState({ key: location.key, active: true });
  }

  useEffect(() => {
    if (!state.active) return undefined;

    const timer = window.setTimeout(() => {
      setState((current) => (
        current.key === state.key
          ? { ...current, active: false }
          : current
      ));
    }, LOADER_MIN_MS);

    return () => window.clearTimeout(timer);
  }, [state.key, state.active]);

  return <RouteLoader active={state.active} />;
}

export default function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <NavigationLoader />
      <ScrollToTop />
      <div className="app-route-shell" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/clubs" element={<Navigate to="/labs" replace />} />
          <Route path="/programs" element={<Navigate to="/career" replace />} />
          <Route path="/partnerships" element={<Navigate to="/network" replace />} />
          <Route path="/projects/revel-roots" element={<RevelRootsApplyPage />} />
          {Object.entries(publicPages).map(([path, page]) => (
            <Route key={path} path={path} element={<PublicContentPage page={page} path={path} />} />
          ))}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
}
