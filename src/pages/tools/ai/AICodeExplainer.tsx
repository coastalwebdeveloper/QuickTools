import { useState } from 'react';
import { Code2, Copy, Check, AlertCircle, Loader2, LogIn, Terminal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { aiCodeExplain, isError } from '@/lib/ai-client';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const LANGUAGES = ['Auto Detect', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'SQL', 'HTML/CSS', 'Bash'];
const COMPLEXITY_COLOR: Record<string, string> = {
  Beginner: 'text-green-500 bg-green-500/10',
  Intermediate: 'text-amber-500 bg-amber-500/10',
  Advanced: 'text-red-500 bg-red-500/10',
};

const AICodeExplainer = () => {
  const { isAuthenticated, login } = useAuth();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Auto Detect');
  const [explanation, setExplanation] = useState('');
  const [concepts, setConcepts] = useState<string[]>([]);
  const [complexity, setComplexity] = useState('');
  const [detectedLang, setDetectedLang] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rateLimited, setRateLimited] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExplain = async () => {
    if (code.trim().length < 5) return;
    setLoading(true); setError(''); setRateLimited(false); setExplanation(''); setConcepts([]); setComplexity('');
    const lang = language === 'Auto Detect' ? undefined : language;
    const res = await aiCodeExplain(code, lang);
    if (isError(res)) {
      if (res.rateLimited) setRateLimited(true);
      setError(res.error);
    } else {
      setExplanation(res.explanation);
      setConcepts(res.concepts);
      setComplexity(res.complexity);
      setDetectedLang(res.language);
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(explanation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-orange-500/10">
            <Code2 className="w-6 h-6 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold">AI Code Explainer</h1>
        </div>
        <p className="text-muted-foreground mb-8 ml-14">
          Paste any code and get a plain-English explanation with concepts and complexity analysis.
          {!isAuthenticated && <span className="text-primary font-medium"> Guests get 5 free uses/day.</span>}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Code</label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="text-xs px-2 py-1.5 rounded-lg border border-input bg-card focus:outline-none focus:ring-1 focus:ring-primary/40"
              >
                {LANGUAGES.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <textarea
              id="code-input"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="// Paste your code here..."
              rows={13}
              maxLength={8000}
              spellCheck={false}
              className="w-full px-4 py-3 rounded-xl border border-input bg-card text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
            <button
              id="code-explain-btn"
              onClick={handleExplain}
              disabled={loading || code.trim().length < 5}
              className={cn(
                'flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all',
                loading || code.trim().length < 5
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'gradient-bg text-white shadow-brand hover:shadow-brand-lg btn-glow'
              )}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : <><Code2 className="w-4 h-4" /> Explain Code</>}
            </button>
          </div>

          {/* Output */}
          <div className="flex flex-col gap-3">
            {/* Metadata badges */}
            {(complexity || detectedLang) && (
              <div className="flex items-center gap-2 flex-wrap">
                {detectedLang && (
                  <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    <Terminal className="w-3 h-3" />{detectedLang}
                  </span>
                )}
                {complexity && (
                  <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', COMPLEXITY_COLOR[complexity] || 'text-muted-foreground bg-muted')}>
                    {complexity}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Explanation</label>
              {explanation && (
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {copied ? <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              )}
            </div>

            <div className={cn('flex-1 min-h-[200px] rounded-xl border px-4 py-3 text-sm', explanation ? 'bg-card border-border' : 'bg-muted/30 border-dashed border-border/50')}>
              {!explanation && !loading && !error && (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <Code2 className="w-10 h-10 opacity-30" />
                  <p>Code explanation will appear here</p>
                </div>
              )}
              {loading && <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}
              {error && (
                <div className="h-full flex flex-col items-center justify-center gap-3">
                  <AlertCircle className="w-7 h-7 text-destructive" />
                  <p className="text-sm text-destructive text-center">{error}</p>
                  {rateLimited && <button onClick={login} className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold"><LogIn className="w-4 h-4" />Sign in</button>}
                </div>
              )}
              {explanation && <p className="whitespace-pre-wrap leading-relaxed">{explanation}</p>}
            </div>

            {concepts.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Concepts Used</p>
                <div className="flex flex-wrap gap-1.5">
                  {concepts.map(c => (
                    <span key={c} className="text-xs px-2.5 py-1 rounded-full bg-muted text-foreground">{c}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {!isAuthenticated && (
          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-4">
            <Code2 className="w-5 h-5 text-primary shrink-0" />
            <div className="flex-1"><p className="text-sm font-medium">Unlimited code explanations with a free account</p><p className="text-xs text-muted-foreground">Sign in to remove the 5 uses/day limit.</p></div>
            <button onClick={login} className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold"><LogIn className="w-4 h-4" />Sign in</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICodeExplainer;
