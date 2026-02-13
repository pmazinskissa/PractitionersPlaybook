import type { FillInBlankQuestion } from '@playbook/shared';

interface Props {
  question: FillInBlankQuestion;
  answers: Record<number, string>;
  onAnswer: (answers: Record<number, string>) => void;
  disabled: boolean;
}

export default function FillInBlank({ question, answers, onAnswer, disabled }: Props) {
  let blankIndex = 0;

  const handleChange = (idx: number, value: string) => {
    onAnswer({ ...answers, [idx]: value });
  };

  return (
    <div className="text-sm text-text-primary leading-loose">
      {question.segments.map((seg, i) => {
        if (seg.type === 'text') {
          return <span key={i}>{seg.value}</span>;
        }
        const currentIdx = blankIndex++;
        return (
          <input
            key={i}
            type="text"
            value={answers[currentIdx] || ''}
            onChange={(e) => handleChange(currentIdx, e.target.value)}
            disabled={disabled}
            placeholder="___"
            className={`inline-block w-32 mx-1 px-2 py-1 text-sm border-b-2 bg-surface/50 text-center focus:outline-none focus:border-primary transition-colors rounded-sm ${
              answers[currentIdx]
                ? 'border-primary'
                : 'border-border'
            } ${disabled ? 'pointer-events-none opacity-80' : ''}`}
          />
        );
      })}
    </div>
  );
}
