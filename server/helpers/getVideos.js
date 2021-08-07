const axios = require('axios');

require('dotenv').config();

const youTubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 1,
    embeddable: true,
    key: process.env.YOUTUBE_API,
  },
});

const videoEvidenceSearch = (searchTerm) => youTubeApi
  .get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      q: `${searchTerm} conspiracies`,
    },
  })
  .then((data) => data)
  .catch((err) => err);

module.exports = { videoEvidenceSearch };
