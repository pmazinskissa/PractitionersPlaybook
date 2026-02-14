import path from 'path';
import fs from 'fs';
import { config } from '../config/env.js';
import { getCourseNavTree } from './content.service.js';
import { searchGlossary } from './glossary.service.js';
import type { SearchResult } from '@playbook/shared';

export function searchCourseContent(courseSlug: string, query: string): SearchResult[] {
  if (!query || query.length < 2) return [];

  const results: SearchResult[] = [];
  const lower = query.toLowerCase();
  const navTree = getCourseNavTree(courseSlug);
  if (!navTree) return [];

  // Search module titles + objectives
  for (const mod of navTree.modules) {
    if (mod.title.toLowerCase().includes(lower)) {
      results.push({
        type: 'module',
        course_slug: courseSlug,
        module_slug: mod.slug,
        lesson_slug: '',
        title: mod.title,
        snippet: mod.title,
        match_context: extractContext(mod.title, lower),
      });
    }
    // Search objectives
    for (const obj of mod.objectives || []) {
      if (obj.toLowerCase().includes(lower)) {
        results.push({
          type: 'module',
          course_slug: courseSlug,
          module_slug: mod.slug,
          lesson_slug: '',
          title: mod.title,
          snippet: obj,
          match_context: extractContext(obj, lower),
        });
        break; // one match per module objective is enough
      }
    }

    // Search lesson titles and content
    for (const lesson of mod.lessons) {
      if (lesson.title.toLowerCase().includes(lower)) {
        results.push({
          type: 'lesson',
          course_slug: courseSlug,
          module_slug: mod.slug,
          lesson_slug: lesson.slug,
          title: lesson.title,
          snippet: lesson.title,
          match_context: extractContext(lesson.title, lower),
        });
      }

      // Search raw MDX content
      const mdxPath = path.join(
        config.contentDir, 'courses', courseSlug, 'modules', mod.slug, 'lessons', `${lesson.slug}.mdx`
      );
      if (fs.existsSync(mdxPath)) {
        const content = fs.readFileSync(mdxPath, 'utf-8');
        const contentLower = content.toLowerCase();
        const idx = contentLower.indexOf(lower);
        if (idx !== -1) {
          // Don't duplicate if title already matched
          const alreadyMatched = results.some(
            (r) => r.type === 'lesson' && r.lesson_slug === lesson.slug && r.module_slug === mod.slug
          );
          if (!alreadyMatched) {
            results.push({
              type: 'lesson',
              course_slug: courseSlug,
              module_slug: mod.slug,
              lesson_slug: lesson.slug,
              title: lesson.title,
              snippet: content.slice(Math.max(0, idx - 50), idx + lower.length + 50).trim(),
              match_context: extractContext(content, lower),
            });
          }
        }
      }
    }
  }

  // Search glossary
  const glossaryMatches = searchGlossary(courseSlug, query);
  for (const entry of glossaryMatches) {
    results.push({
      type: 'glossary',
      course_slug: courseSlug,
      module_slug: '',
      lesson_slug: '',
      title: entry.term,
      snippet: entry.definition,
      match_context: extractContext(
        entry.term.toLowerCase().includes(lower) ? entry.term : entry.definition,
        lower
      ),
    });
  }

  return results;
}

function extractContext(text: string, query: string): string {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query);
  if (idx === -1) return text.slice(0, 100);
  const start = Math.max(0, idx - 50);
  const end = Math.min(text.length, idx + query.length + 50);
  let context = text.slice(start, end).trim();
  if (start > 0) context = '...' + context;
  if (end < text.length) context = context + '...';
  return context;
}
