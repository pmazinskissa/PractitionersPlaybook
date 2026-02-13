import { Menu } from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import { useTheme } from '../../context/ThemeContext';

interface TopBarProps {
  onMenuToggle: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  const { course, navTree } = useCourse();
  const { theme } = useTheme();

  const completedPercent = navTree
    ? Math.round((navTree.completed_lessons / Math.max(navTree.total_lessons, 1)) * 100)
    : 0;

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-border">
      <div className="flex items-center h-14 px-4 gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-md hover:bg-surface transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <img
          src="/api/themes/logo"
          alt={theme?.organization_name || 'Logo'}
          className="h-8 hidden sm:block"
        />

        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold text-text-primary truncate">
            {course?.title || 'Loading...'}
          </h1>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs text-text-secondary">
          <span>{completedPercent}% complete</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-surface">
        <div
          className="h-full bg-primary transition-all duration-600 ease-in-out"
          style={{ width: `${completedPercent}%` }}
        />
      </div>
    </header>
  );
}
