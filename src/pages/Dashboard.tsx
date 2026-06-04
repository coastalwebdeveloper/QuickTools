import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCredits } from '@/hooks/useCredits';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Sparkles, Code2, Tags,
  LogOut, Zap, Clock, RefreshCw, ChevronRight,
  Shield, User, ChefHat, Mail, Calculator, Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ── Credit Ring SVG ────────────────────────────────────────────────────────────
function CreditRing({ remaining, limit }: { remaining: number; limit: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, remaining / limit);
  const offset = circumference - pct * circumference;
  const color = pct > 0.6 ? '#22c55e' : pct > 0.3 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg width="96" height="96" className="-rotate-90 absolute inset-0">
        <circle cx="48" cy="48" r={radius} fill="none" strokeWidth="7"
          className="text-muted/20" stroke="currentColor" />
        <circle cx="48" cy="48" r={radius} fill="none" strokeWidth="7"
          stroke={color} strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.5s ease' }}
        />
      </svg>
      <div className="flex flex-col items-center z-10">
        <span className="text-2xl font-bold leading-none" style={{ color }}>{remaining}</span>
        <span className="text-[10px] text-muted-foreground mt-0.5">/ {limit}</span>
      </div>
    </div>
  );
}

// ── AI Tool cards config ───────────────────────────────────────────────────────
const AI_TOOLS = [
  {
    id: 'code-explainer',
    name: 'Code Explainer',
    description: 'Get plain-English explanations for any code snippet or function.',
    icon: Code2,
    path: '/tools/ai/code-explainer',
    gradient: 'from-orange-500 to-amber-600',
    bg: 'bg-orange-500/10',
    text: 'text-orange-500',
    border: 'border-orange-500/20',
  },
  {
    id: 'seo-generator',
    name: 'SEO Generator',
    description: 'Generate optimized meta tags, OG tags, and Twitter Cards.',
    icon: Tags,
    path: '/tools/ai/seo-generator',
    gradient: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-500/10',
    text: 'text-pink-500',
    border: 'border-pink-500/20',
  },
  {
    id: 'recipe-generator',
    name: 'AI Recipe Generator',
    description: 'Create delicious recipes based on the ingredients you have.',
    icon: ChefHat,
    path: '/tools/ai/recipe-generator',
    gradient: 'from-red-500 to-orange-600',
    bg: 'bg-red-500/10',
    text: 'text-red-500',
    border: 'border-red-500/20',
  },
  {
    id: 'letter-writer',
    name: 'AI Letter Writer',
    description: 'Draft professional or personal letters in seconds.',
    icon: Mail,
    path: '/tools/ai/letter-writer',
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-500/10',
    text: 'text-blue-500',
    border: 'border-blue-500/20',
  },
  {
    id: 'smart-calculator',
    name: 'AI Smart Calculator',
    description: 'Solve complex math problems with step-by-step AI assistance.',
    icon: Calculator,
    path: '/tools/ai/smart-calculator',
    gradient: 'from-green-500 to-emerald-600',
    bg: 'bg-green-500/10',
    text: 'text-green-500',
    border: 'border-green-500/20',
  },
  {
    id: 'budget-planner',
    name: 'AI Budget Planner',
    description: 'Plan your monthly budget smartly with AI insights.',
    icon: Wallet,
    path: '/tools/ai/budget-planner',
    gradient: 'from-purple-500 to-fuchsia-600',
    bg: 'bg-purple-500/10',
    text: 'text-purple-500',
    border: 'border-purple-500/20',
  }
];

// ── Dashboard ──────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user, logout } = useAuth();
  const { credits, isLoading: creditsLoading, resetIn, refresh } = useCredits();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  const remaining = credits?.remaining ?? credits?.limit ?? 20;
  const used = credits?.used ?? 0;
  const limit = credits?.limit ?? 20;
  const usedPct = Math.round((used / limit) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* ── Profile + Credits Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

          {/* User Profile Card */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-border bg-card p-6">
            {/* Gradient blob */}
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
            <div className="flex items-center gap-4">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/20 shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                  <User className="w-8 h-8 text-primary" />
                </div>
              )}
              <div className="min-w-0 pr-16 sm:pr-0">
                <h1 className="text-xl font-bold truncate">Welcome back, {user?.name?.split(' ')[0]}!</h1>
                <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    <Shield className="w-3 h-3" /> Free Plan
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 font-medium">
                    <Zap className="w-3 h-3" /> AI Access
                  </span>
                </div>
              </div>
            </div>

            {/* Animated Welcome Message */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 animate-bounce">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Explore Our New AI Tools!</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Generate recipes, write professional letters, calculate smartly, and plan your budget with AI.
                  </p>
                </div>
              </div>
            </div>


            <button
              id="dashboard-logout-btn"
              onClick={handleLogout}
              className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors px-2.5 py-1.5 rounded-lg hover:bg-destructive/8"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>

          {/* Credit Widget Card */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Daily Credits</span>
              <button onClick={refresh} className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {creditsLoading ? (
              <div className="w-24 h-24 rounded-full bg-muted/30 animate-pulse" />
            ) : (
              <CreditRing remaining={remaining} limit={limit} />
            )}

            <div className="text-center">
              <p className="text-sm font-medium">
                <span className="text-foreground font-bold">{remaining}</span>
                <span className="text-muted-foreground"> credits remaining</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3" />
                Resets in {resetIn ?? '...'}
              </p>
            </div>

            {/* Usage bar */}
            <div className="w-full">
              <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                <span>{used} used</span>
                <span>{limit} total</span>
              </div>
              <div className="w-full h-1.5 bg-muted/40 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-700',
                    usedPct < 60 ? 'bg-green-500' : usedPct < 80 ? 'bg-amber-500' : 'bg-red-500'
                  )}
                  style={{ width: `${usedPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── AI Tools Grid ── */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-3">
          <div>
            <h2 className="text-xl font-bold">AI Tools</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Each use costs 1 credit · {limit} credits per day</p>
          </div>
          {remaining === 0 && (
            <span className="text-xs text-destructive bg-destructive/10 px-3 py-1.5 rounded-full font-medium inline-block">
              Daily limit reached — resets in {resetIn}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AI_TOOLS.map((tool) => {
            const Icon = tool.icon;
            const locked = remaining === 0;
            return (
              <button
                key={tool.id}
                id={`dashboard-tool-${tool.id}`}
                onClick={() => !locked && navigate(tool.path)}
                disabled={locked}
                className={cn(
                  'group relative flex flex-col gap-3 p-5 rounded-2xl border text-left transition-all duration-200',
                  locked
                    ? 'opacity-50 cursor-not-allowed border-border bg-card'
                    : `border-border bg-card hover:border-current hover:shadow-lg cursor-pointer ${tool.border} hover:bg-muted/30`
                )}
              >
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', tool.bg)}>
                  <Icon className={cn('w-5 h-5', tool.text)} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{tool.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{tool.description}</p>
                </div>
                {!locked && (
                  <ChevronRight className={cn(
                    'absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0',
                    tool.text
                  )} />
                )}
                {!locked && (
                  <span className="text-[10px] text-muted-foreground">1 credit per use</span>
                )}
                {locked && (
                  <span className="text-[10px] text-destructive font-medium">No credits remaining</span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Info footer ── */}
        <p className="text-center text-xs text-muted-foreground mt-10 mb-6">
          Credits reset daily at midnight · Free plan includes {limit} AI uses per day
        </p>
      </div>
      <Footer />
    </div>
  );
}
