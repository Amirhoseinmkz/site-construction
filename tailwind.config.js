/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#07080a',
        surface: {
          50: '#1c1f24',
          100: '#14171b',
          200: '#0d0f12',
          DEFAULT: '#0a0c0e',
        },
        steel: {
          light: '#26292B',
          DEFAULT: '#1B1D1F',
          dark: '#111214',
        },
        concrete: {
          light: '#EAEBE7',
          DEFAULT: '#D6D1C6',
          dark: '#8A909A',
        },
        blueprint: {
          light: '#4A6E93',
          DEFAULT: '#2B4C6F',
          dark: '#1B314B',
          glow: 'rgba(74, 110, 147, 0.45)',
        },
        amber: {
          light: '#f5be64',
          DEFAULT: '#DDA13B',
          dark: '#b57e25',
          glow: 'rgba(221, 161, 59, 0.35)',
        },
        glass: {
          border: 'rgba(255, 255, 255, 0.08)',
          bg: 'rgba(13, 15, 18, 0.65)',
        }
      },
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'Vazirmatn', 'system-ui', 'sans-serif'],
        display: ['var(--font-syne)', 'Syne', 'Clash Display', 'Space Grotesk', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'grid-float': 'gridFloat 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        gridFloat: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(40px)' },
        }
      }
    },
  },
  plugins: [],
}
