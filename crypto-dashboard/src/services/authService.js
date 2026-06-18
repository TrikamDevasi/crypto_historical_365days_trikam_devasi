import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

const authService = {
  login: (credentials) => api.post(API_ENDPOINTS.AUTH.LOGIN, credentials),

  register: (userData) => api.post(API_ENDPOINTS.AUTH.REGISTER, userData),

  logout: () => api.post(API_ENDPOINTS.AUTH.LOGOUT),

  getProfile: () => api.get(API_ENDPOINTS.AUTH.PROFILE),

  updateProfile: (data) => api.patch(API_ENDPOINTS.AUTH.PROFILE, data),

  deleteProfile: () => api.delete(API_ENDPOINTS.AUTH.PROFILE),

  changePassword: (data) => api.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data),
};

export default authService;
