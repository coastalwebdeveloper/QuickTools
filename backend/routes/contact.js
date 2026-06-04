import { Router } from 'express';
import supabase from '../config/supabase.js';

const router = Router();

// ── POST /api/contact ──────────────────────────────────────────────────────────

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: 'A valid name is required (min 2 characters).' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  if (!message || message.trim().length < 10) {
    return res.status(400).json({ error: 'Message is required (min 10 characters).' });
  }

  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || null,
        message: message.trim(),
        user_ip: req.headers['x-forwarded-for']?.split(',')[0].trim() || req.ip || 'unknown',
        status: 'unread',
      });

    if (error) {
      console.error('[contact] Supabase insert error:', error.message);
      return res.status(500).json({ error: 'Failed to send message. Please try again.' });
    }

    res.json({
      success: true,
      message: "Thanks for reaching out! We'll get back to you within 24-48 hours.",
    });
  } catch (err) {
    console.error('[contact]', err);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

export default router;
