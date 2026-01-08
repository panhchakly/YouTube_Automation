function getMusicPathForMood(mood) {
    const library = {
      happy: "assets/music/happy.mp3",
      sad: "assets/music/sad.mp3",
      dramatic: "assets/music/drama.mp3",
    };
    return library[mood] || library.happy;
  }
  
  module.exports = getMusicPathForMood;
  