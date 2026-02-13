import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useGlossary } from '../../context/GlossaryContext';
import { scaleIn } from '../../lib/animations';

interface GlossaryTermProps {
  term: string;
  children?: React.ReactNode;
}

export default function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const { slug } = useParams<{ slug: string }>();
  const { lookup } = useGlossary();

  const entry = lookup(term);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative inline">
      <button
        onClick={() => setOpen(!open)}
        className="border-b border-dotted border-primary/50 text-text-primary hover:text-primary cursor-pointer transition-colors bg-transparent p-0 font-inherit text-inherit"
      >
        {children || term}
      </button>
      <AnimatePresence>
        {open && entry && (
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute z-50 left-0 top-full mt-2 w-72 bg-white border border-border rounded-card shadow-elevation-2 p-4"
          >
            <p className="font-semibold text-sm text-text-primary mb-1">{entry.term}</p>
            <p className="text-sm text-text-secondary leading-relaxed">{entry.definition}</p>
            <Link
              to={`/courses/${slug}/glossary`}
              className="flex items-center gap-1 text-xs text-link mt-3 hover:underline"
              onClick={() => setOpen(false)}
            >
              View in Glossary <ExternalLink size={12} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
