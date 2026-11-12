import type { Locale } from '@/lib/i18n';
import { fa, type Dictionary } from './fa';
import { en } from './en';

const dictionaries: Record<Locale, Dictionary> = { fa, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
