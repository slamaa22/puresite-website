import React from 'react';
import { Code2, HeartHandshake, ShieldCheck, Zap } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="ueber-uns" className="band section-shell" aria-labelledby="about-title">
      <div className="section-head">
        <h2 id="about-title">Über uns & Handwerk</h2>
        <span className="section-head-meta">Gegründet in der Steiermark · Software Engineering</span>
      </div>

      <div className="about-intro-deck">
        <p className="services-lead">
          Wir sind Maximilian Schlacher und Loreno Zanaboni, Softwareentwickler aus der Steiermark mit fundierter technischer IT-Ausbildung. Wir haben PureSite gegründet, um Betrieben in Österreich handgeschriebene High-Performance-Websites mit echter Preistransparenz und kompromissloser Ladezeit zu liefern – ohne WordPress-Ballast und ohne anonyme Großagentur-Bürokratie.
        </p>
      </div>

      {/* 2 Equal Founders Grid */}
      <div className="founders-editorial-grid">
        {/* Founder 1: Maximilian Schlacher */}
        <article className="founder-editorial-card">
          <div className="founder-frame">
            <picture>
              <source srcSet="/assets/maximilian-schlacher.webp" type="image/webp" />
              <img 
                src="/assets/maximilian-schlacher.jpg" 
                alt="Maximilian Schlacher - Co-Founder & Web Development" 
                className="founder-photo-editorial"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="founder-polaroid-label">
              <span className="founder-school-tag">PureSite Engineering</span>
              <span className="founder-status-live">
                <span className="telemetry-live-dot" aria-hidden="true"></span>
                Lead Frontend · Graz
              </span>
            </div>
          </div>

          <div className="founder-editorial-body">
            <div className="founder-headline-row">
              <h3>Maximilian Schlacher</h3>
              <span className="founder-badge">Co-Founder</span>
            </div>
            <p className="founder-spec-role">Web-Entwicklung & UI/UX Engineering</p>
            <p className="founder-bio-text">
              Spezialisiert auf rasend schnelle Frontends, interaktive Rechner und intuitive Benutzerführung, die Besucher zu echten Kundenanfragen konvertiert.
            </p>

            <div className="founder-skills-row">
              <span className="skill-chip">React 19</span>
              <span className="skill-chip">TypeScript</span>
              <span className="skill-chip">Vite</span>
              <span className="skill-chip">UI/UX Design</span>
            </div>
          </div>
        </article>

        {/* Founder 2: Loreno Zanaboni */}
        <article className="founder-editorial-card">
          <div className="founder-frame">
            <picture>
              <source srcSet="/assets/loreno-zanaboni.webp" type="image/webp" />
              <img 
                src="/assets/loreno-zanaboni.jpg" 
                alt="Loreno Zanaboni - Co-Founder & Softwarearchitektur" 
                className="founder-photo-editorial"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <div className="founder-polaroid-label">
              <span className="founder-school-tag">PureSite Engineering</span>
              <span className="founder-status-live">
                <span className="telemetry-live-dot" aria-hidden="true"></span>
                Lead Backend · Steiermark
              </span>
            </div>
          </div>

          <div className="founder-editorial-body">
            <div className="founder-headline-row">
              <h3>Loreno Zanaboni</h3>
              <span className="founder-badge">Co-Founder</span>
            </div>
            <p className="founder-spec-role">Softwarearchitektur & Systeme</p>
            <p className="founder-bio-text">
              Spezialisiert auf modulare Architekturen, schlanke State-Logik und zukunftssichere Deployments für maximale Stabilität, Sicherheit und Skalierbarkeit.
            </p>

            <div className="founder-skills-row">
              <span className="skill-chip">System Design</span>
              <span className="skill-chip">Jamstack</span>
              <span className="skill-chip">NVMe Hosting</span>
              <span className="skill-chip">State Logic</span>
            </div>
          </div>
        </article>
      </div>

      {/* Engineering Values Grid */}
      <div className="about-values-grid">
        <div className="about-value-card">
          <Code2 size={20} className="text-signal" />
          <h4>Handgeschriebener Quellcode</h4>
          <p>Jede Zeile Code wird maßgeschneidert entwickelt. Keine 45 Plugins, die nach dem nächsten Update abstürzen.</p>
        </div>

        <div className="about-value-card">
          <Zap size={20} className="text-signal" />
          <h4>Kompromisslose Performance</h4>
          <p>Ladezeiten unter 0.4 Sekunden. Bessere Google-Rankings und keine genervten Absprünge mobiler Besucher.</p>
        </div>

        <div className="about-value-card">
          <HeartHandshake size={20} className="text-signal" />
          <h4>Direkter Draht zu den Entwicklern</h4>
          <p>Keine Junior-Account-Manager oder Ticket-Warteschlangen. Schnelle Abstimmung direkt mit Maximilian und Loreno.</p>
        </div>

        <div className="about-value-card">
          <ShieldCheck size={20} className="text-signal" />
          <h4>100% Festpreisgarantie</h4>
          <p>Verbindliche Modulpreise vor Projektstart. 50/50 Zahlung: Du zahlst die zweite Hälfte erst bei erfolgreichem Livegang.</p>
        </div>
      </div>

      {/* Developer Contribution & Engineering Craftsmanship Block */}
      <div className="contrib-block">
        <div className="contrib-header">
          <h3>Echter Quellcode statt WordPress-Baukästen</h3>
          <span className="contrib-meta">Handwritten in Styria, Austria</span>
        </div>
        <p className="contrib-lead">
          Jede Zeile Code auf PureSite wird von uns handgeschrieben und optimiert. Keine aufgeblähten Fremd-Bibliotheken, keine Sicherheitsrisiken.
        </p>

        <div className="code-metrics-grid">
          <div className="code-metric-item">
            <span className="metric-number">100/100</span>
            <span className="metric-label">Google Lighthouse</span>
            <span className="metric-desc">Core Web Vitals voll im grünen Bereich</span>
          </div>

          <div className="code-metric-item">
            <span className="metric-number">&lt; 0.4s</span>
            <span className="metric-label">First Contentful Paint</span>
            <span className="metric-desc">Startet praktisch ohne Verzögerung</span>
          </div>

          <div className="code-metric-item">
            <span className="metric-number">0</span>
            <span className="metric-label">WordPress-Plugins</span>
            <span className="metric-desc">Keine Abstürze durch fremde Updates</span>
          </div>

          <div className="code-metric-item">
            <span className="metric-number">100%</span>
            <span className="metric-label">DSGVO-Konform</span>
            <span className="metric-desc">Österreichischer NVMe Serverstandort</span>
          </div>
        </div>
      </div>
    </section>
  );
};
