/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '420px',
        '3xl': '1920px',
      },
      colors: {
        background: '#060C1A',
        navy: '#0A1728',
        surface: 'rgba(10, 25, 55, 0.5)',
        'surface-border': 'rgba(37, 99, 235, 0.12)',
        primary: {
          DEFAULT: '#2563EB',
          light: '#60A5FA',
          dark: '#1D4ED8',
          glow: 'rgba(37, 99, 235, 0.35)',
        },
        accent: '#93C5FD',
        ice: '#DBEAFE',
      },
      fontFamily: {
        cinematic: ['Outfit', 'Montserrat', 'sans-serif'],
        display: ['Outfit', 'Montserrat', 'sans-serif'],
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['Outfit', 'Montserrat', 'sans-serif'],
      },
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 2vw, 1rem)',
        'fluid-base': 'clamp(1rem, 2.5vw, 1.25rem)',
        'fluid-lg': 'clamp(1.5rem, 4vw, 2.5rem)',
        'fluid-xl': 'clamp(2rem, 6vw, 4rem)',
        'fluid-2xl': 'clamp(3rem, 9vw, 7rem)',
        'fluid-3xl': 'clamp(4rem, 12vw, 10rem)',
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)`,
        'radial-navy': 'radial-gradient(ellipse at center, #0A1728 0%, #060C1A 70%)',
        'radial-blue': 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.15) 0%, transparent 70%)',
        'glow-primary': 'radial-gradient(ellipse at center, rgba(37,99,235,0.3) 0%, transparent 65%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee2': 'marquee2 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 3s',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        'counter': 'counter 2s ease-out forwards',
        'reveal-up': 'revealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        revealUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(37,99,235,0.2)',
        'glow': '0 0 40px rgba(37,99,235,0.3)',
        'glow-lg': '0 0 80px rgba(37,99,235,0.4)',
        'navy': '0 25px 60px rgba(6,12,26,0.8)',
        'card': '0 4px 24px rgba(6,12,26,0.6), 0 0 0 1px rgba(37,99,235,0.08)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      backdropBlur: {
        '3xl': '60px',
      },
    },
  },
  plugins: [],
}
