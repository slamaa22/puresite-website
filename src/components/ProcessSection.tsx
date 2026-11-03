import React from 'react';
import { Sparkles, Calculator, Layout, Code, CheckSquare, Rocket } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: <Calculator size={22} className="text-cyan" />,
      title: 'Modul-Kalkulation & Fixpreis',
      desc: 'Wähle deine Wunschbausteine in unserem Rechner aus. Du siehst sofort den verbindlichen Endpreis und den kalkulierten Stundenaufwand.'
    },
    {
      num: '02',
      icon: <Layout size={22} className="text-purple" />,
      title: 'UI/UX Design-Entwurf',
      desc: 'Wir entwerfen ein maßgeschneidertes, modernes Screendesign abgestimmt auf deine Branche und dein Corporate Design – keine Stangenware.'
    },
    {
      num: '03',
      icon: <Code size={22} className="text-emerald" />,
      title: 'High-End Webentwicklung',
      desc: 'Wir programmieren deine Website mit modernen Webtechnologien (React & TypeScript) für maximale Ladezeiten und mobile Perfektion.'
    },
    {
      num: '04',
      icon: <CheckSquare size={22} className="text-cyan" />,
      title: 'Performance & DSGVO Audit',
      desc: 'Bevor deine Seite online geht, testen wir jeden Core Web Vital Wert (Google Score 95+) und garantieren 100%ige DSGVO-Konformität.'
    },
    {
      num: '05',
      icon: <Rocket size={22} className="text-purple" />,
      title: 'Go-Live & Support',
      desc: 'Nach deiner finalen Freigabe schalten wir deine Domain live. Mit unserem Sorglos-Paket kümmern wir uns danach um Hosting und Zuruf-Updates.'
    }
  ];

  return (
    <section id="prozess" className="process-section">
      <div className="container">
        <div className="section-head text-center">
          <div className="badge-pill">
            <Sparkles size={14} /> Transparenter Ablauf
          </div>
          <h2 className="section-title">
            In 5 klaren Schritten zu deiner <span className="gradient-text">Traum-Website</span>.
          </h2>
          <p className="section-subtitle">
            Kein Agentur-Fachchinesisch, keine endlosen Schleifen. Ein strukturierter, transparenter Entwicklungsprozess, der termingerecht liefert.
          </p>
        </div>

        <div className="process-timeline-grid">
          {steps.map((st, idx) => (
            <div key={idx} className="process-step-card glass-panel">
              <div className="step-card-top">
                <div className="step-num">{st.num}</div>
                <div className="step-icon-wrap">{st.icon}</div>
              </div>
              <h4 className="step-title">{st.title}</h4>
              <p className="step-desc">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
