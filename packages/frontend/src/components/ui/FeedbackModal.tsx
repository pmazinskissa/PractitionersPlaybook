import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { api } from '../../lib/api';
import Button from './Button';
import Card from './Card';

interface FeedbackModalProps {
  courseSlug: string;
  onClose: () => void;
}

export default function FeedbackModal({ courseSlug, onClose }: FeedbackModalProps) {
  const [feedbackText, setFeedbackText] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!feedbackText.trim()) return;
    setSubmitting(true);
    try {
      await api.submitFeedback({
        course_slug: courseSlug,
        feedback_text: feedbackText.trim(),
        submitter_name: submitterName.trim() || undefined,
      });
      setSubmitted(true);
    } catch {
      alert('Failed to submit feedback. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
        >
          <Card className="w-full max-w-md p-6" elevation={3}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-primary" />
                <h3 className="text-lg font-semibold text-text-primary" style={{ fontFamily: 'var(--font-heading)' }}>
                  Share Feedback
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-text-secondary hover:text-text-primary transition-colors rounded-md"
              >
                <X size={18} />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-4">
                <p className="text-success font-semibold">Thank you for your feedback!</p>
                <p className="text-sm text-text-secondary mt-2">
                  Your input helps us improve the course.
                </p>
                <Button onClick={onClose} className="mt-4 text-sm">
                  Close
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Your feedback <span className="text-error">*</span>
                  </label>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Share your thoughts, suggestions, or report any issues..."
                    className="w-full h-28 p-3 text-sm border border-border rounded-input focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Your name <span className="text-text-secondary/60">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={submitterName}
                    onChange={(e) => setSubmitterName(e.target.value)}
                    placeholder="Anonymous"
                    className="w-full px-3 py-2 text-sm border border-border rounded-input focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="tertiary" onClick={onClose} className="text-sm">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!feedbackText.trim() || submitting}
                    className="text-sm"
                  >
                    {submitting ? 'Submitting...' : 'Submit Feedback'}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
