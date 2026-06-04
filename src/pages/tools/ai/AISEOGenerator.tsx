import { useState } from 'react';
import { Tags, Copy, Check, AlertCircle, Loader2, LogIn, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { aiSEOGenerate, isError, SEOResult } from '@/lib/ai-client';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const AISEOGenerator = () => {
  const { isAuthenticated, login } = useAuth();
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<SEOResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rateLimited, setRateLimited] = useState(false);
  const [copiedField, setCopiedField] = useState('');

  const handleGenerate = async () => {
    if (topic.trim().length < 5) return;
    setLoading(true); setError(''); setRateLimited(false); setResult(null);
    const res = await aiSEOGenerate(topic, keywords || undefined, url || undefined);
    if (isError(res)) {
      if (res.rateLimited) setRateLimited(true);
      setError(res.error);
    } else {
      setResult(res);
    }
    setLoading(false);
  };

  const copy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const CopyBtn = ({ text, field }: { text: string; field: string }) => (
    <button onClick={() => copy(text, field)} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
      {copiedField === field ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );

  const Field = ({ label, value, field, maxLen }: { label: string; value: string; field: string; maxLen?: number }) => (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</span>
        <div className="flex items-center gap-2">
          {maxLen && <span className={cn('text-xs', value.length > maxLen ? 'text-amber-500' : 'text-muted-foreground')}>{value.length}/{maxLen}</span>}
          <CopyBtn text={value} field={field} />
        </div>
      </div>
      <p className="text-sm bg-muted/40 px-3 py-2.5 rounded-lg leading-relaxed">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-pink-500/10">
            <Tags className="w-6 h-6 text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold">AI SEO Generator</h1>
        </div>
        <p className="text-muted-foreground mb-8 ml-14">
          Generate optimized meta tags, Open Graph tags, and Twitter Cards for any topic.
          {!isAuthenticated && <span className="text-primary font-medium"> Guests get 5 free uses/day.</span>}
        </p>

        {/* Input form */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="seo-topic" className="text-sm font-medium">Page Topic / Description <span className="text-destructive">*</span></label>
            <textarea
              id="seo-topic"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. A free online tool for compressing PDF files while maintaining quality..."
              rows={3}
              maxLength={500}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="seo-keywords" className="text-sm font-medium">Target Keywords <span className="text-muted-foreground text-xs font-normal">(optional)</span></label>
              <input
                id="seo-keywords"
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
                placeholder="e.g. pdf compressor, compress pdf online"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="seo-url" className="text-sm font-medium">Page URL <span className="text-muted-foreground text-xs font-normal">(optional)</span></label>
              <input
                id="seo-url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://yoursite.com/page"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>
          <button
            id="seo-generate-btn"
            onClick={handleGenerate}
            disabled={loading || topic.trim().length < 5}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all',
              loading || topic.trim().length < 5
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'gradient-bg text-white shadow-brand hover:shadow-brand-lg btn-glow'
            )}
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating SEO...</> : <><Tags className="w-4 h-4" /> Generate SEO Tags</>}
          </button>
        </div>

        {error && (
          <div className="flex flex-col items-center gap-3 py-10">
            <AlertCircle className="w-8 h-8 text-destructive" />
            <p className="text-destructive">{error}</p>
            {rateLimited && <button onClick={login} className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold"><LogIn className="w-4 h-4" />Sign in for unlimited</button>}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {/* Primary Meta */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm">Primary Meta Tags</h2>
                <div className="flex items-center gap-2">
                  {result.focusKeyword && <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">🎯 {result.focusKeyword}</span>}
                  <span className={cn('text-xs px-2 py-1 rounded-full font-medium', result.readabilityScore === 'Easy' ? 'bg-green-500/10 text-green-500' : result.readabilityScore === 'Hard' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500')}>
                    {result.readabilityScore} readability
                  </span>
                </div>
              </div>
              <Field label="Title Tag" value={result.title} field="title" maxLen={60} />
              <Field label="Meta Description" value={result.description} field="desc" maxLen={160} />
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Keywords</span>
                <div className="flex flex-wrap gap-1.5">
                  {result.keywords.map(k => (
                    <span key={k} onClick={() => copy(k, k)} className="text-xs px-2.5 py-1 rounded-full bg-muted hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors">{k}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Open Graph */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500" /><h2 className="font-semibold text-sm">Open Graph Tags</h2></div>
              <Field label="og:title" value={result.ogTitle} field="ogtitle" />
              <Field label="og:description" value={result.ogDescription} field="ogdesc" />
            </div>

            {/* Twitter */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <h2 className="font-semibold text-sm">Twitter Card Tags</h2>
              </div>
              <Field label="twitter:title" value={result.twitterTitle} field="twtitle" />
              <Field label="twitter:description" value={result.twitterDescription} field="twdesc" />
            </div>
          </div>
        )}

        {!isAuthenticated && (
          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-4">
            <Tags className="w-5 h-5 text-primary shrink-0" />
            <div className="flex-1"><p className="text-sm font-medium">Unlimited SEO generation with a free account</p><p className="text-xs text-muted-foreground">Sign in to remove the 5 uses/day limit.</p></div>
            <button onClick={login} className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold"><LogIn className="w-4 h-4" />Sign in</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISEOGenerator;
