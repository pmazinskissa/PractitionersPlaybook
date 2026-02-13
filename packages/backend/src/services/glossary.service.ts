import path from 'path';
import fs from 'fs';
import { config } from '../config/env.js';
import { readYaml } from '../lib/yaml-parser.js';
import { getFromCache, setInCache } from '../lib/content-cache.js';
import type { GlossaryEntry } from '@playbook/shared';

export function getGlossary(courseSlug: string): GlossaryEntry[] {
  const cacheKey = `glossary:${courseSlug}`;
  const cached = getFromCache<GlossaryEntry[]>(cacheKey);
  if (cached) return cached;

  const yamlPath = path.join(config.contentDir, 'courses', courseSlug, 'glossary.yaml');
  if (!fs.existsSync(yamlPath)) return [];

  const data = readYaml<{ entries: GlossaryEntry[] }>(yamlPath);
  const entries = data.entries || [];

  // Sort alphabetically
  entries.sort((a, b) => a.term.localeCompare(b.term));

  setInCache(cacheKey, entries);
  return entries;
}

export function searchGlossary(courseSlug: string, query: string): GlossaryEntry[] {
  const entries = getGlossary(courseSlug);
  const lower = query.toLowerCase();
  return entries.filter(
    (e) => e.term.toLowerCase().includes(lower) || e.definition.toLowerCase().includes(lower)
  );
}
