/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  // `.container` is defined in globals.css (fluid gutters, one max width)
  corePlugins: { container: false },
  theme: {
    extend: {
      colors: {
        // Semantic tokens: flip with the theme, and inside any `.theme-dark` / `.theme-light` section
        bg: token('bg'),
        surface: token('surface'),
        fg: token('fg'),
        muted: token('muted'),
        danger: token('danger'),
        glow: token('glow'),
        line: 'rgb(var(--fg) / 0.14)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'var(--font-persian)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-persian)', 'Georgia', 'serif'],
        brand: ['var(--font-brand)', 'var(--font-sans)', 'sans-serif'],
      },
      spacing: {
        section: 'clamp(6rem, 13vw, 13rem)',
      },
      transitionTimingFunction: {
        cine: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
