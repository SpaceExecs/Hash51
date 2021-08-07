const mongoose = require('mongoose');

const EvidenceSchema = new mongoose.Schema({
  bodyText: String,
  userName: String,
  href: String,
  nasa_id: String,
  nasaTitle: String,
  userTitle: String,
  keyWords: Array,
  comments: Array,
  videoTitle: String,
  videoDescription: String,
  videoUrl: String,
  videoThumbnail: String,
  videoId: String,
});

const Evidence = mongoose.model('Evidence', EvidenceSchema);

module.exports = { Evidence, EvidenceSchema };
