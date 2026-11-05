import React, { useState, useEffect } from 'react';
import { X, Shield, FileText, Check } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  initialTab: 'impressum' | 'datenschutz';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'impressum' | 'datenschutz'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="demo-modal-overlay" onClick={onClose}>
      <div className="legal-modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="demo-modal-header">
          <div className="legal-tabs-header">
            <button 
              className={`legal-tab-btn ${activeTab === 'impressum' ? 'active' : ''}`}
              onClick={() => setActiveTab('impressum')}
            >
              <FileText size={16} /> Impressum (§ 5 ECG)
            </button>
            <button 
              className={`legal-tab-btn ${activeTab === 'datenschutz' ? 'active' : ''}`}
              onClick={() => setActiveTab('datenschutz')}
            >
              <Shield size={16} /> Datenschutzerklärung (DSGVO)
            </button>
          </div>
          <button className="demo-close-btn" onClick={onClose} aria-label="Schließen">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="legal-modal-body">
          {activeTab === 'impressum' ? (
            <div className="legal-content-block">
              <h3>Impressum</h3>
              <p className="legal-sub">Informationspflicht laut § 5 E-Commerce Gesetz, § 14 Unternehmensgesetzbuch, § 63 Gewerbeordnung und Offenlegungspflicht laut § 25 Mediengesetz.</p>

              <h4>Dienstanbieter & Medieninhaber</h4>
              <p>
                <strong>PureSite – Webdesign & Softwareentwicklung</strong><br />
                Gegründet von Constantin & Partner<br />
                Kaindorf / Steiermark, Österreich<br />
                E-Mail: <a href="mailto:office@puresite.at" className="text-cyan">office@puresite.at</a><br />
                Website: <a href="https://puresite.at" className="text-cyan">www.puresite.at</a>
              </p>

              <h4>Unternehmensgegenstand</h4>
              <p>
                Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik (Programmierung, Webentwicklung, UI/UX Design und IT-Beratung).
              </p>

              <h4>Berufsrecht / Gewerberecht</h4>
              <p>
                Gewerbeordnung: <a href="https://www.ris.bka.gv.at" target="_blank" rel="noreferrer" className="text-cyan">www.ris.bka.gv.at</a><br />
                Zuständige Aufsichtsbehörde: Bezirkshauptmannschaft Hartberg-Fürstenfeld / Steiermark
              </p>

              <h4>Haftung für Inhalte dieser Website</h4>
              <p>
                Wir entwickeln die Inhalte dieser Webseite ständig weiter und bemühen uns, korrekte und aktuelle Informationen bereitzustellen. Sollten Ihnen problematische oder rechtswidrige Inhalte auffallen, bitten wir Sie, uns umgehend zu kontaktieren.
              </p>

              <h4>Urheberrecht</h4>
              <p>
                Alle Inhalte dieser Webseite (Bilder, Fotos, Texte, Videos, Quellcode) unterliegen dem Urheberrecht. Unerlaubte Vervielfältigung oder Nutzung wird rechtlich verfolgt.
              </p>
            </div>
          ) : (
            <div className="legal-content-block">
              <h3>Datenschutzerklärung</h3>
              <p className="legal-sub">Verantwortungsvoller Umgang mit Ihren Daten gemäß EU-Datenschutz-Grundverordnung (DSGVO) und TKG 2021.</p>

              <div className="dsgvo-highlight-box">
                <Check size={20} className="text-emerald" />
                <div>
                  <strong>PureSite Privatsphäre-Versprechen:</strong>
                  <p>Diese Website verwendet <strong>KEINE zustimmungspflichtigen Tracking-Cookies</strong> und keine US-Drittanbieter-Pixel. Sie können diese Website ohne lästiges Cookie-Banner und ohne Überwachung nutzen.</p>
                </div>
              </div>

              <h4>1. Verantwortlicher</h4>
              <p>
                PureSite – Webdesign & Softwareentwicklung Kaindorf<br />
                E-Mail: office@puresite.at
              </p>

              <h4>2. Server-Logfiles & Hosting</h4>
              <p>
                Beim Aufrufen unserer Website speichert der Webserver automatisch technische Zugriffsdaten (wie IP-Adresse, Datum/Uhrzeit, abgerufene URL, Browser-Typ). Dies dient der Systemsicherheit und Stabilität unseres Netzes (Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO). Die Server befinden sich innerhalb der Europäischen Union.
              </p>

              <h4>3. Kontaktaufnahme & Konfigurator-Anfragen</h4>
              <p>
                Wenn Sie per Formular, E-Mail oder WhatsApp Kontakt mit uns aufnehmen, werden Ihre angegebenen Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter (Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO).
              </p>

              <h4>4. Anonyme Reichweitenmessung (Cookieloses Open-Source-Analytics)</h4>
              <p>
                Zur technischen Optimierung unseres Angebots nutzen wir die quelloffene Software <strong>Umami Analytics</strong> in rein cookieloser Konfiguration. Es werden <strong>keine Cookies</strong> auf Ihrem Endgerät gespeichert, keine geräteübergreifenden Profile gebildet und keine Daten an Werbenetzwerke weitergegeben. Die rein statistische Auswertung erfolgt anonymisiert auf Grundlage unseres berechtigten Interesses gemäß Art. 6 Abs. 1 lit. f DSGVO sowie § 165 Abs. 3 TKG 2021.
              </p>

              <h4>5. Ihre Rechte nach der DSGVO</h4>
              <p>
                Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können Sie sich an die österreichische Datenschutzbehörde (Barichgasse 40-42, 1030 Wien, dsb@dsb.gv.at) wenden.
              </p>
            </div>
          )}
        </div>

        <div className="demo-modal-footer">
          <div className="demo-footer-info">
            <span>Stand: November 2026 · Rechtsraum Österreich (DSGVO)</span>
          </div>
          <button className="btn-primary-sm" onClick={onClose}>
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
