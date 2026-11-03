import React from 'react';
import { Zap, Shield, Layers, Check, X } from 'lucide-react';

export const WhyPureSite: React.FC = () => {
  return (
    <section id="warum-wir" className="band band--tint section-shell" aria-labelledby="why-title">
      <div className="section-head">
        <h2 id="why-title">Vergleich & Architektur</h2>
        <span className="section-head-meta">PureSite vs. Klassische Agenturen & Baukästen</span>
      </div>

      <p className="services-lead">
        Schluss mit trägem WordPress-Spam, 40 anfälligen Plugins und intransparenten 8.000 € Angeboten. Wir haben PureSite gegründet, um Betrieben in Österreich handgeschriebene High-Performance-Websites mit voller Preistransparenz zu bieten.
      </p>

      {/* 3 Pillar Spec Cards */}
      <div className="why-specs-grid">
        <article className="why-spec-card">
          <div className="spec-icon-row">
            <Zap size={20} className="text-signal" />
            <span className="spec-mono-badge">Ø 0.4s FCP</span>
          </div>
          <h3>Radikale Web-Performance</h3>
          <p>
            Während normale Agentur-Websites 3 bis 6 Sekunden für den ersten Aufbau brauchen, startet PureSite in unter 0.5 Sekunden. Google belohnt das mit Spitzen-Rankings – und deine Kunden verlassen die Seite nicht frustriert.
          </p>
          <ul className="spec-proof-list">
            <li>Lighthouse Score: 98 - 100/100</li>
            <li>Optimierte SVGs & WebP Assets</li>
            <li>Core Web Vitals im grünen Bereich</li>
          </ul>
        </article>

        <article className="why-spec-card">
          <div className="spec-icon-row">
            <Layers size={20} className="text-signal" />
            <span className="spec-mono-badge">18 Module</span>
          </div>
          <h3>Echtes Modul-Konzept</h3>
          <p>
            Du bezahlst nur, was dein Betrieb wirklich braucht. Kein überladenes Theme mit 90% ungenutztem Code. Brauchst du einen interaktiven Rechner oder Terminbuchung? Klick es einfach dazu.
          </p>
          <ul className="spec-proof-list">
            <li>100% verbindliche Festpreise pro Modul</li>
            <li>Jederzeit modular erweiterbar</li>
            <li>Keine versteckten Wartungsfallen</li>
          </ul>
        </article>

        <article className="why-spec-card">
          <div className="spec-icon-row">
            <Shield size={20} className="text-signal" />
            <span className="spec-mono-badge">0 PHP / SQL</span>
          </div>
          <h3>100% Ausfallsicher & DSGVO-Clean</h3>
          <p>
            Keine Datenbanken, die gehackt werden können, und keine 45 WordPress-Plugins, die nach jedem Update die Seite zerschießen. Unsere Jamstack-Architektur läuft stabil auf österreichischen NVMe-Servern.
          </p>
          <ul className="spec-proof-list">
            <li>0 Cookies nötig (kein nerviger Banner)</li>
            <li>DSGVO-Hosting in Österreich</li>
            <li>Kein ständiger Wartungs-Stress</li>
          </ul>
        </article>
      </div>

      {/* The Brutalist Comparison Data Table */}
      <div className="comparison-block">
        <div className="comparison-head">
          <h3>Der technische Faktencheck</h3>
          <span className="comparison-meta">Vergleich nach objektiven Kriterien</span>
        </div>

        <div className="table-scroll-container">
          <table className="artisan-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Kriterium</th>
                <th className="th-puresite" style={{ width: '32%' }}>
                  <div className="th-badge-brand">
                    <span>PureSite</span>
                  </div>
                </th>
                <th style={{ width: '22%' }}>Klassische Agenturen</th>
                <th style={{ width: '18%' }}>Baukästen (Wix, Jimdo)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Ladezeit & Google Score</strong></td>
                <td className="td-puresite">
                  <span className="table-tag tag-success">98 - 100 (Unter 0.5s)</span>
                </td>
                <td><span className="table-tag tag-warn">40 - 70 (Träge)</span></td>
                <td><span className="table-tag tag-warn">50 - 65 (Aufgebläht)</span></td>
              </tr>
              <tr>
                <td><strong>Preistransparenz</strong></td>
                <td className="td-puresite">
                  <strong className="text-success inline-flex-center">
                    <Check size={14} className="mr-1" /> 100% Fixpreis pro Modul online
                  </strong>
                </td>
                <td>
                  <span className="text-danger inline-flex-center">
                    <X size={14} className="mr-1" /> Oft vage Stundensätze & Nachrechnung
                  </span>
                </td>
                <td>Abo-Falle mit ständigen Upgrades</td>
              </tr>
              <tr>
                <td><strong>Technologie-Stack</strong></td>
                <td className="td-puresite">
                  <code>React 19, TypeScript, Vite & NVMe</code>
                </td>
                <td>Altes PHP & schweres WordPress/Elementor</td>
                <td>Proprietärer, geschlossener Baukastencode</td>
              </tr>
              <tr>
                <td><strong>Wartungsaufwand & Bugs</strong></td>
                <td className="td-puresite">
                  <span className="text-success inline-flex-center">
                    <Check size={14} className="mr-1" /> Nahezu 0 (Kein Plugin-Chaos)
                  </span>
                </td>
                <td>Ständige Plugin-Updates & Absturzgefahr</td>
                <td>Automatisch, aber null Kontrolle</td>
              </tr>
              <tr>
                <td><strong>Ansprechpartner</strong></td>
                <td className="td-puresite">
                  <strong className="text-success inline-flex-center">
                    <Check size={14} className="mr-1" /> Direkt die beiden Entwickler (WhatsApp/Tel)
                  </strong>
                </td>
                <td>Anonyme Junior-Account-Manager</td>
                <td>Nur automatisierte Bots & Tickets</td>
              </tr>
              <tr>
                <td><strong>DSGVO & Daten in Österreich</strong></td>
                <td className="td-puresite">
                  <span className="text-success inline-flex-center">
                    <Check size={14} className="mr-1" /> 100% DSGVO-Clean ohne Tracker Cookies
                  </span>
                </td>
                <td>Oft US-Drittanbieter-Tracking integriert</td>
                <td>US-Cloud Server mit Tracking-Zwang</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
