const generateScript = require("./modules/generateScript");
const synthesizeSpeech = require("./modules/textToSpeech");
const generateImages = require("./modules/generateImages");
const createNarratorAnimation = require("./modules/createNarratorAnimation");
const getMusicPathForMood = require("./modules/getBackgroundMusic");
const createFinalVideo = require("./modules/editVideo");
const uploadToYouTube = require("./modules/uploadToYouTube");

(async () => {
  const topic = "The Rise of Cambodian Superhero Flux Dev";
  const script = await generateScript(topic);
  await synthesizeSpeech(script, "assets/audio/narration.mp3");
  await generateImages(script, "assets/images");
  await createNarratorAnimation("assets/audio/narration.mp3", "assets/video/narrator.mp4");
  const musicPath = getMusicPathForMood("dramatic");

  const imagePaths = ["assets/images/image1.png", "assets/images/image2.png"];
  await createFinalVideo(imagePaths, "assets/audio/narration.mp3", musicPath, "assets/video/final.mp4");

  const title = `Exploring: ${topic}`;
  const description = `A cinematic journey into the legend of Flux Dev.\n\n#Superhero #Cambodia #Fantasy`;
  const keywords = ["superhero", "Cambodia", "Flux Dev", "mythology"];

  await uploadToYouTube(title, description, keywords, "assets/video/final.mp4");
})();
