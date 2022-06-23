import React from 'react';
import PropTypes from 'prop-types';

const Frame = ({ children, poster }) => (
  <div className="video-frame">
    <div className="video-frame-overlay" />
    {children}
    {poster ? <div className="video-frame__poster" style={{ backgroundImage: `url(${poster})` }} /> : null}
  </div>
);

Frame.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  poster: PropTypes.string,
};

export default Frame;
