import React, { useState } from 'react';
import { MODULES_DATA } from '../data/modulesData';
import type { PricingModule, SelectedConfig } from '../types/pricing';
import { Play, ArrowRight, Filter, Check, Plus } from 'lucide-react';

interface WorkIndexProps {
  onOpenDemo: (module: PricingModule) => void;
  onScrollToPricing: () => void;
  selectedConfig?: SelectedConfig;
  onToggleModule?: (code: string) => void;
}

export const WorkIndex: React.FC<WorkIndexProps> = ({
  onOpenDemo,
  onScrollToPricing,
  selectedConfig,
  onToggleModule
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

  const filteredModules =
    selectedCat === 'all'
      ? MODULES_DATA
      : MODULES_DATA.filter(m => m.category === selectedCat);

  return (
    <section id="demos" className="band section-shell" aria-labelledby="demos-catalog-title">
      <div className="section-head" data-reveal>
        <h2 id="demos-catalog-title">Modul-Katalog &amp; Live-Demos</h2>
        <span className="section-head-meta">18 kombinierbare Funktions-Bausteine</span>
      </div>

      <div className="catalogue-intro-row" data-reveal>
        <p className="services-lead">
          Jedes Feature ist als eigenständiger Software-Baustein konzipiert. Teste jedes Modul
          live im Browser und füge es auf Wunsch mit einem Klick direkt deiner Konfiguration hinzu.
        </p>

        {/* Category Filters */}
        <div className="catalog-filter-bar">
          <span className="filter-bar-label">
            <Filter size={13} className="text-signal" /> Filter:
          </span>
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

      {/* The Johannes Grof Style Work Index Table with Live Configurator Sync */}
      <ul key={selectedCat} className="work-index work-index-anim" data-reveal>
        {filteredModules.map(mod => {
          const hasInteractiveDemo = Boolean(mod.demoId);
          const isSelected = !!selectedConfig?.[mod.code]?.selected;
          const isHighlight = isSelected || mod.isPopular || mod.code === 'B-01' || mod.code === 'F-01';

          return (
            <li
              key={mod.code}
              className={`work-index-row ${isHighlight ? 'is-highlight' : ''} ${isSelected ? 'is-configured-row' : ''}`}
            >
              <div className="work-row-inner">
                {/* Module Code Badge */}
                <div className="work-code-col">
                  <span className={`mono-code-badge ${isSelected ? 'badge-selected-glow' : ''}`}>
                    {mod.code}
                  </span>
                </div>

                {/* Name & Tagline */}
                <div className="work-name-col">
                  <div className="work-item-title-line">
                    <strong className="work-item-name">{mod.name}</strong>
                    {mod.impactTag && (
                      <span className="work-impact-mini">{mod.impactTag}</span>
                    )}
                  </div>
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
                    {mod.fixedPrice
                      ? `€ ${mod.fixedPrice.toLocaleString('de-AT')}`
                      : `ab € ${mod.minPrice.toLocaleString('de-AT')}`}
                  </span>
                  <span className="work-billing-meta">
                    {mod.billingType.includes('Monat')
                      ? '/ Monat'
                      : mod.billingType === 'Pro Seite'
                        ? '/ Seite'
                        : mod.billingType === 'Pro Sprache'
                          ? '/ Sprache'
                          : 'Fixpreis'}
                  </span>
                </div>

                {/* Action CTAs: Live Demo + Direct Config Toggle */}
                <div className="work-actions-col work-actions-dual">
                  {hasInteractiveDemo && (
                    <button
                      type="button"
                      className="button secondary sm-button"
                      onClick={() => onOpenDemo(mod)}
                      title="Interaktive Demo im Browser testen"
                    >
                      <Play size={12} className="play-icon" />
                      <span>Demo</span>
                    </button>
                  )}

                  {onToggleModule ? (
                    <button
                      type="button"
                      className={`button sm-button ${isSelected ? 'work-btn-selected' : 'tertiary'}`}
                      onClick={() => onToggleModule(mod.code)}
                      title={
                        isSelected
                          ? 'Im Konfigurator ausgewählt (Klick zum Ändern)'
                          : 'Direkt zur Konfiguration hinzufügen'
                      }
                    >
                      {isSelected ? (
                        <>
                          <Check size={12} />
                          <span>Aktiv</span>
                        </>
                      ) : (
                        <>
                          <Plus size={12} />
                          <span>Wählen</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="button tertiary sm-button"
                      onClick={onScrollToPricing}
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
      <div className="catalogue-cta" data-reveal>
        <p>
          Deine ausgewählten Bausteine werden automatisch in den Festpreis-Konfigurator übernommen.
        </p>
        <button className="button primary" onClick={onScrollToPricing}>
          <span>Konfiguration &amp; Festpreis ansehen</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
};
