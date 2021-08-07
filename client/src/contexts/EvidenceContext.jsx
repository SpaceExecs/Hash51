/* eslint-disable func-style */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const EvidenceContext = createContext();
function EvidenceContextProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [bodyText, setBodyText] = useState('');
  const [href, setHref] = useState('');
  // eslint-disable-next-line camelcase
  const [nasa_id, setNasa_id] = useState('');
  const [nasaTitle, setNasaTitle] = useState('');
  const [userTitle, setUserTitle] = useState('');
  const [keyWords, setKeywords] = useState([]);
  const [videoDescription, setVideoDescription] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handlePostBody = (event) => setBodyText(event.target.value);
  const handlePostTitle = (event) => setUserTitle(event.target.value);

  const fetchSearch = async (query) => {
    await axios.all([
      axios.post('/routes/search', { query }),
      axios.post('/routes/searchVideos', { query }),
    ])
      .then(axios.spread((data1, data2) => {
        setSearchResults([...data1.data, ...data2.data]);
      }));
  };

  const fetchImage = async (query) => {
    if (query.slice(0, 4) === 'http') {
      await setHref(query);
    } else {
      await axios.post('/routes/asset', { query })
        .then((results) => {
          setHref(results.data.items[0].href);
        });
    }
  };

  const postStory = async (username) => {
    const story = {
      href, nasaTitle, nasa_id, keyWords, userTitle, bodyText, userName: username, comments: [] };
    await axios.post('/routes/story', { story });
  };

  const evidenceProps = {
    searchResults,
    fetchSearch,
    fetchImage,
    postStory,
    bodyText,
    setBodyText,
    handlePostBody,
    href,
    setHref,
    nasa_id,
    setNasa_id,
    nasaTitle,
    setNasaTitle,
    keyWords,
    setKeywords,
    handlePostTitle,
    userTitle,
    setUserTitle,
    videoDescription,
    setVideoDescription,
    videoId,
    setVideoId,
    videoThumbnail,
    setVideoThumbnail,
    videoTitle,
    setVideoTitle,
    videoUrl,
    setVideoUrl,
  };

  return (
    <EvidenceContext.Provider value={evidenceProps}>
      {children}
    </EvidenceContext.Provider>
  );
}

EvidenceContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { EvidenceContext, EvidenceContextProvider };
