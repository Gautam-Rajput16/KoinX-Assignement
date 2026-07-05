import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { fetchHoldings } from '../api/holdingsApi';
import { fetchCapitalGains } from '../api/capitalGainsApi';
import {
  computePreHarvestingGains,
  computeAfterHarvestingGains,
  computeSavings,
} from '../hooks/useCapitalGainsCalculations';
import type {
  Holding,
  CapitalGains,
  ComputedGains,
  TaxHarvestingActions,
} from '../types';

// ──────────────────────────────────────────────
// Context Shape
// ──────────────────────────────────────────────

interface TaxHarvestingContextValue extends TaxHarvestingActions {
  holdings: Holding[];
  capitalGains: CapitalGains | null;
  selectedAssetIds: Set<string>;
  isLoadingHoldings: boolean;
  isLoadingCapitalGains: boolean;
  holdingsError: string | null;
  capitalGainsError: string | null;
  preHarvestingGains: ComputedGains | null;
  afterHarvestingGains: ComputedGains | null;
  savings: number;
}

const TaxHarvestingContext = createContext<TaxHarvestingContextValue | null>(
  null
);

// ──────────────────────────────────────────────
// Provider
// ──────────────────────────────────────────────

export function TaxHarvestingProvider({ children }: { children: ReactNode }) {
  // ── Raw API State ──
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
  const [selectedAssetIds, setSelectedAssetIds] = useState<Set<string>>(
    new Set()
  );

  // ── Loading & Error ──
  const [isLoadingHoldings, setIsLoadingHoldings] = useState(true);
  const [isLoadingCapitalGains, setIsLoadingCapitalGains] = useState(true);
  const [holdingsError, setHoldingsError] = useState<string | null>(null);
  const [capitalGainsError, setCapitalGainsError] = useState<string | null>(
    null
  );

  // ── API Fetchers ──
  const loadHoldings = useCallback(async () => {
    setIsLoadingHoldings(true);
    setHoldingsError(null);
    try {
      const data = await fetchHoldings();
      setHoldings(data);
    } catch (err) {
      setHoldingsError(
        err instanceof Error ? err.message : 'Failed to fetch holdings'
      );
    } finally {
      setIsLoadingHoldings(false);
    }
  }, []);

  const loadCapitalGains = useCallback(async () => {
    setIsLoadingCapitalGains(true);
    setCapitalGainsError(null);
    try {
      const data = await fetchCapitalGains();
      setCapitalGains(data.capitalGains);
    } catch (err) {
      setCapitalGainsError(
        err instanceof Error ? err.message : 'Failed to fetch capital gains'
      );
    } finally {
      setIsLoadingCapitalGains(false);
    }
  }, []);

  // ── Initial Fetch ──
  useEffect(() => {
    loadHoldings();
    loadCapitalGains();
  }, [loadHoldings, loadCapitalGains]);

  // ── Actions ──
  const toggleAsset = useCallback((coin: string) => {
    setSelectedAssetIds((prev) => {
      const next = new Set(prev);
      if (next.has(coin)) {
        next.delete(coin);
      } else {
        next.add(coin);
      }
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelectedAssetIds((prev) => {
      if (prev.size === holdings.length) {
        return new Set();
      }
      return new Set(holdings.map((h) => h.coin));
    });
  }, [holdings]);

  // ── Derived Computed Gains ──
  const preHarvestingGains = useMemo(
    () => (capitalGains ? computePreHarvestingGains(capitalGains) : null),
    [capitalGains]
  );

  const afterHarvestingGains = useMemo(
    () =>
      capitalGains
        ? computeAfterHarvestingGains(capitalGains, holdings, selectedAssetIds)
        : null,
    [capitalGains, holdings, selectedAssetIds]
  );

  const savings = useMemo(
    () =>
      preHarvestingGains && afterHarvestingGains
        ? computeSavings(preHarvestingGains, afterHarvestingGains)
        : 0,
    [preHarvestingGains, afterHarvestingGains]
  );

  // ── Context Value ──
  const value = useMemo<TaxHarvestingContextValue>(
    () => ({
      holdings,
      capitalGains,
      selectedAssetIds,
      isLoadingHoldings,
      isLoadingCapitalGains,
      holdingsError,
      capitalGainsError,
      preHarvestingGains,
      afterHarvestingGains,
      savings,
      toggleAsset,
      toggleAll,
      retryHoldings: loadHoldings,
      retryCapitalGains: loadCapitalGains,
    }),
    [
      holdings,
      capitalGains,
      selectedAssetIds,
      isLoadingHoldings,
      isLoadingCapitalGains,
      holdingsError,
      capitalGainsError,
      preHarvestingGains,
      afterHarvestingGains,
      savings,
      toggleAsset,
      toggleAll,
      loadHoldings,
      loadCapitalGains,
    ]
  );

  return (
    <TaxHarvestingContext.Provider value={value}>
      {children}
    </TaxHarvestingContext.Provider>
  );
}

// ──────────────────────────────────────────────
// Hook
// ──────────────────────────────────────────────

export function useTaxHarvesting() {
  const ctx = useContext(TaxHarvestingContext);
  if (!ctx) {
    throw new Error(
      'useTaxHarvesting must be used within a TaxHarvestingProvider'
    );
  }
  return ctx;
}
