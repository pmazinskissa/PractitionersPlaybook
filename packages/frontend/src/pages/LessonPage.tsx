import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useLessonContent } from '../hooks/useLessonContent';
import { useCourse } from '../context/CourseContext';
import LessonNav from '../components/layout/LessonNav';
import { pageTransition } from '../lib/animations';

export default function LessonPage() {
  const { slug, moduleSlug, lessonSlug } = useParams<{
    slug: string;
    moduleSlug: string;
    lessonSlug: string;
  }>();

  const { navTree } = useCourse();
  const { meta, MdxComponent, loading, error } = useLessonContent(slug, moduleSlug, lessonSlug);

  // Scroll to top on lesson change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonSlug]);

  // Compute prev/next lessons from navTree
  const { prevLesson, nextLesson, knowledgeCheckLink, currentIndex, totalLessons } = useMemo(() => {
    if (!navTree) return { prevLesson: null, nextLesson: null, knowledgeCheckLink: null, currentIndex: 0, totalLessons: 0 };

    const allLessons: { moduleSlug: string; slug: string; title: string }[] = [];
    navTree.modules.forEach((mod) => {
      mod.lessons.forEach((lesson) => {
        allLessons.push({ moduleSlug: mod.slug, slug: lesson.slug, title: lesson.title });
      });
    });

    const idx = allLessons.findIndex(
      (l) => l.moduleSlug === moduleSlug && l.slug === lessonSlug
    );

    // Check if this is the last lesson in a module that has a knowledge check
    let kcLink: string | null = null;
    const currentMod = navTree.modules.find((m) => m.slug === moduleSlug);
    if (currentMod && currentMod.has_knowledge_check) {
      const lastLesson = currentMod.lessons[currentMod.lessons.length - 1];
      if (lastLesson && lastLesson.slug === lessonSlug) {
        kcLink = `/courses/${slug}/modules/${moduleSlug}/knowledge-check`;
      }
    }

    return {
      prevLesson: idx > 0 ? allLessons[idx - 1] : null,
      nextLesson: kcLink ? null : (idx < allLessons.length - 1 ? allLessons[idx + 1] : null),
      knowledgeCheckLink: kcLink,
      currentIndex: idx + 1,
      totalLessons: allLessons.length,
    };
  }, [navTree, moduleSlug, lessonSlug, slug]);

  if (loading) {
    return (
      <div className="max-w-prose mx-auto px-6 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-surface rounded w-1/4" />
          <div className="h-8 bg-surface rounded w-3/4" />
          <div className="h-4 bg-surface rounded w-full" />
          <div className="h-4 bg-surface rounded w-5/6" />
          <div className="h-4 bg-surface rounded w-4/6" />
          <div className="h-32 bg-surface rounded w-full mt-6" />
          <div className="h-4 bg-surface rounded w-full" />
          <div className="h-4 bg-surface rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-prose mx-auto px-6 py-12 text-center">
        <p className="text-error font-semibold">Failed to load lesson</p>
        <p className="text-text-secondary mt-2">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      key={lessonSlug}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-prose mx-auto px-6 py-8"
    >
      {/* Lesson header */}
      {meta && (
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
            Lesson {currentIndex} of {totalLessons}
          </p>
          <h1
            className="text-2xl sm:text-3xl font-bold text-text-primary"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {meta.title}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-text-secondary">
            <Clock size={14} />
            <span>~{meta.estimated_duration_minutes} min</span>
          </div>
        </div>
      )}

      {/* MDX content */}
      <article className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-link prose-strong:text-text-primary prose-code:text-primary prose-code:bg-primary-light prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100">
        {MdxComponent && <MdxComponent />}
      </article>

      {/* Previous/Next navigation */}
      {slug && (
        <LessonNav
          courseSlug={slug}
          prevLesson={prevLesson}
          nextLesson={nextLesson}
          knowledgeCheckLink={knowledgeCheckLink}
          currentIndex={currentIndex}
          totalLessons={totalLessons}
        />
      )}
    </motion.div>
  );
}
