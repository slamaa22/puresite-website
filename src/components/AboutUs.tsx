import React from 'react';
import { handleSpotlightMove } from '../hooks/useMotion';

interface AboutUsProps {
  onOpenContact?: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onOpenContact }) => {
  return (
    <section id="ueber-uns" className="wit-section wit-wrap wit-founder-section" aria-labelledby="about-title">
      {/* Left: Dual Liquid Glass Portrait Frames (Windisch Founder Layout adapted for PureSite's 2 Co-Founders) */}
      <div className="wit-founder-portraits" data-reveal>
        <figure
          className="wit-founder-photo lg-glass-card spotlight-surface"
          onMouseMove={handleSpotlightMove}
        >
          <picture>
            <source srcSet="/assets/maximilian-schlacher.webp" type="image/webp" />
            <img
              src="/assets/maximilian-schlacher.jpg"
              alt="Maximilian Schlacher — Co-Founder & Frontend Engineering"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <figcaption className="wit-photo-caption">
            <strong>Maximilian Schlacher</strong>
            <span>Frontend &amp; UI/UX · Steiermark</span>
          </figcaption>
        </figure>

        <figure
          className="wit-founder-photo wit-founder-photo--offset lg-glass-card spotlight-surface"
          onMouseMove={handleSpotlightMove}
        >
          <picture>
            <source srcSet="/assets/loreno-zanaboni.webp" type="image/webp" />
            <img
              src="/assets/loreno-zanaboni.jpg"
              alt="Loreno Zanaboni — Co-Founder & Softwarearchitektur"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <figcaption className="wit-photo-caption">
            <strong>Loreno Zanaboni</strong>
            <span>Architektur &amp; Systeme · Steiermark</span>
          </figcaption>
        </figure>
      </div>

      {/* Right: Calm Editorial Founder Copy & Signature (Exact Windisch IT Hierarchy) */}
      <div className="wit-founder-copy" data-reveal>
        <p className="wit-overline">Webdesign &amp; Software-Studio Graz · Maximilian &amp; Loreno</p>
        <h2 id="about-title">Ihre direkten Ansprechpartner für Webdesign &amp; Technik in der Steiermark.</h2>

        <p className="wit-lead">
          Wir sind Maximilian Schlacher und Loreno Zanaboni, Softwareentwickler und Webdesigner aus Graz.
          Wir beraten Betriebe, Praxen und KMU in Graz, der Steiermark und ganz Österreich ohne eigene
          IT-Abteilung, entwickeln handgeschriebene Websites zum verbindlichen Festpreis und übernehmen
          auf Wunsch die laufende Betreuung.
        </p>

        <p>
          Bei uns sprechen Sie direkt mit den beiden Entwicklern – ohne anonyme Account-Manager und
          ohne Fachchinesisch. Uns ist wichtig, zu verstehen, wie Ihr Betrieb arbeitet, und
          technische Entscheidungen so klar zu planen, dass Ihre Website über Jahre hinweg schnell,
          sicher und wartungsfrei läuft.
        </p>

        <div className="wit-founder-pills">
          <span className="wit-glass-tag">React 19 &amp; TypeScript</span>
          <span className="wit-glass-tag">100% Festpreis vor Start</span>
          <span className="wit-glass-tag">50/50 Zahlungsschutz</span>
          <span className="wit-glass-tag">Direkt per WhatsApp &amp; Mail</span>
        </div>

        {onOpenContact && (
          <button type="button" className="wit-text-link wit-founder-cta" onClick={onOpenContact}>
            <span>Direkt mit Maximilian &amp; Loreno sprechen</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 12h16M13 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <div className="wit-signature">
          Maximilian Schlacher &amp; Loreno Zanaboni
          <span>PureSite Software Studio · Steiermark, Österreich</span>
        </div>
      </div>
    </section>
  );
};
