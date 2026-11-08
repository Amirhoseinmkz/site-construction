import Image from 'next/image';
import { SplitText } from '@/components/motion/SplitText';

interface Props {
  eyebrow: string;
  title: string;
  lead?: string;
  image?: string;
  serif?: boolean;
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, lead, image, serif, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-40 md:pb-24 md:pt-52">
      <div className="absolute inset-0 -z-10">
        {image && (
          <div data-parallax="18" className="absolute inset-[-12%]">
            <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-25 saturate-[0.6]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/70 to-ink-950" />
        <div className="blueprint-bg absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>
      <div className="container">
        <p className="eyebrow" data-reveal>
          {eyebrow}
        </p>
        <SplitText
          as="h1"
          text={title}
          className={`mt-6 max-w-5xl text-display-lg ${serif ? 'font-serif italic' : 'font-black'}`}
          delay={0.1}
        />
        {lead && (
          <p className="mt-8 max-w-2xl text-lg text-bone-muted md:text-xl" data-reveal>
            {lead}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
