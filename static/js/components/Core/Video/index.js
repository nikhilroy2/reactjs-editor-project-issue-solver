import React from 'react';
import PropTypes from 'prop-types';
import VideoEmpty from './Empty';
import { getSourceValue } from '../../../utils/SourceValue';
import Frames from './Frames';
import { validLink, getImagePoster } from './helper';

const Video = ({ domElement, dataID }) => {
  const { url, type, poster } = domElement.video;

  const getUrl = url ? getSourceValue(url.source, dataID) : false;
  const getType = type ? getSourceValue(type.source, dataID) : false;
  const getPoster = poster ? getSourceValue(poster.source, dataID) : false;

  const isUrl = !!(getUrl && getUrl !== 'not found');
  const isType = !!(getType && getType !== 'not found');
  const isPoster = !!(getPoster && getPoster !== 'not found');
  const posterUrl = isPoster ? getImagePoster(getPoster) : false;

  if (isUrl && isType) {
    const isValidLink = validLink(getUrl, getType);
    if (isValidLink) {
      return <Frames video={domElement.video} url={isValidLink} type={getType} poster={posterUrl} />;
    }
  }

  return <VideoEmpty />;
};

Video.propTypes = {
  domElement: PropTypes.object,
  dataID: PropTypes.number,
};

export default Video;
