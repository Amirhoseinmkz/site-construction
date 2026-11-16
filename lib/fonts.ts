import { Inter, Montserrat, Newsreader, Vazirmatn } from 'next/font/google';

/** Persian text: Vazirmatn, heavy for display, light for accents, medium for menus. */
export const fontPersian = Vazirmatn({
  subsets: ['arabic'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-persian',
});

/** Latin UI and body text. */
export const fontLatin = Inter({
  subsets: ['latin'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-latin',
});

/** Latin display serif for editorial headlines. */
export const fontSerif = Newsreader({
  subsets: ['latin'],
  weight: 'variable',
  style: 'normal',
  display: 'swap',
  variable: '--font-serif',
  adjustFontFallback: false,
});

/** Italic cut, used only for accent words — not preloaded. */
export const fontSerifItalic = Newsreader({
  subsets: ['latin'],
  weight: 'variable',
  style: 'italic',
  display: 'swap',
  preload: false,
  variable: '--font-serif-italic',
  adjustFontFallback: false,
});

/** Brand wordmark only (matches the original logo). */
export const fontBrand = Montserrat({
  subsets: ['latin'],
  weight: ['200', '600'],
  display: 'swap',
  preload: false,
  variable: '--font-brand',
});

export const fontVariables = [fontPersian, fontLatin, fontSerif, fontSerifItalic, fontBrand].map((f) => f.variable).join(' ');
