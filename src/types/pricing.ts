export type CategoryId = 'all' | 'basis' | 'frontend' | 'tech' | 'content' | 'hosting';

export type BillingType = 'Pauschal (Einmalig)' | 'Pro Seite' | 'Pro Modul' | 'Pro Sprache' | 'Monatlich';

export interface ModuleImpactScores {
  seo: number;
  conversion: number;
  brand: number;
  autonomy: number;
}

export interface PricingModule {
  code: string;
  category: 'basis' | 'frontend' | 'tech' | 'content' | 'hosting';
  categoryLabel: string;
  name: string;
  description: string;
  scopeHighlights: string[];
  billingType: BillingType;
  minPrice: number;
  maxPrice: number;
  fixedPrice: number;
  estimatedHours: number;
  effectiveHourlyRate: number;
  badge?: string;
  isPopular?: boolean;
  demoId: string;
  demoTitle: string;
  demoShortDesc: string;
  iconName: string;
  externalNotice?: string;
  impactTag?: string;
  socialProof?: string;
  recommendedWith?: string[];
  impactScores?: ModuleImpactScores;
}

export interface ProjectPotential {
  seo: number;
  conversion: number;
  brand: number;
  autonomy: number;
  overall: number;
}

export interface SelectedConfig {
  [code: string]: {
    selected: boolean;
    quantity: number; // e.g. for extra pages, languages, or copywriting pages
  };
}

export interface ProjectCalculation {
  oneTimeNet: number;
  oneTimeGross: number;
  mrrNet: number;
  totalMarketValue: number;
  savingsTotal: number;
  totalHours: number;
  downPayment50: number;
  finalPayment50: number;
  taxRate: number; // 0 or 20
  itemCount: number;
}
