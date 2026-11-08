import type { ElementType, ReactNode } from 'react';

interface Props {
  as?: ElementType;
  /** Either explicit lines (each animates as a unit) or a single string split into words */
  lines?: ReactNode[];
  text?: string;
  className?: string;
  delay?: number;
  id?: string;
}

/**
 * Server-rendered masked text reveal. Text is fully readable without JS;
 * MotionProvider animates `.split-line > span` when it scrolls into view.
 */
export function SplitText({ as: Tag = 'h2', lines, text, className, delay, id }: Props) {
  if (lines) {
    return (
      <Tag id={id} className={className} data-split data-delay={delay}>
        {lines.map((line, i) => (
          <span key={i} className="split-line">
            <span>{line}</span>
          </span>
        ))}
      </Tag>
    );
  }
  const words = (text || '').split(' ');
  return (
    <Tag id={id} className={className} data-split data-delay={delay}>
      {words.map((w, i) => (
        <span key={i} className="split-line !inline-block align-top">
          <span>
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
