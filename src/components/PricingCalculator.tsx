import React, { useState, useMemo } from 'react';
import { MODULES_DATA, CATEGORIES_CONFIG } from '../data/modulesData';
import type { PricingModule, SelectedConfig, CategoryId, ProjectCalculation } from '../types/pricing';
import { 
  Check, Plus, Minus, Sparkles, Play, 
  CheckCircle2, Shield, ArrowRight, Download
} from 'lucide-react';

interface PricingCalculatorProps {
  onOpenDemo: (module: PricingModule) => void;
  onRequestQuote: (calculation: ProjectCalculation, selectedDetails: string[]) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  onOpenDemo,
  onRequestQuote
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedConfig, setSelectedConfig] = useState<SelectedConfig>(() => {
    // Default smart starter preset: B-02 (Business Mehrseitig) + F-04 (Dark/Light) + M-01 (Hosting)
    return {
      'B-02': { selected: true, quantity: 1 },
      'F-04': { selected: true, quantity: 1 },
      'C-03': { selected: true, quantity: 1 },
      'M-01': { selected: true, quantity: 1 }
    };
  });
  const [useTax, setUseTax] = useState<boolean>(false); // 0% Kleinunternehmer vs 20% Regelbesteuerung
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Toggle selection
  const toggleModule = (code: string) => {
    setSelectedConfig(prev => {
      const current = prev[code];
      const isSelected = current ? current.selected : false;

      // If choosing a basis packet, mutually exclusive logic for primary basis packet (B-01, B-02, B-03)
      let next = { ...prev };
      if (!isSelected && (code === 'B-01' || code === 'B-02' || code === 'B-03')) {
        next['B-01'] = { selected: false, quantity: 1 };
        next['B-02'] = { selected: false, quantity: 1 };
        next['B-03'] = { selected: false, quantity: 1 };
      }

      next[code] = {
        selected: !isSelected,
        quantity: current?.quantity && current.quantity > 0 ? current.quantity : 1
      };
      return next;
    });
  };

  // Update quantity
  const updateQuantity = (code: string, delta: number) => {
    setSelectedConfig(prev => {
      const current = prev[code] || { selected: true, quantity: 1 };
      const newQty = Math.max(1, (current.quantity || 1) + delta);
      return {
        ...prev,
        [code]: {
          selected: true,
          quantity: newQty
        }
      };
    });
  };

  // Presets
  const setPreset = (type: 'starter' | 'business' | 'scale') => {
    if (type === 'starter') {
      setSelectedConfig({
        'B-01': { selected: true, quantity: 1 },
        'F-04': { selected: true, quantity: 1 },
        'M-01': { selected: true, quantity: 1 }
      });
    } else if (type === 'business') {
      setSelectedConfig({
        'B-02': { selected: true, quantity: 1 },
        'F-01': { selected: true, quantity: 1 },
        'T-03': { selected: true, quantity: 1 },
        'C-03': { selected: true, quantity: 1 },
        'M-02': { selected: true, quantity: 1 }
      });
    } else {
      setSelectedConfig({
        'B-03': { selected: true, quantity: 1 },
        'F-01': { selected: true, quantity: 1 },
        'F-02': { selected: true, quantity: 1 },
        'T-01': { selected: true, quantity: 1 },
        'T-04': { selected: true, quantity: 1 },
        'M-02': { selected: true, quantity: 1 }
      });
    }
  };

  // Filter modules
  const filteredModules = useMemo(() => {
    if (activeCategory === 'all') return MODULES_DATA;
    return MODULES_DATA.filter(m => m.category === activeCategory);
  }, [activeCategory]);

  // Calculations
  const calculation = useMemo<ProjectCalculation>(() => {
    let oneTimeNet = 0;
    let mrrNet = 0;
    let totalMarketValue = 0;
    let totalHours = 0;
    let itemCount = 0;

    MODULES_DATA.forEach(mod => {
      const cfg = selectedConfig[mod.code];
      if (cfg && cfg.selected) {
        const qty = cfg.quantity || 1;
        itemCount += 1;
        totalHours += mod.estimatedHours * qty;

        if (mod.billingType === 'Monatlich') {
          mrrNet += mod.fixedPrice * qty;
          totalMarketValue += mod.maxPrice * qty;
        } else {
          oneTimeNet += mod.fixedPrice * qty;
          totalMarketValue += mod.maxPrice * qty;
        }
      }
    });

    const taxMultiplier = useTax ? 1.2 : 1.0;
    const oneTimeGross = Math.round(oneTimeNet * taxMultiplier);
    const savingsTotal = Math.max(0, totalMarketValue - (oneTimeNet + mrrNet));
    const downPayment50 = Math.round(oneTimeGross * 0.5);
    const finalPayment50 = oneTimeGross - downPayment50;

    return {
      oneTimeNet,
      oneTimeGross,
      mrrNet,
      totalMarketValue,
      savingsTotal,
      totalHours: Math.round(totalHours * 10) / 10,
      downPayment50,
      finalPayment50,
      taxRate: useTax ? 20 : 0,
      itemCount
    };
  }, [selectedConfig, useTax]);

  // Selected structured items
  const selectedItemsStructured = useMemo(() => {
    const list: { name: string; qtyLabel: string; priceFormatted: string; fullText: string }[] = [];
    MODULES_DATA.forEach(m => {
      const cfg = selectedConfig[m.code];
      if (cfg && cfg.selected) {
        const qty = cfg.quantity || 1;
        const qtyLabel = (m.code === 'B-04' || m.code === 'C-01' || m.code === 'F-03') ? ` (${qty}x)` : '';
        const priceFormatted = (m.billingType === 'Monatlich' ? `${m.fixedPrice * qty} €/mtl.` : `${m.fixedPrice * qty} €`);
        const noticeSuffix = m.externalNotice ? ` (Hinweis: ${m.externalNotice})` : '';
        list.push({
          name: m.name,
          qtyLabel,
          priceFormatted,
          fullText: `${m.name}${qtyLabel} — ${priceFormatted}${noticeSuffix}`
        });
      }
    });
    return list;
  }, [selectedConfig]);

  // Selected details array for inquiries and copy
  const selectedDetails = useMemo(() => {
    return selectedItemsStructured.map(i => i.fullText);
  }, [selectedItemsStructured]);

  // Download offer as branded PDF
  const handleDownloadPdfOffer = async () => {
    if (calculation.itemCount === 0 || isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    try {
      const itemsForPdf = MODULES_DATA
        .filter(m => selectedConfig[m.code]?.selected)
        .map(m => {
          const qty = selectedConfig[m.code]?.quantity || 1;
          const qtyLabel = (m.code === 'B-04' || m.code === 'C-01' || m.code === 'F-03') ? ` (${qty}x)` : '';
          const priceFormatted = (m.billingType === 'Monatlich' ? `${m.fixedPrice * qty} €/mtl.` : `${m.fixedPrice * qty} €`);
          return {
            code: m.code,
            name: m.name,
            categoryLabel: m.categoryLabel,
            description: m.description,
            qtyLabel,
            priceFormatted,
            billingType: m.billingType,
            amount: m.fixedPrice * qty
          };
        });

      const [{ generatePureSitePdf }, { default: confetti }] = await Promise.all([
        import('../utils/pdfGenerator'),
        import('canvas-confetti')
      ]);

      await generatePureSitePdf({
        calculation,
        items: itemsForPdf,
        useTax
      });

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.85 }
      });
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <section id="preise" className="pricing-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-head text-center">
          <div className="badge-pill">
            <Sparkles size={14} /> 100% Transparentes Baustein-Konzept
          </div>
          <h2 className="section-title">
            Wähle nur, was du <span className="gradient-text">wirklich brauchst</span>.
          </h2>
          <p className="section-subtitle">
            Keine versteckten Agentur-Aufschläge, kein WordPress-Chaos. Jedes Modul hat einen garantierten Fixpreis und kann vorab live als interaktive Demo ausprobiert werden.
          </p>

          {/* Quick Presets */}
          <div className="presets-bar">
            <span className="preset-label">Beliebte Konfigurationen:</span>
            <button className="preset-pill" onClick={() => setPreset('starter')}>
              <span>🚀 Solo-Starter</span> <small className="preset-sub">(One-Pager)</small>
            </button>
            <button className="preset-pill active" onClick={() => setPreset('business')}>
              <span>💼 B2B Business</span> <small className="preset-sub">(Mehrseitig + Rechner)</small>
            </button>
            <button className="preset-pill" onClick={() => setPreset('scale')}>
              <span>👑 Corporate</span> <small className="preset-sub">(Design-System + CMS)</small>
            </button>
          </div>
        </div>

        {/* Categories Navigation Bar */}
        <div className="category-filter-strip">
          {CATEGORIES_CONFIG.map(cat => (
            <button
              key={cat.id}
              className={`cat-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id as CategoryId)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Grid: Modules on left, Real-time Calculator summary on right */}
        <div className="calculator-layout-grid">
          {/* Modules List */}
          <div className="modules-catalog">
            <div className="modules-cards-grid">
              {filteredModules.map(mod => {
                const isSelected = !!selectedConfig[mod.code]?.selected;
                const quantity = selectedConfig[mod.code]?.quantity || 1;
                const isCountable = mod.code === 'B-04' || mod.code === 'C-01' || mod.code === 'F-03';

                return (
                  <div 
                    key={mod.code} 
                    className={`module-card glass-panel ${isSelected ? 'selected' : ''}`}
                  >
                    <div className="module-card-top">
                      <div className="module-header-tags">
                        <span className="module-category-tag">{mod.categoryLabel}</span>
                        {mod.badge && <span className="module-badge-tag">{mod.badge}</span>}
                        {mod.isPopular && <span className="module-badge-popular">⭐ Bestseller</span>}
                      </div>
                      
                      <div className="module-price-block">
                        <div className="module-price-main">
                          {mod.fixedPrice} €
                          <span className="module-price-unit">
                            {mod.billingType === 'Pro Seite' ? ' / Seite' : 
                             mod.billingType === 'Pro Sprache' ? ' / Sprache' :
                             mod.billingType === 'Monatlich' ? ' / mtl.' : ' Fixpreis'}
                          </span>
                        </div>
                        <div className="module-market-compare">
                          Marktpreis: <span className="strikethrough">{mod.maxPrice} €</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="module-title">{mod.name}</h3>
                    <p className="module-description">{mod.description}</p>

                    {/* Scope checkmarks */}
                    <ul className="module-scope-list">
                      {mod.scopeHighlights.slice(0, 3).map((item, idx) => (
                        <li key={idx}>
                          <Check size={14} className="check-icon" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Quantity controls if countable */}
                    {isCountable && isSelected && (
                      <div className="quantity-counter-row">
                        <span className="qty-label">
                          {mod.code === 'B-04' ? 'Zusatzseiten Anzahl:' : 
                           mod.code === 'C-01' ? 'Texterstellung Seiten:' : 'Zusätzliche Sprachen:'}
                        </span>
                        <div className="stepper-controls">
                          <button className="stepper-btn" onClick={() => updateQuantity(mod.code, -1)}>
                            <Minus size={14} />
                          </button>
                          <span className="stepper-val">{quantity}</span>
                          <button className="stepper-btn" onClick={() => updateQuantity(mod.code, 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Actions: Live Demo + Select Module */}
                    <div className="module-card-footer">
                      <button 
                        className="btn-demo-trigger"
                        onClick={() => onOpenDemo(mod)}
                        title="Live Demo ausprobieren"
                      >
                        <Play size={14} className="play-icon" />
                        <span>Live-Demo</span>
                      </button>

                      <button 
                        className={`btn-select-module ${isSelected ? 'active' : ''}`}
                        onClick={() => toggleModule(mod.code)}
                      >
                        {isSelected ? (
                          <>
                            <CheckCircle2 size={16} /> Gewählt
                          </>
                        ) : (
                          <>
                            <Plus size={16} /> Auswählen
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sticky Summary Drawer */}
          <div className="calculator-summary-column">
            <div className="summary-sticky-card glass-panel">
              <div className="summary-card-header">
                <div className="summary-title-wrap">
                  <h4>Deine Projekt-Kalkulation</h4>
                  <span className="summary-count-badge">{calculation.itemCount} Module gewählt</span>
                </div>
              </div>

              {/* Tax switcher */}
              <div className="tax-switch-box">
                <div className="tax-switch-header">
                  <span className="tax-label">Umsatzsteuer:</span>
                  <span className="tax-info-sub">{!useTax ? '§ 6 Abs. 1 Z 27 UStG' : '20% Regelsteuer'}</span>
                </div>
                <div className="tax-toggle-group">
                  <button 
                    type="button"
                    className={`tax-toggle-btn ${!useTax ? 'active' : ''}`}
                    onClick={() => setUseTax(false)}
                    title="Kleinunternehmerregelung gem. § 6 Abs. 1 Z 27 UStG"
                  >
                    <span className="tax-btn-full">0% (Kleinunternehmer)</span>
                    <span className="tax-btn-short">0% USt-frei</span>
                  </button>
                  <button 
                    type="button"
                    className={`tax-toggle-btn ${useTax ? 'active' : ''}`}
                    onClick={() => setUseTax(true)}
                  >
                    <span className="tax-btn-full">20% Regelbesteuerung</span>
                    <span className="tax-btn-short">20% USt.</span>
                  </button>
                </div>
              </div>

              {/* Selected List mini */}
              <div className="summary-items-list">
                {selectedItemsStructured.length === 0 ? (
                  <div className="empty-selection-note">
                    Wähle mindestens ein Basispaket oder klicke oben auf eine Starter-Konfiguration.
                  </div>
                ) : (
                  selectedItemsStructured.map((item, idx) => (
                    <div key={idx} className="summary-item-row">
                      <span className="summary-item-name">{item.name}{item.qtyLabel}</span>
                      <strong className="summary-item-price">{item.priceFormatted}</strong>
                    </div>
                  ))
                )}
              </div>

              {/* Breakdown numbers */}
              <div className="summary-price-calculations">
                <div className="calc-row">
                  <span>Einmalig (Netto):</span>
                  <span className="calc-val">{calculation.oneTimeNet.toLocaleString('de-AT')} €</span>
                </div>

                {useTax && (
                  <div className="calc-row text-muted">
                    <span>+ 20% USt.:</span>
                    <span className="calc-val">{(calculation.oneTimeGross - calculation.oneTimeNet).toLocaleString('de-AT')} €</span>
                  </div>
                )}

                <div className="calc-row highlight-total">
                  <span>Projekt-Gesamtbetrag:</span>
                  <span className="calc-total-val gradient-text">{calculation.oneTimeGross.toLocaleString('de-AT')} €</span>
                </div>

                {calculation.mrrNet > 0 && (
                  <div className="calc-row mrr-row">
                    <span>Laufende Wartung / Hosting:</span>
                    <span className="calc-mrr-val text-cyan">{calculation.mrrNet} € / Monat</span>
                  </div>
                )}
              </div>

              {/* Payment Milestones (50/50 Split) */}
              {calculation.oneTimeGross > 0 && (
                <div className="payment-milestone-box">
                  <div className="milestone-title">
                    <Shield size={14} className="text-cyan" />
                    <span>Transparente 50/50 Zahlungsphasen</span>
                  </div>
                  <div className="milestone-steps">
                    <div className="milestone-step">
                      <span className="step-label">1. Anzahlung bei Start (50%)</span>
                      <span className="step-amount">{calculation.downPayment50.toLocaleString('de-AT')} €</span>
                    </div>
                    <div className="milestone-step">
                      <span className="step-label">2. Endzahlung bei Livegang (50%)</span>
                      <span className="step-amount">{calculation.finalPayment50.toLocaleString('de-AT')} €</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Savings badge */}
              {calculation.savingsTotal > 0 && (
                <div className="summary-meta-badges">
                  <div className="meta-badge savings">
                    💰 Ersparnis ggü. Marktpreis: ca. <strong>{calculation.savingsTotal.toLocaleString('de-AT')} €</strong>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="summary-action-buttons">
                <button 
                  className="btn-quote-submit"
                  onClick={() => onRequestQuote(calculation, selectedDetails)}
                  disabled={calculation.itemCount === 0}
                >
                  <span>Dieses Angebot anfragen</span>
                  <ArrowRight size={18} />
                </button>

                <button 
                  className="btn-download-pdf-offer"
                  onClick={handleDownloadPdfOffer}
                  disabled={calculation.itemCount === 0 || isGeneratingPdf}
                  title="Individuelles Angebot als druckfertiges PDF herunterladen"
                >
                  <Download size={16} />
                  <span>{isGeneratingPdf ? 'PDF wird generiert...' : 'Angebot als PDF herunterladen'}</span>
                </button>
              </div>

              <div className="puresite-guarantee-note">
                ✨ <strong>PureSite Qualitätsversprechen:</strong> 100% sauberer Code, transparente Festpreise und direkte Betreuung durch uns als Entwickler.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
