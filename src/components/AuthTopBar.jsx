import React from 'react';
import SiteNav from './SiteNav.jsx';

export default function AuthTopBar({ mode }) {
  return <SiteNav authMode={mode} />;
}
