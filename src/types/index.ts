// ──────────────────────────────────────────────
// Holdings
// ──────────────────────────────────────────────

export interface StcgLtcg {
  balance: number;
  gain: number;
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  currentPrice: number;
  totalHolding: number;
  averageBuyPrice: number;
  stcg: StcgLtcg;
  ltcg: StcgLtcg;
}

// ──────────────────────────────────────────────
// Capital Gains
// ──────────────────────────────────────────────

export interface ProfitsLosses {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: ProfitsLosses;
  ltcg: ProfitsLosses;
}

export interface CapitalGainsResponse {
  capitalGains: CapitalGains;
}

// ──────────────────────────────────────────────
// Derived / Computed
// ──────────────────────────────────────────────

export interface ComputedGains {
  stcg: {
    profits: number;
    losses: number;
    net: number;
  };
  ltcg: {
    profits: number;
    losses: number;
    net: number;
  };
  realisedCapitalGains: number;
}

// ──────────────────────────────────────────────
// Context State
// ──────────────────────────────────────────────

export interface TaxHarvestingState {
  holdings: Holding[];
  capitalGains: CapitalGains | null;
  selectedAssetIds: Set<string>;
  isLoadingHoldings: boolean;
  isLoadingCapitalGains: boolean;
  holdingsError: string | null;
  capitalGainsError: string | null;
}

export interface TaxHarvestingActions {
  toggleAsset: (coin: string) => void;
  toggleAll: () => void;
  retryHoldings: () => void;
  retryCapitalGains: () => void;
}
