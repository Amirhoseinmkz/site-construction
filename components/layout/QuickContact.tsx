import type { Locale } from '@/lib/i18n';
import { site } from '@/data/site';

/** Mobile-only floating quick actions: call + WhatsApp */
export function QuickContact({ locale }: { locale: Locale }) {
  const callLabel = locale === 'fa' ? 'تماس' : 'Call';
  return (
    <div className="fixed bottom-4 end-4 z-40 flex gap-2 md:hidden" style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <a
        href={site.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-bone/15 bg-ink-900/90 px-4 py-3 text-sm font-semibold text-bone backdrop-blur"
      >
        WhatsApp
      </a>
      <a
        href={`tel:${site.phones.mobile.tel}`}
        className="rounded-full bg-ember px-5 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-black/40"
      >
        {callLabel}
      </a>
    </div>
  );
}
