import React, { useState } from 'react';

interface FAQSectionProps {
  onOpenContact?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenContact }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Für welche Unternehmen in Graz und der Steiermark eignet sich PureSite?',
      a: 'Wir entwickeln moderne Websites und Relaunches vor allem für lokale Betriebe, Handwerksunternehmen, Kanzleien, Praxen und KMU in Graz, der Steiermark und ganz Österreich. Wenn Sie eine schnelle, professionelle Website ohne WordPress-Wartungsaufwand suchen, bei der Sie direkt mit den Entwicklern sprechen und vorab einen festen Preis kennen, sind Sie bei uns genau richtig.'
    },
    {
      q: 'Ist bei PureSite professionelle Suchmaschinenoptimierung (SEO) inklusive?',
      a: 'Ja. Jede PureSite-Website wird von Grund auf für Google optimiert: Semantische HTML5-Architektur, Google-Rich-Snippets (Schema.org), OpenGraph-Vorschauen und blitzschnelle Ladezeiten (Core Web Vitals 100/100). Zusätzlich bieten wir mit unseren Modulen gezielte lokale SEO-Optimierung für Google Maps und regionale Suchbegriffe (wie "Webdesign Graz" oder "Handwerker Steiermark").'
    },
    {
      q: 'Ist das Erstgespräch wirklich kostenlos und unverbindlich?',
      a: 'Ja. Das Erstgespräch ist zu 100% kostenlos und unverbindlich – telefonisch, per Video-Meeting oder direkt über Ihre vorab zusammengestellte Konfiguration. Bezahlte Arbeiten beginnen erst, wenn Umfang und Festpreis gemeinsam fixiert sind.'
    },
    {
      q: 'Warum entwickelt PureSite mit modernem Web-Code statt WordPress?',
      a: 'WordPress ist durch dutzende Drittanbieter-Plugins oft träge, wartungsintensiv und anfällig für Sicherheitslücken nach Updates. Unsere modernen React- & TypeScript-Websites laden in unter 0,4 Sekunden, benötigen keine anfälligen Plugins und laufen DSGVO-sauber ohne Cookie-Tracking-Zwang.'
    },
    {
      q: 'Wie funktioniert die 50/50 Zahlung und Festpreisgarantie?',
      a: 'Jedes Modul hat einen klaren, vorab sichtbaren Festpreis ohne Nachverrechnung nach Stunden. 50% des einmaligen Projektpreises werden bei Projektstart fällig, die zweiten 50% erst nach Ihrer finalen Freigabe beim Livegang auf Ihrer Domain.'
    },
    {
      q: 'Kann ich Texte und Bilder später selbst ändern oder ändern lassen?',
      a: 'Beides ist möglich: Mit dem Admin-Dashboard (Modul T-01) bearbeiten Sie Inhalte jederzeit selbst ohne laufende CMS-Abokosten. Alternativ ist in unserem Standard-Hosting (M-01) bereits 1 Stunde und im Sorglos-Paket Pro (M-02) volle 3 Stunden Änderungs-Support pro Monat per kurzem WhatsApp- oder E-Mail-Zuruf inklusive.'
    },
    {
      q: 'Wie schnell geht unsere neue Website online?',
      a: 'Ein kompakter One-Pager ("Digitaler Start") ist in der Regel binnen 5 bis 8 Werktagen startklar. Eine mehrseitige Unternehmens-Website inklusive Spezialmodulen wie Preisrechner oder Online-Terminbuchung dauert typischerweise 2 bis 3 Wochen.'
    },
    {
      q: 'Kann ich mit einem kleinen Umfang starten und später erweitern?',
      a: 'Ja, jederzeit. Dank unserer modularen Architektur können Sie schlank beginnen und später nahtlos weitere Unterseiten, Mehrsprachigkeit, einen Bewerber-Funnel oder interaktive Tools ergänzen.'
    }
  ];

  return (
    <>
      {/* 1. PURESITE ASYMMETRIC 2-COLUMN FAQ SECTION */}
      <section id="faq" className="ps-section ps-wrap ps-faq-section" aria-labelledby="faq-title">
        <div className="ps-faq-intro" data-reveal>
          <p className="ps-overline">Gut zu wissen</p>
          <h2 id="faq-title">Häufige Fragen</h2>
          <p className="ps-faq-sub">
            Offene Antworten ohne Agentur-Floskeln. Falls Ihr Anliegen nicht dabei ist, schreiben
            Sie uns einfach direkt.
          </p>
          {onOpenContact && (
            <button type="button" className="ps-text-link" onClick={onOpenContact}>
              <span>Direkt eine Frage stellen</span>
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

        <div className="ps-faq-list lg-glass-panel" data-reveal>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className={`ps-faq-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="ps-faq-trigger"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`ps-faq-plus ${isOpen ? 'is-open' : ''}`}
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>

                <div className={`faq-collapse-grid ${isOpen ? 'is-open' : ''}`}>
                  <div className="faq-collapse-inner">
                    <div className="ps-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. PURESITE FULL-WIDTH CLOSING CONTACT BAND IN PRISMATIC LIQUID GLASS */}
      {onOpenContact && (
        <section className="ps-contact-band" aria-labelledby="closing-cta-heading">
          <div className="ps-wrap ps-contact-band-inner" data-reveal>
            <div>
              <p className="ps-overline">Der nächste Schritt</p>
              <h2 id="closing-cta-heading">
                Was möchten Sie mit Ihrer neuen Website verändern?
              </h2>
              <p>
                Die Erstberatung ist kostenlos und unverbindlich. Erzählen Sie uns kurz, was Sie
                vorhaben – wir besprechen gemeinsam den sinnvollsten nächsten Schritt.
              </p>
            </div>

            <div className="ps-contact-band-action">
              <button
                type="button"
                className="ps-btn ps-btn-light-glass"
                onClick={onOpenContact}
              >
                <span>Kostenlose Erstberatung anfragen</span>
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
                  <path d="M6 18 18 6M6 6h12v12" />
                </svg>
              </button>
              <span>Persönliche Rückmeldung durch Maximilian &amp; Loreno innerhalb von 24 Stunden.</span>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
