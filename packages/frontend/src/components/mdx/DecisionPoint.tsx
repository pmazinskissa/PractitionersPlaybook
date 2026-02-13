import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface DecisionOption {
  id: string;
  label: string;
  outcome: string;
  recommended?: boolean;
}

interface DecisionPointProps {
  scenario: string;
  options: DecisionOption[];
  children?: React.ReactNode;
}

export default function DecisionPoint({ scenario, options }: DecisionPointProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const hasSelected = selectedId !== null;

  return (
    <ScrollReveal>
      <div
        className="my-8 rounded-card border border-border bg-white shadow-elevation-1 overflow-hidden"
        data-print-decision
      >
        <div className="border-l-[6px] border-l-accent p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <GitBranch size={18} className="text-accent" />
            <span className="text-sm font-bold uppercase tracking-wider text-accent">
              Decision Point
            </span>
          </div>

          {/* Scenario */}
          <p className="text-text-primary font-medium leading-relaxed mb-5">
            {scenario}
          </p>

          {/* Option cards */}
          <div className="grid gap-3 sm:grid-cols-2">
            {options.map((opt) => {
              const isSelected = selectedId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => !hasSelected && setSelectedId(opt.id)}
                  disabled={hasSelected}
                  className={`relative text-left p-4 rounded-card border-2 transition-all duration-200 ${
                    hasSelected
                      ? isSelected
                        ? 'border-primary bg-primary-light'
                        : 'border-border bg-surface/50'
                      : 'border-border hover:border-primary/50 hover:shadow-elevation-1 hover:-translate-y-0.5 cursor-pointer'
                  }`}
                  data-print-hide={!hasSelected ? true : undefined}
                >
                  {/* Recommended badge */}
                  {opt.recommended && hasSelected && (
                    <span className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-0.5 bg-success text-white text-xs font-bold rounded-full">
                      <CheckCircle2 size={12} />
                      Recommended
                    </span>
                  )}

                  <p className="text-sm font-semibold text-text-primary mb-1">
                    {opt.label}
                  </p>

                  {/* Show outcome after selection */}
                  <AnimatePresence>
                    {hasSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-text-secondary leading-relaxed mt-2 pt-2 border-t border-border">
                          {opt.outcome}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Print-only: show all outcomes */}
          <div className="hidden print:block mt-4 space-y-2">
            {options.map((opt) => (
              <div key={opt.id} className="text-sm">
                <span className="font-semibold">{opt.label}:</span>{' '}
                <span className="text-text-secondary">{opt.outcome}</span>
                {opt.recommended && (
                  <span className="ml-1 text-success font-bold">(Recommended)</span>
                )}
              </div>
            ))}
          </div>

          {/* Reset button */}
          {hasSelected && (
            <button
              onClick={() => setSelectedId(null)}
              className="mt-4 text-xs text-text-secondary hover:text-primary underline transition-colors"
              data-print-hide
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}
