import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary: 'btn-primary',
  success: 'btn-primary', // Fallback to primary as per no-gradients rule except primary
  danger: 'btn-danger',
  ghost: 'btn-ghost',
  icon: 'btn-ghost rounded-md !p-2 inline-flex items-center justify-center',
};

const Button = forwardRef(({ children, variant = 'primary', size = 'md', loading = false, disabled = false, className = '', ...props }, ref) => {
  const btnClass = variants[variant] || 'btn-primary';
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        disabled:opacity-50 disabled:cursor-not-allowed
        ${btnClass} ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;
