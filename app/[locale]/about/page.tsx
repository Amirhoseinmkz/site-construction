import type { Metadata } from 'next';
import Image from 'next/image';
import { localizeDigits } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { PageHead } from '@/components/ui/PageHead';
import { Heading } from '@/components/ui/Heading';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/about', title: t.about.label, description: t.about.lead, image: '/images/story-main.jpg' });
}

export default async function AboutPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const a = t.about;
  const quote = a.story[a.story.length - 1];

  return (
    <>
      <PageHead label={a.label} title={a.title} />

      {/* figures */}
      <section aria-label={a.label} className="pb-section">
        <dl className="container grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {t.home.stats.map((s) => (
            <div key={s.label} data-reveal className="flex flex-col-reverse justify-end gap-2">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="display t-stat">
                <span data-count={s.value}>{localizeDigits(String(s.value), locale)}</span>
                <span className="[unicode-bidi:isolate]">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* story */}
      <section aria-labelledby="story-title" className="theme-surface py-section">
        <div className="container grid items-center gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:col-span-6" data-reveal="clip">
            <div data-parallax="10" className="absolute inset-[-7%]">
              <Image src="/images/story-main.jpg" alt="" fill priority sizes="(min-width:1024px) 46vw, 100vw" className="photo object-cover" />
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="label" data-reveal>
              {a.storyLabel}
            </p>
            <Heading id="story-title" text={a.storyTitle} size="t-2" className="mt-5" />
            <p className="mt-6 text-muted" data-reveal>
              {a.story[0]}
            </p>
          </div>
        </div>
        <div className="container mt-section">
          <p className="statement max-w-5xl" data-reveal>
            {quote}
          </p>
        </div>
      </section>

      {/* principles — four words */}
      <section aria-labelledby="values-title" className="py-section">
        <div className="container">
          <Heading id="values-title" text={a.valuesTitle} size="t-2" />
          <dl className="mt-12 grid gap-x-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {a.values.map((v, i) => (
              <div key={v.title} className="border-t border-fg pb-10 pt-5" data-reveal>
                <span className="num text-sm text-muted">{localizeDigits(`0${i + 1}`, locale)}</span>
                <dt className="display t-3 mt-10 md:mt-16">{v.title}</dt>
                <dd className="mt-3 text-sm text-muted">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* team */}
      <section aria-labelledby="team-title" className="pb-section">
        <div className="container grid gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Heading id="team-title" text={a.teamTitle} size="t-2" />
          </div>
          <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {a.team.map((m, i) => (
              <li key={m.role} className={i % 2 === 1 ? 'sm:mt-16' : ''} data-reveal>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface">
                  <Image src={m.image} alt="" fill sizes="(min-width:1024px) 28vw, (min-width:640px) 45vw, 100vw" className="photo object-cover" />
                </div>
                <p className="mt-5 text-lg font-medium">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
