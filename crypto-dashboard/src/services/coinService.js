import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const coinService = {
  // CRUD
  getAllCoins: (params) => api.get(API_ENDPOINTS.COINS.BASE, { params }),
  getCoinById: (id) => api.get(API_ENDPOINTS.COINS.BY_ID(id)),
  createCoin: (data) => api.post(API_ENDPOINTS.COINS.BASE, data),
  updateCoin: (id, data) => api.patch(API_ENDPOINTS.COINS.BY_ID(id), data),
  deleteCoin: (id) => api.delete(API_ENDPOINTS.COINS.BY_ID(id)),

  // Lookup
  getCoinByName: (name, params) => api.get(API_ENDPOINTS.COINS.BY_NAME(name), { params }),
  getCoinBySymbol: (symbol, params) => api.get(API_ENDPOINTS.COINS.BY_SYMBOL(symbol), { params }),

  // Lists
  getLatest: (params) => api.get(API_ENDPOINTS.COINS.LATEST, { params }),
  getTopGainers: (params) => api.get(API_ENDPOINTS.COINS.TOP_GAINERS, { params }),
  getTopLosers: (params) => api.get(API_ENDPOINTS.COINS.TOP_LOSERS, { params }),
  getTopMarketCap: (params) => api.get(API_ENDPOINTS.COINS.TOP_MARKET_CAP, { params }),
  getTopVolume: (params) => api.get(API_ENDPOINTS.COINS.TOP_VOLUME, { params }),
  getTrending: (params) => api.get(API_ENDPOINTS.COINS.TRENDING, { params }),

  // Analytics per coin
  getCoinHistory: (coinId, params) => api.get(API_ENDPOINTS.COINS.HISTORY(coinId), { params }),
  getCoinPerformance: (coinId) => api.get(API_ENDPOINTS.COINS.PERFORMANCE(coinId)),
  compareCoins: (c1, c2) => api.get(API_ENDPOINTS.COINS.COMPARE(c1, c2)),

  // Market
  getMarketStatus: () => api.get(API_ENDPOINTS.COINS.MARKET_STATUS),
  systemHealth: () => api.get(API_ENDPOINTS.COINS.SYSTEM_HEALTH),

  // Search & Filter
  searchCoins: (q, params) => api.get(API_ENDPOINTS.SEARCH, { params: { q, ...params } }),
  getFilteredCoins: (filterType, params) =>
    api.get(API_ENDPOINTS.FILTER(filterType), { params }),

  // Bulk
  bulkCreate: (records) => api.post(API_ENDPOINTS.COINS.BULK_CREATE, { records }),
  bulkDelete: (ids) => api.delete(API_ENDPOINTS.COINS.BULK_DELETE, { data: { ids } }),
};

export default coinService;
