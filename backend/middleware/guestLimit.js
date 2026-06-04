import rateLimit from 'express-rate-limit';

/**
 * Guest rate limiter for AI endpoints.
 * Limits unauthenticated requests to 5 per day per IP.
 *
 * Usage: apply AFTER optionalAuth so that req.user is already set.
 * Authenticated users skip this limiter entirely.
 */
export function guestAILimit() {
  const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => !!req.user, // Logged-in users bypass the limit
    message: {
      error: 'Daily limit reached. Sign in with Google for unlimited access.',
      loginUrl: '/api/auth/google',
    },
    keyGenerator: (req) =>
      req.headers['x-forwarded-for']?.split(',')[0].trim() ||
      req.ip ||
      'unknown',
  });

  return limiter;
}
