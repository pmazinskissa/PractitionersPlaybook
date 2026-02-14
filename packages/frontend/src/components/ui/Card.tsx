import type { HTMLAttributes, ReactNode } from 'react';

type Elevation = 0 | 1 | 2 | 3;

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: Elevation;
  children: ReactNode;
}

const elevationClasses: Record<Elevation, string> = {
  0: '',
  1: 'shadow-elevation-1',
  2: 'shadow-elevation-2',
  3: 'shadow-elevation-3',
};

export default function Card({ elevation = 1, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-white/70 backdrop-blur-md rounded-card border border-white/50 ${elevationClasses[elevation]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
