import ScrollReveal from './ScrollReveal';

interface ComparisonMatrixProps {
  options: string[];
  criteria: string[];
  values: string[][];
}

export default function ComparisonMatrix({ options, criteria, values }: ComparisonMatrixProps) {
  return (
    <ScrollReveal>
      <div className="my-6 rounded-card border border-border overflow-hidden shadow-elevation-1 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-4 py-3 text-left font-semibold">Criteria</th>
              {options.map((option) => (
                <th key={option} className="px-4 py-3 text-left font-semibold">
                  {option}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {criteria.map((criterion, rowIndex) => (
              <tr key={criterion} className="border-t border-border even:bg-surface">
                <td className="px-4 py-3 font-medium text-text-primary">{criterion}</td>
                {values[rowIndex]?.map((val, colIndex) => (
                  <td key={colIndex} className="px-4 py-3 text-text-secondary">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollReveal>
  );
}
