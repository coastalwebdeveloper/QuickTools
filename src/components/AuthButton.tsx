import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, LogOut, ChevronDown, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AuthButton() {
  const { user, isLoading, isAuthenticated, login, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (isLoading) {
    return (
      <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
    );
  }

  if (!isAuthenticated) {
    return (
      <button
        id="auth-signin-btn"
        onClick={login}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border bg-card hover:bg-muted/60 text-sm font-medium transition-all duration-200 hover:border-primary/40 group"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span className="hidden sm:block">Sign in</span>
      </button>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id="auth-user-btn"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-muted/60 transition-colors"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-7 h-7 rounded-full object-cover ring-2 ring-primary/20"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
        )}
        <span className="hidden sm:block text-sm font-medium max-w-[100px] truncate">
          {user?.name?.split(' ')[0]}
        </span>
        <ChevronDown className={cn('w-3.5 h-3.5 text-muted-foreground transition-transform', dropdownOpen && 'rotate-180')} />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-xl shadow-xl animate-slide-down overflow-hidden z-50">
          {/* User info */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              {user?.avatar ? (
                <img src={user.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            {user?.plan === 'free' && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-primary bg-primary/8 px-2 py-1 rounded-lg">
                <Sparkles className="w-3 h-3" />
                Free plan — Unlimited AI access
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-1">
            <button
              id="auth-signout-btn"
              onClick={() => { setDropdownOpen(false); logout(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/8 rounded-lg transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
