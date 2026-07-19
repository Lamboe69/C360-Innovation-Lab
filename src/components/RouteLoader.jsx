import React from 'react';
import './routeLoader.css';

export default function RouteLoader({ active }) {
  return (
    <div
      className={`route-loader${active ? ' is-active' : ''}`}
      aria-hidden={!active}
      aria-busy={active}
      role="status"
    >
      <div className="route-loader-panel">
        <div className="route-loader-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <img
          className="route-loader-logo"
          src="/brand/c360-logo.png"
          alt=""
          width="72"
          height="72"
        />
        <p className="route-loader-label">
          <span className="route-loader-dots" aria-hidden="true">
            <i /><i /><i />
          </span>
          Loading
        </p>
      </div>
    </div>
  );
}
