import React, { useState } from 'react';
import { MODULES_DATA } from '../data/modulesData';
import type { PricingModule } from '../types/pricing';
import { Play, ArrowRight, Sparkles, Filter } from 'lucide-react';

interface WorkIndexProps {
  onOpenDemo: (module: PricingModule) => void;
  onScrollToPricing: () => void;
}

export const WorkIndex: React.FC<WorkIndexProps> = ({
  onOpenDemo,
  onScrollToPricing
}) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Alle Module (18)' },
    { id: 'basis', label: 'Basis-Pakete' },
    { id: 'frontend', label: 'Frontend-Features' },
    { id: 'tech', label: 'Backend & Tools' },
    { id: 'content', label: 'Content & SEO' },
    { id: 'hosting', label: 'Hosting & Wartung' }
  ];

  const filteredModules = selectedCat === 'all'
    ? MODULES_DATA
    : MODULES_DATA.filter(m => m.category === selectedCat);

  return (
    <section id="demos" className="band section-shell" aria-labelledby="demos-catalog-title">
      <div className="section-head">
        <h2 id="demos-catalog-title">Modul-Katalog & Live-Demos</h2>
        <span className="section-head-meta">18 austauschbare Funktions-Bausteine</span>
      </div>

      <div className="catalogue-intro-row">
        <p className="services-lead">
          Jedes Feature ist als eigenständiges Modul konzipiert. Du kannst jedes Modul direkt im Browser als interaktive Demo ausprobieren und im Festpreis-Kalkulator zusammenstellen.
        </p>

        {/* Category Filters */}
        <div className="catalog-filter-bar">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-chip ${selectedCat === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* The Johannes Grof Style Work Index Table */}
      <ul className="work-index">
        {filteredModules.map(mod => {
          const hasInteractiveDemo = Boolean(mod.demoId);
          const isHighlight = mod.isPopular || mod.code === 'B-01' || mod.code === 'F-01';

          return (
            <li key={mod.code} className={`work-index-row ${isHighlight ? 'is-highlight' : ''}`}>
              <div className="work-row-inner">
                {/* Module Code Badge */}
                <div className="work-code-col">
                  <span className="mono-code-badge">{mod.code}</span>
                </div>

                {/* Name & Tagline */}
                <div className="work-name-col">
                  <strong className="work-item-name">{mod.name}</strong>
                  <span className="work-item-desc">{mod.description}</span>
                </div>

                {/* Scope & Details */}
                <div className="work-scope-col">
                  <span className="work-cat-tag">{mod.categoryLabel}</span>
                  <span className="work-scope-bullet">
                    {mod.scopeHighlights?.[0] || 'Maßgeschneiderte Umsetzung'}
                  </span>
                </div>

                {/* Price */}
                <div className="work-price-col">
                  <span className="work-price-val">
                    {mod.fixedPrice ? `€ ${mod.fixedPrice.toLocaleString('de-AT')}` : `ab € ${mod.minPrice.toLocaleString('de-AT')}`}
                  </span>
                  <span className="work-billing-meta">
                    {mod.billingType.includes('Monat') ? '/ Monat' : 'Fixpreis'}
                  </span>
                </div>

                {/* Action CTA */}
                <div className="work-actions-col">
                  {hasInteractiveDemo ? (
                    <button 
                      className="button secondary sm-button" 
                      onClick={() => onOpenDemo(mod)}
                      title="Interaktive Demo testen"
                    >
                      <Play size={12} className="play-icon" />
                      <span>Demo</span>
                    </button>
                  ) : (
                    <button 
                      className="button tertiary sm-button" 
                      onClick={onScrollToPricing}
                      title="Im Kalkulator auswählen"
                    >
                      <span>Wählen</span>
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Catalogue Bottom CTA */}
      <div className="catalogue-cta">
        <p>
          Möchtest du sehen, was deine individuelle Wunsch-Kombination kostet?
        </p>
        <button className="button primary" onClick={onScrollToPricing}>
          <span>Zum 5-Schritte-Kalkulator springen</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
};
