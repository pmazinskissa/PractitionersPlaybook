import type { ReactNode } from 'react';
import { Lightbulb, Key, AlertTriangle, Info } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

type CalloutType = 'tip' | 'concept' | 'warning' | 'note';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const config: Record<CalloutType, {
  icon: typeof Info;
  borderColor: string;
  bgColor: string;
  iconColor: string;
  defaultTitle: string;
}> = {
  tip: {
    icon: Lightbulb,
    borderColor: 'border-l-accent',
    bgColor: 'bg-accent/5',
    iconColor: 'text-accent',
    defaultTitle: 'Tip',
  },
  concept: {
    icon: Key,
    borderColor: 'border-l-primary',
    bgColor: 'bg-primary/5',
    iconColor: 'text-primary',
    defaultTitle: 'Key Concept',
  },
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-l-warning',
    bgColor: 'bg-warning/5',
    iconColor: 'text-warning',
    defaultTitle: 'Warning',
  },
  note: {
    icon: Info,
    borderColor: 'border-l-text-secondary',
    bgColor: 'bg-surface',
    iconColor: 'text-text-secondary',
    defaultTitle: 'Note',
  },
};

export default function Callout({ type = 'note', title, children }: CalloutProps) {
  const c = config[type];
  const Icon = c.icon;

  return (
    <ScrollReveal>
      <div
        className={`rounded-card border border-border ${c.bgColor} border-l-4 ${c.borderColor} p-5 my-6 shadow-elevation-1`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon size={18} className={c.iconColor} />
          <span className="text-sm font-semibold text-text-primary">
            {title || c.defaultTitle}
          </span>
        </div>
        <div className="text-sm text-text-secondary leading-relaxed">{children}</div>
      </div>
    </ScrollReveal>
  );
}
