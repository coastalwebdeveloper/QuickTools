import { useState } from 'react';
import { Sparkles, Copy, Check, AlertCircle, Loader2, LogIn, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { aiSummarize, isError } from '@/lib/ai-client';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const AITextSummarizer = () => {
  const { isAuthenticated, login } = useAuth();
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rateLimited, setRateLimited] = useState(false);
  const [copied, setCopied] = useState(false);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  const handleSummarize = async () => {
    if (text.trim().length < 30) return;
    setLoading(true);
    setError('');
    setRateLimited(false);
    setSummary('');

    const res = await aiSummarize(text);

    if (isError(res)) {
      if (res.rateLimited) setRateLimited(true);
      setError(res.error);
    } else {
      setSummary(res.summary);
    }
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-violet-500/10">
            <Sparkles className="w-6 h-6 text-violet-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Text Summarizer</h1>
          </div>
        </div>
        <p className="text-muted-foreground mb-8 ml-14">
          Paste any text and get a clear, structured summary powered by AI.
          {!isAuthenticated && <span className="text-primary font-medium"> Guests get 5 free uses/day.</span>}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Your Text</label>
              <span className="text-xs text-muted-foreground">{wordCount} words · {charCount} chars</span>
            </div>
            <textarea
              id="summarizer-input"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste your article, essay, or any long text here (minimum 30 characters)..."
              rows={14}
              maxLength={15000}
              className="w-full px-4 py-3 rounded-xl border border-input bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none transition-shadow"
            />
            <button
              id="summarizer-btn"
              onClick={handleSummarize}
              disabled={loading || text.trim().length < 30}
              className={cn(
                'flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all',
                loading || text.trim().length < 30
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'gradient-bg text-white shadow-brand hover:shadow-brand-lg btn-glow'
              )}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Summarizing...</> : <><Sparkles className="w-4 h-4" /> Summarize Text</>}
            </button>
          </div>

          {/* Output */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Summary</label>
              {summary && (
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {copied ? <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              )}
            </div>

            <div className={cn(
              'flex-1 min-h-[336px] rounded-xl border px-4 py-3 text-sm transition-all',
              summary ? 'bg-card border-border' : 'bg-muted/30 border-dashed border-border/50'
            )}>
              {!summary && !loading && !error && (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <FileText className="w-10 h-10 opacity-30" />
                  <p className="text-sm">Your summary will appear here</p>
                </div>
              )}
              {loading && (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                    <p className="text-sm text-muted-foreground">AI is reading your text...</p>
                  </div>
                </div>
              )}
              {error && (
                <div className="h-full flex flex-col items-center justify-center gap-3 p-4">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                  <p className="text-sm text-destructive text-center">{error}</p>
                  {rateLimited && (
                    <button
                      onClick={login}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold mt-1"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign in for unlimited access
                    </button>
                  )}
                </div>
              )}
              {summary && <p className="whitespace-pre-wrap leading-relaxed">{summary}</p>}
            </div>
          </div>
        </div>

        {!isAuthenticated && (
          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-4">
            <Sparkles className="w-5 h-5 text-primary shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium">Sign in for unlimited AI access</p>
              <p className="text-xs text-muted-foreground">Guests are limited to 5 uses per day.</p>
            </div>
            <button onClick={login} className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold">
              <LogIn className="w-4 h-4" />Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITextSummarizer;
