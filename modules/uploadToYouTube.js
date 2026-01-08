const { google } = require("googleapis");
require("dotenv").config();

async function uploadToYouTube(title, description, keywords, videoPath) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  await youtube.videos.insert({
    part: "snippet,status",
    requestBody: {
      snippet: {
        title,
        description,
        tags: keywords,
      },
      status: {
        privacyStatus: "public",
      },
    },
    media: {
      body: fs.createReadStream(videoPath),
    },
  });

  console.log("Uploaded to YouTube");
}

module.exports = uploadToYouTube;
