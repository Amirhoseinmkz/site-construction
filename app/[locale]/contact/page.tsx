import type { Metadata } from 'next';
import { localizeDigits } from '@/lib/i18n';
import { site } from '@/data/site';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { getFaqs } from '@/lib/db/content';
import { PageHead } from '@/components/ui/PageHead';
import { Heading } from '@/components/ui/Heading';
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
  const faqs = getFaqs(locale);
  const defaultType = SUBJECTS.includes(subject as Subject) ? (subject as Subject) : undefined;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHead label={c.label} title={c.title} />

      <section className="pb-section">
        <div className="container grid gap-x-10 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="space-y-10">
              {([[c.office, site.phones.office], [c.mobile, site.phones.mobile]] as const).map(([label, phone]) => (
                <div key={label} data-reveal>
                  <p className="label">{label}</p>
                  <a href={`tel:${phone.tel}`} className="nav-link ltr display t-2 mt-3">
                    {localizeDigits(phone.display, locale)}
                  </a>
                </div>
              ))}
              <div data-reveal>
                <p className="label">{c.hours}</p>
                <p className="mt-3">{site.hours[locale]}</p>
                <p className="text-muted">{site.city[locale]}</p>
              </div>
              <ul className="flex flex-wrap gap-2" data-reveal>
                {SOCIALS.map(({ name, url }) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="chip !py-2.5">
                      <SocialIcon name={name} />
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="theme-surface rounded-[1.75rem] p-7 md:p-12 lg:col-span-7" data-reveal>
            <h2 className="display t-3 mb-10">{c.formTitle}</h2>
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

      <section aria-labelledby="faq-title" className="theme-surface py-section">
        <div className="container grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label" data-reveal>
              {t.process.faqLabel}
            </p>
            <Heading id="faq-title" text={t.process.faqTitle} size="t-2" className="mt-5" />
          </div>
          <div className="border-t border-fg lg:col-span-7 lg:col-start-6">
            {faqs.map((f) => (
              <details key={f.question} className="border-b border-fg/15" data-reveal>
                <summary className="flex items-center justify-between gap-6 py-6 text-lg font-medium">
                  {f.question}
                  <span aria-hidden className="plus" />
                </summary>
                <p className="max-w-2xl pb-7 text-muted">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
