import { X, BookOpen, Search } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useCourse } from '../../context/CourseContext';
import SidebarNavItem from './SidebarNavItem';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { slug } = useParams<{ slug: string }>();
  const { navTree, loading } = useCourse();

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-border z-50 overflow-y-auto transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <span className="font-semibold text-sm">Navigation</span>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-surface"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="py-3" aria-label="Course navigation">
          {loading ? (
            <div className="px-4 py-8 text-sm text-text-secondary animate-pulse">
              Loading navigation...
            </div>
          ) : navTree ? (
            <>
              {navTree.modules.map((mod) => (
                <div key={mod.slug}>
                  <div className="px-4 py-2 mt-4 first:mt-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-text-secondary/60">
                      Module {mod.order}
                    </p>
                    <p className="text-sm font-semibold text-text-primary mt-0.5">
                      {mod.title}
                    </p>
                  </div>
                  {mod.lessons.map((lesson) => (
                    <SidebarNavItem
                      key={lesson.slug}
                      to={`/courses/${slug}/modules/${mod.slug}/lessons/${lesson.slug}`}
                      title={lesson.title}
                      status={lesson.status}
                    />
                  ))}
                  {mod.has_knowledge_check && (
                    <SidebarNavItem
                      key={`${mod.slug}-kc`}
                      to={`/courses/${slug}/modules/${mod.slug}/knowledge-check`}
                      title="Knowledge Check"
                      status="not_started"
                      isKnowledgeCheck
                    />
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="px-4 py-8 text-sm text-text-secondary">
              No content available.
            </div>
          )}
        </nav>

        {/* Footer links */}
        <div className="border-t border-border p-3 mt-4">
          <Link
            to={`/courses/${slug}/glossary`}
            className="flex items-center gap-3 px-3 py-2 text-sm text-text-secondary hover:bg-surface hover:text-text-primary rounded-md transition-colors"
          >
            <BookOpen size={16} />
            Glossary
          </Link>
        </div>
      </aside>
    </>
  );
}
