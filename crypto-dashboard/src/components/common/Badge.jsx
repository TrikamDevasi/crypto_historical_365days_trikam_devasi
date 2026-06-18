const colorMap = {
  success: 'badge-success',
  danger: 'badge-danger',
  warning: 'badge-amber',
  amber: 'badge-amber',
  gold: 'badge-amber',
  info: 'badge-indigo',
  indigo: 'badge-indigo',
  cyan: 'badge-indigo',
  default: 'badge-neutral',
  neutral: 'badge-neutral',
};

const Badge = ({ children, variant = 'default', className = '' }) => {
  const badgeClass = colorMap[variant] || 'badge-neutral';
  return (
    <span className={`badge ${badgeClass} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
