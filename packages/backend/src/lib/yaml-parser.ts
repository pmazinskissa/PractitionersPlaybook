import fs from 'fs';
import { parse } from 'yaml';

export function readYaml<T>(filePath: string): T {
  const content = fs.readFileSync(filePath, 'utf-8');
  return parse(content) as T;
}

export function readYamlIfExists<T>(filePath: string): T | null {
  if (!fs.existsSync(filePath)) return null;
  return readYaml<T>(filePath);
}
