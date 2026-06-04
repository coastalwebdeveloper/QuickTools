import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TOKEN_KEY } from '@/contexts/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * /auth/callback
 *
 * This page handles the redirect from our backend after Google OAuth.
 * The backend sends: /auth/callback?token=xxx  OR  /auth/callback?error=xxx
 */
const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const token = searchParams.get('token');
  const error = searchParams.get('error');

  useEffect(() => {
    const handle = async () => {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        await refreshUser();
        // Go to user dashboard after successful login
        setTimeout(() => navigate('/dashboard', { replace: true }), 1000);
      } else {
        setTimeout(() => navigate('/', { replace: true }), 2500);
      }
    };
    handle();
  }, [token, error, navigate, refreshUser]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        {!token && !error && (
          <>
            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
            <p className="text-muted-foreground">Signing you in...</p>
          </>
        )}
        {token && (
          <>
            <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="font-semibold text-lg">You're signed in!</p>
            <p className="text-sm text-muted-foreground">Redirecting you back...</p>
          </>
        )}
        {error && !token && (
          <>
            <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <p className="font-semibold text-lg">Sign in failed</p>
            <p className="text-sm text-muted-foreground">
              {error === 'access_denied' ? 'You cancelled the sign-in.' : 'Something went wrong. Please try again.'}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
