/* eslint-disable */
import React from 'react';
import Frame from '../Frame';

const Vimeo = ({ poster, url }) => {
  return (
    <Frame poster={poster}>
      <iframe
        src={url}
        width='100%'
        height='100%'
        frameBorder='0'
        allow='autoplay; fullscreen'
        allowFullScreen
        webkitAllowFullScreen
        mozallowfullscreen
      />
    </Frame>
  );
};

export default Vimeo;
