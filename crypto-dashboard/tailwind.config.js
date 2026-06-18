/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#0d0d14',
        'bg-tertiary': '#111118',
        'accent-cyan': '#00d4ff',
        'accent-green': '#00ff88',
        'accent-red': '#ff3366',
        'accent-gold': '#ffd700',
        'accent-purple': '#8b5cf6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        aurora: 'aurora 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0,212,255,0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(0,212,255,0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(0, 212, 255, 0.3)' },
          '50%': { borderColor: 'rgba(139, 92, 246, 0.3)' },
        },
        aurora: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
            backgroundSize: '200% 200%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
            backgroundSize: '200% 200%',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0,212,255,0.4)',
        'neon-green': '0 0 20px rgba(0,255,136,0.4)',
        'neon-red': '0 0 20px rgba(255,51,102,0.4)',
        'neon-purple': '0 0 20px rgba(139,92,246,0.4)',
        glass:
          '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
};
