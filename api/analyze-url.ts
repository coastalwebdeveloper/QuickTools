import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Remove script, style, and other non-content tags
    const cleanText = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = cleanText.split(/\n\n+/).filter(p => p.trim().length > 0);

    // Extract headings
    const h1 = (html.match(/<h1[^>]*>.*?<\/h1>/gi) || []).length;
    const h2 = (html.match(/<h2[^>]*>.*?<\/h2>/gi) || []).length;
    const h3 = (html.match(/<h3[^>]*>.*?<\/h3>/gi) || []).length;

    const stats = {
      words: words.length,
      characters: cleanText.length,
      charactersNoSpaces: cleanText.replace(/\s/g, '').length,
      paragraphs: paragraphs.length,
      sentences: sentences.length,
      headings: { h1, h2, h3 },
      readingTime: Math.ceil(words.length / 200)
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch or analyze URL' });
  }
}
