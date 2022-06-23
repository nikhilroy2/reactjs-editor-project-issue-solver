import React, { useRef, useState } from 'react';
import './_preview_image.scss';
import PropTypes from 'prop-types';
import { ReactComponent as UPLOAD } from '../../../assets/img/upload.svg';
import Filesmanager from '../../Popups/Filesmanager';

import Tooltip from '../Tooltip';

const PreviewImage = ({ value, onChange }) => {
  const [isOpenFilesmanager, setOpenFilesmanager] = useState(false);
  const node = useRef(null);
  return (
    <div className="editor__elements-preview_image">
      <Tooltip text="Replace image">
        <div
          className="editor__elements-preview_image-container"
          style={{ backgroundImage: `url(${value})` }}
          onClick={() => setOpenFilesmanager(true)}
        >
          <div className="editor__elements-preview_image-upload-label animate-transition-03">
            <UPLOAD />
            {' '}
            Replace image
          </div>
        </div>
      </Tooltip>
      {isOpenFilesmanager ? (
        <Filesmanager rootNode={node} onImageSelection={onChange} onClose={() => setOpenFilesmanager(false)} />
      ) : (
        false
      )}
    </div>
  );
};

PreviewImage.defaultProps = {
  value: 'none',
};

PreviewImage.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default PreviewImage;
