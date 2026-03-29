export const cryptos = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 43215.00,
    change24h: -1.19,
    marketCap: 847_200_000_000,
    volume24h: 18_400_000_000,
    holdings: 0.1902,
    holdingsValue: 8217.49,
    color: '#f7931a',
    bg: '#fff3e0',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2318.45,
    change24h: 2.34,
    marketCap: 278_500_000_000,
    volume24h: 9_100_000_000,
    holdings: 1.42,
    holdingsValue: 3292.20,
    color: '#627eea',
    bg: '#ede7f6',
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    price: 98.72,
    change24h: 4.87,
    marketCap: 42_300_000_000,
    volume24h: 2_100_000_000,
    holdings: 12.5,
    holdingsValue: 1234.00,
    color: '#9945ff',
    bg: '#f3e5f5',
  },
  {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    price: 312.88,
    change24h: -0.54,
    marketCap: 48_100_000_000,
    volume24h: 1_400_000_000,
    holdings: 0,
    holdingsValue: 0,
    color: '#f3ba2f',
    bg: '#fff8e1',
  },
  {
    id: 'usdc',
    name: 'USD Coin',
    symbol: 'USDC',
    price: 1.00,
    change24h: 0.01,
    marketCap: 25_800_000_000,
    volume24h: 5_200_000_000,
    holdings: 0,
    holdingsValue: 0,
    color: '#2775ca',
    bg: '#e3f2fd',
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    price: 0.6121,
    change24h: 1.83,
    marketCap: 33_400_000_000,
    volume24h: 1_800_000_000,
    holdings: 0,
    holdingsValue: 0,
    color: '#00aae4',
    bg: '#e0f7fa',
  },
  {
    id: 'ada',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.4487,
    change24h: -2.11,
    marketCap: 15_900_000_000,
    volume24h: 540_000_000,
    holdings: 0,
    holdingsValue: 0,
    color: '#0d1e41',
    bg: '#e8eaf6',
  },
  {
    id: 'avax',
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 34.92,
    change24h: 3.45,
    marketCap: 14_200_000_000,
    volume24h: 670_000_000,
    holdings: 0,
    holdingsValue: 0,
    color: '#e84142',
    bg: '#fce4ec',
  },
  {
    id: 'dot',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.23,
    change24h: -1.67,
    marketCap: 9_400_000_000,
    volume24h: 310_000_000,
    holdings: 0,
    holdingsValue: 0,
    color: '#e6007a',
    bg: '#fce4ec',
  },
  {
    id: 'link',
    name: 'Chainlink',
    symbol: 'LINK',
    price: 14.58,
    change24h: 5.21,
    marketCap: 8_600_000_000,
    volume24h: 480_000_000,
    holdings: 0,
    holdingsValue: 0,
    color: '#375bd2',
    bg: '#e8eaf6',
  },
  {
    id: 'matic',
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.8834,
    change24h: 2.09,
    marketCap: 8_200_000_000,
    volume24h: 420_000_000,
    holdings: 0,
    holdingsValue: 0,
    color: '#8247e5',
    bg: '#f3e5f5',
  },
  {
    id: 'uni',
    name: 'Uniswap',
    symbol: 'UNI',
    price: 6.14,
    change24h: -0.88,
    marketCap: 3_700_000_000,
    volume24h: 180_000_000,
    holdings: 0,
    holdingsValue: 0,
    color: '#ff007a',
    bg: '#fce4ec',
  },
  {
    id: 'atom',
    name: 'Cosmos',
    symbol: 'ATOM',
    price: 9.87,
    change24h: 1.44,
    marketCap: 2_900_000_000,
    volume24h: 210_000_000,
    holdings: 0,
    holdingsValue: 0,
    color: '#2e3148',
    bg: '#ede7f6',
  },
  {
    id: 'ltc',
    name: 'Litecoin',
    symbol: 'LTC',
    price: 71.34,
    change24h: -3.22,
    marketCap: 5_300_000_000,
    volume24h: 390_000_000,
    holdings: 0,
    holdingsValue: 0,
    color: '#bfbbbb',
    bg: '#f5f5f5',
  },
  {
    id: 'algo',
    name: 'Algorand',
    symbol: 'ALGO',
    price: 0.1723,
    change24h: 6.77,
    marketCap: 1_400_000_000,
    volume24h: 95_000_000,
    holdings: 0,
    holdingsValue: 0,
    color: '#000000',
    bg: '#f5f5f5',
  },
]

export const myAssets = cryptos.filter(c => c.holdings > 0)

export const watchlist = cryptos.filter(c => c.holdings === 0).slice(0, 3)

export const portfolio = {
  totalValue: 8234.67,
  change24hAmount: 123.45,
  change24hPct: 1.52,
  allocation: [
    { symbol: 'BTC', pct: 45, color: '#f7931a' },
    { symbol: 'ETH', pct: 30, color: '#627eea' },
    { symbol: 'SOL', pct: 15, color: '#9945ff' },
    { symbol: 'Other', pct: 10, color: '#e6e8ea' },
  ],
}

export const marketStats = {
  marketCap: '$1.72T',
  volume24h: '$68.4B',
  btcDominance: '49.2%',
}

// 60 BTC price history points (last 60 days, simulated)
export const btcHistory = (() => {
  const base = 43215
  const pts = []
  let v = base * 0.82
  for (let i = 0; i < 60; i++) {
    v += (Math.random() - 0.46) * 800
    v = Math.max(v, 28000)
    pts.push(+v.toFixed(2))
  }
  pts[59] = base
  return pts
})()

// 1H, 1D, 1W, 1M, 1Y data (20 points each for chart)
export function generateChartData(timeframe) {
  const seed = { '1H': 42, '1D': 43215, '1W': 41000, '1M': 36000, '1Y': 22000 }
  const vol = { '1H': 80, '1D': 300, '1W': 800, '1M': 1500, '1Y': 3000 }
  const base = seed[timeframe] ?? 43215
  const v_ = vol[timeframe] ?? 300
  const pts = []
  let v = base * 0.96
  for (let i = 0; i < 30; i++) {
    v += (Math.random() - 0.46) * v_
    v = Math.max(v, 5000)
    pts.push(+v.toFixed(2))
  }
  pts[29] = 43215
  return pts
}

export const earnCourses = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', reward: 3, color: '#f7931a', desc: 'Learn about Bitcoin' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', reward: 4, color: '#627eea', desc: 'Learn about Ethereum' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', reward: 6, color: '#9945ff', desc: 'Learn about Solana' },
  { id: 'avax', name: 'Avalanche', symbol: 'AVAX', reward: 5, color: '#e84142', desc: 'Learn about Avalanche' },
  { id: 'link', name: 'Chainlink', symbol: 'LINK', reward: 3, color: '#375bd2', desc: 'Learn about Chainlink' },
  { id: 'uni', name: 'Uniswap', symbol: 'UNI', reward: 4, color: '#ff007a', desc: 'Learn about Uniswap' },
]

export const stakingOptions = [
  { symbol: 'ETH', name: 'Ethereum', apy: '4.2%', minAmount: '0.01 ETH', color: '#627eea' },
  { symbol: 'SOL', name: 'Solana', apy: '6.8%', minAmount: '0.01 SOL', color: '#9945ff' },
  { symbol: 'ATOM', name: 'Cosmos', apy: '18.5%', minAmount: '1 ATOM', color: '#2e3148' },
  { symbol: 'ADA', name: 'Cardano', apy: '4.5%', minAmount: '10 ADA', color: '#0d1e41' },
]
