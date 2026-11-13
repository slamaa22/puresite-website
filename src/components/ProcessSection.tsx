import React, { useState } from 'react';
import { handleSpotlightMove } from '../hooks/useMotion';

interface ProcessSectionProps {
  onOpenContact?: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenContact }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const steps = [
    {
      num: '01',
      duration: 'Sofort online',
      title: 'Verstehen & Kalkulieren.',
      desc: 'Wählen Sie Ihren Wunschumfang im Festpreis-Rechner oder wir klären im kostenlosen Erstgespräch gemeinsam, welche Bausteine für Ihren Betrieb sinnvoll sind.'
    },
    {
      num: '02',
      duration: 'Tag 2 – 5',
      title: 'Planen & Gestalten.',
      desc: 'Sie erhalten ein maßgeschneidertes Design exakt für Ihre Branche und Zielgruppe – ohne vorgefertigte Baukasten-Templates. Erst nach Ihrer Freigabe geht es weiter.'
    },
    {
      num: '03',
      duration: 'Woche 1 – 2',
      title: 'Modern Entwickeln.',
      desc: 'Wir entwickeln Ihre Website sauber in React 19 & TypeScript, binden gewünschte Rechner oder Buchungstools ein und optimieren alle Core Web Vitals auf 98–100 Punkte.'
    },
    {
      num: '04',
      duration: 'Go-Live & Betrieb',
      title: 'Livegehen & Dranbleiben.',
      desc: 'Nach der gemeinsamen Abnahme schalten wir Ihre Domain live (erst dann wird die zweite 50%-Hälfte fällig) und übernehmen auf Wunsch Hosting & Zuruf-Änderungen.'
    }
  ];

  const progressPct = ((activeIdx + 1) / steps.length) * 100;

  return (
    <section
      id="prozess"
      className="ps-section ps-wrap ps-process-section"
      aria-labelledby="process-title"
    >
      <div className="ps-section-heading" data-reveal>
        <div>
          <p className="ps-overline">So arbeiten wir zusammen</p>
          <h2 id="process-title">Direkter Draht. Alle Schritte.</h2>
        </div>
        {onOpenContact && (
          <button type="button" className="ps-text-link" onClick={onOpenContact}>
            <span>Unverbindliches Erstgespräch anfragen</span>
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
      </div>

      {/* Liquid Glass Progress Rail */}
      <div className="process-signal-rail" aria-hidden="true" data-reveal>
        <div className="process-signal-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <ol className="ps-process-grid" data-reveal>
        {steps.map((st, idx) => {
          const isReached = idx <= activeIdx;
          const isCurrent = idx === activeIdx;

          return (
            <li
              key={st.num}
              className={`ps-process-card lg-glass-card spotlight-surface ${isReached ? 'is-reached' : ''} ${isCurrent ? 'is-current-step' : ''}`}
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => setActiveIdx(idx)}
              onMouseMove={handleSpotlightMove}
            >
              <div className="ps-process-meta">
                <span className="ps-card-index">{st.num}</span>
                <span className="ps-process-duration">{st.duration}</span>
              </div>
              <h3>{st.title}</h3>
              <p>{st.desc}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
