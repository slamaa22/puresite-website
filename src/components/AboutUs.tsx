import React from 'react';
import { Sparkles, GraduationCap, Code2, HeartHandshake, CheckCircle } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <section id="ueber-uns" className="about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center about-header">
          <div className="badge-pill mx-auto">
            <Sparkles size={14} /> Wer hinter PureSite steht
          </div>
          <h2 className="section-title">
            Zwei Entwickler mit einer <span className="gradient-text">klaren Mission</span>.
          </h2>
          <p className="section-subtitle mx-auto" style={{ maxWidth: '780px' }}>
            Mein Kollege und ich haben unsere IT-Ausbildung an der <strong>HTL Kaindorf</strong> absolviert. 
            Dort haben wir Softwareentwicklung, moderne Webtechnologien und saubere Systemarchitektur von Grund auf gelernt. 
            Mit PureSite bieten wir moderne, handgeschriebene Websites mit voller Preistransparenz und direkter Betreuung auf Augenhöhe.
          </p>
        </div>

        {/* Dual Founders Grid - Exactly Equal Size & Prominence */}
        <div className="founders-dual-grid">
          {/* Founder 1: Maximilian Schlacher */}
          <div className="founder-card glass-panel">
            <div className="founder-image-wrapper">
              <picture>
                <source srcSet="/assets/maximilian-schlacher.webp" type="image/webp" />
                <img 
                  src="/assets/maximilian-schlacher.jpg" 
                  alt="Maximilian Schlacher - Co-Founder & Web Development" 
                  className="founder-photo"
                  width={1000}
                  height={1500}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="founder-tag">
                <GraduationCap size={15} className="text-cyan" />
                <span>IT-Ausbildung HTL Kaindorf</span>
              </div>
            </div>
            <div className="founder-card-body">
              <div className="founder-name-row">
                <h3 className="founder-name">Maximilian Schlacher</h3>
                <span className="founder-role-badge">Co-Founder</span>
              </div>
              <p className="founder-role-title text-cyan">Web-Entwicklung & UI/UX</p>
              <p className="founder-desc">
                Spezialisiert auf hochperformante Frontends, interaktive Web-Erlebnisse und intuitive Benutzerführung, die Besucher begeistern und zu Kunden machen.
              </p>
            </div>
          </div>

          {/* Founder 2: Loreno Zanaboni */}
          <div className="founder-card glass-panel">
            <div className="founder-image-wrapper">
              <picture>
                <source srcSet="/assets/loreno-zanaboni.webp" type="image/webp" />
                <img 
                  src="/assets/loreno-zanaboni.jpg" 
                  alt="Loreno Zanaboni - Co-Founder & Softwarearchitektur" 
                  className="founder-photo"
                  width={1000}
                  height={1500}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="founder-tag">
                <GraduationCap size={15} className="text-cyan" />
                <span>IT-Ausbildung HTL Kaindorf</span>
              </div>
            </div>
            <div className="founder-card-body">
              <div className="founder-name-row">
                <h3 className="founder-name">Loreno Zanaboni</h3>
                <span className="founder-role-badge">Co-Founder</span>
              </div>
              <p className="founder-role-title text-cyan">Softwarearchitektur & Systeme</p>
              <p className="founder-desc">
                Spezialisiert auf modulare Architekturen, schlanke State-Logik und zukunftssichere Deployments für maximale Stabilität, Sicherheit und Skalierbarkeit.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="about-values-cards">
          <div className="about-value-card glass-panel">
            <div className="about-value-icon text-cyan">
              <CheckCircle size={22} />
            </div>
            <h4>Keine versteckten Kosten</h4>
            <p>Du weißt vor Projektstart auf den Euro genau, was deine Website kostet – transparent und verbindlich kalkuliert.</p>
          </div>

          <div className="about-value-card glass-panel">
            <div className="about-value-icon text-purple">
              <Code2 size={22} />
            </div>
            <h4>Technologische Überlegenheit</h4>
            <p>Handgeschriebener, sauberer Code für blitzschnelle Ladezeiten, beste SEO-Rankings und maximale Zukunftssicherheit.</p>
          </div>

          <div className="about-value-card glass-panel">
            <div className="about-value-icon text-emerald">
              <HeartHandshake size={22} />
            </div>
            <h4>Echte Handschlagqualität</h4>
            <p>Direkter Draht zu uns beiden Gründern per WhatsApp, Telefon oder Mail – persönliche Betreuung vom ersten Tag an.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
