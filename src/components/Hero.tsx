import React, { useRef } from 'react';
import { handleSpotlightMove } from '../hooks/useMotion';

interface HeroProps {
  onScrollToPricing: () => void;
  onExploreDemos: () => void;
}

const WAVE_LINES = Array.from({ length: 18 }, (_, i) => i);

export const Hero: React.FC<HeroProps> = ({
  onScrollToPricing,
  onExploreDemos
}) => {
  const heroStageRef = useRef<HTMLElement | null>(null);

  const handleHeroPointerMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = heroStageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--hero-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--hero-y', `${e.clientY - rect.top}px`);
  };

  return (
    <>
      {/* 1. PURESITE CENTERED HERO + LIQUID GLASS WAVE ATMOSPHERE */}
      <section
        id="hero"
        ref={heroStageRef}
        onMouseMove={handleHeroPointerMove}
        className="ps-hero"
        aria-labelledby="hero-title"
      >
        {/* Diagonal 116° Architectural Line Field + Refractive Light Wave */}
        <div className="ps-hero-atmosphere" aria-hidden="true">
          <div className="ps-hero-line-field">
            <svg
              className="ps-hero-line-wave"
              viewBox="0 0 1600 900"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              {WAVE_LINES.map(idx => {
                const offset = idx * 96 - 160;
                const delay = Math.abs(idx - 8.5) * 0.16;
                return (
                  <line
                    key={idx}
                    x1={offset}
                    y1={0}
                    x2={offset + 440}
                    y2={900}
                    style={{ animationDelay: `${delay.toFixed(2)}s` }}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        <div className="ps-wrap">
          <div className="ps-hero-copy">
            <p className="ps-overline ps-hero-pill hero-enter-1">
              <span className="eyebrow-pulse-dot" aria-hidden="true" />
              <span>PureSite · Webdesign &amp; Software Studio Graz, Steiermark</span>
            </p>

            <h1 id="hero-title" className="hero-enter-2">
              Maßgeschneiderte Websites
              <br />
              <span>mit verbindlichem Festpreis.</span>
            </h1>

            <p className="ps-hero-intro hero-enter-3">
              Wir planen, gestalten und entwickeln rasend schnelle Websites für Unternehmen in Graz,
              der Steiermark und ganz Österreich – ohne WordPress-Ballast, mit verbindlichem Festpreis
              und persönlicher Betreuung von der ersten Idee bis zum Livegang.
            </p>

            <div className="ps-hero-actions hero-enter-4">
              <button
                type="button"
                className="ps-btn ps-btn-primary button-shimmer"
                onClick={onScrollToPricing}
              >
                <span>Festpreis online kalkulieren</span>
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 18 18 6M6 6h12v12" />
                </svg>
              </button>

              <button
                type="button"
                className="ps-btn ps-btn-glass-outline"
                onClick={onExploreDemos}
              >
                <span>18 Live-Demos testen</span>
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12h16M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Floating Liquid Glass Key-Fact Dock */}
            <div className="ps-hero-trust-dock lg-glass-card hero-enter-5">
              <div className="ps-trust-cell">
                <span className="ps-trust-kicker">Einstieg</span>
                <strong>Festpreis ab 1.000 €</strong>
              </div>
              <div className="ps-trust-cell">
                <span className="ps-trust-kicker">Sicherheit</span>
                <strong>50% Start · 50% Livegang</strong>
              </div>
              <div className="ps-trust-cell">
                <span className="ps-trust-kicker">Performance</span>
                <strong>100/100 Google Score</strong>
              </div>
              <div className="ps-trust-cell">
                <span className="ps-trust-kicker">Infrastruktur</span>
                <strong>Dedicated EU-Server</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PURESITE 3-COLUMN SITUATIONS SECTION ("Wobei brauchen Sie Unterstützung?") */}
      <section className="ps-section ps-wrap ps-home-situations" aria-labelledby="situations-heading">
        <div className="ps-section-heading" data-reveal>
          <div>
            <p className="ps-overline">Neue Website oder Relaunch</p>
            <h2 id="situations-heading">Wobei brauchen Sie Unterstützung?</h2>
          </div>
          <p>
            Ob moderne Firmen-Homepage oder kompletter Website-Relaunch: Ihr Webauftritt soll in Graz
            und überregional zuverlässig Kunden gewinnen und Ihnen Arbeit abnehmen. Ohne Agentur-Floskeln
            oder langwierige Baukästen.
          </p>
        </div>

        <div className="ps-situation-grid" data-reveal>
          <article
            className="ps-situation-card lg-glass-card spotlight-surface"
            onMouseMove={handleSpotlightMove}
          >
            <span className="ps-card-index">01</span>
            <h3>Der aktuelle Auftritt lädt langsam oder wirkt nicht mehr zeitgemäß.</h3>
            <p>
              Auf dem Smartphone dauert der Seitenaufbau Sekunden und potenzielle Kunden springen ab.
              Als Webdesign-Studio in Graz entwickeln wir Ihre Website individuell in React &amp;
              TypeScript – mit unter 0,4 Sekunden Ladezeit und klarem Fokus auf Anfragen.
            </p>
          </article>

          <article
            className="ps-situation-card lg-glass-card spotlight-surface"
            onMouseMove={handleSpotlightMove}
          >
            <span className="ps-card-index">02</span>
            <h3>Agentur-Angebote sind intransparent und kosten plötzlich 8.000 €.</h3>
            <p>
              Statt undurchsichtiger Pauschalen stellen Sie sich Ihren Umfang modular zusammen – vom
              schlanken One-Pager bis zur Unternehmensseite mit Live-Rechner oder Terminbuchung. Den
              verbindlichen Festpreis sehen Sie vorab online.
            </p>
          </article>

          <article
            className="ps-situation-card lg-glass-card spotlight-surface"
            onMouseMove={handleSpotlightMove}
          >
            <span className="ps-card-index">03</span>
            <h3>Wer kümmert sich laufend um Sicherheit, Backups und Änderungen?</h3>
            <p>
              Keine 40 anfälligen WordPress-Plugins mehr, die Updates zerschießen. Auf unseren
              dedizierten EU-Servern sind SSL, tägliche Backups sowie 1 bis 3 Stunden monatliche
              Anpassungen per kurzem WhatsApp-Zuruf direkt inklusive.
            </p>
          </article>
        </div>
      </section>
    </>
  );
};
