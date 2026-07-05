import type { CapitalGainsResponse } from '../types';

const CAPITAL_GAINS_DATA: CapitalGainsResponse = {
  capitalGains: {
    stcg: {
      profits: 154000,
      losses: 74300,
    },
    ltcg: {
      profits: 120000,
      losses: 65000,
    },
  },
};

/**
 * Simulated capital gains API fetch.
 * Returns capital gains data after ~600ms delay with a 5% random failure rate.
 */
export async function fetchCapitalGains(): Promise<CapitalGainsResponse> {
  return new Promise((resolve, reject) => {
    const delay = 500 + Math.random() * 200; // 500–700ms
    setTimeout(() => {
      // 5% chance of failure for error-state demo
      if (Math.random() < 0.05) {
        reject(new Error('Failed to fetch capital gains. Please try again.'));
        return;
      }
      resolve(CAPITAL_GAINS_DATA);
    }, delay);
  });
}
