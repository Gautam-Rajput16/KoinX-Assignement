import type { CapitalGains, ComputedGains, Holding } from '../types';

// ──────────────────────────────────────────────
// Pure Calculation Functions
// ──────────────────────────────────────────────

/**
 * Compute the "Pre-Harvesting" gains directly from the base API data.
 */
export function computePreHarvestingGains(base: CapitalGains): ComputedGains {
  const stcgNet = base.stcg.profits - base.stcg.losses;
  const ltcgNet = base.ltcg.profits - base.ltcg.losses;

  return {
    stcg: {
      profits: base.stcg.profits,
      losses: base.stcg.losses,
      net: stcgNet,
    },
    ltcg: {
      profits: base.ltcg.profits,
      losses: base.ltcg.losses,
      net: ltcgNet,
    },
    realisedCapitalGains: stcgNet + ltcgNet,
  };
}

/**
 * Compute the "After-Harvesting" gains.
 *
 * Always recomputes from base + currently-selected holdings
 * (never incremental) to avoid floating-point drift.
 *
 * For each selected holding:
 *   - If stcg.gain > 0 → add to stcg.profits
 *   - If stcg.gain < 0 → add |gain| to stcg.losses
 *   - Same logic for ltcg.gain
 */
export function computeAfterHarvestingGains(
  base: CapitalGains,
  holdings: Holding[],
  selectedAssetIds: Set<string>
): ComputedGains {
  // Start from the base API values
  let stcgProfits = base.stcg.profits;
  let stcgLosses = base.stcg.losses;
  let ltcgProfits = base.ltcg.profits;
  let ltcgLosses = base.ltcg.losses;

  // Adjust for each selected holding
  for (const holding of holdings) {
    if (!selectedAssetIds.has(holding.coin)) continue;

    // Short-term capital gains adjustment
    if (holding.stcg.gain > 0) {
      stcgProfits += holding.stcg.gain;
    } else if (holding.stcg.gain < 0) {
      stcgLosses += Math.abs(holding.stcg.gain);
    }

    // Long-term capital gains adjustment
    if (holding.ltcg.gain > 0) {
      ltcgProfits += holding.ltcg.gain;
    } else if (holding.ltcg.gain < 0) {
      ltcgLosses += Math.abs(holding.ltcg.gain);
    }
  }

  const stcgNet = stcgProfits - stcgLosses;
  const ltcgNet = ltcgProfits - ltcgLosses;

  return {
    stcg: {
      profits: stcgProfits,
      losses: stcgLosses,
      net: stcgNet,
    },
    ltcg: {
      profits: ltcgProfits,
      losses: ltcgLosses,
      net: ltcgNet,
    },
    realisedCapitalGains: stcgNet + ltcgNet,
  };
}

// ──────────────────────────────────────────────
// Formatting Utilities
// ──────────────────────────────────────────────

/**
 * Format a number as Indian Rupee currency.
 * Uses the Indian numbering system (₹1,23,456).
 *
 * @param value - The numeric value to format
 * @param showSign - Whether to prefix with +/- for positive/negative
 */
export function formatIndianCurrency(
  value: number,
  showSign: boolean = false
): string {
  const absValue = Math.abs(value);
  const formatted = absValue.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  const prefix = value < 0 ? '- ₹' : showSign && value > 0 ? '+₹' : '₹';
  return `${prefix}${formatted}`;
}

/**
 * Format a number with sensible decimal precision.
 * - Large numbers (>1000): no decimals
 * - Medium numbers (>1): 2 decimals
 * - Small numbers (<1): up to 4 decimals (but trim trailing zeros)
 */
export function formatNumber(value: number, maxDecimals?: number): string {
  const abs = Math.abs(value);

  let decimals: number;
  if (maxDecimals !== undefined) {
    decimals = maxDecimals;
  } else if (abs >= 1000) {
    decimals = 2;
  } else if (abs >= 1) {
    decimals = 2;
  } else if (abs > 0) {
    decimals = 6;
  } else {
    decimals = 0;
  }

  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format a price with the ₹ symbol and Indian grouping.
 * E.g. ₹85,320.15
 */
export function formatPrice(value: number): string {
  return `₹${value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Format large numbers compactly (e.g., ₹300K, ₹1.5M)
 */
export function formatCompactCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Compute the savings amount (Pre - Post realised gains).
 * Returns positive if there are savings, 0 otherwise.
 */
export function computeSavings(
  preGains: ComputedGains,
  postGains: ComputedGains
): number {
  const savings =
    preGains.realisedCapitalGains - postGains.realisedCapitalGains;
  return savings > 0 ? savings : 0;
}
