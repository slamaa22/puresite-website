import React from 'react';
import { ArrowRight, Play, Check, Zap, Shield, Cpu, Terminal } from 'lucide-react';

interface HeroProps {
  onScrollToPricing: () => void;
  onExploreDemos: () => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToPricing,
  onExploreDemos,
  onOpenTerminal
}) => {
  return (
    <section id="hero" className="hero-stage" aria-labelledby="hero-title">
      <div className="hero section-shell">
        {/* Eyebrow Label */}
        <p className="eyebrow">
          Hi, wir sind PureSite. High-End Webdesign & Softwareentwicklung aus der Steiermark.
        </p>

        {/* Hero Title with Terminal Glyph */}
        <h1 id="hero-title">
          Websites
          <button 
            className="hero-glyph" 
            type="button" 
            onClick={onOpenTerminal} 
            aria-label="Terminal öffnen (~)"
            title="Terminal öffnen (~)"
          >
            <span className="glyph-dollar">$</span>
            <span className="glyph-cursor">_</span>
          </button>
          {' '}die <span className="display-em">funktionieren</span>.
          <br className="hero-br-desktop" />
          Ohne WordPress-Chaos.
        </h1>

        {/* Hero Text */}
        <p className="hero-text">
          Gegründet von zwei Entwicklern der HTL Kaindorf. Wir bauen rasend schnelle, handgeschriebene Websites ohne überflüssige Plugins und intransparente Großagentur-Stundensätze. Mit <strong>100% festen Modul-Preisen</strong> ab 1.000 € und messbarer Google-Spitzenleistung.
        </p>

        {/* Hero Actions */}
        <div className="hero-actions">
          <button className="button primary" onClick={onScrollToPricing}>
            <span>Festpreis online kalkulieren</span>
            <ArrowRight size={15} />
          </button>
          <button className="button secondary" onClick={onExploreDemos}>
            <Play size={14} className="play-icon" />
            <span>18 Live-Demos testen</span>
          </button>
          <button className="button tertiary text-link" onClick={onOpenTerminal}>
            <Terminal size={14} />
            <span>Terminal öffnen (~ oder $)</span>
          </button>
        </div>

        {/* Hero Trust Bullets */}
        <div className="hero-feature-tags">
          <div className="hero-feature-item">
            <span className="hero-tag-bullet">✓</span>
            <span>Festpreis ab 1.000 € (Verbindlich vor Projektstart)</span>
          </div>
          <div className="hero-feature-item">
            <span className="hero-tag-bullet">✓</span>
            <span>50/50 Zahlung (Erste Hälfte bei Start, Rest bei Livegang)</span>
          </div>
          <div className="hero-feature-item">
            <span className="hero-tag-bullet">✓</span>
            <span>100% DSGVO & NVMe-Server in Österreich</span>
          </div>
        </div>
      </div>

      {/* Decorative Pixel Track / Indie Accent */}
      <div className="hero-track-bar">
        <div className="hero-track-inner section-shell">
          <div className="track-rail">
            <span className="track-badge">PureSite · Steiermark High-Performance Web</span>
            <span className="track-coords">46°59'N 15°26'E · HTL Kaindorf Alumni</span>
          </div>
        </div>
      </div>

      {/* Hero Window Showcase Stage */}
      <div className="section-shell hero-window-stage">
        <div className="mac-browser-window">
          {/* Mac Window Header Bar */}
          <div className="mac-window-bar">
            <div className="window-dots">
              <span className="tl tl-red"></span>
              <span className="tl tl-yellow"></span>
              <span className="tl tl-green"></span>
            </div>
            <div className="window-address-bar">
              <span className="address-lock">🔒</span>
              <span className="address-url">puresite.at/kalkulator</span>
              <span className="address-badge">100/100 Core Web Vitals</span>
            </div>
            <div className="window-actions">
              <span className="window-tag-stack">React 19 · Vite</span>
            </div>
          </div>

          {/* Window Body with Interactive Preview */}
          <div className="mac-window-body">
            <picture>
              <source media="(max-width: 640px)" srcSet="/assets/hero-showcase-mobile.webp" type="image/webp" />
              <source srcSet="/assets/hero-showcase.webp" type="image/webp" />
              <img 
                src="/assets/hero-showcase.jpg" 
                alt="PureSite High-End Webdesign Showcase" 
                className="mac-window-img"
                width={1376}
                height={768}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </picture>

            {/* Spec Overlay Tags */}
            <div className="window-spec-chips">
              <div className="spec-chip">
                <Zap size={14} className="text-signal" />
                <div>
                  <strong>0.4s Ladezeit</strong>
                  <span>First Contentful Paint</span>
                </div>
              </div>

              <div className="spec-chip">
                <Cpu size={14} className="text-signal" />
                <div>
                  <strong>18 Module</strong>
                  <span>Kombinierbar & modular</span>
                </div>
              </div>

              <div className="spec-chip">
                <Shield size={14} className="text-signal" />
                <div>
                  <strong>0 Cookies nötig</strong>
                  <span>Kein nerviger Cookie-Banner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
