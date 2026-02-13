import type { MultipleChoiceSingleQuestion } from '@playbook/shared';

interface Props {
  question: MultipleChoiceSingleQuestion;
  selectedAnswer: string | null;
  onAnswer: (answer: string) => void;
  disabled: boolean;
}

export default function MultipleChoiceSingle({ question, selectedAnswer, onAnswer, disabled }: Props) {
  return (
    <div className="space-y-2">
      {question.options.map((opt) => (
        <label
          key={opt.id}
          className={`flex items-center gap-3 p-3 rounded-card border-2 cursor-pointer transition-all ${
            selectedAnswer === opt.id
              ? 'border-primary bg-primary-light'
              : 'border-border hover:border-primary/30'
          } ${disabled ? 'pointer-events-none opacity-80' : ''}`}
        >
          <input
            type="radio"
            name={question.id}
            value={opt.id}
            checked={selectedAnswer === opt.id}
            onChange={() => onAnswer(opt.id)}
            disabled={disabled}
            className="accent-primary w-4 h-4"
          />
          <span className="text-sm text-text-primary">{opt.text}</span>
        </label>
      ))}
    </div>
  );
}
