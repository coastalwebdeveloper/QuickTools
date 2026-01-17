export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; QuickTools/1.0; +https://quicktools.website)'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch URL');
    }
    
    const html = await response.text();
    
    const cleanText = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '')
      .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, '')
      .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&[a-z]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = cleanText.split(/\n\n+/).filter(p => p.trim().length > 0);

    const h1 = (html.match(/<h1[^>]*>.*?<\/h1>/gi) || []).length;
    const h2 = (html.match(/<h2[^>]*>.*?<\/h2>/gi) || []).length;
    const h3 = (html.match(/<h3[^>]*>.*?<\/h3>/gi) || []).length;

    const stats = {
      words: words.length,
      characters: cleanText.length,
      charactersNoSpaces: cleanText.replace(/\s/g, '').length,
      paragraphs: Math.max(paragraphs.length, sentences.length / 3),
      sentences: sentences.length,
      headings: { h1, h2, h3 },
      readingTime: Math.ceil(words.length / 200)
    };

    res.setHeader('Cache-Control', 's-maxage=3600');
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze URL. Make sure the URL is accessible.' });
  }
}
