import React, { useState } from 'react';
import { Zap, Shield, Layers, Check, X, Calculator, ArrowRight } from 'lucide-react';
import { handleSpotlightMove, useAnimatedNumber } from '../hooks/useMotion';

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
      text: 'React 19, TypeScript & Dedicated Server',
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

interface WhyPureSiteProps {
  onScrollToPricing?: () => void;
}

export const WhyPureSite: React.FC<WhyPureSiteProps> = ({ onScrollToPricing }) => {
  const [horizonYears, setHorizonYears] = useState<1 | 3 | 5>(3);

  // Realistic Austrian market TCO comparison (Business multi-page website + hosting/care)
  const pureSiteTotal = 1500 + horizonYears * 12 * 25; // Business Web 1.500 € + 25 €/mo Dedicated Hosting
  const agencyTotal = 5400 + horizonYears * 12 * 130 + (horizonYears === 5 ? 1200 : 0); // 5.400 € WP Agency + 130 €/mo plugin maintenance + plugin repair
  const savedAmount = agencyTotal - pureSiteTotal;

  const animPure = useAnimatedNumber(pureSiteTotal);
  const animAgency = useAnimatedNumber(agencyTotal);
  const animSaved = useAnimatedNumber(savedAmount);

  return (
    <section
      id="warum-wir"
      className="band band--tint section-shell"
      aria-labelledby="why-title"
    >
      <div className="section-head" data-reveal>
        <h2 id="why-title">Vergleich &amp; Architektur</h2>
        <span className="section-head-meta">
          PureSite vs. Klassische Agenturen &amp; Baukästen
        </span>
      </div>

      <p className="services-lead" data-reveal>
        Schluss mit trägem WordPress-Ballast, 40 anfälligen Plugins und intransparenten 8.000 €
        Angeboten. Wir haben PureSite gegründet, um Betrieben in Österreich handgeschriebene
        High-Performance-Websites mit voller Preistransparenz zu bieten.
      </p>

      {/* 3 Pillar Spec Cards */}
      <div className="why-specs-grid" data-reveal>
        <article
          className="why-spec-card spotlight-surface"
          onMouseMove={handleSpotlightMove}
        >
          <div className="spec-icon-row">
            <Zap size={20} className="text-signal" />
            <span className="spec-mono-badge">Ø 0.4s FCP</span>
          </div>
          <h3>Radikale Web-Performance</h3>
          <p>
            Während normale Agentur-Websites 3 bis 6 Sekunden für den ersten Aufbau brauchen,
            startet PureSite in unter 0.5 Sekunden. Google belohnt das mit Spitzen-Rankings – und
            deine Kunden verlassen die Seite nicht frustriert.
          </p>
          <ul className="spec-proof-list">
            <li>Lighthouse Score: 98 - 100/100</li>
            <li>Optimierte SVGs &amp; WebP Assets</li>
            <li>Core Web Vitals im grünen Bereich</li>
          </ul>
        </article>

        <article
          className="why-spec-card spotlight-surface"
          onMouseMove={handleSpotlightMove}
        >
          <div className="spec-icon-row">
            <Layers size={20} className="text-signal" />
            <span className="spec-mono-badge">18 Module</span>
          </div>
          <h3>Echtes Modul-Konzept</h3>
          <p>
            Du bezahlst nur, was dein Betrieb wirklich braucht. Kein überladenes Theme mit 90%
            ungenutztem Code. Brauchst du einen interaktiven Rechner oder Terminbuchung? Klick es
            einfach dazu.
          </p>
          <ul className="spec-proof-list">
            <li>100% verbindliche Festpreise pro Modul</li>
            <li>Jederzeit modular erweiterbar</li>
            <li>Keine versteckten Wartungsfallen</li>
          </ul>
        </article>

        <article
          className="why-spec-card spotlight-surface"
          onMouseMove={handleSpotlightMove}
        >
          <div className="spec-icon-row">
            <Shield size={20} className="text-signal" />
            <span className="spec-mono-badge">0 PHP / SQL</span>
          </div>
          <h3>100% Ausfallsicher &amp; DSGVO-Clean</h3>
          <p>
            Keine Datenbanken, die gehackt werden können, und keine 45 WordPress-Plugins, die nach
            jedem Update die Seite zerschießen. Unsere Jamstack-Architektur läuft stabil auf
            dedizierten EU-Servern.
          </p>
          <ul className="spec-proof-list">
            <li>0 Cookies nötig (kein nerviger Banner)</li>
            <li>DSGVO-konformes EU-Hosting</li>
            <li>Kein ständiger Wartungs-Stress</li>
          </ul>
        </article>
      </div>

      {/* The Brutalist Comparison Data Table (Desktop) + Bento-Cards (Mobile) */}
      <div className="comparison-block" data-reveal>
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
                    <span className="badge-recommend">Empfehlung</span>
                  </div>
                </th>
                <th style={{ width: '22%' }}>Klassische Agenturen</th>
                <th style={{ width: '18%' }}>Baukästen (Wix, Jimdo)</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_CRITERIA.map(item => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.title}</strong>
                  </td>
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

        {/* Mobile Bento-Cards View */}
        <div className="comparison-mobile-cards" aria-label="Technischer Faktencheck Mobil">
          {COMPARISON_CRITERIA.map(item => (
            <article key={item.id} className="comparison-bento-card">
              <div className="bento-card-header">
                <span className="bento-card-idx">[{item.num}]</span>
                <h4 className="bento-card-title">{item.title}</h4>
              </div>

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

      {/* Interactive TCO (Total Cost of Ownership) Benchmark Bar */}
      <div className="tco-benchmark-card spotlight-surface" onMouseMove={handleSpotlightMove} data-reveal>
        <div className="tco-head-row">
          <div className="tco-title-col">
            <span className="tco-eyebrow">
              <Calculator size={13} /> Gesamtkosten-Vergleich (Business-Website inkl. Hosting)
            </span>
            <h3>Was kostet eine professionelle Website wirklich auf Sicht?</h3>
          </div>

          <div className="tco-horizon-pills" role="group" aria-label="Zeitraum wählen">
            {([1, 3, 5] as const).map(yr => (
              <button
                key={yr}
                type="button"
                className={`tco-pill-btn ${horizonYears === yr ? 'active' : ''}`}
                onClick={() => setHorizonYears(yr)}
              >
                {yr} {yr === 1 ? 'Jahr' : 'Jahre'}
              </button>
            ))}
          </div>
        </div>

        <div className="tco-bars-comparison">
          <div className="tco-bar-row">
            <div className="tco-bar-meta">
              <strong className="text-signal">PureSite (Business + Dedicated Hosting)</strong>
              <span className="tco-bar-amount text-signal">
                {animPure.toLocaleString('de-AT')} €
              </span>
            </div>
            <div className="tco-rail">
              <div
                className="tco-fill tco-fill-pure"
                style={{ width: `${Math.round((pureSiteTotal / agencyTotal) * 100)}%` }}
              />
            </div>
          </div>

          <div className="tco-bar-row">
            <div className="tco-bar-meta">
              <span>Klassische WordPress-Agentur (Setup + Plugin-Wartungsvertrag)</span>
              <span className="tco-bar-amount tco-amount-muted">
                ~{animAgency.toLocaleString('de-AT')} €
              </span>
            </div>
            <div className="tco-rail">
              <div className="tco-fill tco-fill-agency" style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        <div className="tco-footer-row">
          <div className="tco-savings-callout">
            Direkte Budget-Ersparnis über {horizonYears} {horizonYears === 1 ? 'Jahr' : 'Jahre'}:{' '}
            <strong>ca. {animSaved.toLocaleString('de-AT')} €</strong> – die du direkt in
            wertsteigernde Module wie Preisrechner oder Terminbuchung investieren kannst.
          </div>
          {onScrollToPricing && (
            <button
              type="button"
              className="button primary sm-button"
              onClick={onScrollToPricing}
            >
              <span>Eigenes Paket konfigurieren</span>
              <ArrowRight size={13} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
