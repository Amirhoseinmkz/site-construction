import type { ElementType, ReactNode } from 'react';

interface Props {
  as?: ElementType;
  /** Either explicit lines (each animates as a unit) or a single string split into words */
  lines?: ReactNode[];
  text?: string;
  className?: string;
  delay?: number;
  id?: string;
  /** Animate with CSS on load instead of JS on scroll (for above-the-fold LCP content) */
  css?: boolean;
}

/**
 * Server-rendered masked text reveal. Text is fully readable without JS;
 * MotionProvider animates `.split-line > span` when it scrolls into view.
 */
export function SplitText({ as: Tag = 'h2', lines, text, className, delay = 0, id, css }: Props) {
  const mode = css ? { className: `${className ?? ''} css-split` } : { className, 'data-split': true, 'data-delay': delay };
  const stagger = (i: number) => (css ? { animationDelay: `${delay + i * 0.08}s` } : undefined);
  if (lines) {
    return (
      <Tag id={id} {...mode}>
        {lines.map((line, i) => (
          <span key={i} className="split-line">
            <span style={stagger(i)}>{line}</span>
          </span>
        ))}
      </Tag>
    );
  }
  const words = (text || '').split(' ');
  return (
    <Tag id={id} {...mode}>
      {words.map((w, i) => (
        <span key={i} className="split-line !inline-block align-top">
          <span style={stagger(i)}>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
