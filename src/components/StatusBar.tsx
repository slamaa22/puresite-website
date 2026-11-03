import React, { useState, useEffect } from 'react';

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
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('de-AT', {
          timeZone: 'Europe/Vienna',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
          <dt>Stack</dt>
          <dd>
            <button className="status-link-btn" onClick={onScrollToWhy}>
              <span>React 19 · TypeScript · Vite</span>
            </button>
          </dd>
        </div>

        <div className="status-item">
          <dt>Ausbildung</dt>
          <dd>
            <button className="status-link-btn" onClick={onScrollToAbout}>
              <span>HTL Kaindorf Absolventen</span>
            </button>
          </dd>
        </div>

        <div className="status-item status-clock-col">
          <dt>Lokalzeit</dt>
          <dd>
            <time className="tabular-time">{timeStr || '17:55:00'}</time>
            <span className="hero-status-meta">Steiermark, AT</span>
          </dd>
        </div>
      </dl>
    </div>
  );
};
