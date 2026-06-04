/**
 * ai-client.ts
 * Type-safe wrappers for the QuickTools AI backend endpoints.
 * Automatically injects the auth token when available.
 */

const BASE = '/api/ai';
const TOKEN_KEY = 'qt_auth_token';

function authHeaders(): HeadersInit {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export interface AIError {
  error: string;
  resetAt?: number;
  loginUrl?: string;
  rateLimited?: boolean;
}

export interface RecipeResult {
  success: true;
  recipeName: string;
  ingredientsList: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  difficulty: string;
}

export interface LetterResult {
  success: true;
  letter: string;
}

export interface CalculatorResult {
  success: true;
  finalAnswer: string;
  stepByStep: string[];
  formulaUsed: string | null;
}

export interface BudgetResult {
  success: true;
  summary: string;
  allocations: Array<{ category: string; amount: number; percentage: string }>;
  savingsProjection: string;
  tips: string[];
}

export interface CodeExplainResult {
  success: true;
  explanation: string;
  concepts: string[];
  complexity: string;
  language: string;
}

export interface SEOResult {
  success: true;
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  focusKeyword: string;
  readabilityScore: string;
}

type AIResponse<T> = T | AIError;

async function post<T>(endpoint: string, body: object): Promise<AIResponse<T>> {
  const res = await fetch(`${BASE}/${endpoint}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) {
    return { ...data, rateLimited: res.status === 429 } as AIError;
  }
  return data as T;
}

export const isError = (r: AIResponse<unknown>): r is AIError => 'error' in r;

export const aiRecipeGenerate = (ingredients: string, dietary?: string) =>
  post<RecipeResult>('recipe-generator', { ingredients, dietary });

export const aiLetterWrite = (topic: string, tone?: string, recipient?: string) =>
  post<LetterResult>('letter-writer', { topic, tone, recipient });

export const aiSmartCalculate = (problem: string) =>
  post<CalculatorResult>('smart-calculator', { problem });

export const aiBudgetPlan = (income: string, expenses: string, goal?: string) =>
  post<BudgetResult>('budget-planner', { income, expenses, goal });

export const aiCodeExplain = (code: string, language?: string) =>
  post<CodeExplainResult>('code-explainer', { code, language });

export const aiSEOGenerate = (topic: string, keywords?: string, url?: string) =>
  post<SEOResult>('seo-generator', { topic, keywords, url });
