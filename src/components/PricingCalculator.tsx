import React, { useState, useMemo } from 'react';
import { MODULES_DATA } from '../data/modulesData';
import type { PricingModule, SelectedConfig, ProjectCalculation } from '../types/pricing';
import { 
  Check, Plus, Minus, Sparkles, Play, 
  CheckCircle2, Shield, ArrowRight, ArrowLeft, Download, 
  Edit3
} from 'lucide-react';

interface PricingCalculatorProps {
  onOpenDemo: (module: PricingModule) => void;
  onRequestQuote: (calculation: ProjectCalculation, selectedDetails: string[]) => void;
}

type PresetKey = 'starter' | 'business' | 'scale' | 'custom';

interface WizardStepConfig {
  id: number;
  category: 'basis' | 'frontend' | 'tech' | 'content' | 'hosting' | 'summary';
  shortLabel: string;
  categoryName: string;
  nextStepName: string;
  title: string;
  subtitle: string;
}

const WIZARD_STEPS: WizardStepConfig[] = [
  {
    id: 1,
    category: 'basis',
    shortLabel: '1. Basis',
    categoryName: 'Basis-Paket',
    nextStepName: 'Frontend-Features',
    title: 'Schritt 1 von 5: Wähle dein Website-Fundament',
    subtitle: 'Das Grundgerüst deiner Website. Wähle die Seitenanzahl und Architektur für deinen Betrieb.'
  },
  {
    id: 2,
    category: 'frontend',
    shortLabel: '2. Frontend',
    categoryName: 'Frontend-Features',
    nextStepName: 'Backend & Tools',
    title: 'Schritt 2 von 5: Interaktive Frontend-Features',
    subtitle: 'Begeistere deine Besucher mit Rechnern, flüssigen Animationen oder einem Theme-Switcher.'
  },
  {
    id: 3,
    category: 'tech',
    shortLabel: '3. Backend',
    categoryName: 'Backend-Features',
    nextStepName: 'Content & SEO',
    title: 'Schritt 3 von 5: Backend, CMS & Automatisierung',
    subtitle: 'Automatisiere Abläufe mit Online-Terminbuchung, Headless CMS oder Bewerber-Funnels.'
  },
  {
    id: 4,
    category: 'content',
    shortLabel: '4. Content',
    categoryName: 'Content & SEO',
    nextStepName: 'Hosting & Wartung',
    title: 'Schritt 4 von 5: Texterstellung & Suchmaschinen',
    subtitle: 'Professionelle Verkaufstexte und gezielte Google-Optimierung für mehr Kundenanfragen.'
  },
  {
    id: 5,
    category: 'hosting',
    shortLabel: '5. Hosting',
    categoryName: 'Wartungspaket',
    nextStepName: 'Gesamtkalkulation',
    title: 'Schritt 5 von 5: High-Speed Hosting & Zuruf-Service',
    subtitle: 'DSGVO-konformes NVMe-Hosting in Österreich, SSL-Zertifikate und persönlicher Support.'
  },
  {
    id: 6,
    category: 'summary',
    shortLabel: '6. Angebot',
    categoryName: 'Gesamtkalkulation',
    nextStepName: '',
    title: 'Deine maßgeschneiderte Festpreis-Kalkulation',
    subtitle: '100% transparent. Lade dein PDF-Angebot herunter oder sichere dir ein unverbindliches Erstgespräch.'
  }
];

const PRESET_CONFIGS: Record<'starter' | 'business' | 'scale', Record<string, number>> = {
  starter: {
    'B-01': 1,
    'F-04': 1,
    'M-01': 1
  },
  business: {
    'B-02': 1,
    'F-01': 1,
    'T-03': 1,
    'C-03': 1,
    'M-02': 1
  },
  scale: {
    'B-03': 1,
    'F-01': 1,
    'F-02': 1,
    'T-01': 1,
    'T-04': 1,
    'M-02': 1
  }
};

const createConfigFromPreset = (preset: Record<string, number>): SelectedConfig => {
  const cfg: SelectedConfig = {};
  Object.entries(preset).forEach(([code, qty]) => {
    cfg[code] = { selected: true, quantity: qty };
  });
  return cfg;
};

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  onOpenDemo,
  onRequestQuote
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedConfig, setSelectedConfig] = useState<SelectedConfig>(() => {
    return createConfigFromPreset(PRESET_CONFIGS.business);
  });
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [useTax, setUseTax] = useState<boolean>(false); // 0% Kleinunternehmer vs 20% Regelbesteuerung
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Toggle selection
  const toggleModule = (code: string) => {
    setIsCustomMode(false);
    setSelectedConfig(prev => {
      const current = prev[code];
      const isSelected = current ? current.selected : false;

      // Mutually exclusive base packages: B-01, B-02, B-03
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
    setIsCustomMode(false);
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
  const setPreset = (type: PresetKey) => {
    if (type === 'custom') {
      setIsCustomMode(true);
      return;
    }
    setIsCustomMode(false);
    setSelectedConfig(createConfigFromPreset(PRESET_CONFIGS[type]));
  };

  // Determine which preset is currently active
  const activePreset = useMemo<PresetKey>(() => {
    if (isCustomMode) return 'custom';

    const selectedEntries = Object.entries(selectedConfig).filter(
      ([_, val]) => val && val.selected && (val.quantity || 1) > 0
    );

    for (const [presetKey, presetMap] of Object.entries(PRESET_CONFIGS) as ['starter' | 'business' | 'scale', Record<string, number>][]) {
      const presetKeys = Object.keys(presetMap);
      if (selectedEntries.length !== presetKeys.length) continue;

      const allMatch = selectedEntries.every(([code, val]) => {
        return presetMap[code] === (val.quantity || 1);
      });

      if (allMatch) return presetKey;
    }

    return 'custom';
  }, [selectedConfig, isCustomMode]);

  // Current Step Config
  const currentStep = WIZARD_STEPS[currentStepIndex];

  // Modules belonging to current step category
  const currentStepModules = useMemo(() => {
    if (currentStep.category === 'summary') return [];
    return MODULES_DATA.filter(m => m.category === currentStep.category);
  }, [currentStep.category]);

  // Number of selected modules in current step
  const countInCurrentStep = useMemo(() => {
    if (currentStep.category === 'summary') return 0;
    return MODULES_DATA.filter(
      m => m.category === currentStep.category && selectedConfig[m.code]?.selected
    ).length;
  }, [currentStep.category, selectedConfig]);

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
    const list: { code: string; category: string; name: string; qtyLabel: string; priceFormatted: string; fullText: string; isMonthly: boolean }[] = [];
    MODULES_DATA.forEach(m => {
      const cfg = selectedConfig[m.code];
      if (cfg && cfg.selected) {
        const qty = cfg.quantity || 1;
        const qtyLabel = (m.code === 'B-04' || m.code === 'C-01' || m.code === 'F-03') ? ` (${qty}x)` : '';
        const priceFormatted = (m.billingType === 'Monatlich' ? `${m.fixedPrice * qty} €/mtl.` : `${m.fixedPrice * qty} €`);
        const noticeSuffix = m.externalNotice ? ` (Hinweis: ${m.externalNotice})` : '';
        list.push({
          code: m.code,
          category: m.category,
          name: m.name,
          qtyLabel,
          priceFormatted,
          fullText: `${m.name}${qtyLabel} — ${priceFormatted}${noticeSuffix}`,
          isMonthly: m.billingType === 'Monatlich'
        });
      }
    });
    return list;
  }, [selectedConfig]);

  // Selected details array for inquiries and copy
  const selectedDetails = useMemo(() => {
    return selectedItemsStructured.map(i => i.fullText);
  }, [selectedItemsStructured]);

  // Dynamic Next Button Text
  const nextButtonText = useMemo(() => {
    if (currentStepIndex === 5) {
      return 'Jetzt Projekt unverbindlich anfragen';
    }

    const step = WIZARD_STEPS[currentStepIndex];

    if (currentStepIndex === 0) {
      if (countInCurrentStep === 0) {
        return 'Bitte wähle ein Basispaket';
      }
      return `Weiter zu ${step.nextStepName} →`;
    }

    if (countInCurrentStep === 0) {
      if (currentStepIndex === 4) {
        return `Ohne ${step.categoryName} zur Gesamtkalkulation →`;
      }
      return `Ohne ${step.categoryName} fortfahren →`;
    }

    if (currentStepIndex === 4) {
      return 'Weiter zur Gesamtkalkulation →';
    }

    return `Weiter zu ${step.nextStepName} →`;
  }, [currentStepIndex, countInCurrentStep]);

  // Navigation handlers
  const handleNextStep = () => {
    if (currentStepIndex === 0 && countInCurrentStep === 0) {
      return;
    }
    if (currentStepIndex === 5) {
      onRequestQuote(calculation, selectedDetails);
      return;
    }
    setCurrentStepIndex(prev => Math.min(WIZARD_STEPS.length - 1, prev + 1));
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleGoToStep = (stepIdx: number) => {
    setCurrentStepIndex(stepIdx);
  };

  // Helper count per category for stepper tabs
  const getCategoryCount = (cat: string) => {
    if (cat === 'summary') return calculation.itemCount;
    return MODULES_DATA.filter(m => m.category === cat && selectedConfig[m.code]?.selected).length;
  };

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
    <section id="preise" className="pricing-section compact-wizard-section">
      <div className="container compact-wizard-container">
        {/* Ultra-compact top bar: Title + Presets on one line */}
        <div className="wizard-top-deck">
          <div className="wizard-top-left">
            <span className="wizard-pill-mini">
              <Sparkles size={12} /> Geführter Fixpreis-Konfigurator
            </span>
            <h2 className="wizard-main-title">
              Wähle dein <span className="gradient-text">Website-Paket</span>
            </h2>
          </div>

          <div className="wizard-top-presets">
            <span className="preset-label-mini">Schnellwahl:</span>
            <button 
              type="button" 
              className={`preset-pill-mini ${activePreset === 'starter' ? 'active' : ''}`}
              onClick={() => setPreset('starter')}
            >
              🚀 Solo-Starter
            </button>
            <button 
              type="button" 
              className={`preset-pill-mini ${activePreset === 'business' ? 'active' : ''}`}
              onClick={() => setPreset('business')}
            >
              💼 B2B Business
            </button>
            <button 
              type="button" 
              className={`preset-pill-mini ${activePreset === 'scale' ? 'active' : ''}`}
              onClick={() => setPreset('scale')}
            >
              👑 Corporate
            </button>
            <button 
              type="button" 
              className={`preset-pill-mini ${activePreset === 'custom' ? 'active' : ''}`}
              onClick={() => setPreset('custom')}
            >
              ⚡ Individuell
            </button>
          </div>
        </div>

        {/* Compact Progress Stepper Strip */}
        <div className="wizard-stepper-compact glass-panel">
          <div className="stepper-compact-strip">
            {WIZARD_STEPS.map((step, idx) => {
              const isActive = currentStepIndex === idx;
              const isPast = currentStepIndex > idx;
              const count = getCategoryCount(step.category);

              return (
                <button
                  key={step.id}
                  type="button"
                  className={`wizard-step-tab ${isActive ? 'active' : ''} ${isPast ? 'completed' : ''}`}
                  onClick={() => handleGoToStep(idx)}
                >
                  <span className="step-num-bubble">
                    {isPast ? <Check size={11} /> : step.id}
                  </span>
                  <span className="step-tab-name">{step.shortLabel}</span>
                  {step.category !== 'summary' && count > 0 && (
                    <span className="step-tab-badge">{count}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Intro Header (Single compact line) */}
        <div className="wizard-step-intro-compact">
          <div className="step-intro-left">
            <h3 className="step-active-heading">{currentStep.title}</h3>
            <p className="step-active-sub">{currentStep.subtitle}</p>
          </div>
          {currentStepIndex === 5 && (
            <div className="summary-tax-toggle-compact">
              <div className="tax-toggle-group">
                <button 
                  type="button"
                  className={`tax-toggle-btn ${!useTax ? 'active' : ''}`}
                  onClick={() => setUseTax(false)}
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
          )}
        </div>

        {/* STEP 1-5: Compact Modular Cards Grid (Height ~145px) */}
        {currentStepIndex < 5 && (
          <div className="compact-cards-grid">
            {currentStepModules.map(mod => {
              const isSelected = !!selectedConfig[mod.code]?.selected;
              const quantity = selectedConfig[mod.code]?.quantity || 1;
              const isCountable = mod.code === 'B-04' || mod.code === 'C-01' || mod.code === 'F-03';

              return (
                <div 
                  key={mod.code} 
                  className={`compact-module-card glass-panel ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleModule(mod.code)}
                >
                  {/* Card Top: Badges & Price */}
                  <div className="card-top-meta">
                    <div className="card-badge-wrap">
                      {mod.isPopular && <span className="mini-badge-bestseller">⭐ Bestseller</span>}
                      {mod.badge && !mod.isPopular && <span className="mini-badge-subtle">{mod.badge}</span>}
                      {!mod.badge && !mod.isPopular && (
                        <span className="mini-badge-cat">{mod.categoryLabel.replace(/^[0-9]+\.\s*/, '')}</span>
                      )}
                    </div>
                    <div className="card-price-tag">
                      <strong className="price-num">{mod.fixedPrice} €</strong>
                      <span className="price-unit">
                        {mod.billingType === 'Monatlich' ? ' /mtl.' : 
                         mod.billingType === 'Pro Seite' ? ' /Seite' : 
                         mod.billingType === 'Pro Sprache' ? ' /Sprache' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Card Title & Crisp 1-Line Benefit */}
                  <h4 className="card-title-compact">{mod.name}</h4>
                  <p className="card-desc-compact">
                    {mod.scopeHighlights[0] || mod.description}
                  </p>

                  {/* Inline Stepper if countable */}
                  {isCountable && isSelected && (
                    <div className="card-stepper-compact" onClick={(e) => e.stopPropagation()}>
                      <span className="stepper-label-compact">
                        {mod.code === 'B-04' ? 'Seiten:' : mod.code === 'C-01' ? 'Texte:' : 'Sprachen:'}
                      </span>
                      <div className="stepper-controls-mini">
                        <button 
                          type="button" 
                          onClick={() => updateQuantity(mod.code, -1)}
                          aria-label="Verringern"
                        >
                          -
                        </button>
                        <span className="stepper-val-mini">{quantity}</span>
                        <button 
                          type="button" 
                          onClick={() => updateQuantity(mod.code, 1)}
                          aria-label="Erhöhen"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Card Bottom: Demo link & Selection state */}
                  <div className="card-bottom-actions">
                    <button 
                      type="button" 
                      className="btn-card-demo-mini"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        onOpenDemo(mod); 
                      }}
                      title="Interaktive Live-Demo testen"
                    >
                      <Play size={11} className="play-icon" />
                      <span>Live-Demo</span>
                    </button>

                    <div className={`selection-indicator ${isSelected ? 'selected' : ''}`}>
                      {isSelected ? (
                        <>
                          <CheckCircle2 size={13} className="check-icon-active" />
                          <span>Gewählt</span>
                        </>
                      ) : (
                        <>
                          <Plus size={13} />
                          <span>Wählen</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 6: Compact Summary Stage (Fits in single viewport) */}
        {currentStepIndex === 5 && (
          <div className="compact-summary-view">
            {/* Left: 5 category rows with edit buttons */}
            <div className="compact-summary-left glass-panel">
              <div className="summary-left-header">
                <h4>Übersicht deiner Konfiguration</h4>
                <p>Klicke auf Bearbeiten, um einzelne Schritte anzupassen.</p>
              </div>

              <div className="summary-compact-list">
                {WIZARD_STEPS.slice(0, 5).map((step, idx) => {
                  const stepItems = selectedItemsStructured.filter(item => item.category === step.category);

                  return (
                    <div key={step.id} className="summary-compact-row">
                      <div className="row-left">
                        <span className="row-dot"></span>
                        <strong className="row-cat-name">{step.shortLabel.replace(/^[0-9]+\.\s*/, '')}:</strong>
                        <span className="row-items-text">
                          {stepItems.length === 0 ? (
                            <span className="text-muted italic">Keine Zusatzmodule (Grundausstattung)</span>
                          ) : (
                            stepItems.map(i => `${i.name}${i.qtyLabel}`).join(', ')
                          )}
                        </span>
                      </div>
                      <div className="row-right">
                        <span className="row-price-sum">
                          {stepItems.length > 0 && (
                            stepItems.map(i => i.priceFormatted).join(' + ')
                          )}
                        </span>
                        <button 
                          type="button" 
                          className="btn-edit-compact" 
                          onClick={() => handleGoToStep(idx)}
                          title={`${step.shortLabel} bearbeiten`}
                        >
                          <Edit3 size={12} />
                          <span>Bearbeiten</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Condensed Price Overview & CTAs */}
            <div className="compact-summary-right glass-panel">
              <div className="summary-card-header-compact">
                <h4>Verbindlicher Festpreis</h4>
                <span className="summary-count-badge">{calculation.itemCount} Positionen</span>
              </div>

              <div className="summary-calc-compact">
                <div className="calc-row-compact">
                  <span>Einmalig (Netto):</span>
                  <strong>{calculation.oneTimeNet.toLocaleString('de-AT')} €</strong>
                </div>

                <div className="calc-row-compact">
                  <span>Umsatzsteuer ({calculation.taxRate}%):</span>
                  <span>{useTax ? `${Math.round(calculation.oneTimeNet * 0.2).toLocaleString('de-AT')} €` : '0 € (USt-frei)'}</span>
                </div>

                <div className="calc-row-compact highlight-gross">
                  <span>Gesamtsumme:</span>
                  <strong className="gross-total-amount gradient-text">
                    {calculation.oneTimeGross.toLocaleString('de-AT')} €
                  </strong>
                </div>

                {calculation.mrrNet > 0 && (
                  <div className="calc-row-compact mrr-highlight">
                    <span>Hosting & Wartung:</span>
                    <strong className="text-purple">{calculation.mrrNet.toLocaleString('de-AT')} €/mtl.</strong>
                  </div>
                )}
              </div>

              <div className="payment-5050-compact">
                <Shield size={13} className="text-cyan" />
                <span>50% Anzahlung ({calculation.downPayment50.toLocaleString('de-AT')} €) · 50% erst nach Freigabe & Livegang</span>
              </div>

              <div className="summary-actions-compact">
                <button 
                  type="button"
                  className="btn-quote-submit-compact"
                  onClick={() => onRequestQuote(calculation, selectedDetails)}
                >
                  <span>Projekt jetzt unverbindlich anfragen</span>
                  <ArrowRight size={16} />
                </button>

                <button 
                  type="button"
                  className="btn-pdf-compact"
                  onClick={handleDownloadPdfOffer}
                  disabled={isGeneratingPdf || calculation.itemCount === 0}
                >
                  <Download size={14} className={isGeneratingPdf ? 'spin-icon' : ''} />
                  <span>{isGeneratingPdf ? 'Erstelle PDF...' : 'Angebot als PDF laden'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Compact Integrated Bottom Action Dock (Steps 1 to 5) */}
        {currentStepIndex < 5 && (
          <div className="wizard-action-dock glass-panel">
            <div className="action-dock-left">
              {currentStepIndex > 0 ? (
                <button 
                  type="button" 
                  className="btn-dock-back" 
                  onClick={handlePrevStep}
                >
                  <ArrowLeft size={14} />
                  <span>Zurück</span>
                </button>
              ) : (
                <span className="dock-hint-text">Schritt 1: Website-Fundament</span>
              )}
            </div>

            <div className="action-dock-center">
              <div className="dock-price-chip">
                <span className="chip-label">Aktuell:</span>
                <strong className="chip-amount text-cyan">
                  {calculation.oneTimeGross.toLocaleString('de-AT')} €
                </strong>
                {calculation.mrrNet > 0 && (
                  <span className="chip-mrr text-purple">
                    + {calculation.mrrNet} €/mtl.
                  </span>
                )}
                <span className="chip-count">({calculation.itemCount} Positionen)</span>
              </div>
            </div>

            <div className="action-dock-right">
              <button 
                type="button"
                className={`btn-dock-next ${countInCurrentStep === 0 && currentStepIndex > 0 ? 'btn-dock-skip' : ''}`}
                onClick={handleNextStep}
              >
                <span>{nextButtonText}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
