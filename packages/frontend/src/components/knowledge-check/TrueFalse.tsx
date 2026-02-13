import type { TrueFalseQuestion } from '@playbook/shared';

interface Props {
  question: TrueFalseQuestion;
  selectedAnswer: boolean | null;
  onAnswer: (answer: boolean) => void;
  disabled: boolean;
}

export default function TrueFalse({ question, selectedAnswer, onAnswer, disabled }: Props) {
  return (
    <div className="flex gap-3">
      {[true, false].map((val) => (
        <label
          key={String(val)}
          className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-card border-2 cursor-pointer transition-all ${
            selectedAnswer === val
              ? 'border-primary bg-primary-light'
              : 'border-border hover:border-primary/30'
          } ${disabled ? 'pointer-events-none opacity-80' : ''}`}
        >
          <input
            type="radio"
            name={question.id}
            value={String(val)}
            checked={selectedAnswer === val}
            onChange={() => onAnswer(val)}
            disabled={disabled}
            className="accent-primary w-4 h-4"
          />
          <span className="text-sm font-semibold text-text-primary">
            {val ? 'True' : 'False'}
          </span>
        </label>
      ))}
    </div>
  );
}
