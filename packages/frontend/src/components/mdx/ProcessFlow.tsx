import { motion } from 'framer-motion';
import { stagger, fadeInUp } from '../../lib/animations';

interface Step {
  title: string;
  description?: string;
}

interface ProcessFlowProps {
  steps: Step[];
  activeStep?: number;
}

export default function ProcessFlow({ steps, activeStep }: ProcessFlowProps) {
  return (
    <motion.div
      className="my-6"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-4">
          {steps.map((step, index) => {
            const isActive = activeStep != null && index === activeStep;
            const isCompleted = activeStep != null && index < activeStep;

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative flex gap-4"
              >
                <div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    isActive
                      ? 'bg-primary text-white ring-4 ring-primary/20'
                      : isCompleted
                      ? 'bg-success text-white'
                      : 'bg-surface text-text-secondary border border-border'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="pb-2">
                  <p className="font-semibold text-text-primary text-sm">{step.title}</p>
                  {step.description && (
                    <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
