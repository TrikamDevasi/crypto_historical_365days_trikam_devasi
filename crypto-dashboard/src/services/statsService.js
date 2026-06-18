import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const statsService = {
  getMarketCap: () => api.get(API_ENDPOINTS.STATS.MARKET_CAP),
  getAveragePrice: () => api.get(API_ENDPOINTS.STATS.AVERAGE_PRICE),
  getAverageVolume: () => api.get(API_ENDPOINTS.STATS.AVERAGE_VOLUME),
  getMarketSummary: () => api.get(API_ENDPOINTS.STATS.MARKET_SUMMARY),
  getMonthlyAnalysis: () => api.get(API_ENDPOINTS.STATS.MONTHLY_ANALYSIS),
  getYearlyAnalysis: () => api.get(API_ENDPOINTS.STATS.YEARLY_ANALYSIS),
  getDailyAnalysis: () => api.get(API_ENDPOINTS.STATS.DAILY_ANALYSIS),
  getTopGainers: (params) => api.get(API_ENDPOINTS.STATS.TOP_GAINERS, { params }),
  getTopLosers: (params) => api.get(API_ENDPOINTS.STATS.TOP_LOSERS, { params }),
  getCoinCount: () => api.get(API_ENDPOINTS.STATS.COIN_COUNT),
  getRankDistribution: () => api.get(API_ENDPOINTS.STATS.RANK_DISTRIBUTION),
  getPriceDistribution: () => api.get(API_ENDPOINTS.STATS.PRICE_DISTRIBUTION),
  getVolatilityDistribution: () => api.get(API_ENDPOINTS.STATS.VOLATILITY_DISTRIBUTION),
};

export default statsService;
