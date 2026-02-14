import { NavLink } from 'react-router-dom';
import { CheckCircle2, Circle, Disc, ClipboardCheck } from 'lucide-react';
import type { LessonStatus } from '@playbook/shared';

interface SidebarNavItemProps {
  to: string;
  title: string;
  status: LessonStatus;
  isModule?: boolean;
  isKnowledgeCheck?: boolean;
}

function StatusIcon({ status, isKnowledgeCheck }: { status: LessonStatus; isKnowledgeCheck?: boolean }) {
  if (isKnowledgeCheck) {
    return <ClipboardCheck size={16} className="text-primary flex-shrink-0" />;
  }
  switch (status) {
    case 'completed':
      return <CheckCircle2 size={16} className="text-success flex-shrink-0" />;
    case 'in_progress':
      return <Disc size={16} className="text-primary flex-shrink-0" />;
    default:
      return <Circle size={16} className="text-primary/30 flex-shrink-0" />;
  }
}

export default function SidebarNavItem({ to, title, status, isModule, isKnowledgeCheck }: SidebarNavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 text-sm transition-colors rounded-md mx-2 ${
          isModule ? 'font-semibold mt-4 first:mt-0' : 'pl-8'
        } ${
          isActive
            ? 'bg-primary/10 text-primary font-medium'
            : 'text-slate-500 hover:bg-indigo-50/50 hover:text-slate-800'
        }`
      }
    >
      <StatusIcon status={status} isKnowledgeCheck={isKnowledgeCheck} />
      <span className="truncate">{title}</span>
    </NavLink>
  );
}
