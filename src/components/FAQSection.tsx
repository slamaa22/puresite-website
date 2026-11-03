import React, { useState } from 'react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Warum verwendet PureSite kein WordPress?',
      a: 'WordPress wurde 2003 für Weblogs erfunden und ist heute durch hunderte Plugins oft quälend langsam, wartungsintensiv und ein permanentes Ziel für Sicherheitslücken. Wir entwickeln mit modernen Frameworks (React 19 & TypeScript): Deine Seite lädt in unter 0.5 Sekunden, ist DSGVO-konform ohne Cookie-Tracking-Pflicht und benötigt praktisch keinen Wartungsaufwand.'
    },
    {
      q: 'Warum arbeitet PureSite mit einem modularen Baustein-Konzept?',
      a: 'Klassische Agenturen verlangen Pauschalen von 5.000 € bis 10.000 €, in denen Leistungen eingerechnet sind, die du gar nicht benötigst. Mit unserem Bausteinkonzept zahlst du ausschließlich das, was für deinen Betrieb echten Mehrwert bringt. Zudem kannst du jedes Feature vorab in unserer Live-Demo testen.'
    },
    {
      q: 'Kann ich Texte, Bilder und News später selbst bearbeiten?',
      a: 'Ja! Mit unserem Modul T-01 ("Headless CMS-Anbindung") erhältst du ein extrem benutzerfreundliches, aufgeräumtes Redaktions-Dashboard. Du kannst alle Inhalte in Sekunden selbst anpassen – ganz ohne Gefahr, das Design oder die Technik zu beschädigen. Eine 30-minütige persönliche Video-Schulung ist inklusive.'
    },
    {
      q: 'Wie läuft die Bezahlung und die 50/50 Meilenstein-Regelung ab?',
      a: 'Fair und transparent: 50% des einmaligen Projektpreises werden bei Auftragserteilung und Designstart fällig. Die verbleibenden 50% zahlst du erst nach deiner vollkommenen Zufriedenheit und finalen Freigabe kurz vor dem Livegang auf deiner Domain.'
    },
    {
      q: 'Wie lange dauert die Fertigstellung unserer neuen Website?',
      a: 'Ein "Digitaler Start" One-Pager ist in der Regel innerhalb von 5 bis 7 Werktagen online. Ein umfassendes "Business"-Paket mit 4 Unterseiten und Spezialmodulen (z.B. Rechner oder Terminbuchung) benötigt typischerweise 2 bis 3 Wochen ab Bereitstellung der Inhalte.'
    },
    {
      q: 'Kann ich später weitere Module nachbestellen?',
      a: 'Absolut. Weil wir mit moderner, modularer Softwarearchitektur arbeiten, lässt sich deine Website jederzeit flexibel erweitern – beispielsweise um einen Bewerber-Funnel, einen Blog, Mehrsprachigkeit oder einen individuellen Preisrechner.'
    }
  ];

  return (
    <section id="faq" className="band section-shell" aria-labelledby="faq-title">
      <div className="section-head">
        <h2 id="faq-title">Häufige Fragen (FAQ)</h2>
        <span className="section-head-meta">Transparente Antworten ohne Agentur-Floskeln</span>
      </div>

      <div className="faq-artisan-list">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx} 
              className={`faq-artisan-item ${isOpen ? 'is-open' : ''}`}
            >
              <button 
                className="faq-artisan-trigger"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span className="faq-mono-idx">[{String(idx + 1).padStart(2, '0')}]</span>
                <span className="faq-question-text">{faq.q}</span>
                <span className="faq-toggle-icon">{isOpen ? '[-]' : '[+]'}</span>
              </button>

              {isOpen && (
                <div className="faq-artisan-body">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
