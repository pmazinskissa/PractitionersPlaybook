import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { AuthUser } from '@playbook/shared';
import { api } from '../lib/api';

interface Providers {
  oauth: string | null;
  devBypass: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  providers: Providers | null;
  login: () => void;
  devLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  error: null,
  providers: null,
  login: () => {},
  devLogin: async () => {},
  logout: async () => {},
});

const ERROR_MESSAGES: Record<string, string> = {
  missing_state: 'Authentication failed: missing state parameter.',
  invalid_state: 'Authentication session expired. Please try again.',
  auth_failed: 'Authentication failed. Please try again.',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [providers, setProviders] = useState<Providers | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Check for error from OAuth redirect
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(ERROR_MESSAGES[errorParam] || 'An authentication error occurred.');
      // Clear the error param from URL
      searchParams.delete('error');
      setSearchParams(searchParams, { replace: true });
    }

    // Load session + providers in parallel
    Promise.all([
      api.getMe().catch(() => null),
      api.getProviders().catch(() => null),
    ]).then(([me, prov]) => {
      if (me) setUser(me);
      if (prov) setProviders(prov);
      setLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const login = useCallback(() => {
    window.location.href = '/api/auth/login';
  }, []);

  const devLogin = useCallback(async () => {
    try {
      setError(null);
      const me = await api.devLogin();
      setUser(me);
    } catch (err: any) {
      setError(err.message || 'Dev login failed');
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.logout();
      setUser(null);
    } catch {
      // Clear user anyway
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, providers, login, devLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
