import { Router } from 'express';
import supabase from '../config/supabase.js';
import { signToken, requireAuth } from '../middleware/auth.js';

const router = Router();

// ── GET /api/auth/google ───────────────────────────────────────────────────────
// Redirect user to Google OAuth consent screen

router.get('/google', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return res.status(500).json({ error: 'Google OAuth not configured' });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account',
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

// ── GET /api/auth/callback ─────────────────────────────────────────────────────
// Google redirects here after the user approves

router.get('/callback', async (req, res) => {
  const { code, error } = req.query;
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';

  if (error || !code) {
    return res.redirect(`${frontendUrl}/auth/callback?error=access_denied`);
  }

  try {
    // 1. Exchange code for Google access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenRes.ok) {
      console.error('[auth/callback] Token exchange failed:', await tokenRes.text());
      return res.redirect(`${frontendUrl}/auth/callback?error=token_exchange_failed`);
    }

    const { access_token } = await tokenRes.json();

    // 2. Fetch Google user profile
    const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!profileRes.ok) {
      return res.redirect(`${frontendUrl}/auth/callback?error=profile_fetch_failed`);
    }

    const profile = await profileRes.json();
    // profile = { sub, email, name, picture, email_verified }

    // 3. Upsert user in Supabase
    const { data: savedUser, error: dbError } = await supabase
      .from('users')
      .upsert(
        {
          google_id: profile.sub,
          email: profile.email,
          name: profile.name,
          avatar: profile.picture,
          email_verified: profile.email_verified,
          last_login_at: new Date().toISOString(),
        },
        { onConflict: 'google_id' }  // update existing rows on google_id conflict
      )
      .select('id, email, name, avatar, plan')
      .single();

    if (dbError) {
      console.error('[auth/callback] Supabase upsert error:', dbError.message);
      return res.redirect(`${frontendUrl}/auth/callback?error=server_error`);
    }

    // 4. Sign JWT (7-day expiry)
    const token = await signToken({
      userId: savedUser.id,       // Supabase UUID
      googleId: profile.sub,
      email: savedUser.email,
      name: savedUser.name,
      avatar: savedUser.avatar,
      plan: savedUser.plan,
    });

    // 5. Redirect to frontend with token
    return res.redirect(`${frontendUrl}/auth/callback?token=${encodeURIComponent(token)}`);
  } catch (err) {
    console.error('[auth/callback] Unexpected error:', err);
    return res.redirect(`${frontendUrl}/auth/callback?error=server_error`);
  }
});

// ── GET /api/auth/me ───────────────────────────────────────────────────────────
// Returns current user data from Supabase (requires valid Bearer JWT)

router.get('/me', requireAuth, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, avatar, plan, created_at, last_login_at')
      .eq('id', req.user.userId)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      plan: user.plan,
      createdAt: user.created_at,
      lastLoginAt: user.last_login_at,
    });
  } catch (err) {
    console.error('[auth/me]', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// ── POST /api/auth/logout ──────────────────────────────────────────────────────
// Stateless logout — JWT removed client-side

router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out' });
});

export default router;
