const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

async function generateImages(script, folder) {
  const keyScenes = script.match(/(?:Scene|Moment|Part)\s\d+:.*?(?=\n|$)/g) || ["Scene 1: main event"];
  for (let i = 0; i < keyScenes.length; i++) {
    const response = await openai.createImage({ prompt: keyScenes[i], n: 1, size: "1024x1024" });
    const imageUrl = response.data.data[0].url;
    const image = await fetch(imageUrl).then(res => res.arrayBuffer());
    fs.writeFileSync(`${folder}/image${i + 1}.png`, Buffer.from(image));
  }
}

module.exports = generateImages;
