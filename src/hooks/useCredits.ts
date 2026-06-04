import { useState, useEffect, useCallback } from 'react';
import { TOKEN_KEY } from '@/contexts/AuthContext';

export interface Credits {
  used: number;
  remaining: number;
  limit: number;
  plan: string;
  resetAt: string;
}

export function useCredits() {
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = useCallback(async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) { setCredits(null); setIsLoading(false); return; }

      const res = await window.fetch('/api/ai/credits', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setCredits(data);
    } catch {
      setCredits(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  // Time remaining until credits reset
  const resetIn = credits
    ? (() => {
        const diff = new Date(credits.resetAt).getTime() - Date.now();
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        return `${h}h ${m}m`;
      })()
    : null;

  return { credits, isLoading, refresh: fetch, resetIn };
}
