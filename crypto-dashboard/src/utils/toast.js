import { toast } from 'react-toastify';

const defaultOptions = {
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showSuccess = (message, options = {}) => {
  toast.success(message, { ...defaultOptions, ...options });
};

export const showError = (message, options = {}) => {
  toast.error(message || 'Something went wrong', { ...defaultOptions, ...options });
};

export const showWarning = (message, options = {}) => {
  toast.warning(message, { ...defaultOptions, ...options });
};

export const showInfo = (message, options = {}) => {
  toast.info(message, { ...defaultOptions, ...options });
};

/**
 * Extract error message from API error response.
 */
export const getErrorMessage = (error) => {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return 'An unexpected error occurred';
};
