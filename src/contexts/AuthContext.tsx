import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  plan: 'free' | 'pro';
  createdAt?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'qt_auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async (token: string): Promise<AuthUser | null> => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) { setUser(null); return; }
    const userData = await fetchUser(token);
    setUser(userData);
    if (!userData) localStorage.removeItem(TOKEN_KEY);
  }, [fetchUser]);

  // Restore session on mount
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        const userData = await fetchUser(token);
        setUser(userData);
        if (!userData) localStorage.removeItem(TOKEN_KEY);
      }
      setIsLoading(false);
    };
    init();
  }, [fetchUser]);

  const login = () => {
    window.location.href = '/api/auth/google';
  };

  const logout = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      logout,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
  return ctx;
}

export { TOKEN_KEY };
