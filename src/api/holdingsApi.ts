import type { Holding } from '../types';

const HOLDINGS_DATA: Holding[] = [
  {
    coin: 'BTC',
    coinName: 'Bitcoin',
    logo: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png',
    currentPrice: 8532015,
    totalHolding: 0.63776,
    averageBuyPrice: 8245000,
    stcg: { balance: 0.338, gain: -120000 },
    ltcg: { balance: 0.3, gain: 240000 },
  },
  {
    coin: 'ETH',
    coinName: 'Ethereum',
    logo: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png',
    currentPrice: 162015,
    totalHolding: 5.6736,
    averageBuyPrice: 148320,
    stcg: { balance: 2.332, gain: 5532015 },
    ltcg: { balance: 3.245, gain: 823929 },
  },
  {
    coin: 'USDT',
    coinName: 'Tether',
    logo: 'https://coin-images.coingecko.com/coins/images/325/large/Tether.png',
    currentPrice: 83.92,
    totalHolding: 3096.54,
    averageBuyPrice: 84.05,
    stcg: { balance: 2011.23, gain: -120000 },
    ltcg: { balance: 902.47, gain: 240000 },
  },
  {
    coin: 'MATIC',
    coinName: 'Polygon',
    logo: 'https://coin-images.coingecko.com/coins/images/4713/large/polygon.png',
    currentPrice: 2310,
    totalHolding: 2210,
    averageBuyPrice: 1850,
    stcg: { balance: 802, gain: -120000 },
    ltcg: { balance: 1402, gain: 240000 },
  },
  {
    coin: 'SOL',
    coinName: 'Solana',
    logo: 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png',
    currentPrice: 1483200,
    totalHolding: 3.245,
    averageBuyPrice: 1250000,
    stcg: { balance: 1.8, gain: 1245000 },
    ltcg: { balance: 1.445, gain: -320000 },
  },
  {
    coin: 'XRP',
    coinName: 'Ripple',
    logo: 'https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    currentPrice: 18520,
    totalHolding: 450,
    averageBuyPrice: 21200,
    stcg: { balance: 280, gain: -850000 },
    ltcg: { balance: 170, gain: -180000 },
  },
  {
    coin: 'DOT',
    coinName: 'Polkadot',
    logo: 'https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png',
    currentPrice: 54280,
    totalHolding: 28.5,
    averageBuyPrice: 48600,
    stcg: { balance: 16, gain: 320000 },
    ltcg: { balance: 12.5, gain: -95000 },
  },
  {
    coin: 'DOGE',
    coinName: 'Dogecoin',
    logo: 'https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png',
    currentPrice: 1425,
    totalHolding: 15000,
    averageBuyPrice: 1680,
    stcg: { balance: 9000, gain: -450000 },
    ltcg: { balance: 6000, gain: 120000 },
  },
  {
    coin: 'ADA',
    coinName: 'Cardano',
    logo: 'https://coin-images.coingecko.com/coins/images/975/large/cardano.png',
    currentPrice: 3560,
    totalHolding: 1200,
    averageBuyPrice: 4120,
    stcg: { balance: 700, gain: -280000 },
    ltcg: { balance: 500, gain: -65000 },
  },
  {
    coin: 'LINK',
    coinName: 'Chainlink',
    logo: 'https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
    currentPrice: 124500,
    totalHolding: 12.8,
    averageBuyPrice: 98000,
    stcg: { balance: 7.2, gain: 680000 },
    ltcg: { balance: 5.6, gain: 450000 },
  },
  {
    coin: 'AVAX',
    coinName: 'Avalanche',
    logo: 'https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
    currentPrice: 289000,
    totalHolding: 8.5,
    averageBuyPrice: 315000,
    stcg: { balance: 5.2, gain: 195000 },
    ltcg: { balance: 3.3, gain: -75000 },
  },
  {
    coin: 'ATOM',
    coinName: 'Cosmos',
    logo: 'https://coin-images.coingecko.com/coins/images/1481/large/cosmos_hub.png',
    currentPrice: 68500,
    totalHolding: 42,
    averageBuyPrice: 74200,
    stcg: { balance: 25, gain: -310000 },
    ltcg: { balance: 17, gain: 185000 },
  },
];

/**
 * Simulated holdings API fetch.
 * Returns holdings data after ~700ms delay with a 5% random failure rate.
 */
export async function fetchHoldings(): Promise<Holding[]> {
  return new Promise((resolve, reject) => {
    const delay = 600 + Math.random() * 200; // 600–800ms
    setTimeout(() => {
      // 5% chance of failure for error-state demo
      if (Math.random() < 0.05) {
        reject(new Error('Failed to fetch holdings. Please try again.'));
        return;
      }
      resolve(HOLDINGS_DATA);
    }, delay);
  });
}
