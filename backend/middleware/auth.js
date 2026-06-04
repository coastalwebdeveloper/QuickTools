import { SignJWT, jwtVerify } from 'jose';

const getSecret = () => new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-dev-secret-change-this'
);

/**
 * Sign a JWT token (7-day expiry).
 */
export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
}

/**
 * Verify and decode a JWT token.
 */
export async function verifyToken(token) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload;
}

/**
 * Express middleware — requires a valid Bearer JWT.
 * Attaches the decoded payload to req.user.
 * Returns 401 if missing or invalid.
 */
export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized — Bearer token required' });
    }
    const token = header.slice(7);
    req.user = await verifyToken(token);
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized — invalid or expired token' });
  }
}

/**
 * Optional auth middleware — attaches user to req if token present, but never blocks.
 */
export async function optionalAuth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (header?.startsWith('Bearer ')) {
      req.user = await verifyToken(header.slice(7));
    }
  } catch {
    // Ignore invalid tokens — treat as guest
  }
  next();
}
