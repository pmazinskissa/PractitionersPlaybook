import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface CodeExampleProps {
  language?: string;
  title?: string;
  children: string;
}

export default function CodeExample({ language = 'text', title, children }: CodeExampleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ScrollReveal>
      <div className="my-6 rounded-card border border-border overflow-hidden shadow-elevation-1">
        <div className="flex items-center justify-between bg-gray-900 px-4 py-2">
          <span className="text-xs text-gray-400 font-mono">
            {title || language}
          </span>
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Copy code"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
        <pre className="bg-gray-900 px-4 py-3 overflow-x-auto">
          <code className="text-sm font-mono text-gray-100 leading-relaxed">
            {children}
          </code>
        </pre>
      </div>
    </ScrollReveal>
  );
}
