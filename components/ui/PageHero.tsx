import { Heading } from './Heading';

interface Props {
  label: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}

/** Typographic opening for inner pages: label, display title, lead set to the far column. */
export function PageHero({ label, title, lead, children }: Props) {
  return (
    <section className="pb-14 pt-[calc(var(--header-h)+clamp(3.5rem,9vw,8rem))] md:pb-20">
      <div className="container">
        <p className="label enter">{label}</p>
        <div className="mt-7 grid items-end gap-x-8 gap-y-8 lg:grid-cols-12">
          <Heading as="h1" size="t-h1" text={title} css delay={0.05} className="lg:col-span-8" />
          {lead && (
            <p className="lead enter max-w-xl lg:col-span-4" style={{ animationDelay: '0.3s' }}>
              {lead}
            </p>
          )}
        </div>
        {children}
        <span aria-hidden className="rule-in mt-12 block h-px bg-fg md:mt-16" />
      </div>
    </section>
  );
}
