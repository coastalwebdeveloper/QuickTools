import { useAuthContext } from '@/contexts/AuthContext';

/**
 * Convenience hook for consuming the auth context.
 * Usage: const { user, login, logout, isAuthenticated, isLoading } = useAuth();
 */
export function useAuth() {
  return useAuthContext();
}
