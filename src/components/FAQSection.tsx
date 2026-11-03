import React, { useState } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
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
    },
    {
      q: 'Warum verwendet PureSite kein WordPress?',
      a: 'WordPress wurde 2003 für Blogs erfunden und ist heute durch hunderte Plugins oft langsam, fehleranfällig und ein permanentes Ziel für Hacker-Angriffe. Wir entwickeln mit modernen Frameworks (React & Vite): Deine Seite lädt in unter 0.5 Sekunden, ist DSGVO-konform ohne Cookie-Tracking-Pflicht und benötigt nahezu null Wartungsaufwand.'
    }
  ];

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-head text-center">
          <div className="badge-pill">
            <Sparkles size={14} /> Häufige Fragen
          </div>
          <h2 className="section-title">
            Alles, was du über <span className="gradient-text">PureSite</span> wissen musst.
          </h2>
          <p className="section-subtitle">
            Transparenz ist unser oberstes Gebot. Hier beantworten wir die wichtigsten Fragen zu unserem Modulsystem und der Zusammenarbeit.
          </p>
        </div>

        <div className="faq-accordion-wrap">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item glass-panel ${isOpen ? 'open' : ''}`}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
              >
                <div className="faq-question-row">
                  <h4>{faq.q}</h4>
                  <div className={`faq-chevron ${isOpen ? 'rotate' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </div>
                {isOpen && (
                  <div className="faq-answer-row animated-fade">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
