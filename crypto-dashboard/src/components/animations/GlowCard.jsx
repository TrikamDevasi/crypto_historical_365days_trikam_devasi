import { useRef } from 'react';
import { motion } from 'framer-motion';

const glowColors = {
  cyan: 'rgba(0, 212, 255, 0.15)',
  green: 'rgba(0, 255, 136, 0.15)',
  red: 'rgba(255, 51, 102, 0.15)',
  gold: 'rgba(255, 215, 0, 0.15)',
  purple: 'rgba(139, 92, 246, 0.15)',
};

const borderColors = {
  cyan: 'rgba(0, 212, 255, 0.3)',
  green: 'rgba(0, 255, 136, 0.3)',
  red: 'rgba(255, 51, 102, 0.3)',
  gold: 'rgba(255, 215, 0, 0.3)',
  purple: 'rgba(139, 92, 246, 0.3)',
};

const GlowCard = ({ children, color = 'cyan', className = '' }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative glass-card-static p-6 overflow-hidden group ${className}`}
      style={{
        '--glow-color': glowColors[color],
        '--border-color': borderColors[color],
      }}
    >
      {/* Inner glow on mouse position */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--glow-color), transparent 60%)`,
        }}
      />
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          border: `1px solid var(--border-color)`,
          borderRadius: '16px',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlowCard;
