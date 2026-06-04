import { useState } from 'react';
import { ChefHat, Loader2, AlertCircle, LogIn, Check, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { aiRecipeGenerate, isError, RecipeResult } from '@/lib/ai-client';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export default function AIRecipeGenerator() {
  const { isAuthenticated, login } = useAuth();
  const [ingredients, setIngredients] = useState('');
  const [dietary, setDietary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rateLimited, setRateLimited] = useState(false);
  const [recipe, setRecipe] = useState<RecipeResult | null>(null);

  const handleGenerate = async () => {
    if (ingredients.trim().length < 3) return;
    setLoading(true); setError(''); setRateLimited(false); setRecipe(null);
    const res = await aiRecipeGenerate(ingredients, dietary);
    if (isError(res)) {
      if (res.rateLimited) setRateLimited(true);
      setError(res.error);
    } else {
      setRecipe(res);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-red-500/10">
            <ChefHat className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold">AI Recipe Generator</h1>
        </div>
        <p className="text-muted-foreground mb-8 ml-14">
          Enter what's in your fridge and get a delicious recipe instantly.
          {!isAuthenticated && <span className="text-primary font-medium"> Guests get 5 free uses/day.</span>}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Ingredients</label>
              <textarea
                value={ingredients}
                onChange={e => setIngredients(e.target.value)}
                placeholder="e.g. chicken breast, rice, broccoli, garlic..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Dietary Restrictions (Optional)</label>
              <input
                type="text"
                value={dietary}
                onChange={e => setDietary(e.target.value)}
                placeholder="e.g. vegan, gluten-free, low-carb"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={loading || ingredients.trim().length < 3}
              className={cn(
                'flex items-center justify-center gap-2 py-3 mt-2 rounded-xl font-semibold text-sm transition-all',
                loading || ingredients.trim().length < 3
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'gradient-bg text-white shadow-brand hover:shadow-brand-lg btn-glow'
              )}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Cooking...</> : <><ChefHat className="w-4 h-4" /> Generate Recipe</>}
            </button>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col gap-3">
            <div className={cn('flex-1 rounded-xl border p-6', recipe ? 'bg-card border-border' : 'bg-muted/30 border-dashed border-border/50')}>
              {!recipe && !loading && !error && (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground min-h-[300px]">
                  <ChefHat className="w-10 h-10 opacity-30" />
                  <p>Your AI recipe will appear here</p>
                </div>
              )}
              {loading && <div className="h-full min-h-[300px] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}
              {error && (
                <div className="h-full flex flex-col items-center justify-center gap-3 min-h-[300px]">
                  <AlertCircle className="w-7 h-7 text-destructive" />
                  <p className="text-sm text-destructive text-center">{error}</p>
                  {rateLimited && <button onClick={login} className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-semibold"><LogIn className="w-4 h-4" />Sign in</button>}
                </div>
              )}
              {recipe && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-foreground mb-4">{recipe.recipeName}</h2>
                  
                  <div className="flex gap-4 mb-6 text-sm">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full">
                      <Clock className="w-4 h-4 text-muted-foreground" /> Prep: {recipe.prepTime}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full">
                      <Clock className="w-4 h-4 text-muted-foreground" /> Cook: {recipe.cookTime}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full font-medium">
                      Difficulty: {recipe.difficulty}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Ingredients</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
                      {recipe.ingredientsList.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Instructions</h3>
                    <ol className="list-decimal pl-5 space-y-3 text-sm text-foreground leading-relaxed">
                      {recipe.instructions.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
