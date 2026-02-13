import type { ReactNode } from 'react';
import ScrollReveal from './ScrollReveal';

interface BeforeAfterProps {
  before: ReactNode;
  after: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfter({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterProps) {
  return (
    <ScrollReveal>
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 rounded-card border border-border overflow-hidden shadow-elevation-1">
        <div className="p-5 bg-error/5 border-b md:border-b-0 md:border-r border-border">
          <p className="text-xs font-bold uppercase tracking-wider text-error mb-3">
            {beforeLabel}
          </p>
          <div className="text-sm text-text-secondary leading-relaxed">{before}</div>
        </div>
        <div className="p-5 bg-success/5">
          <p className="text-xs font-bold uppercase tracking-wider text-success mb-3">
            {afterLabel}
          </p>
          <div className="text-sm text-text-secondary leading-relaxed">{after}</div>
        </div>
      </div>
    </ScrollReveal>
  );
}
