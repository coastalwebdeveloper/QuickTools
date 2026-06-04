/**
 * mongodb-client.ts
 *
 * Type-safe helper functions for calling the QuickTools backend API
 * (Vercel Serverless Functions backed by MongoDB Atlas).
 */

const BASE_URL = '/api';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FeedbackStats {
  toolId: string;
  averageRating: number;
  totalRatings: number;
  ratingBreakdown: Record<1 | 2 | 3 | 4 | 5, number>;
  recentComments: Array<{
    rating: number;
    comment: string;
    createdAt: string;
  }>;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// ─── API Helpers ───────────────────────────────────────────────────────────────

/**
 * Track a tool usage event (fire-and-forget, never throws).
 */
export async function trackToolUsage(toolId: string): Promise<void> {
  try {
    await fetch(`${BASE_URL}/track-usage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toolId }),
    });
  } catch {
    // Non-critical — silently ignore analytics errors
  }
}

/**
 * Submit user feedback for a tool.
 */
export async function submitFeedback(
  toolId: string,
  rating: number,
  comment?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}/submit-feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toolId, rating, comment }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error || 'Failed to submit feedback' };
    }

    return { success: true };
  } catch {
    return { success: false, error: 'Network error. Please try again.' };
  }
}

/**
 * Fetch aggregated feedback stats for a tool.
 */
export async function getToolFeedback(toolId: string): Promise<FeedbackStats | null> {
  try {
    const res = await fetch(`${BASE_URL}/get-feedback?toolId=${encodeURIComponent(toolId)}`);

    if (!res.ok) return null;

    return (await res.json()) as FeedbackStats;
  } catch {
    return null;
  }
}

/**
 * Submit a contact form message.
 */
export async function submitContactMessage(
  payload: ContactPayload
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error || 'Failed to send message' };
    }

    return { success: true, message: data.message };
  } catch {
    return { success: false, error: 'Network error. Please try again.' };
  }
}
