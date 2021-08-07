require('dotenv').config();

const { CLIENT_ID, CLIENT_SECRET, MONGO_PASS, SECRET, PORT, YOUTUBE_API } = process.env;

module.exports = {
  CLIENT_ID,
  CLIENT_SECRET,
  MONGO_PASS,
  SECRET,
  PORT,
  YOUTUBE_API,
};
