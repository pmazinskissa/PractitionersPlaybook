import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { ThemeConfig } from '@playbook/shared';
import { api } from '../lib/api';
import { applyTheme } from '../lib/theme-loader';

interface ThemeContextValue {
  theme: ThemeConfig | null;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: null, loading: true });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTheme()
      .then((data) => {
        setTheme(data);
        applyTheme(data);
      })
      .catch((err) => console.error('Failed to load theme:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-text-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
