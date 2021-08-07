const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: String,
  channelTitle: String,
  description: String,
  video: String,
  thumbnail: String,
});

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
