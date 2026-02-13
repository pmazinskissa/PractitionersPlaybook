import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, BookOpen, ChevronRight } from 'lucide-react';
import { useCourse } from '../context/CourseContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { fadeInUp, stagger } from '../lib/animations';

export default function CourseOverview() {
  const { slug } = useParams<{ slug: string }>();
  const { course, navTree } = useCourse();

  if (!course || !navTree) return null;

  const firstModule = navTree.modules[0];
  const firstLesson = firstModule?.lessons[0];
  const startLink = firstLesson
    ? `/courses/${slug}/modules/${firstModule.slug}/lessons/${firstLesson.slug}`
    : '#';

  const hours = Math.floor(course.estimated_duration_minutes / 60);
  const mins = course.estimated_duration_minutes % 60;
  const durationStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  return (
    <div className="pb-16">
      {/* Hero */}
      <motion.section
        className="relative bg-gradient-to-br from-primary via-primary to-secondary px-6 sm:px-12 py-16 sm:py-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-3xl">
          <motion.p
            className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Training Course
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            {course.title}
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-white/70 mt-4 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            {course.description}
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <Link to={startLink}>
              <Button className="text-base px-8 py-3">
                Start Course
                <ChevronRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Metadata row */}
      <motion.div
        className="flex flex-wrap gap-6 px-6 sm:px-12 py-6 border-b border-border"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInUp} className="flex items-center gap-2 text-sm text-text-secondary">
          <Clock size={16} className="text-primary" />
          <span>{durationStr}</span>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex items-center gap-2 text-sm text-text-secondary">
          <BookOpen size={16} className="text-primary" />
          <span>{navTree.modules.length} modules, {navTree.total_lessons} lessons</span>
        </motion.div>
        <motion.div variants={fadeInUp} className="flex items-center gap-2 text-sm text-text-secondary">
          <Users size={16} className="text-primary" />
          <span>{course.audience}</span>
        </motion.div>
      </motion.div>

      <div className="px-6 sm:px-12 max-w-4xl">
        {/* Narrative Synopsis */}
        {course.narrative_synopsis && (
          <motion.section
            className="mt-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <Card elevation={1} className="p-6 border-l-4 border-l-accent">
              <h2
                className="text-lg font-semibold text-text-primary mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                About This Course
              </h2>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {course.narrative_synopsis}
              </p>
            </Card>
          </motion.section>
        )}

        {/* Module Roadmap */}
        <motion.section
          className="mt-12"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-bold text-text-primary mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Module Roadmap
          </motion.h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border hidden sm:block" />

            <div className="space-y-4">
              {navTree.modules.map((mod, index) => (
                <motion.div
                  key={mod.slug}
                  variants={fadeInUp}
                  className="relative"
                >
                  <Card elevation={1} className="p-5 sm:ml-12">
                    {/* Timeline dot */}
                    <div className="absolute left-3 top-6 w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center hidden sm:flex">
                      {index + 1}
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                          Module {index + 1}
                        </p>
                        <h3 className="text-base font-semibold text-text-primary">
                          {mod.title}
                        </h3>
                        {mod.objectives.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {mod.objectives.map((obj, i) => (
                              <li key={i} className="text-sm text-text-secondary flex gap-2">
                                <span className="text-primary mt-0.5">-</span>
                                {obj}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="text-xs text-text-secondary whitespace-nowrap">
                        {mod.lessons.length} lessons
                        <br />
                        ~{mod.estimated_duration_minutes}m
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
