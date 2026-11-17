import localFont from 'next/font/local';

/**
 * All typefaces are open-source (SIL OFL) and self-hosted from app/fonts, so
 * nothing depends on a network fetch at dev, build or run time.
 */

/**
 * Persian — Vazirmatn, variable weight 100–900. This is the full family (Latin
 * letters and digits included), because on Persian pages *everything* is set
 * in Vazirmatn: menus, headings, buttons, forms, numbers.
 */
export const fontPersian = localFont({
  src: './../app/fonts/Vazirmatn.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-persian',
  fallback: ['Tahoma', 'sans-serif'],
});

/** Latin body and UI. */
export const fontSans = localFont({
  src: './../app/fonts/Inter.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-sans',
  fallback: ['system-ui', 'sans-serif'],
});

/** Latin display — an elegant, high-contrast serif for large headlines. */
export const fontDisplay = localFont({
  src: [
    { path: './../app/fonts/InstrumentSerif.woff2', weight: '400', style: 'normal' },
    { path: './../app/fonts/InstrumentSerif-Italic.woff2', weight: '400', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-display',
  adjustFontFallback: 'Times New Roman',
  fallback: ['Georgia', 'serif'],
});

/** Brand wordmark only. */
export const fontBrand = localFont({
  src: [
    { path: './../app/fonts/Montserrat-200.woff2', weight: '200', style: 'normal' },
    { path: './../app/fonts/Montserrat-600.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-brand',
  preload: false,
  fallback: ['system-ui', 'sans-serif'],
});

export const fontVariables = [fontPersian, fontSans, fontDisplay, fontBrand].map((f) => f.variable).join(' ');
