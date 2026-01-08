const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

async function generateScript(topic) {
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: `Write a YouTube video script about: ${topic}` }],
  });
  return response.data.choices[0].message.content;
}

module.exports = generateScript;
