import type { L } from '@/lib/i18n';

/**
 * Single source of truth for brand & contact information.
 * Values come from the previous production site. Items marked TODO need confirmation.
 */
export const site = {
  name: { fa: 'گروه ساختمانی میرکاظمی', en: 'Mirkazemi Construction Group' } as L,
  shortName: 'Mirkazemi',
  foundedYear: 1999, // ۱۳۷۸
  // Phone numbers are intentionally not published for now (owner's decision).
  phones: null as { office: { display: string; tel: string }; mobile: { display: string; tel: string } } | null,
  hours: {
    fa: 'شنبه تا پنجشنبه، ۹:۰۰ تا ۱۸:۰۰',
    en: 'Saturday – Thursday, 9:00 – 18:00',
  } as L,
  city: { fa: 'تهران، ایران', en: 'Tehran, Iran' } as L,
  // TODO: add real office address and email when available
  address: null as L | null,
  email: null as string | null,
  /** Accounts are not created yet: the icons show, the links stay empty until a URL is added here. */
  social: {
    instagram: null as string | null,
    telegram: null as string | null,
    whatsapp: null as string | null,
    linkedin: null as string | null,
  },
} as const;
