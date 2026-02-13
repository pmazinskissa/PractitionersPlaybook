const cache = new Map<string, unknown>();

export function getFromCache<T>(key: string): T | undefined {
  return cache.get(key) as T | undefined;
}

export function setInCache<T>(key: string, value: T): void {
  cache.set(key, value);
}

export function clearCache(): void {
  cache.clear();
}
