import type { L } from '@/lib/i18n';

/**
 * Single source of truth for brand & contact information.
 * Values come from the previous production site. Items marked TODO need confirmation.
 */
export const site = {
  name: { fa: 'گروه ساختمانی میرکاظمی', en: 'Mirkazemi Construction Group' } as L,
  shortName: 'Mirkazemi',
  foundedYear: 2009, // ۱۳۸۸
  phones: {
    office: { display: '021-22408931', tel: '+982122408931' },
    mobile: { display: '0912-1883276', tel: '+989121883276' },
  },
  hours: {
    fa: 'شنبه تا پنجشنبه، ۹:۰۰ تا ۱۸:۰۰',
    en: 'Saturday – Thursday, 9:00 – 18:00',
  } as L,
  city: { fa: 'تهران، ایران', en: 'Tehran, Iran' } as L,
  // TODO: add real office address and email when available
  address: null as L | null,
  email: null as string | null,
  social: {
    whatsapp: 'https://wa.me/989121883276',
    telegram: 'https://t.me/mirkazemi_construction',
    instagram: 'https://instagram.com/mirkazemi.group',
    linkedin: 'https://linkedin.com/company/mirkazemi-construction',
  },
} as const;
