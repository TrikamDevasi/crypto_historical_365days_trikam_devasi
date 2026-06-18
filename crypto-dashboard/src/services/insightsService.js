import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const insightsService = {
  getHighestPrice: () => api.get(API_ENDPOINTS.ANALYTICS.HIGHEST_PRICE),
  getLowestPrice: () => api.get(API_ENDPOINTS.ANALYTICS.LOWEST_PRICE),
  getAveragePrice: () => api.get(API_ENDPOINTS.ANALYTICS.AVERAGE_PRICE),
  getPriceHistory: (coinId) => api.get(API_ENDPOINTS.ANALYTICS.PRICE_HISTORY(coinId)),
  getMarketTrend: () => api.get(API_ENDPOINTS.ANALYTICS.MARKET_TREND),
  getPriceGrowth: () => api.get(API_ENDPOINTS.ANALYTICS.PRICE_GROWTH),
  getPriceDrop: () => api.get(API_ENDPOINTS.ANALYTICS.PRICE_DROP),
  getHighestVolume: () => api.get(API_ENDPOINTS.ANALYTICS.HIGHEST_VOLUME),
  getAverageVolume: () => api.get(API_ENDPOINTS.ANALYTICS.AVERAGE_VOLUME),
  getVolumeSpikes: () => api.get(API_ENDPOINTS.ANALYTICS.VOLUME_SPIKES),
  getTopReturns: () => api.get(API_ENDPOINTS.ANALYTICS.TOP_RETURNS),
  getNegativeReturns: () => api.get(API_ENDPOINTS.ANALYTICS.NEGATIVE_RETURNS),
  getCumulativeReturns: () => api.get(API_ENDPOINTS.ANALYTICS.CUMULATIVE_RETURNS),
  getHighVolatility: () => api.get(API_ENDPOINTS.ANALYTICS.HIGH_VOLATILITY),
};

export default insightsService;
