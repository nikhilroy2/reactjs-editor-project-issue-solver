/* eslint-disable */
import React from 'react';
import Frame from '../Frame';

const Youtube = ({ poster, url }) => {
  return (
    <Frame poster={poster}>
      <iframe
        src={url}
        frameBorder='0'
        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        className='video-iframe'
      />
    </Frame>
  );
};

export default Youtube;
