import { useState, useEffect } from 'react';
import type { KnowledgeCheckConfig } from '@playbook/shared';
import { api } from '../lib/api';

interface UseKnowledgeCheckResult {
  data: KnowledgeCheckConfig | null;
  loading: boolean;
  error: string | null;
}

export function useKnowledgeCheck(
  courseSlug: string | undefined,
  moduleSlug: string | undefined
): UseKnowledgeCheckResult {
  const [data, setData] = useState<KnowledgeCheckConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseSlug || !moduleSlug) return;

    setLoading(true);
    setError(null);
    setData(null);

    api.getKnowledgeCheck(courseSlug, moduleSlug)
      .then((result) => setData(result))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [courseSlug, moduleSlug]);

  return { data, loading, error };
}
