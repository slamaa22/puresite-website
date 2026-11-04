import React, { useState } from 'react';
import type { PricingModule } from '../../types/pricing';
import { 
  X, Check, Sparkles, Moon, Sun, Laptop, Smartphone,
  FilePlus, ShieldCheck, ArrowRight, RefreshCw, Send,
  Lock, Award, Info
} from 'lucide-react';
import { MapPin, Database } from 'lucide-react';

interface ModuleDemoModalProps {
  module: PricingModule | null;
  onClose: () => void;
  onSelectModule: (code: string) => void;
  isSelected: boolean;
  currentTheme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const ModuleDemoModal: React.FC<ModuleDemoModalProps> = ({
  module,
  onClose,
  onSelectModule,
  isSelected,
  currentTheme,
  onToggleTheme
}) => {
  if (!module) return null;

  const unitSuffix =
    module.billingType === 'Monatlich'
      ? '/mtl.'
      : module.billingType === 'Pro Seite'
        ? '/Seite'
        : module.billingType === 'Pro Sprache'
          ? '/Sprache'
          : '';

  return (
    <div className="demo-modal-overlay" onClick={onClose}>
      <div 
        className="demo-modal-container glass-panel modal-enter-anim" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="demo-modal-header">
          <div className="demo-header-left">
            <span className="demo-code-badge">
              <Sparkles size={14} /> Live-Demo · {module.code}
            </span>
            <div>
              <div className="demo-category-tag">{module.categoryLabel}</div>
              <h2 className="demo-modal-title">{module.demoTitle}</h2>
            </div>
          </div>
          <div className="demo-header-actions">
            <button 
              className={`demo-select-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectModule(module.code)}
            >
              {isSelected ? (
                <>
                  <Check size={16} /> Modul im Konfigurator gewählt
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Modul für {module.fixedPrice} €{unitSuffix} hinzufügen
                </>
              )}
            </button>
            <button className="demo-close-btn" onClick={onClose} aria-label="Schließen">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Demo Subtitle / Description */}
        <div className="demo-modal-desc-bar">
          <p className="demo-desc-text">
            <strong>Feature: {module.name}</strong> – {module.demoShortDesc}
            {module.impactTag && (
              <span className="work-impact-mini" style={{ marginLeft: '8px' }}>
                {module.impactTag}
              </span>
            )}
          </p>
          {module.externalNotice && (
            <div className="demo-modal-notice-pill">
              <Info size={14} className="notice-icon" />
              <span><strong>Setup-Hinweis:</strong> {module.externalNotice}</span>
            </div>
          )}
        </div>

        {/* Dynamic Interactive Demo Sandbox */}
        <div className="demo-modal-body">
          <DemoContentRouter 
            code={module.code} 
            module={module} 
            currentTheme={currentTheme}
            onToggleTheme={onToggleTheme}
          />
        </div>

        {/* Footer info bar */}
        <div className="demo-modal-footer">
          <div className="demo-footer-info">
            <span className="demo-price-tag">
              Fixpreis: <strong>{module.fixedPrice} €{unitSuffix}</strong> 
              <span className="demo-original-price">({module.maxPrice} €{unitSuffix} Marktpreis)</span>
            </span>
          </div>
          <div className="demo-footer-actions">
            <button className="btn-secondary-sm" onClick={onClose}>
              Schließen
            </button>
            <button 
              className="btn-primary-sm" 
              onClick={() => {
                if (!isSelected) onSelectModule(module.code);
                onClose();
              }}
            >
              {isSelected ? 'Fertig' : 'Dieses Modul wählen'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component to route each of the 18 demo codes to its custom interactive component
const DemoContentRouter: React.FC<{ 
  code: string; 
  module: PricingModule;
  currentTheme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}> = ({ code, currentTheme, onToggleTheme }) => {
  switch (code) {
    case 'B-01': return <DemoB01OnePager />;
    case 'B-02': return <DemoB02Business />;
    case 'B-03': return <DemoB03Premium />;
    case 'B-04': return <DemoB04ExtraPages />;
    case 'F-01': return <DemoF01Calculator />;
    case 'F-02': return <DemoF02Animations />;
    case 'F-03': return <DemoF03I18n />;
    case 'F-04': return <DemoF04DarkMode currentTheme={currentTheme} onToggleTheme={onToggleTheme} />;
    case 'F-05': return <DemoF05Branding />;
    case 'T-01': return <DemoT01HeadlessCMS />;
    case 'T-02': return <DemoT02BlogPortfolio />;
    case 'T-03': return <DemoT03AppointmentBooking />;
    case 'T-04': return <DemoT04RecruitingFunnel />;
    case 'C-01': return <DemoC01Copywriting />;
    case 'C-02': return <DemoC02GoogleBusiness />;
    case 'C-03': return <DemoC03Analytics />;
    case 'M-01': return <DemoM01Hosting />;
    case 'M-02': return <DemoM02SorglosPro />;
    default: return <div>Demo wird geladen...</div>;
  }
};

/* =========================================================================
   1. BASIS-PAKETE DEMOS (B-01, B-02, B-03, B-04)
   ========================================================================= */

// B-01: One-Pager Architecture & Scroll Preview
const DemoB01OnePager: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');

  const sections = [
    { id: 'hero', name: '1. Hero & Value-Prop', desc: 'Starker Einstieg mit Headline, Call-to-Action und animiertem Trust-Badge.' },
    { id: 'about', name: '2. Über uns / Team', desc: 'Authentische Vorstellung deines Betriebs oder eures Teams mit technischer Expertise.' },
    { id: 'services', name: '3. Kernleistungen', desc: 'Übersichtliche 3-Spalten Matrix deiner wichtigsten Angebote.' },
    { id: 'reviews', name: '4. Referenzen & Trust', desc: 'Kundenstimmen, Zertifikate und Google 5-Sterne Gütesiegel.' },
    { id: 'contact', name: '5. Kontakt & Anfahrt', desc: 'Direktes interaktives Formular, Google Maps Route & Öffnungszeiten.' },
  ];

  return (
    <div className="demo-box">
      <div className="demo-control-bar">
        <span className="demo-label">Aktive Sektion anspringen:</span>
        <div className="demo-button-group">
          {sections.map(s => (
            <button
              key={s.id}
              className={`demo-tab-btn ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => setActiveSection(s.id)}
            >
              {s.name}
            </button>
          ))}
        </div>
        <div className="demo-device-toggle">
          <button 
            className={`icon-btn ${device === 'desktop' ? 'active' : ''}`}
            onClick={() => setDevice('desktop')}
            title="Desktop Vorschau"
          >
            <Laptop size={16} />
          </button>
          <button 
            className={`icon-btn ${device === 'mobile' ? 'active' : ''}`}
            onClick={() => setDevice('mobile')}
            title="Smartphone Vorschau"
          >
            <Smartphone size={16} />
          </button>
        </div>
      </div>

      <div className={`wireframe-canvas ${device}`}>
        <div className="browser-mock-header">
          <div className="browser-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="browser-url-bar">https://kunden-firma.at/#{activeSection}</div>
        </div>

        <div className="wireframe-content">
          {sections.map(s => (
            <div 
              key={s.id} 
              className={`wireframe-section ${activeSection === s.id ? 'highlighted' : ''}`}
            >
              <div className="wireframe-section-header">
                <h4>{s.name}</h4>
                <span className="section-pill">{activeSection === s.id ? 'Aktiver Fokus' : 'One-Pager Sektion'}</span>
              </div>
              <p>{s.desc}</p>
              <div className="wireframe-skeleton-lines">
                <div className="skel-line w-75"></div>
                <div className="skel-line w-50"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="demo-hint-box">
        💡 <strong>Warum One-Pager?</strong> Keine Ladezeiten zwischen Unterseiten, maximale Conversion-Rate auf Smartphones und alles Wichtige auf einen Blick.
      </div>
    </div>
  );
};

// B-02: Multi-Page Router Demo
const DemoB02Business: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'leistungen' | 'team' | 'kontakt'>('home');

  return (
    <div className="demo-box">
      <div className="demo-control-bar">
        <span className="demo-label">Unterseiten durchklicken:</span>
        <div className="demo-button-group">
          <button className={`demo-tab-btn ${currentPage === 'home' ? 'active' : ''}`} onClick={() => setCurrentPage('home')}>
            / (Startseite)
          </button>
          <button className={`demo-tab-btn ${currentPage === 'leistungen' ? 'active' : ''}`} onClick={() => setCurrentPage('leistungen')}>
            /leistungen (Detail)
          </button>
          <button className={`demo-tab-btn ${currentPage === 'team' ? 'active' : ''}`} onClick={() => setCurrentPage('team')}>
            /ueber-uns (Story)
          </button>
          <button className={`demo-tab-btn ${currentPage === 'kontakt' ? 'active' : ''}`} onClick={() => setCurrentPage('kontakt')}>
            /kontakt (Anfrage)
          </button>
        </div>
      </div>

      <div className="browser-mock-window">
        <div className="browser-mock-header">
          <div className="browser-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="browser-url-bar">https://unternehmen.at/{currentPage === 'home' ? '' : currentPage}</div>
        </div>

        <div className="subpage-viewport animated-fade">
          {currentPage === 'home' && (
            <div className="subpage-card">
              <span className="badge-pill">Startseite</span>
              <h3>Willkommen bei der Muster GmbH</h3>
              <p>Strukturierte Übersicht, Image-Video-Sektion und Weiterleitungen in die vertiefenden Leistungsseiten.</p>
              <div className="feature-grid-mini">
                <div className="grid-item">🚀 15 Jahre Erfahrung</div>
                <div className="grid-item">⭐ 5-Sterne Service</div>
                <div className="grid-item">📍 Steirischer Meisterbetrieb</div>
              </div>
            </div>
          )}

          {currentPage === 'leistungen' && (
            <div className="subpage-card">
              <span className="badge-pill">Leistungsübersicht</span>
              <h3>Unsere 4 Kernbereiche im Detail</h3>
              <p>Suchmaschinenoptimierte Unterseite mit klaren Leistungsbeschreibungen, Preishinweisen und FAQ.</p>
              <div className="feature-grid-mini">
                <div className="grid-item">Planung & Konzeption</div>
                <div className="grid-item">Präzise Fertigung</div>
                <div className="grid-item">Wartung & Support</div>
              </div>
            </div>
          )}

          {currentPage === 'team' && (
            <div className="subpage-card">
              <span className="badge-pill">Über uns</span>
              <h3>Menschen, Werte & Handwerk</h3>
              <p>Authentische Mitarbeiter-Fotos, Firmengeschichte und Vertrauenssignale für deine B2B-Kunden.</p>
              <div className="feature-grid-mini">
                <div className="grid-item">👨‍💼 Geschäftsführung</div>
                <div className="grid-item">👩‍💻 Technik & Montage</div>
                <div className="grid-item">📞 Kundenberatung</div>
              </div>
            </div>
          )}

          {currentPage === 'kontakt' && (
            <div className="subpage-card">
              <span className="badge-pill">Kontakt</span>
              <h3>Schreiben Sie uns oder rufen Sie an</h3>
              <p>Direktes SSL-verschlüsseltes Kontaktformular, Karte mit Routenplaner und Telefon-Direktwahl.</p>
              <div className="feature-grid-mini">
                <div className="grid-item">📞 +43 3332 00000</div>
                <div className="grid-item">✉️ office@unternehmen.at</div>
                <div className="grid-item">📍 8271 Kaindorf</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="demo-hint-box">
        ✨ <strong>Business Paket:</strong> Bis zu 4 separate Unterseiten ermöglichen gezieltes Google-Ranking auf spezifische Suchbegriffe (z.B. &quot;Tischler Kaindorf&quot;, &quot;Zahnarzt Graz&quot;).
      </div>
    </div>
  );
};

// B-03: Corporate Design System & UI Kit Demo
const DemoB03Premium: React.FC = () => {
  const [accent, setAccent] = useState<'cyan' | 'purple' | 'emerald'>('cyan');

  return (
    <div className="demo-box">
      <div className="demo-control-bar">
        <span className="demo-label">UI-Kit Akzentfarbe wechseln:</span>
        <div className="demo-button-group">
          <button className={`demo-tab-btn ${accent === 'cyan' ? 'active' : ''}`} onClick={() => setAccent('cyan')}>
            Pure Cyan (#00f2fe)
          </button>
          <button className={`demo-tab-btn ${accent === 'purple' ? 'active' : ''}`} onClick={() => setAccent('purple')}>
            Royal Violet (#8b5cf6)
          </button>
          <button className={`demo-tab-btn ${accent === 'emerald' ? 'active' : ''}`} onClick={() => setAccent('emerald')}>
            Alpine Emerald (#10b981)
          </button>
        </div>
      </div>

      <div className={`ui-kit-showcase accent-${accent}`}>
        <div className="lighthouse-score-row">
          <div className="score-badge green">
            <span className="score-num">100</span>
            <span className="score-label">Performance</span>
          </div>
          <div className="score-badge green">
            <span className="score-num">100</span>
            <span className="score-label">Accessibility</span>
          </div>
          <div className="score-badge green">
            <span className="score-num">100</span>
            <span className="score-label">Best Practices</span>
          </div>
          <div className="score-badge green">
            <span className="score-num">100</span>
            <span className="score-label">SEO Audit</span>
          </div>
        </div>

        <div className="component-samples-grid">
          <div className="sample-card">
            <h5>Button Komponenten</h5>
            <div className="sample-actions">
              <button className="ui-btn-primary">Primary Action</button>
              <button className="ui-btn-glow">Glow Highlight</button>
              <button className="ui-btn-outline">Outline Token</button>
            </div>
          </div>
          <div className="sample-card">
            <h5>Typografie & Token Hierarchie</h5>
            <div className="typo-samples">
              <span className="typo-h1">H1 Display Headline</span>
              <span className="typo-body">Body Text: Inter 400 mit optimiertem Zeilenabstand & Kontrast</span>
              <span className="typo-code">CODE: const pureSite = true;</span>
            </div>
          </div>
        </div>
      </div>
      <div className="demo-hint-box">
        👑 <strong>Premium / Corporate:</strong> Bis zu 10 Seiten, maßgeschneidertes Atomic-Design-System und 100/100 Core-Web-Vitals Ladezeit.
      </div>
    </div>
  );
};

// B-04: Extra Pages Matrix
const DemoB04ExtraPages: React.FC = () => {
  const [pages, setPages] = useState<string[]>(['Karriere / Jobs', 'Kunden-Referenzen Detail', 'FAQ & Ratgeber']);
  const [newPage, setNewPage] = useState('');

  const addPage = () => {
    if (newPage.trim() && !pages.includes(newPage.trim())) {
      setPages([...pages, newPage.trim()]);
      setNewPage('');
    }
  };

  const removePage = (idx: number) => {
    setPages(pages.filter((_, i) => i !== idx));
  };

  return (
    <div className="demo-box">
      <div className="demo-control-bar">
        <span className="demo-label">Unterseite hinzufügen:</span>
        <div className="add-page-input-wrap">
          <input 
            type="text" 
            placeholder="z.B. Galerie, Presse, Historie..." 
            value={newPage}
            onChange={(e) => setNewPage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addPage()}
            className="demo-input"
          />
          <button className="btn-primary-sm" onClick={addPage}>
            <FilePlus size={16} /> Hinzufügen (+80 €)
          </button>
        </div>
      </div>

      <div className="pages-stack-grid">
        {pages.map((p, idx) => (
          <div key={idx} className="page-stack-card">
            <div className="page-icon">📄</div>
            <div className="page-meta">
              <h6>/{p.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html</h6>
              <span>{p}</span>
            </div>
            <button className="remove-page-btn" onClick={() => removePage(idx)} title="Entfernen">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="demo-hint-box">
        📄 <strong>Skalierbar:</strong> Jede Zusatzseite wird komplett im Designraster deines Basispakets gestaltet (+80 € Fixpreis pro Seite).
      </div>
    </div>
  );
};

/* =========================================================================
   2. FRONTEND & DESIGN DEMOS (F-01, F-02, F-03, F-04, F-05)
   ========================================================================= */

// F-01: Interaktiver Preisrechner Sandbox
const DemoF01Calculator: React.FC = () => {
  const [area, setArea] = useState(80);
  const [quality, setQuality] = useState<'standard' | 'premium' | 'luxus'>('premium');
  const [express, setExpress] = useState(false);

  const pricePerSq = quality === 'standard' ? 45 : quality === 'premium' ? 75 : 120;
  const subtotal = area * pricePerSq;
  const expressFee = express ? 350 : 0;
  const total = subtotal + expressFee;

  return (
    <div className="demo-box">
      <div className="calc-demo-grid">
        <div className="calc-inputs-pane">
          <h5>Beispiel-Rechner: Handwerker / Bau-Kalkulator</h5>
          
          <div className="calc-input-group">
            <div className="calc-label-row">
              <label>Fläche / Umfang:</label>
              <span className="calc-val-badge">{area} m²</span>
            </div>
            <input 
              type="range" 
              min={20} 
              max={300} 
              step={5} 
              value={area} 
              onChange={(e) => setArea(Number(e.target.value))}
              className="demo-slider"
            />
          </div>

          <div className="calc-input-group">
            <label>Ausführungs-Klasse:</label>
            <div className="demo-button-group">
              <button className={`demo-tab-btn ${quality === 'standard' ? 'active' : ''}`} onClick={() => setQuality('standard')}>
                Standard (45 €/m²)
              </button>
              <button className={`demo-tab-btn ${quality === 'premium' ? 'active' : ''}`} onClick={() => setQuality('premium')}>
                Premium (75 €/m²)
              </button>
              <button className={`demo-tab-btn ${quality === 'luxus' ? 'active' : ''}`} onClick={() => setQuality('luxus')}>
                High-End (120 €/m²)
              </button>
            </div>
          </div>

          <div className="calc-checkbox-group">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={express} 
                onChange={(e) => setExpress(e.target.checked)}
              />
              <span>Express-Ausführung innerhalb von 48h (+350 €)</span>
            </label>
          </div>
        </div>

        <div className="calc-results-pane">
          <div className="calc-result-card">
            <span className="calc-sub-title">Geschätzte Richtkosten</span>
            <div className="calc-total-number">{total.toLocaleString('de-AT')} €</div>
            <span className="calc-tax-note">inkl. Material & Montage</span>
            
            <div className="calc-breakdown">
              <div className="breakdown-row">
                <span>Flächenkosten ({area} m² × {pricePerSq} €):</span>
                <span>{subtotal.toLocaleString('de-AT')} €</span>
              </div>
              {express && (
                <div className="breakdown-row text-cyan">
                  <span>Express-Zuschlag:</span>
                  <span>+350 €</span>
                </div>
              )}
            </div>

            <button className="btn-primary-sm w-100" onClick={() => alert('Demo: Angebot mit dieser Konfiguration wird an Kunden übermittelt!')}>
              Dieses Angebot als PDF anfordern
            </button>
          </div>
        </div>
      </div>
      <div className="demo-hint-box">
        🧮 <strong>Kunden lieben Rechner:</strong> Rechner bringen bis zu 3x mehr qualifizierte Kundenanfragen, da Kunden sofort ein Gefühl für ihr Budget erhalten.
      </div>
    </div>
  );
};

// F-02: High-End Animationen & Scrollytelling
const DemoF02Animations: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(40);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="demo-box">
      <div className="demo-control-bar">
        <span className="demo-label">Scroll-Timeline simulieren:</span>
        <input 
          type="range" 
          min={0} 
          max={100} 
          value={scrollProgress} 
          onChange={(e) => setScrollProgress(Number(e.target.value))}
          className="demo-slider"
        />
        <span className="demo-val-badge">{scrollProgress}% Scrolltiefe</span>
      </div>

      <div className="animation-playground">
        <div 
          className="tilt-card-3d"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.02, 1.02, 1.02)`
          }}
        >
          <div className="card-glare" style={{ opacity: Math.abs(tilt.x) / 15 }}></div>
          <div className="tilt-card-header">
            <Sparkles size={24} className="text-cyan" />
            <span className="badge-pill">60 FPS Hardware-Accelerated</span>
          </div>
          <h3>Interaktive 3D Parallax & Scrollytelling</h3>
          <p>
            Bewege die Maus über diese Karte. PureSite nutzt hardwarebeschleunigte CSS/WebGL Transformationen für flüssige Wow-Effekte ohne Ruckeln.
          </p>

          <div className="scroll-reveal-container">
            <div 
              className="scrolly-text-step"
              style={{
                opacity: scrollProgress > 20 ? 1 : 0.2,
                transform: `translateY(${Math.max(0, 30 - scrollProgress)}px)`
              }}
            >
              1. Besucher betritt die Seite (Hero Animation)
            </div>
            <div 
              className="scrolly-text-step"
              style={{
                opacity: scrollProgress > 50 ? 1 : 0.2,
                transform: `translateY(${Math.max(0, 60 - scrollProgress)}px)`
              }}
            >
              2. Scroll-getriggerte Kennzahlen zählen live hoch
            </div>
            <div 
              className="scrolly-text-step"
              style={{
                opacity: scrollProgress > 80 ? 1 : 0.2,
                transform: `translateY(${Math.max(0, 90 - scrollProgress)}px)`
              }}
            >
              3. Call-to-Action dockt dynamisch am Bildschirmrand an
            </div>
          </div>
        </div>
      </div>
      <div className="demo-hint-box">
        ⚡ <strong>Kein Ruckeln:</strong> Entwickelt nach modernen Webstandards für flüssiges Scrolling selbst auf älteren Smartphones.
      </div>
    </div>
  );
};

// F-03: Mehrsprachigkeit i18n
const DemoF03I18n: React.FC = () => {
  const [lang, setLang] = useState<'de' | 'en' | 'st'>('de');

  const content = {
    de: {
      url: '/de/leistungen',
      title: 'Maßgeschneiderte Webentwicklung',
      subtitle: 'Wir entwickeln rasend schnelle Websites für visionäre Unternehmen.',
      badge: 'Steiermark, Österreich',
      cta: 'Projekt anfragen'
    },
    en: {
      url: '/en/services',
      title: 'Bespoke High-End Web Engineering',
      subtitle: 'We build ultra-fast web solutions for visionary brands and businesses.',
      badge: 'Styria, Austria',
      cta: 'Request a Proposal'
    },
    st: {
      url: '/at-st/leistungan',
      title: 'Gscheite Webseitn, de wos funkzionian',
      subtitle: 'Koa lahma WordPress-Krampf, sundan gschmeidige Software aus Kaindorf.',
      badge: 'Aus da Heimat',
      cta: 'Glei zamredn'
    }
  };

  const active = content[lang];

  return (
    <div className="demo-box">
      <div className="demo-control-bar">
        <span className="demo-label">Sprache umschalten:</span>
        <div className="demo-button-group">
          <button className={`demo-tab-btn ${lang === 'de' ? 'active' : ''}`} onClick={() => setLang('de')}>
            🇦🇹 Deutsch (DE)
          </button>
          <button className={`demo-tab-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>
            🇬🇧 English (EN)
          </button>
          <button className={`demo-tab-btn ${lang === 'st' ? 'active' : ''}`} onClick={() => setLang('st')}>
            🏔️ Steirisch (Dialekt)
          </button>
        </div>
      </div>

      <div className="browser-mock-window">
        <div className="browser-mock-header">
          <div className="browser-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="browser-url-bar">https://puresite.at{active.url}</div>
        </div>
        <div className="i18n-preview-box">
          <span className="badge-pill">{active.badge}</span>
          <h2>{active.title}</h2>
          <p>{active.subtitle}</p>
          <button className="btn-primary-sm">{active.cta} <ArrowRight size={14} /></button>
        </div>
      </div>
      <div className="demo-hint-box">
        🌍 <strong>Internationale Reichweite:</strong> Saubere URL-Struktur (`/de`, `/en`), SEO Hreflang-Tags und automatische Erkennung der Kundensprache im Browser.
      </div>
    </div>
  );
};

// F-04: Dark Mode / Light Mode Switcher
const DemoF04DarkMode: React.FC<{ currentTheme?: 'dark' | 'light'; onToggleTheme?: () => void }> = ({ currentTheme, onToggleTheme }) => {
  const [themeMode, setThemeMode] = useState<'cyber-dark' | 'arctic-light' | 'midnight-violet'>('cyber-dark');

  const contrastInfo = {
    'cyber-dark': { val: '18.4:1', grade: 'AAA Höchststufe', desc: 'Obsidian Canvas (#07080b) & Signature Neon Mint (#58fca5)' },
    'arctic-light': { val: '16.8:1', grade: 'AAA Höchststufe', desc: 'Gallery Alabaster (#ffffff) & Deep Slate (#0f172a)' },
    'midnight-violet': { val: '15.2:1', grade: 'AAA Höchststufe', desc: 'Midnight Amethyst (#0f0a1c) & Luminous Violet (#c084fc)' },
  }[themeMode];

  return (
    <div className="demo-box">
      <div className="demo-control-bar">
        <span className="demo-label">Theme-Palette im Sandbox-Fenster testen:</span>
        <div className="demo-button-group">
          <button 
            type="button"
            className={`demo-tab-btn ${themeMode === 'cyber-dark' ? 'active' : ''}`} 
            onClick={() => setThemeMode('cyber-dark')}
          >
            <Moon size={14} /> Cyber Dark (Standard)
          </button>
          <button 
            type="button"
            className={`demo-tab-btn ${themeMode === 'arctic-light' ? 'active' : ''}`} 
            onClick={() => setThemeMode('arctic-light')}
          >
            <Sun size={14} /> Arctic Light (White Mode)
          </button>
          <button 
            type="button"
            className={`demo-tab-btn ${themeMode === 'midnight-violet' ? 'active' : ''}`} 
            onClick={() => setThemeMode('midnight-violet')}
          >
            <Sparkles size={14} /> Midnight Violet
          </button>
        </div>
      </div>

      <div className={`theme-sandbox-window theme-${themeMode}`}>
        <div className="theme-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="theme-brand">PureSite</span>
            <span style={{ fontSize: '0.72rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Atelier UI</span>
          </div>

          <div 
            className="theme-pill-switch"
            onClick={() => setThemeMode(prev => prev === 'arctic-light' ? 'cyber-dark' : 'arctic-light')}
            title="Klicken zum Umschalten zwischen Tag & Nacht"
          >
            {themeMode === 'arctic-light' ? <Sun size={14} /> : <Moon size={14} />}
            <span>{themeMode === 'arctic-light' ? 'Tag-Modus' : themeMode === 'midnight-violet' ? 'Violet-Modus' : 'Nacht-Modus'}</span>
          </div>
        </div>

        <div>
          <h4 className="theme-title">Barrierefreie Kontraste & Tag/Nacht-Erlebnis</h4>
          <p className="theme-desc">
            Ein moderner Dark/Light Mode Switcher schont die Augen deiner Besucher bei Nacht und garantiert bei Tageslicht gestochen scharfe Lesbarkeit ohne Seitenflackern (Zero-FOUC).
          </p>
        </div>

        <div className="theme-preview-cards">
          <div className="theme-mini-card">
            <span className="theme-mini-val">0.0s</span>
            <span className="theme-mini-lbl">Kein Neuladen</span>
          </div>
          <div className="theme-mini-card">
            <span className="theme-mini-val">{contrastInfo.val}</span>
            <span className="theme-mini-lbl">WCAG AAA Kontrast</span>
          </div>
          <div className="theme-mini-card">
            <span className="theme-mini-val">Auto-Sync</span>
            <span className="theme-mini-lbl">System-Präferenz</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div className="contrast-checker-badge">
            <Check size={14} /> WCAG AAA Kontrast: {contrastInfo.val} ({contrastInfo.grade})
          </div>
          <span style={{ fontSize: '0.75rem', opacity: 0.75 }}>
            {contrastInfo.desc}
          </span>
        </div>
      </div>

      {/* Global Live Website Toggle */}
      {onToggleTheme && (
        <div className="demo-live-website-switch">
          <span className="live-switch-hint">
            Aktuelles Website-Design: <strong>{currentTheme === 'light' ? 'Light Mode (Hell)' : 'Dark Mode (Dunkel)'}</strong>
          </span>
          <button 
            type="button" 
            className="button secondary sm-button"
            onClick={onToggleTheme}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            {currentTheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            <span>Gesamte Website auf {currentTheme === 'dark' ? 'Hell (White Mode)' : 'Dunkel (Dark Mode)'} umschalten</span>
          </button>
        </div>
      )}

      <div className="demo-hint-box">
        🌓 <strong>Präferenz-Erkennung:</strong> Schaltet automatisch nach Systemeinstellung (prefers-color-scheme) um und speichert die Wahl dauerhaft im Browser (localStorage).
      </div>
    </div>
  );
};

// F-05: Mini-Branding & Logo-Refresh
const DemoF05Branding: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="demo-box">
      <div className="demo-control-bar">
        <span className="demo-label">Vorher / Nachher Schieberegler:</span>
        <input 
          type="range" 
          min={0} 
          max={100} 
          value={sliderPos} 
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="demo-slider"
        />
        <span className="demo-val-badge">{sliderPos}% Modernisiert</span>
      </div>

      <div className="before-after-container">
        <div className="brand-side old-brand" style={{ width: `${100 - sliderPos}%` }}>
          <div className="brand-label">VORHER (Altes 2005 Pixel-Logo)</div>
          <div className="old-logo-mock">
            <span className="pixelated-text">Firma_Muster_v1.jpg</span>
            <small>⚠️ Unscharf auf Retina Displays</small>
          </div>
        </div>
        <div className="brand-side new-brand" style={{ width: `${sliderPos}%` }}>
          <div className="brand-label text-cyan">NACHHER (PureSite Vektor SVG)</div>
          <div className="new-logo-mock">
            <div className="vector-logo-mark">
              <Sparkles size={28} className="text-cyan" />
              <span>MUSTERSITE</span>
            </div>
            <small>✅ Verlustfrei scharf in jeder Auflösung</small>
          </div>
        </div>
      </div>
      <div className="demo-hint-box">
        🎨 <strong>Modern & Konsistent:</strong> Wir vektorisieren dein bestehendes Firmenzeichen, definieren Webfarben und liefern fertige SVG-Icons.
      </div>
    </div>
  );
};

/* =========================================================================
   3. TECHNIK & BACKEND DEMOS (T-01, T-02, T-03, T-04)
   ========================================================================= */

// T-01: Headless CMS Live-Sandbox
const DemoT01HeadlessCMS: React.FC = () => {
  const [headline, setHeadline] = useState('Die besten Zäune & Tore in der Oststeiermark');
  const [badgeText, setBadgeText] = useState('Neu: Frühlingsaktion -15%');
  const [buttonText, setButtonText] = useState('Jetzt unverbindlich anfragen');

  return (
    <div className="demo-box">
      <div className="cms-split-view">
        <div className="cms-editor-pane">
          <div className="cms-pane-header">
            <Database size={16} className="text-cyan" />
            <h6>Integriertes PureSite Admin-Dashboard (100% Inhouse)</h6>
          </div>
          <div className="cms-form">
            <div className="form-group">
              <label>Aktions-Banner:</label>
              <input 
                type="text" 
                value={badgeText} 
                onChange={(e) => setBadgeText(e.target.value)} 
                className="demo-input"
              />
            </div>
            <div className="form-group">
              <label>Haupt-Überschrift (Hero):</label>
              <input 
                type="text" 
                value={headline} 
                onChange={(e) => setHeadline(e.target.value)} 
                className="demo-input"
              />
            </div>
            <div className="form-group">
              <label>Button-Beschriftung:</label>
              <input 
                type="text" 
                value={buttonText} 
                onChange={(e) => setButtonText(e.target.value)} 
                className="demo-input"
              />
            </div>
            <div className="cms-status-indicator">
              <span className="dot green"></span> 100% Unabhängig: Live synchronisiert ohne monatliche Drittanbieter-Kosten!
            </div>
          </div>
        </div>

        <div className="cms-preview-pane">
          <div className="browser-mock-header">
            <div className="browser-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="browser-url-bar">https://kunden-website.at (Live-Ansicht)</div>
          </div>
          <div className="live-preview-stage">
            <span className="badge-pill">{badgeText || 'Badge eingeben...'}</span>
            <h3>{headline || 'Überschrift tippen...'}</h3>
            <p>Dieser Text und alle Bilder können kinderleicht im Browser bearbeitet werden.</p>
            <button className="btn-primary-sm">{buttonText || 'Button'}</button>
          </div>
        </div>
      </div>
      <div className="demo-hint-box">
        🔒 <strong>Kein WordPress-Frust:</strong> Headless CMS trennt Inhalte von Code. Deine Website bleibt absolut unhackbar, blitzschnell und einfach zu bedienen.
      </div>
    </div>
  );
};

// T-02: Dynamisches Blog / Portfolio-System
const DemoT02BlogPortfolio: React.FC = () => {
  const [filter, setFilter] = useState('Alle');
  const [search, setSearch] = useState('');

  const items = [
    { id: 1, category: 'Web-Design', title: 'Relaunch Tischlerei Kaindorf', date: 'März 2026', views: '1.240' },
    { id: 2, category: 'E-Commerce', title: 'Onlineshop für regionale Spezialitäten', date: 'Februar 2026', views: '3.890' },
    { id: 3, category: 'Web-App', title: 'Buchungs-Portal für Arztpraxis Graz', date: 'Jänner 2026', views: '2.100' },
    { id: 4, category: 'Web-Design', title: 'Corporate Identity für Steuerberatung', date: 'Dezember 2025', views: '980' }
  ];

  const filtered = items.filter(it => {
    const matchesCat = filter === 'Alle' || it.category === filter;
    const matchesSearch = it.title.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="demo-box">
      <div className="demo-control-bar">
        <input 
          type="text" 
          placeholder="Projekt oder News durchsuchen..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="demo-input"
          style={{ maxWidth: '240px' }}
        />
        <div className="demo-button-group">
          {['Alle', 'Web-Design', 'E-Commerce', 'Web-App'].map(c => (
            <button key={c} className={`demo-tab-btn ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="portfolio-items-grid">
        {filtered.map(item => (
          <div key={item.id} className="portfolio-item-card">
            <div className="item-badge">{item.category}</div>
            <h5>{item.title}</h5>
            <div className="item-meta">
              <span>📅 {item.date}</span>
              <span>👁️ {item.views} Aufrufe</span>
            </div>
            <button className="read-more-link" onClick={() => alert(`Detailansicht für: ${item.title}`)}>
              Detailseite ansehen →
            </button>
          </div>
        ))}
      </div>
      <div className="demo-hint-box">
        📰 <strong>Dynamische Inhalte:</strong> Perfekt für Firmen-News, Mitarbeiter-Vorstellungen oder Projekt-Referenzen mit automatischer Detailseiten-Generierung.
      </div>
    </div>
  );
};

// T-03: Online-Terminbuchung (Cal.com / Calendly Integration)
const DemoT03AppointmentBooking: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(14);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 Uhr');
  const [booked, setBooked] = useState(false);

  const days = [12, 13, 14, 15, 16, 17, 18];
  const slots = ['09:00 Uhr', '10:00 Uhr', '11:30 Uhr', '14:00 Uhr', '15:30 Uhr'];

  return (
    <div className="demo-box">
      {!booked ? (
        <div className="booking-widget-grid">
          <div className="calendar-col">
            <h5>1. Datum auswählen (November 2026)</h5>
            <div className="calendar-strip">
              {days.map(d => (
                <button 
                  key={d} 
                  className={`cal-day-btn ${selectedDay === d ? 'active' : ''}`}
                  onClick={() => setSelectedDay(d)}
                >
                  <span className="cal-weekday">{d % 2 === 0 ? 'DI' : 'MI'}</span>
                  <span className="cal-date">{d}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="slots-col">
            <h5>2. Uhrzeit für Erstgespräch (30 Min.)</h5>
            <div className="slots-grid">
              {slots.map(s => (
                <button 
                  key={s} 
                  className={`slot-btn ${selectedSlot === s ? 'active' : ''}`}
                  onClick={() => setSelectedSlot(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <button className="btn-primary-sm w-100 mt-3" onClick={() => setBooked(true)}>
              Termin am {selectedDay}. Nov um {selectedSlot} buchen
            </button>
          </div>
        </div>
      ) : (
        <div className="booking-success-card">
          <div className="success-icon-wrap">
            <Check size={32} className="text-cyan" />
          </div>
          <h4>Termin erfolgreich gebucht!</h4>
          <p>
            Bestätigung wurde an Ihren Kalender gesendet: <strong>{selectedDay}. November 2026 um {selectedSlot}</strong>.
          </p>
          <button className="btn-secondary-sm" onClick={() => setBooked(false)}>
            Anderen Termin wählen
          </button>
        </div>
      )}
      <div className="demo-hint-box">
        📅 <strong>Automatische Synchronisation:</strong> Bindet Kalender (Google, Outlook, Apple) nahtlos ein. Kein Hin-und-Her-Schreiben per Mail mehr.
      </div>
    </div>
  );
};

// T-04: Bewerber-Funnel / Karriere-Modul
const DemoT04RecruitingFunnel: React.FC = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('Frontend Entwickler');
  const [exp, setExp] = useState('3-5 Jahre');

  return (
    <div className="demo-box">
      <div className="funnel-progress-bar">
        <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>
      <div className="funnel-step-label">Schritt {step} von 3: 60-Sekunden Express-Bewerbung</div>

      {step === 1 && (
        <div className="funnel-step-card">
          <h5>Für welche Position interessierst du dich?</h5>
          <div className="funnel-options-grid">
            {['Webentwickler (Frontend / Fullstack)', 'UI/UX Designer', 'Projektmanager / Sales'].map(r => (
              <button 
                key={r} 
                className={`funnel-option-btn ${role === r ? 'active' : ''}`}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>
          <button className="btn-primary-sm mt-3" onClick={() => setStep(2)}>
            Weiter zu Schritt 2 <ArrowRight size={14} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="funnel-step-card">
          <h5>Wie viel Berufserfahrung bringst du mit?</h5>
          <div className="funnel-options-grid">
            {['Berufseinsteiger / Junior', '2 bis 4 Jahre', 'Senior / 5+ Jahre'].map(e => (
              <button 
                key={e} 
                className={`funnel-option-btn ${exp === e ? 'active' : ''}`}
                onClick={() => setExp(e)}
              >
                {e}
              </button>
            ))}
          </div>
          <div className="funnel-btn-row">
            <button className="btn-secondary-sm" onClick={() => setStep(1)}>Zurück</button>
            <button className="btn-primary-sm" onClick={() => setStep(3)}>
              Weiter zu Schritt 3 <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="funnel-step-card">
          <div className="success-icon-wrap">
            <Award size={36} className="text-cyan" />
          </div>
          <h4>🎉 98% Match! In Rekordzeit beworben</h4>
          <p>
            Ausgewählt: <strong>{role}</strong> ({exp}). Im Live-System lädt der Kandidat hier einfach seinen Lebenslauf per Klick am Smartphone hoch – ganz ohne langes Anschreiben!
          </p>
          <button className="btn-secondary-sm" onClick={() => setStep(1)}>
            Simulation von vorne starten
          </button>
        </div>
      )}
      <div className="demo-hint-box">
        💼 <strong>Mitarbeiter finden:</strong> Bis zu 4-fache Bewerberquote, weil Smartphone-Nutzer ohne Anschreiben-Hürde direkt in 1 Minute Kontakt aufnehmen.
      </div>
    </div>
  );
};

/* =========================================================================
   4. CONTENT & SEO DEMOS (C-01, C-02, C-03)
   ========================================================================= */

// C-01: Texterstellung & Copywriting
const DemoC01Copywriting: React.FC = () => {
  const [tone, setTone] = useState<'b2b' | 'direct' | 'craft'>('b2b');

  const copySamples = {
    b2b: {
      tag: 'B2B & Seriös',
      h1: 'Digitale Exzellenz für zukunftsorientierte Industrieunternehmen',
      sub: 'Wir verbinden ingenieurmäßige Präzision mit modernster Softwarearchitektur für maximale Wertschöpfung.',
      score: '96/100 (B2B Lead Index)'
    },
    direct: {
      tag: 'Direkt & Umsatzstark',
      h1: 'Mehr Kunden. Weniger Aufwand. Deine Website als 24/7 Vertriebsmaschine.',
      sub: 'Schluss mit teuren Visitenkarten im Web. Wir bauen Auftritte, die qualifizierte Anfragen generieren.',
      score: '98/100 (Conversion Rating)'
    },
    craft: {
      tag: 'Handwerk & Regional',
      h1: 'Echtes steirisches Handwerk mit Handschlagqualität',
      sub: 'Von der persönlichen Beratung vor Ort bis zur meisterhaften Ausführung – Qualität, auf die Sie bauen können.',
      score: '94/100 (Vertrauens-Index)'
    }
  };

  const active = copySamples[tone];

  return (
    <div className="demo-box">
      <div className="demo-control-bar">
        <span className="demo-label">Tonalität auswählen:</span>
        <div className="demo-button-group">
          <button className={`demo-tab-btn ${tone === 'b2b' ? 'active' : ''}`} onClick={() => setTone('b2b')}>
            💼 B2B & Hochwertig
          </button>
          <button className={`demo-tab-btn ${tone === 'direct' ? 'active' : ''}`} onClick={() => setTone('direct')}>
            🎯 Direkt & Verkaufsstark
          </button>
          <button className={`demo-tab-btn ${tone === 'craft' ? 'active' : ''}`} onClick={() => setTone('craft')}>
            🔨 Handwerk & Regional
          </button>
        </div>
      </div>

      <div className="copy-preview-card">
        <div className="copy-badge-row">
          <span className="badge-pill">{active.tag}</span>
          <span className="seo-score-pill">📈 SEO Score: {active.score}</span>
        </div>
        <h3 className="copy-headline">&quot;{active.h1}&quot;</h3>
        <p className="copy-sub">&quot;{active.sub}&quot;</p>
      </div>
      <div className="demo-hint-box">
        ✍️ <strong>Worte, die verkaufen:</strong> Wir schreiben SEO-optimierte Texte auf Basis eines kurzen Interviews – verständlich, überzeugend und fehlerfrei.
      </div>
    </div>
  );
};

// C-02: Google Business Profil Setup & Optimierung
const DemoC02GoogleBusiness: React.FC = () => {
  const [optimized, setOptimized] = useState(true);

  return (
    <div className="demo-box">
      <div className="demo-control-bar">
        <span className="demo-label">Google Maps Eintrag Status:</span>
        <div className="demo-button-group">
          <button className={`demo-tab-btn ${!optimized ? 'active' : ''}`} onClick={() => setOptimized(false)}>
            Vorher (Ungepflegt)
          </button>
          <button className={`demo-tab-btn ${optimized ? 'active' : ''}`} onClick={() => setOptimized(true)}>
            Mit PureSite Optimierung (Platz 1)
          </button>
        </div>
      </div>

      <div className="google-serp-mock">
        <div className="serp-brand-header">
          <MapPin size={18} className="text-cyan" />
          <span>Google Suchergebnis (Lokales 3-Pack Kaindorf / Hartberg)</span>
        </div>

        {optimized ? (
          <div className="serp-listing optimized">
            <div className="serp-rank">#1</div>
            <div className="serp-info">
              <h4>Musterbetrieb Kaindorf – Web & IT Dienstleistungen</h4>
              <div className="serp-rating">
                <span className="stars">★★★★★</span>
                <span className="review-count">5.0 (48 Google Rezensionen)</span>
              </div>
              <p className="serp-details">
                Öffnungszeiten: Jetzt geöffnet (Mo-Fr 08:00 - 18:00) · 📍 Gewerbepark Kaindorf · 📞 Direkt anrufen
              </p>
              <div className="serp-chips">
                <span className="chip">✅ Verifiziertes Unternehmen</span>
                <span className="chip">🌐 Direkter Website-Link</span>
                <span className="chip">⭐ Top-Empfehlung Region</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="serp-listing unoptimized">
            <div className="serp-rank">#12</div>
            <div className="serp-info">
              <h4>Musterbetrieb</h4>
              <div className="serp-rating">
                <span className="stars text-muted">☆☆☆☆☆</span>
                <span className="review-count">Keine Bewertungen vorhanden</span>
              </div>
              <p className="serp-details">
                Keine Öffnungszeiten hinterlegt · Keine Website verlinkt
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="demo-hint-box">
        📍 <strong>Regionale Kunden finden dich:</strong> Bis zu 70% aller lokalen Kundenkontakte laufen über das Google Maps Profil direkt am Smartphone.
      </div>
    </div>
  );
};

// C-03: Analytics & DSGVO-Tracking Setup
const DemoC03Analytics: React.FC = () => {
  return (
    <div className="demo-box">
      <div className="analytics-dashboard-mock">
        <div className="analytics-header">
          <div className="header-stat">
            <span className="stat-title">Besucher heute</span>
            <span className="stat-num text-cyan">482</span>
            <span className="stat-trend">+24% ggü. Vorwoche</span>
          </div>
          <div className="header-stat">
            <span className="stat-title">Seitenaufrufe</span>
            <span className="stat-num">1.890</span>
            <span className="stat-trend">Ø 3.9 Seiten/Besuch</span>
          </div>
          <div className="header-stat">
            <span className="stat-title">DSGVO Status</span>
            <span className="stat-num text-emerald">100% Konform</span>
            <span className="stat-trend">0 Cookies · Kein Banner nötig</span>
          </div>
        </div>

        <div className="analytics-chart-mock">
          <div className="chart-bar" style={{ height: '40%' }}><span>08:00</span></div>
          <div className="chart-bar" style={{ height: '65%' }}><span>10:00</span></div>
          <div className="chart-bar" style={{ height: '85%' }}><span>12:00</span></div>
          <div className="chart-bar" style={{ height: '95%' }}><span>14:00</span></div>
          <div className="chart-bar active" style={{ height: '70%' }}><span>Jetzt</span></div>
        </div>

        <div className="top-sources-row">
          <div className="source-item">🔍 Google Suche: <strong>58%</strong></div>
          <div className="source-item">🔗 Direkte Aufrufe: <strong>26%</strong></div>
          <div className="source-item">📱 Social Media & Maps: <strong>16%</strong></div>
        </div>
      </div>
      <div className="demo-hint-box">
        📊 <strong>Privatsphäre & Fakten:</strong> Erfahre genau, welche Seiten am beliebtesten sind – ohne Besucher mit lästigen Cookie-Bannern zu vergraulen.
      </div>
    </div>
  );
};

/* =========================================================================
   5. WARTUNG & HOSTING DEMOS (M-01, M-02)
   ========================================================================= */

// M-01: Hosting & Sicherheit Basis
const DemoM01Hosting: React.FC = () => {
  const [backupStatus, setBackupStatus] = useState<'idle' | 'running' | 'success'>('idle');

  const triggerBackup = () => {
    setBackupStatus('running');
    setTimeout(() => {
      setBackupStatus('success');
    }, 1500);
  };

  return (
    <div className="demo-box">
      <div className="server-monitor-grid">
        <div className="monitor-card">
          <div className="monitor-title">
            <ShieldCheck size={18} className="text-emerald" />
            <span>Server Uptime</span>
          </div>
          <div className="monitor-value text-emerald">99.98%</div>
          <div className="uptime-strip">
            {[...Array(24)].map((_, i) => (
              <span key={i} className="uptime-block" title="Online"></span>
            ))}
          </div>
        </div>

        <div className="monitor-card">
          <div className="monitor-title">
            <Lock size={18} className="text-cyan" />
            <span>SSL Zertifikat</span>
          </div>
          <div className="monitor-value text-cyan">Aktiv (TLS 1.3)</div>
          <p className="monitor-sub">Automatisches Auto-Renew alle 90 Tage</p>
        </div>

        <div className="monitor-card">
          <div className="monitor-title">
            <RefreshCw size={18} className="text-purple" />
            <span>Tägliche Datensicherung</span>
          </div>
          <div className="monitor-value">30 Tage Historie</div>
          <button 
            className="btn-secondary-sm mt-2" 
            onClick={triggerBackup}
            disabled={backupStatus === 'running'}
          >
            {backupStatus === 'idle' && 'Simuliertes Backup erstellen'}
            {backupStatus === 'running' && 'Sichere Datenbank & Dateien...'}
            {backupStatus === 'success' && '✅ Backup erfolgreich!'}
          </button>
        </div>
      </div>
      <div className="demo-hint-box">
        🛡️ <strong>Sicher schlafen:</strong> Schnelles Dedicated Server Hosting in der EU, tägliche Backups, Sicherheits-Updates und <strong>1 Stunde Änderungen pro Monat</strong> inklusive.
      </div>
    </div>
  );
};

// M-02: Sorglos-Paket Pro WhatsApp Zuruf Simulator
const DemoM02SorglosPro: React.FC = () => {
  const [message, setMessage] = useState('Hallo PureSite Team! Bitte die Öffnungszeiten für den Feiertag auf 10-14 Uhr ändern.');
  const [status, setStatus] = useState<'draft' | 'sent' | 'done'>('draft');

  const sendMessage = () => {
    setStatus('sent');
    setTimeout(() => {
      setStatus('done');
    }, 2000);
  };

  return (
    <div className="demo-box">
      <div className="chat-simulator-window">
        <div className="chat-header">
          <div className="chat-avatar">PS</div>
          <div className="chat-info">
            <h6>PureSite Support Hotline (WhatsApp/Mail)</h6>
            <span className="online-status">🟢 Online · Reaktionszeit &lt; 30 Min.</span>
          </div>
        </div>

        <div className="chat-bubble-stream">
          <div className="bubble client">
            <p>{message}</p>
            <span className="time">14:22 Uhr</span>
          </div>

          {status === 'sent' && (
            <div className="bubble agent typing">
              <span>PureSite Team tippt...</span>
            </div>
          )}

          {status === 'done' && (
            <div className="bubble agent">
              <p>
                Servus! Erledigt 👍 Die neuen Öffnungszeiten sind bereits live auf der Website aktiv. Du hast diesen Monat noch 2 Stunden und 44 Minuten Support-Guthaben übrig.
              </p>
              <span className="time">14:38 Uhr (Erledigt in 16 Minuten)</span>
            </div>
          )}
        </div>

        <div className="chat-input-bar">
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={status !== 'draft'}
            className="demo-input"
          />
          <button 
            className="btn-primary-sm" 
            onClick={sendMessage}
            disabled={status !== 'draft'}
          >
            <Send size={14} /> Zuruf senden
          </button>
        </div>
      </div>
      <div className="demo-hint-box">
        ☕ <strong>3 Stunden monatlich inklusive:</strong> Schicke Änderungen einfach per Mail oder WhatsApp an uns – wir setzen es sofort für dich um!
      </div>
    </div>
  );
};
