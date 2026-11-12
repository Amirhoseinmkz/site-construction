/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2.5rem', xl: '4rem' },
      screens: { '2xl': '1520px' },
    },
    extend: {
      colors: {
        // Raw palette
        cream: { DEFAULT: token('cream'), deep: token('cream-deep') },
        ink: { DEFAULT: token('ink'), soft: token('ink-soft') },
        // Semantic tokens — flip automatically inside `.theme-dark`
        bg: token('bg'),
        surface: token('surface'),
        fg: token('fg'),
        muted: token('muted'),
        line: 'rgb(var(--fg) / 0.14)',
      },
      fontFamily: {
        sans: ['var(--font-latin)', 'var(--font-persian)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'var(--font-persian)', 'Georgia', 'serif'],
        brand: ['var(--font-brand)', 'var(--font-latin)', 'sans-serif'],
      },
      spacing: {
        section: 'clamp(5rem, 11vw, 11rem)',
      },
      transitionTimingFunction: {
        cine: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
