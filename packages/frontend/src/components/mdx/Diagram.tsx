import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';

interface DiagramProps {
  code: string;
  title?: string;
}

export default function Diagram({ code, title }: DiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: 'var(--color-primary-light)',
            primaryBorderColor: 'var(--color-primary)',
            primaryTextColor: 'var(--color-text-primary)',
            lineColor: 'var(--color-border)',
            secondaryColor: 'var(--color-surface)',
            tertiaryColor: 'var(--color-background)',
          },
        });
        const { svg: renderedSvg } = await mermaid.render(idRef.current, code);
        if (!cancelled) setSvg(renderedSvg);
      } catch (err) {
        console.error('Mermaid render error:', err);
      }
    }

    render();
    return () => { cancelled = true; };
  }, [code]);

  return (
    <ScrollReveal>
      <div className="my-6 rounded-card border border-border bg-white p-4 shadow-elevation-1">
        {title && (
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            {title}
          </p>
        )}
        <div
          ref={containerRef}
          className="flex justify-center overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    </ScrollReveal>
  );
}
