const rateLimit = require('express-rate-limit');

// Helper to determine if we are in development mode to bypass/relax rate limiting
const isDevelopment = process.env.NODE_ENV === 'development';

const generalLimiter = rateLimit({
  windowMs: 60 * 1000, // 60 seconds
  max: isDevelopment ? 10000 : 100,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 60 seconds.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDevelopment ? 1000 : 10,
  message: {
    success: false,
    message: 'Too many login or registration attempts. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 60 seconds
  max: isDevelopment ? 1000 : 20,
  message: {
    success: false,
    message: 'Too many requests to this resource. Please try again after 60 seconds.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

const exportLimiter = rateLimit({
  windowMs: 60 * 1000, // 60 seconds
  max: isDevelopment ? 500 : 5,
  message: {
    success: false,
    message: 'Too many export or download requests. Please try again after 60 seconds.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  generalLimiter,
  authLimiter,
  strictLimiter,
  exportLimiter
};
