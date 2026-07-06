/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-light': 'var(--color-primary-light)',
        accent: 'var(--color-accent)',
        
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-tertiary': 'var(--color-bg-tertiary)',
        
        'text-main': 'var(--color-text-main)',
        'text-muted': 'var(--color-text-muted)',
        
        'border-color': 'var(--color-border)',
        'border-em': 'var(--color-border-em)',

        // Keep standard semantic colors
        'accent-green': '#22C55E',
        'accent-red': '#EF4444',
        'accent-gold': '#FACC15',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        heading: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.65rem',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        aurora: 'aurora 8s ease-in-out infinite',
        'fade-up': 'fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fadeIn 0.3s ease both',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px var(--color-primary-light)' },
          '50%': { boxShadow: '0 0 25px var(--color-primary)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'var(--color-primary-light)' },
          '50%': { borderColor: 'var(--color-primary)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%', backgroundSize: '200% 200%' },
          '50%': { backgroundPosition: '100% 50%', backgroundSize: '200% 200%' },
        },
        fadeUp: {
          'from': { opacity: '0', transform: 'translateY(16px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 240, 255, 0.3)' },
          '70%': { boxShadow: '0 0 0 10px rgba(0, 240, 255, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0, 240, 255, 0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-primary': '0 0 20px var(--color-primary-light)',
        'neon-green': '0 0 20px rgba(34,197,94,0.4)',
        'neon-red': '0 0 20px rgba(239,68,68,0.4)',
        glass: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
};
