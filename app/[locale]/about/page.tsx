import type { Metadata } from 'next';
import Image from 'next/image';
import { localizeDigits } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { PageHero } from '@/components/ui/PageHero';
import { Heading } from '@/components/ui/Heading';
import { CtaBand } from '@/components/ui/CtaBand';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/about', title: t.about.label, description: t.about.lead, image: '/images/story-main.jpg' });
}

export default async function AboutPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const a = t.about;
  const story = a.story.slice(0, -1);
  const quote = a.story[a.story.length - 1];

  return (
    <>
      <PageHero label={a.label} title={a.title} lead={a.lead} />

      {/* Story */}
      <section aria-labelledby="story-title" className="py-section">
        <div className="container grid items-start gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl lg:col-span-6" data-reveal="clip">
            <div data-parallax="10" className="absolute inset-[-7%]">
              <Image src="/images/story-main.jpg" alt="" fill priority sizes="(min-width:1024px) 46vw, 100vw" className="photo object-cover" />
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="label" data-reveal>
              {a.storyLabel}
            </p>
            <Heading id="story-title" text={a.storyTitle} className="mt-6" />
            {story.map((para) => (
              <p key={para} className="mt-7 text-muted" data-reveal>
                {para}
              </p>
            ))}
          </div>
          <blockquote className="statement border-t border-fg pt-10 lg:col-span-10 lg:col-start-2 lg:mt-10" data-reveal>
            {quote}
          </blockquote>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="theme-surface py-section">
        <div className="container">
          <p className="label" data-reveal>
            {a.valuesLabel}
          </p>
          <Heading id="values-title" text={a.valuesTitle} className="mt-6" />
          <dl className="mt-12 grid gap-x-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {a.values.map((v, i) => (
              <div key={v.title} className="border-t border-fg pb-10 pt-5" data-reveal>
                <span className="num text-sm text-muted">{localizeDigits(`0${i + 1}`, locale)}</span>
                <dt className="display t-h3 mt-10 md:mt-16">{v.title}</dt>
                <dd className="mt-3 text-muted">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Team */}
      <section aria-labelledby="team-title" className="py-section">
        <div className="container grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label" data-reveal>
              {a.teamLabel}
            </p>
            <Heading id="team-title" text={a.teamTitle} className="mt-6" />
          </div>
          <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {a.team.map((m, i) => (
              <li key={m.role} className={`group ${i % 2 === 1 ? 'sm:mt-16' : ''}`} data-reveal>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface">
                  <Image src={m.image} alt="" fill sizes="(min-width:1024px) 28vw, (min-width:640px) 45vw, 100vw" className="photo object-cover" />
                </div>
                <p className="mt-5 text-lg font-medium">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={locale} title={t.home.contact.title} lead={t.home.contact.lead} cta={t.nav.cta} />
    </>
  );
}
