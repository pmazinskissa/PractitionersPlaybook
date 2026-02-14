import { createContext, useContext, useEffect, useState, useMemo, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import type { CourseConfig, CourseNavTree } from '@playbook/shared';
import { api } from '../lib/api';

interface ContinueLesson {
  moduleSlug: string;
  lessonSlug: string;
  title: string;
}

interface CourseContextValue {
  course: CourseConfig | null;
  navTree: CourseNavTree | null;
  loading: boolean;
  error: string | null;
  continueLesson: ContinueLesson | null;
}

const CourseContext = createContext<CourseContextValue>({
  course: null,
  navTree: null,
  loading: true,
  error: null,
  continueLesson: null,
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

  // Compute continue lesson from navTree progress
  const continueLesson = useMemo<ContinueLesson | null>(() => {
    if (!navTree) return null;

    // Find first in_progress lesson
    for (const mod of navTree.modules) {
      for (const lesson of mod.lessons) {
        if (lesson.status === 'in_progress') {
          return { moduleSlug: mod.slug, lessonSlug: lesson.slug, title: lesson.title };
        }
      }
    }

    // If none in_progress, find first not_started
    for (const mod of navTree.modules) {
      for (const lesson of mod.lessons) {
        if (lesson.status === 'not_started') {
          return { moduleSlug: mod.slug, lessonSlug: lesson.slug, title: lesson.title };
        }
      }
    }

    return null;
  }, [navTree]);

  return (
    <CourseContext.Provider value={{ course, navTree, loading, error, continueLesson }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  return useContext(CourseContext);
}
