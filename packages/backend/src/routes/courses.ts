import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { listCourses, getCourse, getLesson, getCourseNavTree } from '../services/content.service.js';
import { getGlossary, searchGlossary } from '../services/glossary.service.js';
import { getKnowledgeCheck } from '../services/knowledge-check.service.js';
import { config } from '../config/env.js';

const router = Router();

// GET /api/courses — list all courses
router.get('/', (_req, res) => {
  const courses = listCourses();
  res.json({ data: courses });
});

// GET /api/courses/:slug — course detail + navigation tree
router.get('/:slug', (req, res) => {
  const course = getCourse(req.params.slug);
  if (!course) {
    return res.status(404).json({ error: { message: 'Course not found' } });
  }
  const navTree = getCourseNavTree(req.params.slug);
  res.json({ data: { course, navTree } });
});

// GET /api/courses/:slug/modules/:moduleSlug/lessons/:lessonSlug — compiled MDX + metadata
router.get('/:slug/modules/:moduleSlug/lessons/:lessonSlug', async (req, res) => {
  try {
    const lesson = await getLesson(req.params.slug, req.params.moduleSlug, req.params.lessonSlug);
    if (!lesson) {
      return res.status(404).json({ error: { message: 'Lesson not found' } });
    }
    res.json({ data: lesson });
  } catch (err) {
    console.error('Failed to compile lesson:', err);
    res.status(500).json({ error: { message: 'Failed to compile lesson content' } });
  }
});

// GET /api/courses/:slug/modules/:moduleSlug/knowledge-check — knowledge check questions
router.get('/:slug/modules/:moduleSlug/knowledge-check', (req, res) => {
  const kc = getKnowledgeCheck(req.params.slug, req.params.moduleSlug);
  if (!kc) {
    return res.status(404).json({ error: { message: 'Knowledge check not found' } });
  }
  res.json({ data: kc });
});

// GET /api/courses/:slug/assets/:filename — downloadable resource files
router.get('/:slug/assets/:filename', (req, res) => {
  const filename = path.basename(req.params.filename); // prevent path traversal
  const filePath = path.join(config.contentDir, 'courses', req.params.slug, 'assets', filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: { message: 'Asset not found' } });
  }
  res.download(filePath, filename);
});

// GET /api/courses/:slug/glossary — glossary entries
router.get('/:slug/glossary', (req, res) => {
  const query = req.query.q as string | undefined;
  const entries = query
    ? searchGlossary(req.params.slug, query)
    : getGlossary(req.params.slug);
  res.json({ data: entries });
});

export default router;
