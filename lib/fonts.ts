import { Vazirmatn, Montserrat, Instrument_Serif } from 'next/font/google';

export const fontSans = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-sans',
});

export const fontBrand = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600'],
  display: 'swap',
  variable: '--font-brand',
});

export const fontSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});
