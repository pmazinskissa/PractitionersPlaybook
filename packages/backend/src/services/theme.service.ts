import path from 'path';
import fs from 'fs';
import { config } from '../config/env.js';
import { readYaml } from '../lib/yaml-parser.js';
import type { ThemeConfig } from '@playbook/shared';

let cachedTheme: ThemeConfig | null = null;

export function getActiveTheme(): ThemeConfig {
  if (cachedTheme) return cachedTheme;

  const themePath = path.join(config.contentDir, 'themes', config.activeTheme, 'theme.yaml');
  cachedTheme = readYaml<ThemeConfig>(themePath);
  return cachedTheme;
}

export function getThemeAssetPath(filename: string): string | null {
  const assetPath = path.join(config.contentDir, 'themes', config.activeTheme, filename);
  if (fs.existsSync(assetPath)) return assetPath;
  return null;
}

export function clearThemeCache(): void {
  cachedTheme = null;
}
