import { OpenRouter } from '@openrouter/sdk';
async function generateScript(topic) {
  // Simulate script generation based on the topic
  const openrouter = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });
  const result = openrouter.callModel({
    model: 'google/gemma-3-27b-it:free',
    input: `Write a YouTube video script about: ${topic}`,
  });
  // Get text (simplest pattern)
  const text = await result.getText();
  return `${text}`;
}

export { generateScript };
