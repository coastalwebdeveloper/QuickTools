import { useState } from 'react';
import { Mail, Loader2, AlertCircle, LogIn, Copy, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { aiLetterWrite, isError, LetterResult } from '@/lib/ai-client';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export default function AILetterWriter() {
  const { isAuthenticated, login } = useAuth();
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [recipient, setRecipient] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rateLimited, setRateLimited] = useState(false);
  const [result, setResult] = useState<LetterResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (topic.trim().length < 5) return;
    setLoading(true); setError(''); setRateLimited(false); setResult(null);
    const res = await aiLetterWrite(topic, tone, recipient);
    if (isError(res)) {
      if (res.rateLimited) setRateLimited(true);
      setError(res.error);
    } else {
      setResult(res);
    }
    setLoading(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-blue-500/10">
            <Mail className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold">AI Letter Writer</h1>
        </div>
        <p className="text-muted-foreground mb-8 ml-14">
          Draft perfectly structured letters in seconds.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">What is the letter about?</label>
              <textarea
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. Asking for a 2-week vacation starting next month..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Recipient</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={e => setRecipient(e.target.value)}
                  placeholder="e.g. HR Manager"
                  className="w-full px-4 py-2 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Tone</label>
                <select
                  value={tone}
                  onChange={e => setTone(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Formal</option>
                  <option>Apologetic</option>
                  <option>Persuasive</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={loading || topic.trim().length < 5}
              className={cn(
                'flex items-center justify-center gap-2 py-3 mt-2 rounded-xl font-semibold text-sm transition-all',
                loading || topic.trim().length < 5
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'gradient-bg text-white shadow-brand hover:shadow-brand-lg btn-glow'
              )}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Drafting...</> : <><Mail className="w-4 h-4" /> Draft Letter</>}
            </button>
          </div>

          <div className="flex flex-col gap-3">
             <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Result</label>
              {result && (
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {copied ? <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy text</>}
                </button>
              )}
            </div>

            <div className={cn('flex-1 rounded-xl border p-6 whitespace-pre-wrap text-sm leading-relaxed', result ? 'bg-card border-border shadow-sm' : 'bg-muted/30 border-dashed border-border/50')}>
              {!result && !loading && !error && (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground min-h-[300px]">
                  <Mail className="w-10 h-10 opacity-30" />
                  <p>Your drafted letter will appear here</p>
                </div>
              )}
              {loading && <div className="h-full min-h-[300px] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}
              {error && (
                <div className="h-full flex flex-col items-center justify-center gap-3 min-h-[300px]">
                  <AlertCircle className="w-7 h-7 text-destructive" />
                  <p className="text-sm text-destructive text-center">{error}</p>
                </div>
              )}
              {result && result.letter}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
