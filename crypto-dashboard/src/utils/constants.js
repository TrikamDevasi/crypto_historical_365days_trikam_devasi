// API Endpoint Constants
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    GOOGLE_LOGIN: '/auth/google',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  // Coins
  COINS: {
    BASE: '/coins',
    BY_NAME: (name) => `/coins/name/${name}`,
    BY_SYMBOL: (symbol) => `/coins/symbol/${symbol}`,
    BY_ID: (id) => `/coins/${id}`,
    LATEST: '/coins/latest',
    HISTORY: (coinId) => `/coins/history/${coinId}`,
    PERFORMANCE: (coinId) => `/coins/performance/${coinId}`,
    COMPARE: (c1, c2) => `/coins/compare/${c1}/${c2}`,
    MARKET_STATUS: '/coins/market-status',
    SYSTEM_HEALTH: '/coins/system/health',
    TRENDING: '/coins/sort/volume/desc',
    TOP_GAINERS: '/coins/sort/return/desc',
    TOP_LOSERS: '/coins/sort/return/asc',
    TOP_MARKET_CAP: '/coins/sort/market_cap/desc',
    TOP_VOLUME: '/coins/sort/volume/desc',
    BULK_CREATE: '/coins/bulk-create',
    BULK_DELETE: '/coins/bulk-delete',
  },
  // Search & Filter
  SEARCH: '/search/coins',
  FILTER: (type) => `/coins/filter/${type}`,
  // Analytics
  ANALYTICS: {
    HIGHEST_PRICE: '/analytics/price/highest',
    LOWEST_PRICE: '/analytics/price/lowest',
    AVERAGE_PRICE: '/analytics/price/average',
    PRICE_HISTORY: (coinId) => `/analytics/price/history/${coinId}`,
    MARKET_TREND: '/analytics/price/trend',
    PRICE_GROWTH: '/analytics/price/growth',
    PRICE_DROP: '/analytics/price/drop',
    HIGHEST_VOLUME: '/analytics/volume/highest',
    AVERAGE_VOLUME: '/analytics/volume/average',
    VOLUME_SPIKES: '/analytics/volume/spike',
    TOP_RETURNS: '/analytics/returns/top',
    NEGATIVE_RETURNS: '/analytics/returns/negative',
    CUMULATIVE_RETURNS: '/analytics/returns/cumulative',
    HIGH_VOLATILITY: '/analytics/volatility/high',
  },
  // Stats
  STATS: {
    MARKET_CAP: '/stats/market-cap',
    AVERAGE_PRICE: '/stats/average-price',
    AVERAGE_VOLUME: '/stats/average-volume',
    MARKET_SUMMARY: '/stats/market-summary',
    MONTHLY_ANALYSIS: '/stats/monthly-analysis',
    YEARLY_ANALYSIS: '/stats/yearly-analysis',
    DAILY_ANALYSIS: '/stats/daily-analysis',
    TOP_GAINERS: '/stats/top-gainers',
    TOP_LOSERS: '/stats/top-losers',
    COIN_COUNT: '/stats/coin-count',
    RANK_DISTRIBUTION: '/stats/rank-distribution',
    PRICE_DISTRIBUTION: '/stats/price-distribution',
    VOLATILITY_DISTRIBUTION: '/stats/volatility-distribution',
  },
  // Admin
  ADMIN: {
    COINS: '/admin/coins',
    STATS: '/admin/stats',
    USERS: '/admin/users',
  },
};

// Chart Colors
export const CHART_COLORS = {
  cyan: '#00d4ff',
  green: '#00ff88',
  red: '#ff3366',
  purple: '#8b5cf6',
  gold: '#ffd700',
  blue: '#3b82f6',
  orange: '#f97316',
  pink: '#ec4899',
};

// User Roles
export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// Pagination Defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  LIMITS: [10, 20, 50, 100],
};

// Sidebar Navigation Items
export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: 'Dashboard' },
  { label: 'Coins', path: '/coins', icon: 'MonetizationOn' },
  { label: 'Analytics', path: '/analytics', icon: 'Timeline' },
  { label: 'Statistics', path: '/stats', icon: 'BarChart' },
  { label: 'Profile', path: '/profile', icon: 'Person' },
  { label: 'Settings', path: '/settings', icon: 'Settings' },
];

export const ADMIN_NAV_ITEMS = [
  { label: 'Admin Panel', path: '/admin', icon: 'AdminPanelSettings' },
  { label: 'User Management', path: '/admin/users', icon: 'Group' },
];
