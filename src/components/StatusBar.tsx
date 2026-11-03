import React from 'react';

interface StatusBarProps {
  onScrollToPricing: () => void;
  onScrollToWhy: () => void;
  onScrollToAbout: () => void;
}

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
          <dt>Engine & Stack</dt>
          <dd>
            <button className="status-link-btn" onClick={onScrollToWhy}>
              <span>React 19 · TypeScript · NVMe Graz</span>
            </button>
          </dd>
        </div>

        <div className="status-item">
          <dt>Engineering</dt>
          <dd>
            <button className="status-link-btn" onClick={onScrollToAbout}>
              <span>Maximilian & Loreno · Steiermark</span>
            </button>
          </dd>
        </div>

        <div className="status-item">
          <dt>Infrastruktur</dt>
          <dd>
            <button className="status-link-btn" onClick={onScrollToWhy}>
              <span>NVMe Graz · 100% DSGVO</span>
            </button>
          </dd>
        </div>
      </dl>
    </div>
  );
};
