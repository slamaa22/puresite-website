import React from 'react';
import { Calculator, Layout, Code, CheckSquare, Rocket } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Modul-Kalkulation & Festpreis',
      desc: 'Wähle deine Wunschbausteine in unserem Rechner aus. Du siehst sofort den verbindlichen Endpreis und den kalkulierten Stundenaufwand vor Beginn.'
    },
    {
      num: '02',
      title: 'UI/UX Design & Entwurf',
      desc: 'Wir entwerfen ein maßgeschneidertes Screendesign abgestimmt auf deine Branche und dein Corporate Design – keine billigen WordPress-Templates.'
    },
    {
      num: '03',
      title: 'Code & Softwareentwicklung',
      desc: 'Wir programmieren deine Website mit modernen Webtechnologien (React & TypeScript) für maximale Ladezeiten und kompromisslose mobile Perfektion.'
    },
    {
      num: '04',
      title: 'Performance & DSGVO Audit',
      desc: 'Bevor deine Seite online geht, testen wir jeden Core Web Vital Wert (Google Score 98-100) und stellen 100% DSGVO-Konformität sicher.'
    },
    {
      num: '05',
      title: 'Livegang & Betreuung',
      desc: 'Nach deiner finalen Freigabe schalten wir deine Domain live. Mit unserem Sorglos-Paket kümmern wir uns danach um NVMe-Hosting und Zuruf-Updates.'
    }
  ];

  return (
    <section id="prozess" className="band band--tint section-shell" aria-labelledby="process-title">
      <div className="section-head">
        <h2 id="process-title">Ablauf & Meilensteine</h2>
        <span className="section-head-meta">5 klare Schritte von der Idee zum Livegang</span>
      </div>

      <p className="services-lead">
        Kein Agentur-Fachchinesisch, keine endlosen Feedback-Schleifen. Ein strukturierter, transparenter Entwicklungsprozess mit verbindlichen Terminen und 50/50 Meilenstein-Zahlung.
      </p>

      <div className="process-artisan-grid">
        {steps.map((st, idx) => (
          <article key={idx} className="process-artisan-card">
            <div className="process-card-num-row">
              <span className="process-mono-num">[{st.num}]</span>
              <span className="process-step-pill">Schritt {idx + 1} von 5</span>
            </div>
            <h4>{st.title}</h4>
            <p>{st.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
};
