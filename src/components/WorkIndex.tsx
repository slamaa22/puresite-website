import React, { useState } from 'react';
import { MODULES_DATA } from '../data/modulesData';
import type { PricingModule, SelectedConfig } from '../types/pricing';
import { Play, Check, Plus } from 'lucide-react';

interface WorkIndexProps {
  onOpenDemo: (module: PricingModule) => void;
  onScrollToPricing: () => void;
  selectedConfig?: SelectedConfig;
  onToggleModule?: (code: string) => void;
  activeCategoryFilter?: string;
  onCategoryFilterChange?: (cat: string) => void;
}

export const WorkIndex: React.FC<WorkIndexProps> = ({
  onOpenDemo,
  onScrollToPricing,
  selectedConfig,
  onToggleModule,
  activeCategoryFilter,
  onCategoryFilterChange
}) => {
  const [localCat, setLocalCat] = useState<string>('all');
  const selectedCat = activeCategoryFilter ?? localCat;

  const handleCatSelect = (id: string) => {
    setLocalCat(id);
    if (onCategoryFilterChange) {
      onCategoryFilterChange(id);
    }
  };

  const categories = [
    { id: 'all', label: 'Alle Module (18)' },
    { id: 'basis', label: 'Basis-Pakete' },
    { id: 'frontend', label: 'Frontend & Interaktion' },
    { id: 'tech', label: 'CMS & Buchung' },
    { id: 'content', label: 'Texte, Maps & SEO' },
    { id: 'hosting', label: 'Hosting & Betreuung' }
  ];

  const filteredModules =
    selectedCat === 'all'
      ? MODULES_DATA
      : MODULES_DATA.filter(m => m.category === selectedCat);

  return (
    <section id="demos" className="ps-section ps-wrap ps-home-services" aria-labelledby="demos-catalog-title">
      {/* PureSite 2-Column Section Heading */}
      <div className="ps-section-heading" data-reveal>
        <div>
          <p className="ps-overline">Leistungen &amp; 18 Live-Module</p>
          <h2 id="demos-catalog-title">Wobei wir Sie konkret unterstützen</h2>
        </div>
        <button type="button" className="ps-text-link" onClick={onScrollToPricing}>
          <span>Alle Bausteine im Kalkulator kombinieren</span>
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
      </div>

      {/* Liquid Glass Category Capsule Bar */}
      <div className="ps-filter-capsule-bar" data-reveal>
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            className={`ps-filter-pill ${selectedCat === cat.id ? 'is-active' : ''}`}
            onClick={() => handleCatSelect(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* PureSite Service Rows in Sculpted Liquid Glass */}
      <div key={selectedCat} className="ps-service-list lg-glass-panel work-index-anim" data-reveal>
        {filteredModules.map(mod => {
          const hasInteractiveDemo = Boolean(mod.demoId);
          const isSelected = !!selectedConfig?.[mod.code]?.selected;

          return (
            <div
              key={mod.code}
              className={`ps-service-row ${isSelected ? 'is-selected-row' : ''}`}
            >
              {/* Col 1: Code + Title + Impact Pill */}
              <div className="ps-service-title-col">
                <div className="ps-service-code-line">
                  <span className={`ps-code-pill ${isSelected ? 'is-active' : ''}`}>
                    {mod.code}
                  </span>
                  {mod.impactTag && (
                    <span className="ps-impact-chip">{mod.impactTag}</span>
                  )}
                </div>
                <h3
                  onClick={() => (hasInteractiveDemo ? onOpenDemo(mod) : onScrollToPricing())}
                  className="ps-service-name"
                >
                  {mod.name}
                </h3>
              </div>

              {/* Col 2: Calm Editorial Description */}
              <div className="ps-service-desc-col">
                <p>{mod.description}</p>
              </div>

              {/* Col 3: Transparent Price + Live Demo + Direct Select + PureSite Rotating Arrow */}
              <div className="ps-service-meta-col">
                <div className="ps-service-price-box">
                  <strong>
                    {mod.fixedPrice
                      ? `${mod.fixedPrice.toLocaleString('de-AT')} €`
                      : `ab ${mod.minPrice.toLocaleString('de-AT')} €`}
                  </strong>
                  <span>
                    {mod.billingType.includes('Monat')
                      ? 'pro Monat'
                      : mod.billingType === 'Pro Seite'
                        ? 'pro Seite'
                        : mod.billingType === 'Pro Sprache'
                          ? 'pro Sprache'
                          : 'Festpreis'}
                  </span>
                </div>

                <div className="ps-service-actions">
                  {hasInteractiveDemo && (
                    <button
                      type="button"
                      className="ps-mini-glass-btn"
                      onClick={() => onOpenDemo(mod)}
                      title="Interaktive Vorschau im Browser öffnen"
                    >
                      <Play size={12} />
                      <span>Live-Demo</span>
                    </button>
                  )}

                  {onToggleModule && (
                    <button
                      type="button"
                      className={`ps-mini-glass-btn ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => onToggleModule(mod.code)}
                      title={
                        isSelected
                          ? 'Im Konfigurator aktiv (Klick zum Ändern)'
                          : 'Direkt zur Kalkulation hinzufügen'
                      }
                    >
                      {isSelected ? <Check size={13} /> : <Plus size={13} />}
                      <span>{isSelected ? 'Gewählt' : 'Wählen'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className="ps-service-arrow"
                    onClick={() => (hasInteractiveDemo ? onOpenDemo(mod) : onScrollToPricing())}
                    aria-label={`${mod.name} ansehen`}
                    title={hasInteractiveDemo ? 'Interaktive Demo starten' : 'Zum Kalkulator'}
                  >
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
                      <path d="M6 18 18 6M6 6h12v12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
