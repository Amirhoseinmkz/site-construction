/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.ts'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem', xl: '3rem' },
      screens: { '2xl': '1440px' },
    },
    extend: {
      colors: {
        ink: {
          950: 'rgb(var(--ink-950) / <alpha-value>)',
          900: 'rgb(var(--ink-900) / <alpha-value>)',
          800: 'rgb(var(--ink-800) / <alpha-value>)',
          700: 'rgb(var(--ink-700) / <alpha-value>)',
        },
        bone: {
          DEFAULT: 'rgb(var(--bone) / <alpha-value>)',
          muted: 'rgb(var(--bone-muted) / <alpha-value>)',
          dim: 'rgb(var(--bone-dim) / <alpha-value>)',
        },
        ember: {
          DEFAULT: 'rgb(var(--ember) / <alpha-value>)',
          soft: 'rgb(var(--ember-soft) / <alpha-value>)',
          deep: 'rgb(var(--ember-deep) / <alpha-value>)',
        },
        steel: 'rgb(var(--steel) / <alpha-value>)',
        line: 'rgb(var(--bone) / 0.1)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        brand: ['var(--font-brand)', 'var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'var(--font-sans)', 'serif'],
      },
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.22em' }],
        'display-xl': ['clamp(2.75rem, 7.5vw, 7.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4.75rem)', { lineHeight: '1.08', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.75rem, 3.2vw, 3rem)', { lineHeight: '1.15' }],
      },
      transitionTimingFunction: {
        cine: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
