import React, { useState } from 'react';
import { Calculator, Layout, Code, CheckSquare, Rocket } from 'lucide-react';
import { handleSpotlightMove } from '../hooks/useMotion';

export const ProcessSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const steps = [
    {
      num: '01',
      duration: 'Sofort online',
      icon: Calculator,
      title: 'Modul-Kalkulation & Festpreis',
      desc: 'Wähle deine Wunschbausteine in unserem Konfigurator aus. Du siehst sofort den verbindlichen Endpreis und den kalkulierten Aufwand vor Beginn.'
    },
    {
      num: '02',
      duration: 'Tag 2 – 5',
      icon: Layout,
      title: 'UI/UX Design & Entwurf',
      desc: 'Wir entwerfen ein maßgeschneidertes Screendesign abgestimmt auf deine Branche und dein Corporate Design – keine billigen WordPress-Templates.'
    },
    {
      num: '03',
      duration: 'Woche 1 – 2',
      icon: Code,
      title: 'Code & Softwareentwicklung',
      desc: 'Wir programmieren deine Website mit modernen Webtechnologien (React & TypeScript) für maximale Ladezeiten und kompromisslose mobile Perfektion.'
    },
    {
      num: '04',
      duration: 'Vor Livegang',
      icon: CheckSquare,
      title: 'Performance & DSGVO Audit',
      desc: 'Bevor deine Seite online geht, prüfen wir jeden Core Web Vital Wert (Google Score 98-100) und stellen 100% DSGVO-Konformität sicher.'
    },
    {
      num: '05',
      duration: 'Go-Live',
      icon: Rocket,
      title: 'Livegang & Betreuung',
      desc: 'Nach deiner finalen Freigabe schalten wir deine Domain live. Mit unserem Sorglos-Paket kümmern wir uns danach um zuverlässiges Hosting und Zuruf-Updates.'
    }
  ];

  const progressPct = ((activeIdx + 1) / steps.length) * 100;

  return (
    <section
      id="prozess"
      className="band band--tint section-shell"
      aria-labelledby="process-title"
    >
      <div className="section-head" data-reveal>
        <h2 id="process-title">Ablauf &amp; Meilensteine</h2>
        <span className="section-head-meta">5 klare Schritte von der Idee zum Livegang</span>
      </div>

      <p className="services-lead" data-reveal>
        Kein Agentur-Fachchinesisch, keine endlosen Feedback-Schleifen. Ein strukturierter,
        transparenter Entwicklungsprozess mit verbindlichen Terminen und 50/50 Meilenstein-Zahlung.
      </p>

      {/* Interactive Milestone Progress Rail */}
      <div className="process-signal-rail" aria-hidden="true" data-reveal>
        <div className="process-signal-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="process-artisan-grid" data-reveal>
        {steps.map((st, idx) => {
          const IconComp = st.icon;
          const isReached = idx <= activeIdx;
          const isCurrent = idx === activeIdx;

          return (
            <article
              key={idx}
              className={`process-artisan-card spotlight-surface ${isReached ? 'is-reached' : ''} ${isCurrent ? 'is-current-step' : ''}`}
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => setActiveIdx(idx)}
              onMouseMove={handleSpotlightMove}
            >
              <div className="process-card-num-row">
                <div className="process-num-with-icon">
                  <IconComp size={16} className="text-signal mr-2" />
                  <span className="process-mono-num">[{st.num}]</span>
                </div>
                <span className="process-step-pill">{st.duration}</span>
              </div>
              <h3>{st.title}</h3>
              <p>{st.desc}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};
