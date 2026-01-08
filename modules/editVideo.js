const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

async function createFinalVideo(images, narration, music, outputPath) {
  const command = ffmpeg();

  images.forEach(img => command.input(img));

  command
    .input(music)
    .input(narration)
    .complexFilter([
      "concat=n=" + images.length + ":v=1:a=0 [v]",
      "[1:a][2:a]amix=inputs=2:duration=first[a]"
    ])
    .outputOptions("-map [v]", "-map [a]")
    .output(outputPath)
    .on("end", () => console.log("Video created at", outputPath))
    .on("error", err => console.error("Error:", err))
    .run();
}

module.exports = createFinalVideo;
