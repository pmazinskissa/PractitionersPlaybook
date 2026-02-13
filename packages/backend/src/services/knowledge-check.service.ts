import path from 'path';
import fs from 'fs';
import { config } from '../config/env.js';
import { readYaml } from '../lib/yaml-parser.js';
import { getFromCache, setInCache } from '../lib/content-cache.js';
import type { KnowledgeCheckConfig } from '@playbook/shared';

const coursesDir = () => path.join(config.contentDir, 'courses');

function knowledgeCheckPath(courseSlug: string, moduleSlug: string): string {
  return path.join(coursesDir(), courseSlug, 'modules', moduleSlug, 'knowledge-check.yaml');
}

export function hasKnowledgeCheck(courseSlug: string, moduleSlug: string): boolean {
  const cacheKey = `kc:exists:${courseSlug}:${moduleSlug}`;
  const cached = getFromCache<boolean>(cacheKey);
  if (cached !== null && cached !== undefined) return cached;

  const exists = fs.existsSync(knowledgeCheckPath(courseSlug, moduleSlug));
  setInCache(cacheKey, exists);
  return exists;
}

export function getKnowledgeCheck(
  courseSlug: string,
  moduleSlug: string
): KnowledgeCheckConfig | null {
  const cacheKey = `kc:${courseSlug}:${moduleSlug}`;
  const cached = getFromCache<KnowledgeCheckConfig>(cacheKey);
  if (cached) return cached;

  const filePath = knowledgeCheckPath(courseSlug, moduleSlug);
  if (!fs.existsSync(filePath)) return null;

  const data = readYaml<KnowledgeCheckConfig>(filePath);
  setInCache(cacheKey, data);
  return data;
}
