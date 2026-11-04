import React from 'react';

interface StatusBarProps {
  onScrollToPricing: () => void;
  onScrollToWhy: () => void;
  onScrollToAbout: () => void;
}

const TICKER_SPECS = [
  '100/100 GOOGLE LIGHTHOUSE',
  '< 0.38S FIRST CONTENTFUL PAINT',
  '0% WORDPRESS-BALLAST',
  'DEDICATED EU-SERVER INFRASTRUKTUR',
  '50 / 50 MEILENSTEIN-ZAHLUNG',
  '100% QUELLCODE-EIGENTUM',
  'DSGVO-CLEAN OHNE COOKIE-ZWANG',
  'REACT 19 + TYPESCRIPT ENGINEERING'
];

export const StatusBar: React.FC<StatusBarProps> = ({
  onScrollToPricing,
  onScrollToWhy,
  onScrollToAbout
}) => {
  return (
    <div className="status-row">
      <dl className="hero-status section-shell">
        <div className="status-item">
          <dt>Status</dt>
          <dd>
            <button className="status-link-btn" onClick={onScrollToPricing}>
              <span className="status-dot" aria-hidden="true"></span>
              <span>Verfügbar für neue Projekte</span>
            </button>
          </dd>
        </div>

        <div className="status-item">
          <dt>Engine &amp; Stack</dt>
          <dd>
            <button className="status-link-btn" onClick={onScrollToWhy}>
              <span>React 19 · TypeScript · Vite</span>
            </button>
          </dd>
        </div>

        <div className="status-item">
          <dt>Engineering</dt>
          <dd>
            <button className="status-link-btn" onClick={onScrollToAbout}>
              <span>Maximilian &amp; Loreno · Steiermark</span>
            </button>
          </dd>
        </div>

        <div className="status-item">
          <dt>Infrastruktur</dt>
          <dd>
            <button className="status-link-btn" onClick={onScrollToWhy}>
              <span>Dedicated Server · 100% DSGVO</span>
            </button>
          </dd>
        </div>
      </dl>

      {/* Seamless GPU-composited Engineering Spec Marquee */}
      <div className="telemetry-marquee-strip" aria-hidden="true">
        <div className="telemetry-marquee-track">
          {[...TICKER_SPECS, ...TICKER_SPECS].map((spec, idx) => (
            <span key={idx} className="telemetry-marquee-item">
              <span className="marquee-dot" />
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
