import React from 'react';
import { GraduationCap, Code2, HeartHandshake, Check, Terminal, ExternalLink } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="ueber-uns" className="band section-shell" aria-labelledby="about-title">
      <div className="section-head">
        <h2 id="about-title">Über uns & Handwerk</h2>
        <span className="section-head-meta">Gegründet in der Steiermark · HTL Kaindorf Alumni</span>
      </div>

      <div className="about-intro-deck">
        <p className="services-lead">
          Mein Kollege und ich haben unsere IT-Ausbildung an der <strong>HTL Kaindorf</strong> absolviert. Dort haben wir Softwareentwicklung, moderne Webtechnologien und saubere Systemarchitektur von Grund auf gelernt. Mit PureSite bieten wir moderne, handgeschriebene Websites mit voller Preistransparenz und direktem Kontakt auf Augenhöhe.
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
              <span>Maximilian Schlacher</span>
              <span className="founder-school-tag">HTL Kaindorf</span>
            </div>
          </div>

          <div className="founder-editorial-body">
            <div className="founder-headline-row">
              <h3>Maximilian Schlacher</h3>
              <span className="founder-badge">Co-Founder</span>
            </div>
            <p className="founder-spec-role">Web-Entwicklung & UI/UX</p>
            <p className="founder-bio-text">
              Spezialisiert auf rasend schnelle Frontends, interaktive Rechner und intuitive Benutzerführung, die Besucher zu echten Anfragen konvertiert.
            </p>

            <div className="founder-skills-row">
              <span className="skill-chip">React 19</span>
              <span className="skill-chip">TypeScript</span>
              <span className="skill-chip">Vite</span>
              <span className="skill-chip">UI/UX</span>
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
              <span>Loreno Zanaboni</span>
              <span className="founder-school-tag">HTL Kaindorf</span>
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

      {/* Developer Contribution & Engineering Craftsmanship Block (Johannes Grof Style) */}
      <div className="contrib-block">
        <div className="contrib-header">
          <h3>Echter Quellcode statt WordPress-Baukästen</h3>
          <span className="contrib-meta">Handwritten in Styria, Austria</span>
        </div>
        <p className="contrib-lead">
          Jede Zeile Code auf PureSite wird von uns handgeschrieben und optimiert. Keine 45 Plugins, keine aufgeblähten Fremd-Bibliotheken, keine Sicherheitsrisiken.
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
