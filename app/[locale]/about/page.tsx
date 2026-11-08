import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { localizeDigits } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import { resolveLocale, type LocaleParams } from '@/lib/page';
import { PageHero } from '@/components/ui/PageHero';
import { SplitText } from '@/components/motion/SplitText';

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale, t } = await resolveLocale(params);
  return buildMetadata({ locale, path: '/about', title: t.about.eyebrow, description: t.about.lead, image: '/images/story-main.jpg' });
}

export default async function AboutPage({ params }: LocaleParams) {
  const { locale, t } = await resolveLocale(params);
  const a = t.about;

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} lead={a.lead} />

      {/* Story */}
      <section className="pb-24 md:pb-36">
        <div className="container grid items-center gap-16 lg:grid-cols-12">
          <div className="relative aspect-[16/11] overflow-hidden lg:col-span-7" data-reveal="clip">
            <div data-parallax="12" className="absolute inset-[-8%]">
              <Image src="/images/story-main.jpg" alt={a.storyTitle} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="eyebrow" data-reveal>
              {a.storyEyebrow}
            </p>
            <SplitText text={a.storyTitle} className="mt-5 text-display-md font-bold" />
            {a.story.map((para, i) => (
              <p key={i} className={`mt-6 ${i === a.story.length - 1 ? 'border-s-2 border-ember ps-5 text-bone' : 'text-bone-muted'}`} data-reveal>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-bone/10 bg-ink-900 py-24 md:py-32">
        <div className="container">
          <p className="eyebrow" data-reveal>
            {a.valuesEyebrow}
          </p>
          <SplitText text={a.valuesTitle} className="mt-5 text-display-md font-bold" />
          <dl className="mt-16 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
            {a.values.map((v, i) => (
              <div key={v.title} className="bg-ink-900 p-8 transition-colors duration-500 hover:bg-ink-800" data-reveal>
                <span className="font-brand text-sm text-ember" dir="ltr">
                  {localizeDigits(`0${i + 1}`, locale)}
                </span>
                <dt className="mt-10 text-xl font-bold">{v.title}</dt>
                <dd className="mt-3 text-bone-muted">{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32">
        <div className="container">
          <p className="eyebrow" data-reveal>
            {a.teamEyebrow}
          </p>
          <SplitText text={a.teamTitle} className="mt-5 text-display-md font-bold" />
          <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:w-2/3">
            {a.team.map((m) => (
              <li key={m.role} data-reveal>
                <div className="relative aspect-[3/4] overflow-hidden bg-ink-800">
                  <Image src={m.image} alt={m.role} fill sizes="(min-width:640px) 33vw, 100vw" className="object-cover grayscale transition-all duration-700 hover:grayscale-0" />
                </div>
                <p className="mt-4 font-semibold">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-bone/10 py-24 text-center md:py-32">
        <div className="container">
          <SplitText text={t.home.ctaTitle} className={`mx-auto text-display-lg ${locale === 'en' ? 'font-serif italic' : 'font-black'}`} />
          <Link href={`/${locale}/contact`} className="btn-primary mt-10" data-reveal>
            {t.nav.cta}
            <span aria-hidden className="flip-x-rtl">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
