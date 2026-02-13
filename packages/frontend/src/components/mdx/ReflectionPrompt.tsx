import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, ChevronDown } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface ReflectionPromptProps {
  question: string;
  answer?: string;
  children?: React.ReactNode;
}

export default function ReflectionPrompt({ question, answer, children }: ReflectionPromptProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollReveal>
      <div
        className="my-8 rounded-card border border-border bg-white shadow-elevation-1 overflow-hidden"
        data-print-reflection
      >
        {/* Primary left border */}
        <div className="border-l-[6px] border-l-primary p-5">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <Pause size={18} className="text-primary" />
            <span className="text-sm font-bold uppercase tracking-wider text-primary">
              Pause & Reflect
            </span>
          </div>

          {/* Question */}
          <p className="text-text-primary font-medium leading-relaxed mb-4">
            {question}
          </p>

          {/* Optional textarea */}
          <textarea
            className="w-full p-3 border border-border rounded-input text-sm text-text-secondary bg-surface/50 resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            placeholder="Write your thoughts here (not saved)..."
            rows={3}
            data-print-hide
          />

          {/* Reveal answer */}
          {(answer || children) && (
            <div className="mt-4">
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary-light rounded-button hover:bg-primary/15 transition-colors"
                data-print-hide
              >
                {showAnswer ? 'Hide Answer' : 'Reveal Answer'}
                <motion.span
                  animate={{ rotate: showAnswer ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={16} />
                </motion.span>
              </button>

              <AnimatePresence>
                {showAnswer && (
                  <motion.div
                    ref={contentRef}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-border text-sm text-text-secondary leading-relaxed" data-print-reveal>
                      {answer || children}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Print-only: always show answer */}
              <div className="hidden print:block mt-4 pt-4 border-t border-border text-sm text-text-secondary leading-relaxed">
                {answer || children}
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}
