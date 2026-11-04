import { useState, useMemo, useEffect, useCallback } from 'react';
import { MODULES_DATA } from '../data/modulesData';
import type { SelectedConfig, ProjectCalculation, ProjectPotential } from '../types/pricing';

export type PresetKey = 'starter' | 'business' | 'scale' | 'custom';

export type AdvisorGoal = 'leads' | 'recruiting' | 'brand' | 'lean';
export type AdvisorScope = 'compact' | 'medium' | 'extensive';
export type AdvisorCare = 'self_cms' | 'concierge' | 'done_for_you';

export interface StructuredSelectedItem {
  code: string;
  category: string;
  categoryLabel: string;
  name: string;
  description: string;
  billingType: string;
  qty: number;
  qtyLabel: string;
  priceFormatted: string;
  fullText: string;
  isMonthly: boolean;
  amount: number;
}

export const PRESET_CONFIGS: Record<'starter' | 'business' | 'scale', Record<string, number>> = {
  starter: {
    'B-01': 1,
    'F-04': 1,
    'M-01': 1
  },
  business: {
    'B-02': 1,
    'F-01': 1,
    'T-03': 1,
    'C-02': 1,
    'C-03': 1,
    'M-02': 1
  },
  scale: {
    'B-03': 1,
    'F-01': 1,
    'F-02': 1,
    'T-01': 1,
    'T-04': 1,
    'C-02': 1,
    'C-03': 1,
    'M-02': 1
  }
};

export const createConfigFromPreset = (preset: Record<string, number>): SelectedConfig => {
  const cfg: SelectedConfig = {};
  Object.entries(preset).forEach(([code, qty]) => {
    cfg[code] = { selected: true, quantity: qty };
  });
  return cfg;
};

const STORAGE_KEY = 'puresite_config_v2';

function parseConfigFromHash(): SelectedConfig | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  if (!hash.startsWith('#konfig=')) return null;
  try {
    const raw = decodeURIComponent(hash.slice('#konfig='.length));
    const entries = raw.split(',').filter(Boolean);
    const parsed: SelectedConfig = {};
    let hasBase = false;

    for (const pair of entries) {
      const [code, qtyStr] = pair.split(':');
      const validMod = MODULES_DATA.some(m => m.code === code);
      if (!validMod) continue;
      const qty = Math.max(1, Math.min(30, parseInt(qtyStr || '1', 10) || 1));
      parsed[code] = { selected: true, quantity: qty };
      if (code === 'B-01' || code === 'B-02' || code === 'B-03') {
        hasBase = true;
      }
    }

    if (!hasBase) {
      parsed['B-02'] = { selected: true, quantity: 1 };
    }
    return Object.keys(parsed).length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

function loadInitialConfig(): SelectedConfig {
  const fromHash = parseConfigFromHash();
  if (fromHash) return fromHash;

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SelectedConfig;
        const hasBase =
          parsed['B-01']?.selected || parsed['B-02']?.selected || parsed['B-03']?.selected;
        if (parsed && typeof parsed === 'object' && hasBase) {
          return parsed;
        }
      }
    } catch {
      // ignore invalid storage
    }
  }

  return createConfigFromPreset(PRESET_CONFIGS.business);
}

export function useProjectConfig() {
  const [selectedConfig, setSelectedConfig] = useState<SelectedConfig>(loadInitialConfig);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [useTax, setUseTax] = useState<boolean>(false);

  // Persist config smoothly in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedConfig));
    } catch {
      // ignore storage quota errors
    }
  }, [selectedConfig]);

  // Toggle module with smart radio handling for Base Packages (B-01..B-03) and Hosting Tiers (M-01 vs M-02)
  const toggleModule = useCallback((code: string) => {
    setIsCustomMode(false);
    setSelectedConfig(prev => {
      if (code === 'B-01' || code === 'B-02' || code === 'B-03') {
        return {
          ...prev,
          'B-01': { selected: code === 'B-01', quantity: 1 },
          'B-02': { selected: code === 'B-02', quantity: 1 },
          'B-03': { selected: code === 'B-03', quantity: 1 }
        };
      }

      if (code === 'M-01' || code === 'M-02') {
        const currentlySelected = !!prev[code]?.selected;
        const otherCode = code === 'M-01' ? 'M-02' : 'M-01';
        return {
          ...prev,
          [code]: { selected: !currentlySelected, quantity: 1 },
          [otherCode]: { selected: false, quantity: 1 }
        };
      }

      const current = prev[code];
      const isSelected = current ? current.selected : false;

      return {
        ...prev,
        [code]: {
          selected: !isSelected,
          quantity: current?.quantity && current.quantity > 0 ? current.quantity : 1
        }
      };
    });
  }, []);

  // Explicitly enable one or more modules with optional quantities
  const enableModules = useCallback((items: Record<string, number>) => {
    setIsCustomMode(false);
    setSelectedConfig(prev => {
      const next: SelectedConfig = { ...prev };
      for (const [code, qty] of Object.entries(items)) {
        if (code === 'B-01' || code === 'B-02' || code === 'B-03') {
          next['B-01'] = { selected: code === 'B-01', quantity: 1 };
          next['B-02'] = { selected: code === 'B-02', quantity: 1 };
          next['B-03'] = { selected: code === 'B-03', quantity: 1 };
        } else if (code === 'M-01' || code === 'M-02') {
          const other = code === 'M-01' ? 'M-02' : 'M-01';
          next[code] = { selected: true, quantity: 1 };
          next[other] = { selected: false, quantity: 1 };
        } else {
          next[code] = { selected: true, quantity: Math.max(1, qty) };
        }
      }
      return next;
    });
  }, []);

  // Upgrade base package and adjust extra pages cleanly
  const upgradeBasePackage = useCallback((targetBase: 'B-02' | 'B-03', remainingExtraPages = 0) => {
    setIsCustomMode(false);
    setSelectedConfig(prev => ({
      ...prev,
      'B-01': { selected: false, quantity: 1 },
      'B-02': { selected: targetBase === 'B-02', quantity: 1 },
      'B-03': { selected: targetBase === 'B-03', quantity: 1 },
      'B-04': {
        selected: remainingExtraPages > 0,
        quantity: Math.max(1, remainingExtraPages)
      }
    }));
  }, []);

  const removeModule = useCallback((code: string) => {
    if (code === 'B-01' || code === 'B-02' || code === 'B-03') {
      return;
    }
    setIsCustomMode(false);
    setSelectedConfig(prev => ({
      ...prev,
      [code]: { selected: false, quantity: 1 }
    }));
  }, []);

  const updateQuantity = useCallback((code: string, delta: number) => {
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
  }, []);

  const setModuleQuantity = useCallback((code: string, exactQty: number) => {
    setIsCustomMode(false);
    setSelectedConfig(prev => ({
      ...prev,
      [code]: {
        selected: exactQty > 0,
        quantity: Math.max(1, exactQty)
      }
    }));
  }, []);

  const handleUpdateZusatzseiten = useCallback((delta: number) => {
    setIsCustomMode(false);
    setSelectedConfig(prev => {
      const current = prev['B-04'];
      const currentQty = current && current.selected ? current.quantity || 1 : 0;
      const newQty = currentQty + delta;

      if (newQty <= 0) {
        return {
          ...prev,
          'B-04': { selected: false, quantity: 1 }
        };
      }
      return {
        ...prev,
        'B-04': { selected: true, quantity: newQty }
      };
    });
  }, []);

  const setPreset = useCallback((type: PresetKey) => {
    if (type === 'custom') {
      setIsCustomMode(true);
      return;
    }
    setIsCustomMode(false);
    setSelectedConfig(createConfigFromPreset(PRESET_CONFIGS[type]));
  }, []);

  // Build tailored configuration from the 3-step Consultative Project Compass
  const applyAdvisorRecommendation = useCallback(
    (goal: AdvisorGoal, scope: AdvisorScope, care: AdvisorCare): string[] => {
      setIsCustomMode(false);
      const map: Record<string, number> = {};
      const reasons: string[] = [];

      // 1. Scope -> Base Architecture
      if (scope === 'compact' && goal === 'lean') {
        map['B-01'] = 1;
        reasons.push('Kompakter One-Pager (B-01) für schnellen Start in 5–7 Tagen');
      } else if (scope === 'extensive') {
        map['B-03'] = 1;
        reasons.push('Corporate Web (B-03) mit bis zu 10 Unterseiten & eigenem UI-Kit');
      } else {
        map['B-02'] = 1;
        reasons.push('Mehrseitige Business-Website (B-02) für starke Google-Struktur');
      }

      // 2. Primary Business Goal
      if (goal === 'leads') {
        map['F-01'] = 1;
        map['T-03'] = 1;
        map['C-02'] = 1;
        map['C-03'] = 1;
        reasons.push('Preisrechner (F-01) + Terminbuchung (T-03) für automatisierte Anfragen');
        reasons.push('Lokales Google-Maps-Profil (C-02) & Privacy-Analytics (C-03)');
      } else if (goal === 'recruiting') {
        map['T-04'] = 1;
        map['F-02'] = 1;
        map['C-02'] = 1;
        reasons.push('60-Sekunden Bewerber-Funnel (T-04) für 4× mehr Smartphone-Bewerbungen');
        reasons.push('High-End Scrollytelling (F-02) für attraktives Arbeitgeber-Image');
      } else if (goal === 'brand') {
        map['F-02'] = 1;
        map['F-04'] = 1;
        map['T-02'] = 1;
        reasons.push('60-FPS Animationen (F-02) & Dark/Light-Theme (F-04) für Marken-Exzellenz');
        reasons.push('Dynamisches Referenz-/Portfolio-System (T-02) für Vorzeigeprojekte');
      } else {
        map['C-02'] = 1;
        reasons.push('Google Business Optimierung (C-02) für sofortige regionale Auffindbarkeit');
      }

      // 3. Care & Content Autonomy
      if (care === 'self_cms') {
        map['T-01'] = 1;
        map['M-01'] = 1;
        reasons.push('Inhouse Admin-Dashboard (T-01) ohne laufende CMS-Abokosten + Standard-Hosting inkl. 1h Support/Monat');
      } else if (care === 'concierge') {
        map['M-02'] = 1;
        reasons.push('Sorglos-Paket Pro (M-02) inkl. 3h Änderungen/Monat direkt per WhatsApp');
      } else {
        const pageUnits = map['B-03'] ? 6 : map['B-02'] ? 5 : 2;
        map['C-01'] = pageUnits;
        map['M-02'] = 1;
        reasons.push(`Verkaufsstarkes Copywriting (${pageUnits} Einheiten) + Sorglos-Betreuung Pro (3h/Monat)`);
      }

      setSelectedConfig(createConfigFromPreset(map));
      return reasons;
    },
    []
  );

  const activePreset = useMemo<PresetKey>(() => {
    if (isCustomMode) return 'custom';

    const selectedEntries = Object.entries(selectedConfig).filter(
      ([, val]) => val && val.selected && (val.quantity || 1) > 0
    );

    for (const [presetKey, presetMap] of Object.entries(PRESET_CONFIGS) as [
      'starter' | 'business' | 'scale',
      Record<string, number>
    ][]) {
      const presetKeys = Object.keys(presetMap);
      if (selectedEntries.length !== presetKeys.length) continue;

      const allMatch = selectedEntries.every(([code, val]) => {
        return presetMap[code] === (val.quantity || 1);
      });

      if (allMatch) return presetKey;
    }

    return 'custom';
  }, [selectedConfig, isCustomMode]);

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

  // 4D Project Potential Score (0-100) for live visual feedback
  const potential = useMemo<ProjectPotential>(() => {
    let seo = 0;
    let conversion = 0;
    let brand = 0;
    let autonomy = 0;

    MODULES_DATA.forEach(mod => {
      const cfg = selectedConfig[mod.code];
      if (cfg && cfg.selected && mod.impactScores) {
        const qtyFactor =
          mod.code === 'B-04' || mod.code === 'C-01' || mod.code === 'F-03'
            ? Math.min(2.2, 1 + ((cfg.quantity || 1) - 1) * 0.25)
            : 1;
        seo += mod.impactScores.seo * qtyFactor;
        conversion += mod.impactScores.conversion * qtyFactor;
        brand += mod.impactScores.brand * qtyFactor;
        autonomy += mod.impactScores.autonomy * qtyFactor;
      }
    });

    const clamp = (v: number) => Math.min(100, Math.max(18, Math.round(v)));
    const s = clamp(seo);
    const c = clamp(conversion);
    const b = clamp(brand);
    const a = clamp(autonomy);
    const overall = Math.round((s + c + b + a) / 4);

    return { seo: s, conversion: c, brand: b, autonomy: a, overall };
  }, [selectedConfig]);

  const selectedItemsStructured = useMemo<StructuredSelectedItem[]>(() => {
    const list: StructuredSelectedItem[] = [];

    MODULES_DATA.forEach(m => {
      const cfg = selectedConfig[m.code];
      if (cfg && cfg.selected) {
        const qty = cfg.quantity || 1;
        const qtyLabel =
          m.code === 'B-04' || m.code === 'C-01' || m.code === 'F-03' ? ` (${qty}x)` : '';
        const priceFormatted =
          m.billingType === 'Monatlich' ? `${m.fixedPrice * qty} €/mtl.` : `${m.fixedPrice * qty} €`;
        const noticeSuffix = m.externalNotice ? ` (Hinweis: ${m.externalNotice})` : '';
        list.push({
          code: m.code,
          category: m.category,
          categoryLabel: m.categoryLabel,
          name: m.name,
          description: m.description,
          billingType: m.billingType,
          qty,
          qtyLabel,
          priceFormatted,
          fullText: `${m.name}${qtyLabel} — ${priceFormatted}${noticeSuffix}`,
          isMonthly: m.billingType === 'Monatlich',
          amount: m.fixedPrice * qty
        });
      }
    });
    return list;
  }, [selectedConfig]);

  const selectedDetails = useMemo(() => {
    return selectedItemsStructured.map(i => i.fullText);
  }, [selectedItemsStructured]);

  const getShareableUrl = useCallback(() => {
    const parts: string[] = [];
    MODULES_DATA.forEach(m => {
      const cfg = selectedConfig[m.code];
      if (cfg && cfg.selected) {
        parts.push(`${m.code}:${cfg.quantity || 1}`);
      }
    });
    const base =
      typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}`
        : 'https://puresite.at/';
    return `${base}#konfig=${encodeURIComponent(parts.join(','))}`;
  }, [selectedConfig]);

  return {
    selectedConfig,
    useTax,
    setUseTax,
    activePreset,
    setPreset,
    toggleModule,
    enableModules,
    upgradeBasePackage,
    removeModule,
    updateQuantity,
    setModuleQuantity,
    handleUpdateZusatzseiten,
    applyAdvisorRecommendation,
    calculation,
    potential,
    selectedItemsStructured,
    selectedDetails,
    getShareableUrl
  };
}
