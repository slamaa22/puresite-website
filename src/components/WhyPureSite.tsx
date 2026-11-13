import React, { useState, useRef, useEffect } from 'react';
import {
  Zap,
  Layers,
  Shield,
  Gauge,
  RefreshCw,
  CheckCircle2,
  Calculator,
  Server,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { handleSpotlightMove, useAnimatedNumber } from '../hooks/useMotion';

interface WhyPureSiteProps {
  onScrollToPricing?: () => void;
}

export const WhyPureSite: React.FC<WhyPureSiteProps> = ({ onScrollToPricing }) => {
  const [horizonYears, setHorizonYears] = useState<1 | 3 | 5>(3);
  const [selectedEngine, setSelectedEngine] = useState<'puresite' | 'wordpress'>('puresite');
  const [isSimulating, setIsSimulating] = useState(false);
  const [pureSiteProgress, setPureSiteProgress] = useState(100);
  const [wpProgress, setWpProgress] = useState(100);
  const [raceWinner, setRaceWinner] = useState<string | null>(null);

  const pureTimerRef = useRef<number | null>(null);
  const wpTimerRef = useRef<number | null>(null);

  const clearRaceTimers = () => {
    if (pureTimerRef.current !== null) {
      window.clearInterval(pureTimerRef.current);
      pureTimerRef.current = null;
    }
    if (wpTimerRef.current !== null) {
      window.clearInterval(wpTimerRef.current);
      wpTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearRaceTimers();
  }, []);

  const handleEngineSwitch = (engine: 'puresite' | 'wordpress') => {
    clearRaceTimers();
    setSelectedEngine(engine);
    setPureSiteProgress(100);
    setWpProgress(100);
    setIsSimulating(false);
    setRaceWinner(null);
  };

  const runSpeedSimulation = () => {
    if (isSimulating) return;
    clearRaceTimers();
    setIsSimulating(true);
    setRaceWinner(null);
    setPureSiteProgress(0);
    setWpProgress(0);

    pureTimerRef.current = window.setInterval(() => {
      setPureSiteProgress(prev => {
        if (prev >= 100) {
          if (pureTimerRef.current !== null) {
            window.clearInterval(pureTimerRef.current);
            pureTimerRef.current = null;
          }
          setRaceWinner(curr => curr ?? 'puresite');
          return 100;
        }
        return prev + 25;
      });
    }, 75);

    wpTimerRef.current = window.setInterval(() => {
      setWpProgress(prev => {
        if (prev >= 100) {
          if (wpTimerRef.current !== null) {
            window.clearInterval(wpTimerRef.current);
            wpTimerRef.current = null;
          }
          setIsSimulating(false);
          return 100;
        }
        return Math.min(100, prev + 3);
      });
    }, 90);
  };

  // Telemetry animated readouts
  const lighthouseScore = useAnimatedNumber(selectedEngine === 'puresite' ? 100 : 41, 420);
  const fcpHundredths = useAnimatedNumber(selectedEngine === 'puresite' ? 38 : 360, 420);
  const payloadKb = useAnimatedNumber(selectedEngine === 'puresite' ? 124 : 4800, 420);
  const cookieCount = useAnimatedNumber(selectedEngine === 'puresite' ? 0 : 14, 360);

  const ringCircumference = 2 * Math.PI * 19;
  const ringOffset = ringCircumference * (1 - lighthouseScore / 100);

  // Realistic Austrian market TCO comparison (Business multi-page website + hosting/care)
  const pureSiteTotal = 1500 + horizonYears * 12 * 25; // Business Web 1.500 € + 25 €/mo Dedicated Hosting inkl. 1h
  const agencyTotal = 5400 + horizonYears * 12 * 130 + (horizonYears === 5 ? 1200 : 0);
  const savedAmount = agencyTotal - pureSiteTotal;

  const animPure = useAnimatedNumber(pureSiteTotal);
  const animAgency = useAnimatedNumber(agencyTotal);
  const animSaved = useAnimatedNumber(savedAmount);

  return (
    <section
      id="warum-wir"
      className="ps-projects-preview"
      aria-labelledby="why-title"
    >
      <div className="ps-wrap ps-section">
        {/* PureSite 2-Column Section Heading */}
        <div className="ps-section-heading" data-reveal>
          <div>
            <p className="ps-overline">Praxis, Architektur &amp; Vergleich</p>
            <h2 id="why-title">So sehen unsere Lösungen in der Praxis aus</h2>
          </div>
          {onScrollToPricing && (
            <button type="button" className="ps-text-link" onClick={onScrollToPricing}>
              <span>Eigenen Umfang kalkulieren</span>
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

        {/* 1. PURESITE 3-COLUMN SCHEMATIC ARCHITECTURE TEASERS IN LIQUID GLASS */}
        <div className="ps-project-teaser-grid" data-reveal>
          {/* Card 1: High-Speed Jamstack Architecture */}
          <article className="ps-project-teaser">
            <figure
              className="ps-project-diagram lg-glass-card spotlight-surface"
              onMouseMove={handleSpotlightMove}
            >
              <figcaption>Schematische Architektur · Ladezeit &lt; 0,4s</figcaption>
              <div className="ps-diagram-canvas">
                <div className="ps-diagram-hub">
                  <Zap size={22} />
                  <span>React 19 Frontend (124 KB)</span>
                </div>
                <div className="ps-diagram-bridge" aria-hidden="true" />
                <div className="ps-diagram-branches-two">
                  <div className="ps-diagram-node">
                    <Gauge size={20} />
                    <span>100/100 Google Score</span>
                  </div>
                  <div className="ps-diagram-node">
                    <Shield size={20} />
                    <span>0 SQL / 0 Plugin-Lücken</span>
                  </div>
                </div>
              </div>
            </figure>
            <div className="ps-project-teaser-copy">
              <h3>Radikale Ladezeit statt WordPress-Trägheit</h3>
              <p>
                Keine überladenen Themes und keine 40 Plugins. Ihre Website startet auf Mobilgeräten
                sofort und wird von Google spürbar besser gereiht.
              </p>
            </div>
          </article>

          {/* Card 2: Modular Interactive Components */}
          <article className="ps-project-teaser">
            <figure
              className="ps-project-diagram lg-glass-card spotlight-surface"
              onMouseMove={handleSpotlightMove}
            >
              <figcaption>Schematische Darstellung · Modul-System</figcaption>
              <div className="ps-diagram-canvas">
                <div className="ps-diagram-hub">
                  <Layers size={22} />
                  <span>Basis-Website (ab 1.000 €)</span>
                </div>
                <div className="ps-diagram-bridge" aria-hidden="true" />
                <div className="ps-diagram-branches-three">
                  <div className="ps-diagram-node">
                    <Calculator size={19} />
                    <span>Live-Rechner</span>
                  </div>
                  <div className="ps-diagram-node">
                    <Calendar size={19} />
                    <span>Terminbuchung</span>
                  </div>
                  <div className="ps-diagram-node">
                    <Layers size={19} />
                    <span>Admin-CMS</span>
                  </div>
                </div>
              </div>
            </figure>
            <div className="ps-project-teaser-copy">
              <h3>Modulares Baukasten-Prinzip ohne Abo-Falle</h3>
              <p>
                Sie bezahlen ausschließlich die Funktionen, die Ihr Betrieb wirklich nutzt – mit
                verbindlichem Festpreis pro Modul und jederzeit erweiterbar.
              </p>
            </div>
          </article>

          {/* Card 3: Dedicated EU Server & Concierge Support */}
          <article className="ps-project-teaser">
            <figure
              className="ps-project-diagram lg-glass-card spotlight-surface"
              onMouseMove={handleSpotlightMove}
            >
              <figcaption>Schematische Darstellung · Betrieb &amp; Pflege</figcaption>
              <div className="ps-diagram-canvas">
                <div className="ps-diagram-hub">
                  <Server size={22} />
                  <span>Dedicated EU-Server</span>
                </div>
                <div className="ps-diagram-bridge" aria-hidden="true" />
                <div className="ps-diagram-branches-two">
                  <div className="ps-diagram-node">
                    <Shield size={20} />
                    <span>SSL &amp; 30d Backups</span>
                  </div>
                  <div className="ps-diagram-node">
                    <MessageSquare size={20} />
                    <span>1h – 3h Zuruf / Monat</span>
                  </div>
                </div>
              </div>
            </figure>
            <div className="ps-project-teaser-copy">
              <h3>Dedicated Hosting &amp; WhatsApp-Zuruf</h3>
              <p>
                Tägliche Offsite-Backups, Monitoring sowie 1 Stunde (Basis) bzw. 3 Stunden (Pro)
                Änderungs-Support pro Monat direkt inklusive.
              </p>
            </div>
          </article>
        </div>

        {/* 2. INTERACTIVE LIQUID GLASS SPEED-LAB */}
        <div id="speed-lab" className="ps-speed-lab lg-glass-panel" data-reveal>
          <div className="lab-control-deck">
            <div className="engine-switch-label">
              <Gauge size={16} className="text-signal" />
              <span>Live-Architektur vergleichen:</span>
            </div>

            <div className="engine-switch-capsule" role="radiogroup" aria-label="Engine-Vergleich">
              <button
                type="button"
                role="radio"
                aria-checked={selectedEngine === 'puresite'}
                className={`engine-switch-btn ${selectedEngine === 'puresite' ? 'is-active-pure' : ''}`}
                onClick={() => handleEngineSwitch('puresite')}
              >
                <span className="switch-status-dot green" />
                <strong>PureSite Engine</strong>
                <span className="switch-sub-pill">React 19 &amp; TypeScript</span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={selectedEngine === 'wordpress'}
                className={`engine-switch-btn ${selectedEngine === 'wordpress' ? 'is-active-wp' : ''}`}
                onClick={() => handleEngineSwitch('wordpress')}
              >
                <span className="switch-status-dot amber" />
                <strong>Typisches WordPress</strong>
                <span className="switch-sub-pill">PHP &amp; 38 Plugins</span>
              </button>
            </div>

            <button
              type="button"
              className="ps-btn ps-btn-small ps-btn-glass-outline lab-race-btn"
              onClick={runSpeedSimulation}
              disabled={isSimulating}
            >
              <RefreshCw size={14} className={isSimulating ? 'spin-anim' : ''} />
              <span>
                {isSimulating ? 'Simuliere Ladevorgang...' : 'Ladezeit-Rennen starten'}
              </span>
            </button>
          </div>

          {isSimulating && (
            <div className="lab-race-visualizer">
              <div className="race-track-row">
                <div className="race-track-label">
                  <span className="race-name">PureSite (0,38s)</span>
                  <span className="race-val">{pureSiteProgress}%</span>
                </div>
                <div className="race-track-rail">
                  <div
                    className="race-track-fill race-fill-puresite"
                    style={{ width: `${pureSiteProgress}%` }}
                  />
                </div>
              </div>

              <div className="race-track-row mt-2">
                <div className="race-track-label">
                  <span className="race-name">Klassisches WordPress (3,60s)</span>
                  <span className="race-val">{wpProgress}%</span>
                </div>
                <div className="race-track-rail">
                  <div
                    className="race-track-fill race-fill-wordpress"
                    style={{ width: `${wpProgress}%` }}
                  />
                </div>
              </div>

              {raceWinner === 'puresite' && wpProgress < 100 && (
                <div className="race-winner-banner">
                  <CheckCircle2 size={15} className="text-signal-green" />
                  <span>
                    PureSite ist bereits vollständig geladen, während WordPress noch Datenbank &amp;
                    Plugins initialisiert.
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="ps-gauges-grid">
            <div
              onMouseMove={handleSpotlightMove}
              className="ps-gauge-card spotlight-surface"
            >
              <div className="gauge-card-head">
                <span className="gauge-label">Google Lighthouse</span>
                <span
                  className={`gauge-status-chip ${selectedEngine === 'puresite' ? 'chip-success' : 'chip-danger'}`}
                >
                  {selectedEngine === 'puresite' ? '100 / 100' : '41 / 100'}
                </span>
              </div>
              <div className="gauge-ring-row">
                <svg className="gauge-radial-svg" width="46" height="46" viewBox="0 0 48 48" aria-hidden="true">
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.14"
                    strokeWidth="4"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    fill="none"
                    stroke={selectedEngine === 'puresite' ? 'var(--pure-mint)' : '#ef4444'}
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringOffset}
                    transform="rotate(-90 24 24)"
                    style={{ transition: 'stroke-dashoffset 0.35s ease, stroke 0.25s ease' }}
                  />
                </svg>
                <div className="gauge-huge-value">
                  <span>{lighthouseScore}</span>
                  <span className="gauge-unit">Punkte</span>
                </div>
              </div>
              <p className="gauge-desc">
                {selectedEngine === 'puresite'
                  ? 'Top-Platzierungen durch saubere Core Web Vitals.'
                  : 'Abwertung bei mobilen Suchanfragen durch Render-Blocker.'}
              </p>
            </div>

            <div
              onMouseMove={handleSpotlightMove}
              className="ps-gauge-card spotlight-surface"
            >
              <div className="gauge-card-head">
                <span className="gauge-label">Sichtbarer Aufbau</span>
                <span
                  className={`gauge-status-chip ${selectedEngine === 'puresite' ? 'chip-success' : 'chip-danger'}`}
                >
                  {selectedEngine === 'puresite' ? 'SOFORT' : 'TRÄGE'}
                </span>
              </div>
              <div className="gauge-huge-value">
                <span>{(fcpHundredths / 100).toFixed(2)}</span>
                <span className="gauge-unit">Sek.</span>
              </div>
              <p className="gauge-desc">
                {selectedEngine === 'puresite'
                  ? 'Statisch vorab kompiliert ohne Datenbank-Wartezeit.'
                  : 'Jeder Seitenaufruf wartet auf PHP & SQL-Abfragen.'}
              </p>
            </div>

            <div
              onMouseMove={handleSpotlightMove}
              className="ps-gauge-card spotlight-surface"
            >
              <div className="gauge-card-head">
                <span className="gauge-label">Seiten-Gewicht</span>
                <span
                  className={`gauge-status-chip ${selectedEngine === 'puresite' ? 'chip-success' : 'chip-danger'}`}
                >
                  {selectedEngine === 'puresite' ? 'SCHLANK' : 'SCHWER'}
                </span>
              </div>
              <div className="gauge-huge-value">
                <span>
                  {payloadKb >= 1000 ? (payloadKb / 1000).toFixed(1) : payloadKb}
                </span>
                <span className="gauge-unit">{payloadKb >= 1000 ? 'MB' : 'KB'}</span>
              </div>
              <p className="gauge-desc">
                {selectedEngine === 'puresite'
                  ? 'Nur exakt der Code, den Ihre Website wirklich nutzt.'
                  : 'Unzählige externe CSS- & Script-Dateien pro Plugin.'}
              </p>
            </div>

            <div
              onMouseMove={handleSpotlightMove}
              className="ps-gauge-card spotlight-surface"
            >
              <div className="gauge-card-head">
                <span className="gauge-label">DSGVO &amp; Cookies</span>
                <span
                  className={`gauge-status-chip ${selectedEngine === 'puresite' ? 'chip-success' : 'chip-danger'}`}
                >
                  {selectedEngine === 'puresite' ? 'CLEAN' : 'RISIKO'}
                </span>
              </div>
              <div className="gauge-huge-value">
                <span>{cookieCount}</span>
                <span className="gauge-unit">Tracker</span>
              </div>
              <p className="gauge-desc">
                {selectedEngine === 'puresite'
                  ? '100% DSGVO-konform ohne nervigen Cookie-Zwang.'
                  : 'Drittanbieter-Skripte erfordern komplexe Consent-Banner.'}
              </p>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE TCO BENCHMARK CARD IN LIQUID GLASS */}
        <div
          className="tco-benchmark-card lg-glass-panel spotlight-surface"
          onMouseMove={handleSpotlightMove}
          data-reveal
        >
          <div className="tco-head-row">
            <div className="tco-title-col">
              <span className="ps-overline">
                <Calculator size={13} /> Gesamtkosten-Vergleich (Business-Website inkl. Hosting)
              </span>
              <h3>Was kostet Ihre Website wirklich über {horizonYears} {horizonYears === 1 ? 'Jahr' : 'Jahre'}?</h3>
            </div>
            <div className="tco-horizon-pills" role="group" aria-label="Betrachtungszeitraum">
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
                <strong className="text-signal">
                  PureSite (Business-Paket + Dedicated Hosting inkl. 1h/Monat)
                </strong>
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
                <span>Klassische WordPress-Agentur (Setup + laufende Plugin-Wartung)</span>
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
            <p className="tco-savings-callout">
              Durch unsere schlanke Architektur sparen Sie über {horizonYears}{' '}
              {horizonYears === 1 ? 'Jahr' : 'Jahre'} rund{' '}
              <strong>{animSaved.toLocaleString('de-AT')} €</strong> an Agentur- und Wartungskosten.
            </p>
            {onScrollToPricing && (
              <button type="button" className="ps-btn ps-btn-primary ps-btn-small" onClick={onScrollToPricing}>
                <span>Eigenes Projekt kalkulieren</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 18 18 6M6 6h12v12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
