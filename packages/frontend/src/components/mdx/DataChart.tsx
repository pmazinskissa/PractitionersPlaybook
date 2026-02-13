import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import ScrollReveal from './ScrollReveal';

interface DataChartProps {
  type?: 'bar' | 'line' | 'pie';
  data: Record<string, unknown>[];
  xKey?: string;
  yKey?: string;
  title?: string;
}

const COLORS = [
  'var(--color-primary)',
  'var(--color-accent)',
  'var(--color-secondary)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-error)',
];

export default function DataChart({
  type = 'bar',
  data,
  xKey = 'name',
  yKey = 'value',
  title,
}: DataChartProps) {
  return (
    <ScrollReveal>
      <div className="my-6 rounded-card border border-border bg-white p-4 shadow-elevation-1">
        {title && (
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            {title}
          </p>
        )}
        <ResponsiveContainer width="100%" height={300}>
          {type === 'bar' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey={xKey} fontSize={12} stroke="var(--color-text-secondary)" />
              <YAxis fontSize={12} stroke="var(--color-text-secondary)" />
              <Tooltip />
              <Bar dataKey={yKey} fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey={xKey} fontSize={12} stroke="var(--color-text-secondary)" />
              <YAxis fontSize={12} stroke="var(--color-text-secondary)" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={yKey}
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)' }}
              />
            </LineChart>
          ) : (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey={yKey}
                nameKey={xKey}
                label
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </ScrollReveal>
  );
}
