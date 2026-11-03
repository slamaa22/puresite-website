import React from 'react';
import { Zap, Shield, Layers, Check, X } from 'lucide-react';

interface ComparisonCriterion {
  id: string;
  num: string;
  title: string;
  pureSite: {
    text: string;
    badge?: string;
    isCode?: boolean;
  };
  agencies: string;
  builders: string;
}

const COMPARISON_CRITERIA: ComparisonCriterion[] = [
  {
    id: 'speed',
    num: '01',
    title: 'Ladezeit & Google Score',
    pureSite: {
      text: '98 - 100 (Unter 0.5s)',
      badge: 'Bestwert'
    },
    agencies: '40 - 70 (Träge & 3-6s)',
    builders: '50 - 65 (Aufgebläht)'
  },
  {
    id: 'pricing',
    num: '02',
    title: 'Preistransparenz',
    pureSite: {
      text: '100% Fixpreis pro Modul online',
      badge: 'Garantie'
    },
    agencies: 'Oft vage Stundensätze & Nachrechnung',
    builders: 'Abo-Falle mit ständigen Upgrades'
  },
  {
    id: 'tech',
    num: '03',
    title: 'Technologie-Stack',
    pureSite: {
      text: 'React 19, TypeScript, Vite & NVMe',
      badge: 'Modern',
      isCode: true
    },
    agencies: 'Altes PHP & schweres WordPress/Elementor',
    builders: 'Proprietärer, geschlossener Baukastencode'
  },
  {
    id: 'maintenance',
    num: '04',
    title: 'Wartungsaufwand & Bugs',
    pureSite: {
      text: 'Nahezu 0 (Kein Plugin-Chaos)',
      badge: 'Stabil'
    },
    agencies: 'Ständige Plugin-Updates & Absturzgefahr',
    builders: 'Automatisch, aber null Kontrolle'
  },
  {
    id: 'contact',
    num: '05',
    title: 'Ansprechpartner',
    pureSite: {
      text: 'Direkt die beiden Entwickler (WhatsApp/Tel)',
      badge: 'Direkt'
    },
    agencies: 'Anonyme Junior-Account-Manager',
    builders: 'Nur automatisierte Bots & Tickets'
  },
  {
    id: 'dsgvo',
    num: '06',
    title: 'DSGVO & Daten in Österreich',
    pureSite: {
      text: '100% DSGVO-Clean ohne Tracker Cookies',
      badge: '100% Konform'
    },
    agencies: 'Oft US-Drittanbieter-Tracking integriert',
    builders: 'US-Cloud Server mit Tracking-Zwang'
  }
];

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

      {/* The Brutalist Comparison Data Table (Desktop) + Bento-Cards (Mobile) */}
      <div className="comparison-block">
        <div className="comparison-head">
          <h3>Der technische Faktencheck</h3>
          <span className="comparison-meta">Vergleich nach objektiven Kriterien</span>
        </div>

        {/* Desktop Table View */}
        <div className="table-scroll-container comparison-desktop-table">
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
              {COMPARISON_CRITERIA.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.title}</strong></td>
                  <td className="td-puresite">
                    {item.pureSite.isCode ? (
                      <code>{item.pureSite.text}</code>
                    ) : item.pureSite.badge === 'Bestwert' ? (
                      <span className="table-tag tag-success">{item.pureSite.text}</span>
                    ) : (
                      <strong className="text-success inline-flex-center">
                        <Check size={14} className="mr-1" /> {item.pureSite.text}
                      </strong>
                    )}
                  </td>
                  <td>
                    <span className="text-danger inline-flex-center">
                      <X size={14} className="mr-1" /> {item.agencies}
                    </span>
                  </td>
                  <td>
                    <span className="text-danger inline-flex-center">
                      <X size={14} className="mr-1" /> {item.builders}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Bento-Cards View (Option 1: Keine gestauchte Tabelle auf Handys) */}
        <div className="comparison-mobile-cards" aria-label="Technischer Faktencheck Mobil">
          {COMPARISON_CRITERIA.map((item) => (
            <article key={item.id} className="comparison-bento-card">
              <div className="bento-card-header">
                <span className="bento-card-idx">[{item.num}]</span>
                <h4 className="bento-card-title">{item.title}</h4>
              </div>

              {/* PureSite Highlight Hero Box */}
              <div className="bento-winner-box">
                <div className="bento-winner-head">
                  <div className="bento-brand-tag">
                    <span className="bento-dot-pulse" aria-hidden="true"></span>
                    <strong>PureSite</strong>
                  </div>
                  {item.pureSite.badge && (
                    <span className="bento-best-badge">{item.pureSite.badge}</span>
                  )}
                </div>
                <div className="bento-winner-value">
                  <Check size={16} className="text-signal mr-1.5 flex-shrink-0" />
                  {item.pureSite.isCode ? (
                    <code>{item.pureSite.text}</code>
                  ) : (
                    <strong>{item.pureSite.text}</strong>
                  )}
                </div>
              </div>

              {/* Competitors List */}
              <div className="bento-competitors-block">
                <div className="bento-comp-row">
                  <span className="bento-comp-name">Klassische Agenturen:</span>
                  <div className="bento-comp-val">
                    <X size={13} className="text-danger mr-1.5 flex-shrink-0" />
                    <span>{item.agencies}</span>
                  </div>
                </div>

                <div className="bento-comp-row">
                  <span className="bento-comp-name">Baukästen (Wix, Jimdo):</span>
                  <div className="bento-comp-val">
                    <X size={13} className="text-danger mr-1.5 flex-shrink-0" />
                    <span>{item.builders}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
