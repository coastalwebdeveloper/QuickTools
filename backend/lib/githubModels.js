import OpenAI from 'openai';

/**
 * GitHub Models API client via OpenAI SDK.
 * Docs: https://docs.github.com/en/github-models
 * Available models: gpt-4o-mini, gpt-4o, Phi-3-mini-128k-instruct, Mistral-large
 */
const client = new OpenAI({
  baseURL: 'https://models.inference.ai.azure.com',
  apiKey: process.env.GITHUB_TOKEN,
});

export const DEFAULT_MODEL = 'gpt-4o-mini';

/**
 * Simple chat completion helper.
 * @param {string} systemPrompt
 * @param {string} userMessage
 * @param {{ model?: string, temperature?: number, maxTokens?: number }} options
 * @returns {Promise<string>} The assistant reply
 */
export async function chatComplete(systemPrompt, userMessage, options = {}) {
  const completion = await client.chat.completions.create({
    model: options.model || DEFAULT_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    temperature: options.temperature ?? 0.7,
    max_tokens: options.maxTokens ?? 1500,
  });

  return completion.choices[0]?.message?.content?.trim() || '';
}

export default client;
