import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as IconEmptyBackground } from '../../../assets/img/empty_background.svg';
import FilesManager from '../../Popups/Filesmanager';

import Tooltip from '../Tooltip';

const EmptyBackground = ({ onChange }) => {
  const node = useRef(null);
  const [isOpenFilesManager, setOpenFilesManager] = useState(false);

  const onImageSelection = (image) => {
    const { id } = image;

    if (id) {
      onChange({
        id,
        type: 'filesmanager',
      });
    }
  };

  return (
    <div className="">
      <Tooltip text="Open media">
        <div className="editor__elements-background-empty" onClick={() => setOpenFilesManager(true)}>
          <div className="editor__elements-background-empty-container">
            <div className="editor__elements-background-empty-container-icon">
              <IconEmptyBackground />
            </div>
            <div className="editor__elements-background-empty-container-title">Open media</div>
          </div>
        </div>
      </Tooltip>
      {isOpenFilesManager ? (
        <FilesManager
          parentNode={node}
          onClose={() => setOpenFilesManager(false)}
          onImageSelection={onImageSelection}
        />
      ) : null}
    </div>
  );
};

EmptyBackground.propTypes = {
  onChange: PropTypes.func,
};

export default EmptyBackground;
