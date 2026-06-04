import { useState } from 'react';
import { Calculator, Loader2, AlertCircle, LogIn, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { aiSmartCalculate, isError, CalculatorResult } from '@/lib/ai-client';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export default function AISmartCalculator() {
  const { isAuthenticated, login } = useAuth();
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rateLimited, setRateLimited] = useState(false);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const handleCalculate = async () => {
    if (problem.trim().length < 2) return;
    setLoading(true); setError(''); setRateLimited(false); setResult(null);
    const res = await aiSmartCalculate(problem);
    if (isError(res)) {
      if (res.rateLimited) setRateLimited(true);
      setError(res.error);
    } else {
      setResult(res);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-green-500/10">
            <Calculator className="w-6 h-6 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold">AI Smart Calculator</h1>
        </div>
        <p className="text-muted-foreground mb-8 ml-14">
          Solve complex math word problems with step-by-step explanations.
        </p>

        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-4">
            <textarea
              value={problem}
              onChange={e => setProblem(e.target.value)}
              placeholder="e.g. If a train travels 60mph for 2 hours, then 80mph for 3 hours, what is the average speed?"
              rows={3}
              className="w-full px-5 py-4 rounded-xl border border-input bg-card text-base focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none shadow-sm font-medium"
            />
            
            <button
              onClick={handleCalculate}
              disabled={loading || problem.trim().length < 2}
              className={cn(
                'flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all md:self-end md:w-48',
                loading || problem.trim().length < 2
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'gradient-bg text-white shadow-brand hover:shadow-brand-lg btn-glow'
              )}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Solving...</> : <><Calculator className="w-4 h-4" /> Solve Problem</>}
            </button>
          </div>

          <div className={cn('mt-4 flex-1 rounded-2xl border p-6 min-h-[300px]', result ? 'bg-card border-border shadow-md' : 'bg-muted/20 border-dashed border-border/50 flex flex-col items-center justify-center')}>
              {!result && !loading && !error && (
                <div className="text-center text-muted-foreground">
                  <Calculator className="w-12 h-12 opacity-20 mx-auto mb-3" />
                  <p>Awaiting a problem to solve...</p>
                </div>
              )}
              {loading && <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />}
              {error && (
                <div className="flex flex-col items-center justify-center gap-3">
                  <AlertCircle className="w-7 h-7 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
              {result && (
                <div className="animate-in fade-in duration-500">
                  <div className="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 p-6 rounded-xl mb-8">
                    <h2 className="text-xs uppercase tracking-wider font-bold mb-1 opacity-70">Final Answer</h2>
                    <p className="text-2xl font-bold">{result.finalAnswer}</p>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-4">Step-by-step Solution</h3>
                  <div className="space-y-4">
                    {result.stepByStep.map((step, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold mt-0.5">
                          {i + 1}
                        </div>
                        <p className="text-muted-foreground leading-relaxed flex-1">{step}</p>
                      </div>
                    ))}
                  </div>

                  {result.formulaUsed && (
                    <div className="mt-8 pt-6 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Formula applied:</span> 
                      <code className="px-2 py-1 bg-muted rounded font-mono text-foreground">{result.formulaUsed}</code>
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
