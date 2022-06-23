import React from 'react';
import './_video-empty.scss';
import { ReactComponent as VideoEmptyIcon } from '../../../../assets/img/video_empty.svg';

const VideoEmpty = () => (
  <div className="video-frame" style={{ background: 'inherit' }}>
    <div className="editor__video-empty">
      <VideoEmptyIcon />
    </div>
  </div>
);

export default VideoEmpty;
