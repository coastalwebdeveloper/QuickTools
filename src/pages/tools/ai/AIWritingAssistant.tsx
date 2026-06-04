import { useState } from 'react';
import { PenLine, Copy, Check, AlertCircle, Loader2, LogIn, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { aiWritingAssistant, isError } from '@/lib/ai-client';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

type Mode = 'rewrite' | 'improve' | 'expand' | 'shorten';

const MODES: { value: Mode; label: string; desc: string; color: string }[] = [
  { value: 'improve', label: '✨ Improve', desc: 'Enhance clarity & flow', color: 'text-blue-500 bg-blue-500/10 border-blue-500/30' },
  { value: 'rewrite', label: '🔄 Rewrite', desc: 'Fresh words, same meaning', color: 'text-violet-500 bg-violet-500/10 border-violet-500/30' },
  { value: 'expand', label: '📖 Expand', desc: 'Add detail & examples', color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' },
  { value: 'shorten', label: '✂️ Shorten', desc: 'Remove redundancies', color: 'text-orange-500 bg-orange-500/10 border-orange-500/30' },
];

const AIWritingAssistant = () => {
  const { isAuthenticated, login } = useAuth();
  const [text, setText] = useState('');
  const [mode, setMode] = useState<Mode>('improve');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rateLimited, setRateLimited] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = async () => {
    if (text.trim().length < 10) return;
    setLoading(true); setError(''); setRateLimited(false); setResult('');
    const res = await aiWritingAssistant(text, mode);
    if (isError(res)) {
      if (res.rateLimited) setRateLimited(true);
      setError(res.error);
    } else {
      setResult(res.result);
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedMode = MODES.find(m => m.value === mode)!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-blue-500/10">
            <PenLine className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold">AI Writing Assistant</h1>
        </div>
        <p className="text-muted-foreground mb-8 ml-14">
          Transform your writing with AI. Choose a mode and let the AI do the work.
          {!isAuthenticated && <span className="text-primary font-medium"> Guests get 5 free uses/day.</span>}
        </p>

        {/* Mode selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {MODES.map(m => (
            <button
              key={m.value}
              id={`mode-${m.value}`}
              onClick={() => setMode(m.value)}
              className={cn(
                'flex flex-col items-start gap-0.5 px-3 py-2.5 rounded-xl border text-left transition-all',
                mode === m.value ? m.color + ' border-current/30' : 'border-border bg-card hover:bg-muted/50'
              )}
            >
              <span className="text-sm font-semibold">{m.label}</span>
              <span className="text-xs text-muted-foreground">{m.desc}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Your Text</label>
            <textarea
              id="writing-input"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Enter your text here (minimum 10 characters)..."
              rows={13}
              maxLength={10000}
              className="w-full px-4 py-3 rounded-xl border border-input bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
            <button
              id="writing-run-btn"
              onClick={handleRun}
              disabled={loading || text.trim().length < 10}
              className={cn(
                'flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all',
                loading || text.trim().length < 10
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'gradient-bg text-white shadow-brand hover:shadow-brand-lg btn-glow'
              )}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <><PenLine className="w-4 h-4" /> {selectedMode.label}</>}
            </button>
          </div>

          {/* Output */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Result</label>
              {result && (
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {copied ? <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              )}
            </div>
            <div className={cn('flex-1 min-h-[312px] rounded-xl border px-4 py-3 text-sm', result ? 'bg-card border-border' : 'bg-muted/30 border-dashed border-border/50')}>
              {!result && !loading && !error && (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <PenLine className="w-10 h-10 opacity-30" />
                  <p>Transformed text will appear here</p>
                </div>
              )}
              {loading && <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}
              {error && (
                <div className="h-full flex flex-col items-center justify-center gap-3">
                  <AlertCircle className="w-7 h-7 text-destructive" />
                  <p className="text-sm text-destructive text-center">{error}</p>
                  {rateLimited && <button onClick={login} className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold"><LogIn className="w-4 h-4" />Sign in for unlimited</button>}
                </div>
              )}
              {result && <p className="whitespace-pre-wrap leading-relaxed">{result}</p>}
            </div>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-4">
            <PenLine className="w-5 h-5 text-primary shrink-0" />
            <div className="flex-1"><p className="text-sm font-medium">Unlimited AI writing with a free account</p><p className="text-xs text-muted-foreground">Sign in to remove the 5 uses/day limit.</p></div>
            <button onClick={login} className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold"><LogIn className="w-4 h-4" />Sign in</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIWritingAssistant;
