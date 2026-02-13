import type { MultipleChoiceMultiQuestion } from '@playbook/shared';

interface Props {
  question: MultipleChoiceMultiQuestion;
  selectedAnswers: string[];
  onAnswer: (answers: string[]) => void;
  disabled: boolean;
}

export default function MultipleChoiceMulti({ question, selectedAnswers, onAnswer, disabled }: Props) {
  const toggle = (optId: string) => {
    if (selectedAnswers.includes(optId)) {
      onAnswer(selectedAnswers.filter((id) => id !== optId));
    } else {
      onAnswer([...selectedAnswers, optId]);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-text-secondary mb-2">Select all that apply</p>
      {question.options.map((opt) => {
        const isChecked = selectedAnswers.includes(opt.id);
        return (
          <label
            key={opt.id}
            className={`flex items-center gap-3 p-3 rounded-card border-2 cursor-pointer transition-all ${
              isChecked
                ? 'border-primary bg-primary-light'
                : 'border-border hover:border-primary/30'
            } ${disabled ? 'pointer-events-none opacity-80' : ''}`}
          >
            <input
              type="checkbox"
              value={opt.id}
              checked={isChecked}
              onChange={() => toggle(opt.id)}
              disabled={disabled}
              className="accent-primary w-4 h-4"
            />
            <span className="text-sm text-text-primary">{opt.text}</span>
          </label>
        );
      })}
    </div>
  );
}
