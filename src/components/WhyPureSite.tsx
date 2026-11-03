import React from 'react';
import { Sparkles, Zap, Shield, Layers } from 'lucide-react';

export const WhyPureSite: React.FC = () => {
  return (
    <section id="warum-wir" className="why-section">
      <div className="container">
        <div className="section-head text-center">
          <div className="badge-pill">
            <Sparkles size={14} /> Warum PureSite?
          </div>
          <h2 className="section-title">
            Schluss mit trägem <span className="gradient-text">WordPress-Spam</span> und starren Baukästen.
          </h2>
          <p className="section-subtitle">
            Wir haben PureSite gegründet, weil wir die Schnauze voll hatten von überteuerten Agenturen, die 8.000 € für langsame Elementor-Templates verlangen und jeden Monat 300 € Support berechnen.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="why-cards-grid">
          <div className="why-card glass-panel">
            <div className="why-card-icon text-cyan">
              <Zap size={24} />
            </div>
            <h4>Radikale Web-Performance</h4>
            <p>
              Während normale Agentur-Websites oft 3 bis 6 Sekunden laden, starten unsere PureSite-Seiten in unter 0.5 Sekunden. Google liebt schnelle Seiten – und deine Kunden auch.
            </p>
          </div>

          <div className="why-card glass-panel">
            <div className="why-card-icon text-purple">
              <Layers size={24} />
            </div>
            <h4>Echtes Modul-Konzept</h4>
            <p>
              Du bezahlst nur, was du wirklich nutzt. Brauchst du keinen Blog? Raus damit. Willst du einen interaktiven Rechner oder Terminbuchung? Einfach dazubuchen. 100% maßgeschneidert.
            </p>
          </div>

          <div className="why-card glass-panel">
            <div className="why-card-icon text-emerald">
              <Shield size={24} />
            </div>
            <h4>100% Ausfallsicher & Unhackbar</h4>
            <p>
              Keine 45 anfälligen WordPress-Plugins, die nach jedem Update die Seite zerschießen. Unsere modernen Jamstack/React-Lösungen haben keine Datenbank-Sicherheitslücken.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="comparison-table-wrapper glass-panel">
          <div className="comparison-table-header">
            <h3>Der schonungslose Vergleich</h3>
            <p>Warum moderne Betriebe auf PureSite statt auf klassische Alt-Agenturen setzen:</p>
            <div className="table-scroll-hint">
              <span>↔ Tabelle horizontal wischen für alle Details</span>
            </div>
          </div>

          <div className="table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Kriterium</th>
                  <th className="highlight-col">PureSite</th>
                  <th>Klassische Agenturen</th>
                  <th>Baukästen (Wix, Jimdo)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Ladezeit (Google Score)</strong></td>
                  <td className="highlight-col"><span className="tag-best">95 - 100 (Unter 0.5s)</span></td>
                  <td><span className="tag-bad">40 - 70 (Träge)</span></td>
                  <td><span className="tag-bad">50 - 65 (Aufgebläht)</span></td>
                </tr>
                <tr>
                  <td><strong>Preistransparenz</strong></td>
                  <td className="highlight-col"><span className="text-emerald">✓ Fixpreis pro Modul online kalkulierbar</span></td>
                  <td><span className="text-rose">✗ Oft vage Stundensätze & Nachverrechnungen</span></td>
                  <td><span className="text-muted">Abo-Falle mit ständigen Upgrades</span></td>
                </tr>
                <tr>
                  <td><strong>Technologie-Stack</strong></td>
                  <td className="highlight-col">React, TypeScript, Vite & Headless CMS</td>
                  <td>Altes PHP & schweres WordPress/Elementor</td>
                  <td>Proprietärer geschlossener Quellcode</td>
                </tr>
                <tr>
                  <td><strong>Wartungsaufwand & Bugs</strong></td>
                  <td className="highlight-col"><span className="text-emerald">Nahezu 0 Wartungsfehler (Kein Plugin-Chaos)</span></td>
                  <td>Ständige Plugin-Updates & Absturzgefahr</td>
                  <td>Automatisch, aber null Code-Kontrolle</td>
                </tr>
                <tr>
                  <td><strong>Ansprechpartner</strong></td>
                  <td className="highlight-col"><span className="text-emerald">Direkt mit uns als Entwickler via WhatsApp/Mail</span></td>
                  <td>Anonyme Junior-Account-Manager</td>
                  <td>Nur automatisierte Chatbots & Ticket-Systeme</td>
                </tr>
                <tr>
                  <td><strong>DSGVO & Server-Standort</strong></td>
                  <td className="highlight-col"><span className="text-emerald">100% Österreich / DSGVO Clean ohne Cookies</span></td>
                  <td>Häufig US-Drittanbieter-Tracking eingebaut</td>
                  <td>US-Cloud Server mit Tracking-Zwang</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
