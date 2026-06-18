import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const coinSchema = Yup.object().shape({
  coin_id: Yup.string().required('Coin ID is required'),
  coin_name: Yup.string().required('Coin name is required'),
  symbol: Yup.string().required('Symbol is required'),
  price: Yup.number().min(0, 'Price must be positive').required('Price is required'),
  market_cap: Yup.number().min(0, 'Market cap must be positive').nullable(),
  volume: Yup.number().min(0, 'Volume must be positive').nullable(),
  market_cap_rank: Yup.number().integer().min(1).nullable(),
  daily_return: Yup.number().nullable(),
  date: Yup.string().required('Date is required'),
  month: Yup.string().required('Month is required'),
});

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(6, 'New password must be at least 6 characters')
    .required('New password is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm new password is required'),
});

export const profileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

/**
 * Get password strength score (0–4).
 */
export const getPasswordStrength = (password) => {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
};

export const PASSWORD_STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
export const PASSWORD_STRENGTH_COLORS = ['', '#ff3366', '#ffab00', '#ffd700', '#00ff88'];
