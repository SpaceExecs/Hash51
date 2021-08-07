/* eslint-disable no-console */

const axios = require('axios');

const getImagesFromNasa = (query) => {
  const options = {
    url: `https://images-api.nasa.gov/search?q=${query}&media_type=image`,
    headers: {
      'User-Agent': 'request',
    },
  };

  return axios(options)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};

const nasaIdCall = (nasaId) => {
  const options = {
    url: `https://images-api.nasa.gov/asset/${nasaId}`,
    headers: {
      'User-Agent': 'request',
    },
  };

  return axios(options)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};

module.exports.getImagesFromNasa = getImagesFromNasa;
module.exports.nasaIdCall = nasaIdCall;
