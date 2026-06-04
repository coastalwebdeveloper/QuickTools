import { useState } from 'react';
import { SpellCheck, Copy, Check, AlertCircle, Loader2, LogIn, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { aiGrammarCheck, isError } from '@/lib/ai-client';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const AIGrammarChecker = () => {
  const { isAuthenticated, login } = useAuth();
  const [text, setText] = useState('');
  const [corrected, setCorrected] = useState('');
  const [changes, setChanges] = useState<Array<{ original: string; corrected: string; reason: string }>>([]);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rateLimited, setRateLimited] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCheck = async () => {
    if (text.trim().length < 5) return;
    setLoading(true); setError(''); setRateLimited(false); setCorrected(''); setChanges([]); setScore(null);
    const res = await aiGrammarCheck(text);
    if (isError(res)) {
      if (res.rateLimited) setRateLimited(true);
      setError(res.error);
    } else {
      setCorrected(res.corrected);
      setChanges(res.changes);
      setScore(res.score);
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(corrected);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scoreColor = score === null ? '' : score >= 90 ? 'text-green-500' : score >= 70 ? 'text-amber-500' : 'text-red-500';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-green-500/10">
            <SpellCheck className="w-6 h-6 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold">AI Grammar Checker</h1>
        </div>
        <p className="text-muted-foreground mb-8 ml-14">
          Fix grammar, spelling, and punctuation errors instantly with AI.
          {!isAuthenticated && <span className="text-primary font-medium"> Guests get 5 free uses/day.</span>}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Text to Check</label>
            <textarea
              id="grammar-input"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your text here to check for grammar, spelling, and punctuation errors..."
              rows={13}
              maxLength={10000}
              className="w-full px-4 py-3 rounded-xl border border-input bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
            <button
              id="grammar-check-btn"
              onClick={handleCheck}
              disabled={loading || text.trim().length < 5}
              className={cn(
                'flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all',
                loading || text.trim().length < 5
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'gradient-bg text-white shadow-brand hover:shadow-brand-lg btn-glow'
              )}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Checking...</> : <><SpellCheck className="w-4 h-4" /> Check Grammar</>}
            </button>
          </div>

          {/* Output */}
          <div className="flex flex-col gap-3">
            {/* Score */}
            {score !== null && (
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border">
                <span className="text-sm font-medium">Grammar Score</span>
                <div className="flex items-center gap-2">
                  <span className={cn('text-2xl font-bold', scoreColor)}>{score}</span>
                  <span className="text-muted-foreground text-sm">/100</span>
                  {changes.length === 0 && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Corrected Text</label>
              {corrected && (
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {copied ? <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              )}
            </div>

            <div className={cn('rounded-xl border px-4 py-3 text-sm min-h-[200px]', corrected ? 'bg-card border-border' : 'bg-muted/30 border-dashed border-border/50')}>
              {!corrected && !loading && !error && <div className="h-32 flex items-center justify-center text-muted-foreground"><p>Corrected text appears here</p></div>}
              {loading && <div className="h-32 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}
              {error && (
                <div className="h-32 flex flex-col items-center justify-center gap-3">
                  <AlertCircle className="w-7 h-7 text-destructive" />
                  <p className="text-sm text-destructive text-center">{error}</p>
                  {rateLimited && <button onClick={login} className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold"><LogIn className="w-4 h-4" />Sign in</button>}
                </div>
              )}
              {corrected && <p className="whitespace-pre-wrap leading-relaxed">{corrected}</p>}
            </div>

            {/* Changes list */}
            {changes.length > 0 && (
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-4 py-2.5 border-b border-border bg-muted/30">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{changes.length} correction{changes.length !== 1 ? 's' : ''} found</p>
                </div>
                <div className="divide-y divide-border max-h-48 overflow-y-auto">
                  {changes.map((c, i) => (
                    <div key={i} className="px-4 py-2.5 text-xs">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="line-through text-destructive">{c.original}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className="text-green-600 dark:text-green-400 font-medium">{c.corrected}</span>
                      </div>
                      <p className="text-muted-foreground">{c.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {corrected && changes.length === 0 && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                No errors found — your text looks great!
              </div>
            )}
          </div>
        </div>

        {!isAuthenticated && (
          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-4">
            <SpellCheck className="w-5 h-5 text-primary shrink-0" />
            <div className="flex-1"><p className="text-sm font-medium">Unlimited grammar checks with a free account</p><p className="text-xs text-muted-foreground">Sign in to remove the 5 uses/day limit.</p></div>
            <button onClick={login} className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold"><LogIn className="w-4 h-4" />Sign in</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGrammarChecker;
