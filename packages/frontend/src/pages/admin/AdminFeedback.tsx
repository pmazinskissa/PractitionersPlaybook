import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, CheckCircle, Circle, Trash2, ChevronDown } from 'lucide-react';
import { api } from '../../lib/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { fadeInUp, stagger } from '../../lib/animations';
import type { ContentFeedback, CourseConfig } from '@playbook/shared';

export default function AdminFeedback() {
  const [feedback, setFeedback] = useState<ContentFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<CourseConfig[]>([]);
  const [filterCourse, setFilterCourse] = useState('');
  const [filterModule, setFilterModule] = useState('');
  const [filterResolved, setFilterResolved] = useState<boolean | undefined>(undefined);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    api.getCourses().then(setCourses).catch(() => {});
  }, []);

  const fetchFeedback = () => {
    setLoading(true);
    const filters: { course?: string; module?: string; resolved?: boolean } = {};
    if (filterCourse) filters.course = filterCourse;
    if (filterModule) filters.module = filterModule;
    if (filterResolved !== undefined) filters.resolved = filterResolved;
    api.getAdminFeedback(filters)
      .then(setFeedback)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFeedback();
  }, [filterCourse, filterModule, filterResolved]);

  // Reset module filter when course changes (modules are course-specific)
  useEffect(() => {
    setFilterModule('');
  }, [filterCourse]);

  const handleResolveToggle = async (item: ContentFeedback) => {
    try {
      await api.resolveFeedback(item.id, !item.is_resolved);
      setFeedback((prev) =>
        prev.map((f) => (f.id === item.id ? { ...f, is_resolved: !f.is_resolved } : f))
      );
    } catch {
      alert('Failed to update feedback');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteFeedback(id);
      setFeedback((prev) => prev.filter((f) => f.id !== id));
      setConfirmDelete(null);
    } catch {
      alert('Failed to delete feedback');
    }
  };

  // Collect unique module slugs from current feedback for filter dropdown
  const modules = [...new Set(feedback.map((f) => f.module_slug))].sort();

  // Build a course slug → title lookup
  const courseTitleMap = new Map(courses.map((c) => [c.slug, c.title]));

  if (loading && feedback.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface rounded w-32" />
          <div className="h-10 bg-surface rounded w-full" />
          <div className="h-32 bg-surface rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <p className="text-error font-semibold">Failed to load feedback</p>
        <p className="text-text-secondary mt-2">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[100px] animate-[meshFloat1_12s_ease-in-out_infinite]" style={{ background: 'var(--color-primary)', top: '-10%', left: '-5%' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] animate-[meshFloat2_14s_ease-in-out_infinite]" style={{ background: 'var(--color-primary-hover)', top: '20%', right: '-8%' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 pt-10 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2 text-primary mb-2">
                <MessageSquare size={16} />
                <span className="text-sm font-medium">Content Feedback</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Feedback
              </h2>
              <p className="text-text-secondary mt-2 max-w-xl">Review and respond to learner feedback on course content.</p>
            </motion.div>
            {courses.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="shrink-0">
                <div className="relative">
                  <select
                    value={filterCourse}
                    onChange={(e) => setFilterCourse(e.target.value)}
                    className="appearance-none bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm rounded-lg px-4 py-2.5 pr-9 text-sm font-medium text-text-primary hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="">All Courses</option>
                    {courses.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.title}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

    <div className="relative flex-1">
      <div className="absolute inset-0 -z-10 bg-surface/30" />
      <div className="absolute inset-0 -z-10 opacity-[0.07]" style={{ backgroundImage: 'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, var(--color-primary) 40px, var(--color-primary) 41px, transparent 41px, transparent 80px), repeating-radial-gradient(circle at 30% 70%, transparent 0, transparent 60px, var(--color-primary) 60px, var(--color-primary) 61px, transparent 61px, transparent 120px), repeating-radial-gradient(circle at 70% 30%, transparent 0, transparent 50px, var(--color-primary) 50px, var(--color-primary) 51px, transparent 51px, transparent 100px)' }} />
    <div className="p-6 max-w-4xl mx-auto">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative">
          <select
            value={filterModule}
            onChange={(e) => setFilterModule(e.target.value)}
            className="appearance-none bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm rounded-lg px-4 py-2.5 pr-9 text-sm font-medium text-text-primary hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
          >
            <option value="">All Modules</option>
            {modules.map((m) => (
              <option key={m} value={m}>
                {m.replace(/^\d+-/, '').replace(/-/g, ' ')}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
        </div>

        <div className="flex gap-1">
          {[
            { label: 'All', value: undefined },
            { label: 'Open', value: false },
            { label: 'Resolved', value: true },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => setFilterResolved(opt.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                filterResolved === opt.value
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text-secondary hover:text-text-primary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feedback list */}
      {feedback.length === 0 ? (
        <Card className="p-8 text-center">
          <MessageSquare size={48} className="mx-auto text-text-secondary/40 mb-4" />
          <p className="text-lg font-semibold text-text-primary">No feedback yet</p>
          <p className="text-text-secondary mt-2">
            Submit feedback from individual lesson pages.
          </p>
        </Card>
      ) : (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-3">
          {feedback.map((item) => (
            <motion.div key={item.id} variants={fadeInUp}>
              <Card className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-primary font-medium mb-1">
                      {!filterCourse && courses.length > 1 && (
                        <span className="text-text-secondary">
                          {courseTitleMap.get(item.course_slug) || item.course_slug}{' '}
                          &gt;{' '}
                        </span>
                      )}
                      {item.module_slug.replace(/^\d+-/, '').replace(/-/g, ' ')} &gt;{' '}
                      {item.lesson_slug.replace(/^\d+-/, '').replace(/-/g, ' ')}
                    </p>
                    <p className="text-sm text-text-primary">{item.feedback_text}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-text-secondary">
                      <span>{item.submitter_name || item.user_name || 'Anonymous'}</span>
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleResolveToggle(item)}
                      className={`p-1.5 rounded-md transition-colors ${
                        item.is_resolved
                          ? 'text-success hover:bg-green-50'
                          : 'text-text-secondary hover:bg-surface'
                      }`}
                      title={item.is_resolved ? 'Mark unresolved' : 'Mark resolved'}
                    >
                      {item.is_resolved ? <CheckCircle size={18} /> : <Circle size={18} />}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(item.id)}
                      className="p-1.5 rounded-md text-text-secondary hover:text-error hover:bg-red-50 transition-colors"
                      title="Delete feedback"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Confirm delete dialog */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm p-6" elevation={3}>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Delete Feedback</h3>
            <p className="text-sm text-text-secondary mb-4">
              Are you sure you want to delete this feedback? This cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="tertiary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
              <Button
                onClick={() => handleDelete(confirmDelete)}
                className="bg-error border-error hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
    </div>
    </>
  );
}
