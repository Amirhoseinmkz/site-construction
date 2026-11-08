import type { Metadata } from 'next';
import { site } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { PageHero } from '@/components/ui/PageHero';
import { LeadForm } from '@/components/ui/LeadForm';

const SUBJECTS = ['architecture', 'management', 'partnership', 'renovation', 'consultation', 'subcontractor'] as const;
type Subject = (typeof SUBJECTS)[number];

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/contact', title: t.contact.eyebrow, description: t.contact.lead });
}

export default async function ContactPage({
  params,
  searchParams,
}: LocaleParams & { searchParams: Promise<{ subject?: string }> }) {
  const { locale, t } = await resolveLocale(params);
  const { subject } = await searchParams;
  const c = t.contact;
  const defaultType = SUBJECTS.includes(subject as Subject) ? (subject as Subject) : undefined;

  const social = [
    ['WhatsApp', site.social.whatsapp],
    ['Telegram', site.social.telegram],
    ['Instagram', site.social.instagram],
    ['LinkedIn', site.social.linkedin],
  ] as const;

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} serif={locale === 'en'} />

      <section className="pb-24 md:pb-36">
        <div className="container grid gap-16 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-4">
            {(
              [
                [c.office, site.phones.office],
                [c.mobile, site.phones.mobile],
              ] as const
            ).map(([label, phone]) => (
              <div key={label} data-reveal>
                <p className="text-sm text-bone-dim">{label}</p>
                <a
                  href={`tel:${phone.tel}`}
                  className="ltr-nums mt-2 text-3xl font-bold text-bone transition-colors hover:text-ember md:text-4xl"
                >
                  {phone.display}
                </a>
              </div>
            ))}
            <div data-reveal>
              <p className="text-sm text-bone-dim">{c.hours}</p>
              <p className="mt-2 text-bone">{site.hours[locale]}</p>
              <p className="mt-1 text-bone-muted">{site.city[locale]}</p>
            </div>
            <div data-reveal>
              <p className="text-sm text-bone-dim">{c.social}</p>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {social.map(([label, url]) => (
                  <li key={label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border border-bone/10 px-4 py-3 font-brand text-sm text-bone-muted transition-colors hover:border-ember hover:text-bone"
                    >
                      {label}
                      <span aria-hidden className="text-ember">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border border-bone/10 bg-ink-900/60 p-6 md:p-12 lg:col-span-7 lg:col-start-6" data-reveal>
            <h2 className="mb-10 text-2xl font-bold">{c.formTitle}</h2>
            <LeadForm
              locale={locale}
              t={t.form}
              source="contact"
              types={['consultation', 'architecture', 'management', 'partnership', 'renovation', 'subcontractor']}
              defaultType={defaultType}
            />
          </div>
        </div>
      </section>
    </>
  );
}
