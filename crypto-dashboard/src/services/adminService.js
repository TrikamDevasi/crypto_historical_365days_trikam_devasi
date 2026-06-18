import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const adminService = {
  getAdminCoins: (params) => api.get(API_ENDPOINTS.ADMIN.COINS, { params }),
  getAdminStats: () => api.get(API_ENDPOINTS.ADMIN.STATS),
  getAdminUsers: (params) => api.get(API_ENDPOINTS.ADMIN.USERS, { params }),
};

export default adminService;
