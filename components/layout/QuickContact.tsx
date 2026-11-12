import type { Locale } from '@/lib/i18n';
import { site } from '@/data/site';

/** Mobile-only floating call button */
export function QuickContact({ locale }: { locale: Locale }) {
  return (
    <a
      href={`tel:${site.phones.mobile.tel}`}
      className="theme-dark fixed bottom-4 end-4 z-40 rounded-full border border-cream/20 px-5 py-3 text-sm font-medium shadow-lg shadow-black/20 md:hidden"
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {locale === 'fa' ? 'تماس' : 'Call'}
    </a>
  );
}
