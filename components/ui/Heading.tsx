import type { ElementType } from 'react';
import { SplitText } from '@/components/motion/SplitText';

interface Props {
  text: string;
  as?: ElementType;
  /** Type scale class: t-hero | t-h1 | t-h2 | t-h3 */
  size?: string;
  className?: string;
  id?: string;
  delay?: number;
  /** Animate on load with CSS (above the fold) instead of on scroll */
  css?: boolean;
}

/** Splits "First clause. Second clause." at its last sentence/clause break. */
function clauses(text: string): string[] {
  const m = text.match(/^([\s\S]*[.!?؟،,؛;])\s+(\S[\s\S]*)$/);
  return m ? [m[1], m[2]] : [text];
}

/**
 * Editorial display heading. Two-clause titles break onto two lines and the
 * closing clause is set in the accent cut (serif italic in English, light
 * weight in Persian) — the typographic signature of the site.
 */
export function Heading({ text, as = 'h2', size = 't-h2', className = '', ...rest }: Props) {
  const parts = clauses(text);
  const lines =
    parts.length === 2
      ? [
          parts[0],
          <span key="accent" className="accent">
            {parts[1]}
          </span>,
        ]
      : parts;
  return <SplitText as={as} lines={lines} className={`display ${size} ${className}`} {...rest} />;
}
