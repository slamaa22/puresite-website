import React from 'react';
import { ArrowRight, CheckCircle, Zap, ShieldCheck, Code, Play } from 'lucide-react';

interface HeroProps {
  onScrollToPricing: () => void;
  onExploreDemos: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToPricing, onExploreDemos }) => {
  return (
    <section id="hero" className="hero-section">
      {/* Background ambient orbs */}
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>

      <div className="container hero-container">
        <div className="hero-content">
          {/* Top Badge */}
          <div className="hero-pill-badge">
            <span className="pill-dot"></span>
            <span className="pill-text">⚡ High-End Webdesign & Softwareentwicklung</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-headline">
            Websites, die <span className="gradient-text">begeistern</span>.<br />
            Modular, rasend schnell & ohne WordPress-Chaos.
          </h1>

          {/* Subtitle */}
          <p className="hero-subhead">
            Wir haben PureSite gegründet, um steirischen und österreichischen Unternehmen genau das zu geben, was Großagenturen vorenthalten: <strong>100% transparente Modul-Preise</strong>, sauberen TypeScript-Code und unschlagbare Performance.
          </p>

          {/* Action Button Row */}
          <div className="hero-cta-group">
            <button className="btn-hero-primary" onClick={onScrollToPricing}>
              <span>Website jetzt konfigurieren</span>
              <ArrowRight size={18} />
            </button>
            <button className="btn-hero-secondary" onClick={onExploreDemos}>
              <Play size={16} className="play-icon" />
              <span>18 Live-Demos testen</span>
            </button>
          </div>

          {/* Bullet Trust indicators */}
          <div className="hero-trust-bullets">
            <div className="trust-bullet">
              <CheckCircle size={16} className="text-cyan" />
              <span>Fixpreis ab 1.000 € (Keine Überraschungen)</span>
            </div>
            <div className="trust-bullet">
              <CheckCircle size={16} className="text-cyan" />
              <span>50/50 Zahlung bei Start & Livegang</span>
            </div>
            <div className="trust-bullet">
              <CheckCircle size={16} className="text-cyan" />
              <span>100% DSGVO & Daten in Österreich</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div className="hero-visual-wrapper">
          <div className="visual-perspective-card glass-panel">
            <img 
              src="/assets/hero-showcase.jpg" 
              alt="PureSite High-End Webdesign Showcase" 
              className="hero-mockup-img"
            />
            <div className="visual-glare-overlay"></div>

            {/* Floating Info Pills */}
            <div className="floating-badge badge-top-left glass-panel">
              <Zap size={16} className="text-cyan" />
              <div>
                <strong>Lighthouse 100/100</strong>
                <span>Core Web Vitals Optimiert</span>
              </div>
            </div>

            <div className="floating-badge badge-bottom-right glass-panel">
              <Code size={16} className="text-purple" />
              <div>
                <strong>Modern Stack</strong>
                <span>React, Vite & TypeScript</span>
              </div>
            </div>

            <div className="floating-badge badge-bottom-left glass-panel">
              <ShieldCheck size={16} className="text-emerald" />
              <div>
                <strong>0 Cookies nötig</strong>
                <span>100% DSGVO-Clean</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="container hero-metrics-banner">
        <div className="metrics-grid glass-panel">
          <div className="metric-col">
            <div className="metric-val text-cyan">Ø 0.4s</div>
            <div className="metric-label">Ladezeit (First Contentful Paint)</div>
          </div>
          <div className="metric-col">
            <div className="metric-val text-purple">18</div>
            <div className="metric-label">Austauschbare Live-Module</div>
          </div>
          <div className="metric-col">
            <div className="metric-val text-emerald">100%</div>
            <div className="metric-label">Transparente Festpreis-Garantie</div>
          </div>
          <div className="metric-col">
            <div className="metric-val text-cyan">0 €</div>
            <div className="metric-label">Versteckte Wartungs-Kosten</div>
          </div>
        </div>
      </div>
    </section>
  );
};
