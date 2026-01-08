const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");

const client = new textToSpeech.TextToSpeechClient();

async function synthesizeSpeech(text, outputPath) {
  const request = {
    input: { text },
    voice: { languageCode: "en-US", ssmlGender: "Male" },
    audioConfig: { audioEncoding: "mp3" },
  };
  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(outputPath, response.audioContent, "binary");
  console.log("Audio content written to file:", outputPath);
}

module.exports = synthesizeSpeech;
