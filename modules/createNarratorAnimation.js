const ffmpeg = require("fluent-ffmpeg");

async function createNarratorAnimation(audioPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input("assets/narrator.mp4")
      .input(audioPath)
      .complexFilter(["[1:a]amix=inputs=1[aout]"])
      .outputOptions("-map 0:v", "-map [aout]")
      .save(outputPath)
      .on("end", resolve)
      .on("error", reject);
  });
}

module.exports = createNarratorAnimation;
