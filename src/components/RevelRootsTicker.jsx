import React from 'react';
import { Link } from 'react-router-dom';
import './revelRootsTicker.css';

const MESSAGE = 'REVEL Roots Uganda Cohort 2027 registration in progress — International food systems immersion. Apply now.';

export default function RevelRootsTicker() {
  const loop = Array.from({ length: 6 }, (_, i) => (
    <span className="revel-ticker-chunk" key={i}>
      <i className="revel-ticker-stamp" aria-hidden="true">OPEN</i>
      <em>REVEL Roots</em>
      <span>{MESSAGE}</span>
      <strong>Apply →</strong>
    </span>
  ));

  return (
    <>
      <aside className="revel-ticker" aria-label="Revel Roots registration notice">
        <div className="revel-ticker-rail" aria-hidden="true">
          <span>RR</span>
          <span>UG</span>
        </div>

        <div className="revel-ticker-viewport">
          <div className="revel-ticker-scan" aria-hidden="true" />
          <div className="revel-ticker-track">
            {loop}
            {loop}
          </div>
        </div>

        <Link to="/projects/revel-roots" className="revel-ticker-cta">
          <span className="revel-ticker-cta-kicker">Now boarding</span>
          <span className="revel-ticker-cta-main">Apply</span>
          <span className="revel-ticker-cta-arrow" aria-hidden="true">→</span>
        </Link>
      </aside>
      <div className="revel-ticker-spacer" aria-hidden="true" />
    </>
  );
}

