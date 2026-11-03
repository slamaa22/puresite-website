import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Zap, Shield, Cpu, Gauge, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';

interface HeroProps {
  onScrollToPricing: () => void;
  onExploreDemos: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToPricing,
  onExploreDemos
}) => {
  const [selectedEngine, setSelectedEngine] = useState<'puresite' | 'wordpress'>('puresite');
  const [isSimulating, setIsSimulating] = useState(false);
  const [pureSiteProgress, setPureSiteProgress] = useState(100);
  const [wpProgress, setWpProgress] = useState(100);
  const [raceWinner, setRaceWinner] = useState<string | null>(null);

  const runSpeedSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setRaceWinner(null);
    setPureSiteProgress(0);
    setWpProgress(0);

    // PureSite completes in ~380ms
    const pureInterval = setInterval(() => {
      setPureSiteProgress(prev => {
        if (prev >= 100) {
          clearInterval(pureInterval);
          if (!raceWinner) setRaceWinner('puresite');
          return 100;
        }
        return prev + 25;
      });
    }, 75);

    // WordPress takes ~3600ms
    const wpInterval = setInterval(() => {
      setWpProgress(prev => {
        if (prev >= 100) {
          clearInterval(wpInterval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 3;
      });
    }, 90);
  };

  // If user switches tab, reset simulation state
  useEffect(() => {
    setPureSiteProgress(100);
    setWpProgress(100);
    setIsSimulating(false);
  }, [selectedEngine]);

  return (
    <section id="hero" className="hero-stage" aria-labelledby="hero-title">
      <div className="hero section-shell">
        {/* Eyebrow Status Chip */}
        <div className="eyebrow-container">
          <div className="eyebrow" role="status">
            <span className="eyebrow-pulse-dot" aria-hidden="true"></span>
            <span className="eyebrow-text">
              <span className="eyebrow-text-long">Handgeschriebene High-Performance-Websites aus Österreich</span>
              <span className="eyebrow-text-short">High-Performance Websites · Österreich</span>
            </span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 id="hero-title">
          Websites, die <span className="display-em">begeistern</span>.
          <br />
          Modular. Rasend schnell.
          <br />
          <span className="hero-subline-dim">Ohne WordPress-Chaos.</span>
        </h1>

        {/* Hero Text */}
        <p className="hero-text">
          Gegründet von zwei Softwareentwicklern in der Steiermark. Wir bauen moderne, handgeschriebene High-Performance-Websites ohne überflüssige Plugins, ohne Sicherheitslücken und ohne intransparente Großagentur-Stundensätze. Mit <strong>100% verbindlichen Festpreisen</strong> ab 1.000 € und messbarer Google-Spitzenleistung.
        </p>

        {/* Hero Actions */}
        <div className="hero-actions">
          <button className="button primary" onClick={onScrollToPricing}>
            <Sparkles size={16} />
            <span>Festpreis online kalkulieren</span>
            <ArrowRight size={15} />
          </button>
          <button className="button secondary" onClick={onExploreDemos}>
            <Play size={14} className="play-icon" />
            <span>18 Live-Demos testen</span>
          </button>
        </div>

        {/* Trust Chips Bar */}
        <div className="hero-feature-tags">
          <div className="hero-feature-item">
            <span className="hero-tag-bullet">✓</span>
            <span>Festpreis ab 1.000 € (Verbindlich vor Beginn)</span>
          </div>
          <div className="hero-feature-item">
            <span className="hero-tag-bullet">✓</span>
            <span>50/50 Zahlung (50% bei Start, 50% bei Livegang)</span>
          </div>
          <div className="hero-feature-item">
            <span className="hero-tag-bullet">✓</span>
            <span>0 Cookies nötig & österreichische NVMe-Server</span>
          </div>
        </div>
      </div>

      {/* Interactive Performance Speed Lab (Tactile Hardware Rig) */}
      <div id="speed-lab" className="section-shell speed-lab-container">
        <div className="speed-lab-chassis">
          {/* Chassis Top Machine Header */}
          <div className="lab-machine-header">
            <div className="lab-header-left">
              <div className="lab-led-group">
                <span className="lab-led led-green" aria-hidden="true"></span>
                <span className="lab-led led-cyan" aria-hidden="true"></span>
                <span className="lab-led led-amber" aria-hidden="true"></span>
              </div>
              <span className="lab-title-mono">PURESITE // PERFORMANCE TELEMETRY LAB</span>
            </div>

            <div className="lab-header-right">
              <span className="lab-spec-badge">Lighthouse v12.1 Audit</span>
              <span className="lab-server-badge">Graz NVMe Cluster</span>
            </div>
          </div>

          {/* Machine Control Deck: Engine Selector Switch */}
          <div className="lab-control-deck">
            <div className="engine-switch-label">
              <Gauge size={15} className="text-signal" />
              <span>Vergleichs-Engine wählen:</span>
            </div>

            <div className="engine-switch-capsule" role="radiogroup" aria-label="Engine-Vergleich">
              <button
                type="button"
                role="radio"
                aria-checked={selectedEngine === 'puresite'}
                className={`engine-switch-btn ${selectedEngine === 'puresite' ? 'is-active-pure' : ''}`}
                onClick={() => setSelectedEngine('puresite')}
              >
                <span className="switch-status-dot green"></span>
                <strong>PureSite Engine</strong>
                <span className="switch-sub-pill">React 19 & TypeScript</span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={selectedEngine === 'wordpress'}
                className={`engine-switch-btn ${selectedEngine === 'wordpress' ? 'is-active-wp' : ''}`}
                onClick={() => setSelectedEngine('wordpress')}
              >
                <span className="switch-status-dot amber"></span>
                <strong>Typisches WordPress</strong>
                <span className="switch-sub-pill">PHP & 38 Plugins</span>
              </button>
            </div>

            {/* Live Race Simulation Trigger */}
            <button
              type="button"
              className="button secondary sm-button lab-race-btn"
              onClick={runSpeedSimulation}
              disabled={isSimulating}
              title="Starte eine Live-Simulation des Ladezeit-Unterschieds"
            >
              <RefreshCw size={13} className={isSimulating ? 'spin-anim' : ''} />
              <span>{isSimulating ? 'Simuliere Ladevorgang...' : 'Ladezeit-Rennen starten'}</span>
            </button>
          </div>

          {/* Live Racing Simulation Visualizer */}
          {isSimulating && (
            <div className="lab-race-visualizer">
              <div className="race-track-row">
                <div className="race-track-label">
                  <span className="race-name">PureSite (0.38s)</span>
                  <span className="race-val">{pureSiteProgress}%</span>
                </div>
                <div className="race-track-rail">
                  <div 
                    className="race-track-fill race-fill-puresite" 
                    style={{ width: `${pureSiteProgress}%` }}
                  ></div>
                </div>
              </div>

              <div className="race-track-row mt-2">
                <div className="race-track-label">
                  <span className="race-name">Klassisches WordPress (3.60s)</span>
                  <span className="race-val">{wpProgress}%</span>
                </div>
                <div className="race-track-rail">
                  <div 
                    className="race-track-fill race-fill-wordpress" 
                    style={{ width: `${wpProgress}%` }}
                  ></div>
                </div>
              </div>

              {pureSiteProgress === 100 && wpProgress < 100 && (
                <div className="race-winner-banner">
                  <CheckCircle2 size={15} className="text-signal-green" />
                  <span>PureSite ist bereits vollständig geladen, während WordPress noch Plugins initialisiert!</span>
                </div>
              )}
            </div>
          )}

          {/* Telemetry Dials & Instrument Gauges */}
          <div className="lab-gauges-grid">
            {/* Instrument 1: Google Lighthouse Score */}
            <div className={`gauge-card ${selectedEngine === 'puresite' ? 'glow-mint' : 'glow-warning'}`}>
              <div className="gauge-card-head">
                <span className="gauge-label">Google Lighthouse</span>
                {selectedEngine === 'puresite' ? (
                  <span className="gauge-status-chip chip-success">PERFEKT (100%)</span>
                ) : (
                  <span className="gauge-status-chip chip-danger">MANGELHAFT (41%)</span>
                )}
              </div>

              <div className="gauge-display-row">
                <div className="gauge-huge-value">
                  {selectedEngine === 'puresite' ? (
                    <span className="text-signal-green">100</span>
                  ) : (
                    <span className="text-danger">41</span>
                  )}
                  <span className="gauge-unit">/100</span>
                </div>

                <div className="gauge-bar-track">
                  <div 
                    className={`gauge-bar-fill ${selectedEngine === 'puresite' ? 'fill-mint' : 'fill-danger'}`}
                    style={{ width: selectedEngine === 'puresite' ? '100%' : '41%' }}
                  ></div>
                </div>
              </div>

              <p className="gauge-desc">
                {selectedEngine === 'puresite' 
                  ? 'Alle Core Web Vitals im grünen Bestwert. Höchstes Vertrauen bei Google SEO.'
                  : 'Träge Ladezeit straft dein Google Ranking ab. 53% der mobilen Besucher springen ab.'}
              </p>
            </div>

            {/* Instrument 2: First Contentful Paint */}
            <div className={`gauge-card ${selectedEngine === 'puresite' ? 'glow-mint' : 'glow-warning'}`}>
              <div className="gauge-card-head">
                <span className="gauge-label">First Contentful Paint</span>
                {selectedEngine === 'puresite' ? (
                  <span className="gauge-status-chip chip-success">&lt; 0.4s (SOFORT)</span>
                ) : (
                  <span className="gauge-status-chip chip-danger">3.6s (TRÄGE)</span>
                )}
              </div>

              <div className="gauge-display-row">
                <div className="gauge-huge-value">
                  {selectedEngine === 'puresite' ? (
                    <span className="text-signal-green">0.38</span>
                  ) : (
                    <span className="text-danger">3.60</span>
                  )}
                  <span className="gauge-unit">sek</span>
                </div>

                <div className="gauge-micro-metric">
                  <Zap size={14} className={selectedEngine === 'puresite' ? 'text-signal-green' : 'text-danger'} />
                  <span>{selectedEngine === 'puresite' ? 'Praktisch kein Ladebalken' : 'Verzögerter Seitenaufbau'}</span>
                </div>
              </div>

              <p className="gauge-desc">
                {selectedEngine === 'puresite' 
                  ? 'Inhalte erscheinen augenblicklich im Browser. Maximale Konversionsrate.'
                  : 'Kunden warten sekundenlang auf einen weißen Bildschirm, bevor Inhalte erscheinen.'}
              </p>
            </div>

            {/* Instrument 3: Payload Weight & Dependencies */}
            <div className={`gauge-card ${selectedEngine === 'puresite' ? 'glow-mint' : 'glow-warning'}`}>
              <div className="gauge-card-head">
                <span className="gauge-label">Code-Gewicht & Ballast</span>
                {selectedEngine === 'puresite' ? (
                  <span className="gauge-status-chip chip-success">0 PLUGINS</span>
                ) : (
                  <span className="gauge-status-chip chip-danger">38 PLUGINS</span>
                )}
              </div>

              <div className="gauge-display-row">
                <div className="gauge-huge-value">
                  {selectedEngine === 'puresite' ? (
                    <span className="text-signal-green">124</span>
                  ) : (
                    <span className="text-danger">4.800</span>
                  )}
                  <span className="gauge-unit">{selectedEngine === 'puresite' ? 'KB' : 'KB (4.8 MB)'}</span>
                </div>

                <div className="gauge-micro-metric">
                  <Cpu size={14} className={selectedEngine === 'puresite' ? 'text-signal-green' : 'text-danger'} />
                  <span>{selectedEngine === 'puresite' ? 'Reiner TypeScript-Code' : 'Schweres PHP & Fremdcode'}</span>
                </div>
              </div>

              <p className="gauge-desc">
                {selectedEngine === 'puresite' 
                  ? 'Kein Sicherheitsrisiko durch veraltete Dritt-Erweiterungen. 100% stabile Architektur.'
                  : 'Jedes Plugin erhöht das Hack-Risiko und führt bei Updates regelmäßig zu Abstürzen.'}
              </p>
            </div>

            {/* Instrument 4: Privacy & DSGVO */}
            <div className={`gauge-card ${selectedEngine === 'puresite' ? 'glow-mint' : 'glow-warning'}`}>
              <div className="gauge-card-head">
                <span className="gauge-label">DSGVO & Tracking-Freiheit</span>
                {selectedEngine === 'puresite' ? (
                  <span className="gauge-status-chip chip-success">0 COOKIES</span>
                ) : (
                  <span className="gauge-status-chip chip-danger">14 TRACKER</span>
                )}
              </div>

              <div className="gauge-display-row">
                <div className="gauge-huge-value">
                  {selectedEngine === 'puresite' ? (
                    <span className="text-signal-green">0</span>
                  ) : (
                    <span className="text-danger">14</span>
                  )}
                  <span className="gauge-unit">Cookies</span>
                </div>

                <div className="gauge-micro-metric">
                  <Shield size={14} className={selectedEngine === 'puresite' ? 'text-signal-green' : 'text-danger'} />
                  <span>{selectedEngine === 'puresite' ? 'Kein Cookie-Banner nötig' : 'Cookie-Banner Zwang'}</span>
                </div>
              </div>

              <p className="gauge-desc">
                {selectedEngine === 'puresite' 
                  ? '100% DSGVO-konform ohne lästige Zustimmungs-Banner. Besucher gelangen sofort zu deinem Angebot.'
                  : 'Besucher werden mit Cookie-Bannern genervt und US-Schriftarten übertragen Daten in Drittländer.'}
              </p>
            </div>
          </div>

          {/* Machine Bottom Spec Bar */}
          <div className="lab-machine-footer">
            <div className="lab-footer-summary">
              <strong>Fazit aus der Praxis:</strong> PureSite lädt im Durchschnitt <strong>9x schneller</strong> als traditionelle Baukästen oder WordPress-Agenturen – bei <strong>0 Wartungsaufwand</strong>.
            </div>
            <button className="button primary sm-button" onClick={onScrollToPricing}>
              <span>Projekt jetzt kalkulieren</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
