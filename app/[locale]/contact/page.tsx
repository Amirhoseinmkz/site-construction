import type { Metadata } from 'next';
import { localizeDigits } from '@/lib/i18n';
import { site } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { PageHero } from '@/components/ui/PageHero';
import { LeadForm } from '@/components/ui/LeadForm';
import { SOCIALS, SocialIcon } from '@/components/ui/Social';

const SUBJECTS = ['architecture', 'management', 'partnership', 'renovation', 'consultation', 'subcontractor'] as const;
type Subject = (typeof SUBJECTS)[number];

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/contact', title: t.contact.label, description: t.contact.lead });
}

export default async function ContactPage({ params, searchParams }: LocaleParams & { searchParams: Promise<{ subject?: string }> }) {
  const { locale, t } = await resolveLocale(params);
  const { subject } = await searchParams;
  const c = t.contact;
  const defaultType = SUBJECTS.includes(subject as Subject) ? (subject as Subject) : undefined;

  const phones = [
    [c.office, site.phones.office],
    [c.mobile, site.phones.mobile],
  ] as const;

  return (
    <>
      <PageHero label={c.label} title={c.title} lead={c.lead} />

      <section className="py-14 pb-section md:py-20">
        <div className="container grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <dl className="border-t border-fg">
              {phones.map(([label, phone]) => (
                <div key={label} className="border-b border-line py-7" data-reveal>
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="mt-2">
                    <a href={`tel:${phone.tel}`} className="nav-link ltr display t-h3">
                      {localizeDigits(phone.display, locale)}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="border-b border-line py-7" data-reveal>
                <dt className="text-sm text-muted">{c.hours}</dt>
                <dd className="mt-2">
                  {site.hours[locale]}
                  <span className="block text-muted">{site.city[locale]}</span>
                </dd>
              </div>
              <div className="py-7" data-reveal>
                <dt className="text-sm text-muted">{c.social}</dt>
                <dd className="mt-4 flex flex-wrap gap-2">
                  {SOCIALS.map(({ name, url }) => (
                    <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="chip !py-2.5">
                      <SocialIcon name={name} />
                      {name}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className="theme-surface rounded-[1.75rem] p-7 md:p-12 lg:col-span-7 lg:col-start-6" data-reveal>
            <h2 className="display t-h3 mb-10">{c.formTitle}</h2>
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
