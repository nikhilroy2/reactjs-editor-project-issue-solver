import React from 'react';
import PropTypes from 'prop-types';
import Youtube from './Youtube';
import Vimeo from './Vimeo';

const Frames = ({ url, poster, type }) => {
  switch (type) {
    case 'youtube':
      return <Youtube poster={poster} url={url} />;
    case 'vimeo':
      return <Vimeo poster={poster} url={url} />;
    default:
      return null;
  }
};

Frames.propTypes = {
  url: PropTypes.string,
  poster: PropTypes.string,
  type: PropTypes.string,
};

export default Frames;
