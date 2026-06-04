import { Router } from 'express';
import supabase from '../config/supabase.js';
import { requireAuth } from '../middleware/auth.js';
import { chatComplete } from '../lib/githubModels.js';

const router = Router();

export const DAILY_LIMIT = 20;
const today = () => new Date().toISOString().split('T')[0];

// ── Credit helpers ─────────────────────────────────────────────────────────────

async function getUsage(userId) {
  const { data } = await supabase
    .from('ai_usage')
    .select('count')
    .eq('user_id', userId)
    .eq('date', today())
    .maybeSingle();
  return data?.count || 0;
}

async function incrementUsage(userId, currentCount) {
  await supabase.from('ai_usage').upsert(
    { user_id: userId, date: today(), count: currentCount + 1 },
    { onConflict: 'user_id,date' }
  );
}

function getResetAt() {
  const midnight = new Date();
  midnight.setUTCHours(24, 0, 0, 0);
  return midnight.toISOString();
}

// ── Credit check middleware (used per-AI-route, not globally) ──────────────────
async function checkCredits(req, res, next) {
  try {
    const currentCount = await getUsage(req.user.userId);
    if (currentCount >= DAILY_LIMIT) {
      return res.status(429).json({
        error: 'Daily credit limit reached. Your 20 credits reset at midnight.',
        used: currentCount,
        remaining: 0,
        limit: DAILY_LIMIT,
        resetAt: getResetAt(),
      });
    }
    await incrementUsage(req.user.userId, currentCount);
    res.setHeader('X-Credits-Remaining', DAILY_LIMIT - currentCount - 1);
    next();
  } catch (err) {
    console.error('[checkCredits]', err.message);
    next(); // Fail open
  }
}

// All routes require authentication
router.use(requireAuth);

// ── GET /api/ai/credits ────────────────────────────────────────────────────────
// Returns current credit status — does NOT consume a credit

router.get('/credits', async (req, res) => {
  try {
    const used = await getUsage(req.user.userId);
    const remaining = Math.max(0, DAILY_LIMIT - used);
    res.json({
      used,
      remaining,
      limit: DAILY_LIMIT,
      plan: req.user.plan || 'free',
      resetAt: getResetAt(),
    });
  } catch (err) {
    console.error('[ai/credits]', err.message);
    res.status(500).json({ error: 'Failed to fetch credits' });
  }
});

// ── POST /api/ai/recipe-generator ───────────────────────────────────────────────
router.post('/recipe-generator', checkCredits, async (req, res) => {
  const { ingredients, dietary } = req.body;
  if (!ingredients || ingredients.trim().length < 3) return res.status(400).json({ error: 'Ingredients must be at least 3 characters.' });
  if (ingredients.length > 1000) return res.status(400).json({ error: 'Ingredients list too long.' });
  
  const dietPrompt = dietary ? ` Dietary preference/restriction: ${dietary}.` : '';

  try {
    const raw = await chatComplete(
      `You are an expert chef. Create a delicious recipe using the provided ingredients.${dietPrompt}
       Return JSON only:
       {
         "recipeName": "Creative Recipe Name",
         "ingredientsList": ["item 1", "item 2"],
         "instructions": ["step 1", "step 2"],
         "prepTime": "15 mins",
         "cookTime": "30 mins",
         "difficulty": "Easy|Medium|Hard"
       }
       No markdown, no extra text.`,
      `Ingredients:\n\n${ingredients.trim()}`,
      { temperature: 0.7, maxTokens: 800 }
    );
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Invalid response');
    res.json({ success: true, ...JSON.parse(match[0]) });
  } catch (err) {
    console.error('[ai/recipe-generator]', err.message);
    res.status(500).json({ error: 'AI service unavailable. Please try again.' });
  }
});

// ── POST /api/ai/letter-writer ──────────────────────────────────────────────────
router.post('/letter-writer', checkCredits, async (req, res) => {
  const { topic, tone, recipient } = req.body;
  if (!topic || topic.trim().length < 5) return res.status(400).json({ error: 'Topic must be at least 5 characters.' });
  if (topic.length > 2000) return res.status(400).json({ error: 'Topic too long.' });

  try {
    const result = await chatComplete(
      `You are a professional letter writer. Write a letter about the following topic.
       Tone: ${tone || 'Professional'}
       Recipient: ${recipient || 'Whom it may concern'}
       Return ONLY the letter text, formatted nicely with line breaks. No commentary or markdown.`,
      `Topic:\n\n${topic.trim()}`,
      { temperature: 0.8, maxTokens: 1000 }
    );
    res.json({ success: true, letter: result });
  } catch (err) {
    console.error('[ai/letter-writer]', err.message);
    res.status(500).json({ error: 'AI service unavailable. Please try again.' });
  }
});

// ── POST /api/ai/smart-calculator ───────────────────────────────────────────────
router.post('/smart-calculator', checkCredits, async (req, res) => {
  const { problem } = req.body;
  if (!problem || problem.trim().length < 2) return res.status(400).json({ error: 'Problem must be provided.' });
  if (problem.length > 1000) return res.status(400).json({ error: 'Problem description too long.' });

  try {
    const raw = await chatComplete(
      `You are an expert math tutor. Solve the problem and explain it step-by-step.
       Return JSON only:
       {
         "finalAnswer": "The concise final answer",
         "stepByStep": ["step 1", "step 2"],
         "formulaUsed": "formula if applicable, else null"
       }
       No markdown, no extra text.`,
      `Problem:\n\n${problem.trim()}`,
      { temperature: 0.1, maxTokens: 800 }
    );
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Invalid response');
    res.json({ success: true, ...JSON.parse(match[0]) });
  } catch (err) {
    console.error('[ai/smart-calculator]', err.message);
    res.status(500).json({ error: 'AI service unavailable. Please try again.' });
  }
});

// ── POST /api/ai/budget-planner ─────────────────────────────────────────────────
router.post('/budget-planner', checkCredits, async (req, res) => {
  const { income, expenses, goal } = req.body;
  if (!income) return res.status(400).json({ error: 'Monthly income is required.' });
  if (!expenses) return res.status(400).json({ error: 'Expenses description is required.' });

  try {
    const raw = await chatComplete(
      `You are an expert financial advisor. Create a monthly budget plan based on the user's income and expenses.
       Goal: ${goal || 'General savings and good financial health'}
       Return JSON only:
       {
         "summary": "1-2 sentence overview of their financial situation",
         "allocations": [
           { "category": "Housing", "amount": 1000, "percentage": "30%" }
         ],
         "savingsProjection": "Estimated savings per month",
         "tips": ["tip 1", "tip 2", "tip 3"]
       }
       No markdown, no extra text.`,
      `Income: ${income}\nExpenses: ${expenses}`,
      { temperature: 0.4, maxTokens: 1000 }
    );
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Invalid response');
    res.json({ success: true, ...JSON.parse(match[0]) });
  } catch (err) {
    console.error('[ai/budget-planner]', err.message);
    res.status(500).json({ error: 'AI service unavailable. Please try again.' });
  }
});

// ── POST /api/ai/code-explainer ───────────────────────────────────────────────
router.post('/code-explainer', checkCredits, async (req, res) => {
  const { code, language } = req.body;
  if (!code || code.trim().length < 5) return res.status(400).json({ error: 'Code must be at least 5 characters.' });
  if (code.length > 8000) return res.status(400).json({ error: 'Code too long. Maximum 8,000 characters.' });
  try {
    const raw = await chatComplete(
      `You are an expert developer explaining code to beginners.${language ? ` Language: ${language}.` : ''}
       Return JSON only: { "explanation": "...", "concepts": ["..."], "complexity": "Beginner|Intermediate|Advanced", "language": "..." }`,
      `Explain:\n\n${code.trim()}`, { temperature: 0.3, maxTokens: 1200 }
    );
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Invalid response');
    const parsed = JSON.parse(match[0]);
    res.json({ success: true, explanation: parsed.explanation || '', concepts: parsed.concepts || [], complexity: parsed.complexity || 'Unknown', language: parsed.language || language || 'Unknown' });
  } catch (err) {
    console.error('[ai/code-explainer]', err.message);
    res.status(500).json({ error: 'AI service unavailable. Please try again.' });
  }
});

// ── POST /api/ai/seo-generator ────────────────────────────────────────────────
router.post('/seo-generator', checkCredits, async (req, res) => {
  const { topic, keywords, url } = req.body;
  if (!topic || topic.trim().length < 5) return res.status(400).json({ error: 'Topic required (min 5 characters).' });
  if (topic.length > 500) return res.status(400).json({ error: 'Topic too long. Max 500 characters.' });
  const context = [`Topic: ${topic.trim()}`, keywords ? `Keywords: ${keywords.trim()}` : '', url ? `URL: ${url.trim()}` : ''].filter(Boolean).join('\n');
  try {
    const raw = await chatComplete(
      `You are an expert SEO specialist. Return JSON only:
       { "title": "...", "description": "...", "keywords": ["..."], "ogTitle": "...", "ogDescription": "...", "twitterTitle": "...", "twitterDescription": "...", "focusKeyword": "...", "readabilityScore": "Easy|Medium|Hard" }`,
      context, { temperature: 0.6, maxTokens: 800 }
    );
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Invalid response');
    const parsed = JSON.parse(match[0]);
    res.json({ success: true, ...parsed });
  } catch (err) {
    console.error('[ai/seo-generator]', err.message);
    res.status(500).json({ error: 'AI service unavailable. Please try again.' });
  }
});

export default router;
