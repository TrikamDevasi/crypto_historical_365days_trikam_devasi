/**
 * Format a number as currency (USD).
 */
export const formatCurrency = (value, decimals = 2) => {
  if (value == null || isNaN(value)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

/**
 * Format large numbers with K, M, B, T suffixes.
 */
export const formatLargeNumber = (value) => {
  if (value == null || isNaN(value)) return '0';
  const abs = Math.abs(value);
  if (abs >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
};

/**
 * Format a percentage value.
 */
export const formatPercentage = (value, decimals = 2) => {
  if (value == null || isNaN(value)) return '0.00%';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${Number(value).toFixed(decimals)}%`;
};

export const formatPercent = formatPercentage;

/**
 * Format a date string to locale format.
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'N/A';
  const defaults = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', { ...defaults, ...options });
};

/**
 * Format a date to relative time (e.g., "2 hours ago").
 */
export const formatRelativeTime = (dateString) => {
  if (!dateString) return 'N/A';
  const diff = Date.now() - new Date(dateString).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(dateString);
};

/**
 * Format a number compactly (no currency symbol).
 */
export const formatCompactNumber = (value) => {
  if (value == null || isNaN(value)) return '0';
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Truncate text to a max length.
 */
export const truncate = (str, maxLength = 20) => {
  if (!str) return '';
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
};

/**
 * Capitalize first letter.
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
