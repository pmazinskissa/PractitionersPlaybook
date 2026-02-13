import type { MatchingQuestion as MatchingQuestionType } from '@playbook/shared';

interface Props {
  question: MatchingQuestionType;
  selectedMatches: Record<string, string>;
  onAnswer: (matches: Record<string, string>) => void;
  disabled: boolean;
}

export default function MatchingQuestion({ question, selectedMatches, onAnswer, disabled }: Props) {
  const rightOptions = question.pairs.map((p) => ({ id: p.id, text: p.right }));

  const handleChange = (pairId: string, value: string) => {
    onAnswer({ ...selectedMatches, [pairId]: value });
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-text-secondary mb-2">Match each item on the left with the correct item on the right</p>
      {question.pairs.map((pair) => (
        <div key={pair.id} className="flex items-center gap-3">
          <span className="flex-1 text-sm text-text-primary font-medium p-3 bg-surface rounded-card border border-border">
            {pair.left}
          </span>
          <span className="text-text-secondary">&rarr;</span>
          <select
            value={selectedMatches[pair.id] || ''}
            onChange={(e) => handleChange(pair.id, e.target.value)}
            disabled={disabled}
            className={`flex-1 p-3 text-sm rounded-card border-2 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
              selectedMatches[pair.id] ? 'border-primary' : 'border-border'
            } ${disabled ? 'pointer-events-none opacity-80' : ''}`}
          >
            <option value="">Select...</option>
            {rightOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.text}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
