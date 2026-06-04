import { useState } from 'react';
import { Wallet, Loader2, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { aiBudgetPlan, isError, BudgetResult } from '@/lib/ai-client';
import { cn } from '@/lib/utils';

export default function AIBudgetPlanner() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<BudgetResult | null>(null);

  const handlePlan = async () => {
    if (!income || !expenses) return;
    setLoading(true); setError(''); setResult(null);
    const res = await aiBudgetPlan(income, expenses, goal);
    if (isError(res)) {
      setError(res.error);
    } else {
      setResult(res);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-purple-500/10">
            <Wallet className="w-6 h-6 text-purple-500" />
          </div>
          <h1 className="text-3xl font-bold">AI Budget Planner</h1>
        </div>
        <p className="text-muted-foreground mb-8 ml-14">
          Organize your finances and achieve savings goals instantly.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-5">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Monthly Income</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={income}
                  onChange={e => setIncome(e.target.value)}
                  placeholder="e.g. $4,000"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-card text-sm focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1.5 block">Current Expenses</label>
              <textarea
                value={expenses}
                onChange={e => setExpenses(e.target.value)}
                placeholder="e.g. Rent $1200, Groceries $400, Car $300, Gym $50..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-input bg-card text-sm focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Financial Goal (Optional)</label>
              <input
                type="text"
                value={goal}
                onChange={e => setGoal(e.target.value)}
                placeholder="e.g. Save $5000 for a vacation"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-card text-sm focus:ring-2 focus:ring-primary/40"
              />
            </div>
            
            <button
              onClick={handlePlan}
              disabled={loading || !income || !expenses}
              className={cn(
                'flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all',
                loading || !income || !expenses
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'gradient-bg text-white shadow-brand hover:shadow-brand-lg btn-glow'
              )}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</> : <><Wallet className="w-4 h-4" /> Create Budget Plan</>}
            </button>
          </div>

          <div className={cn('flex-1 rounded-2xl border p-6 min-h-[400px]', result ? 'bg-card border-border shadow-md' : 'bg-muted/20 border-dashed border-border/50')}>
              {!result && !loading && !error && (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <Wallet className="w-12 h-12 opacity-20 mx-auto mb-4" />
                  <p>Your personalized budget plan will appear here</p>
                </div>
              )}
              {loading && <div className="h-full flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}
              {error && (
                <div className="h-full flex flex-col items-center justify-center gap-3">
                  <AlertCircle className="w-7 h-7 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
              {result && (
                <div className="animate-in fade-in duration-500">
                  <div className="bg-primary/5 p-4 rounded-xl mb-6">
                    <p className="text-sm font-medium text-primary leading-relaxed">{result.summary}</p>
                  </div>
                  
                  <h3 className="font-semibold mb-4 text-lg">Recommended Allocations</h3>
                  <div className="space-y-3 mb-8">
                    {result.allocations.map((a, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg bg-background">
                        <span className="font-medium text-sm">{a.category}</span>
                        <div className="text-right">
                          <div className="font-bold text-sm">${a.amount}</div>
                          <div className="text-xs text-muted-foreground">{a.percentage}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 mb-6">
                    <TrendingUp className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-400">Savings Projection</h4>
                      <p className="text-sm text-green-700 dark:text-green-300/80 mt-1">{result.savingsProjection}</p>
                    </div>
                  </div>

                  <h3 className="font-semibold mb-3 text-lg">Tips</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    {result.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
