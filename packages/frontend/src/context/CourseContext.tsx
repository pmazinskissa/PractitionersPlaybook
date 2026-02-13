import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import type { CourseConfig, CourseNavTree } from '@playbook/shared';
import { api } from '../lib/api';

interface CourseContextValue {
  course: CourseConfig | null;
  navTree: CourseNavTree | null;
  loading: boolean;
  error: string | null;
}

const CourseContext = createContext<CourseContextValue>({
  course: null,
  navTree: null,
  loading: true,
  error: null,
});

export function CourseProvider({ children }: { children: ReactNode }) {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<CourseConfig | null>(null);
  const [navTree, setNavTree] = useState<CourseNavTree | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    api.getCourse(slug)
      .then((data) => {
        setCourse(data.course);
        setNavTree(data.navTree);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <CourseContext.Provider value={{ course, navTree, loading, error }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  return useContext(CourseContext);
}
