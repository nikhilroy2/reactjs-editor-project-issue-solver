import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import UploadedContainer from './Body';
import Dropzone from './Dropzone';
import Preloader from '../elements/Preloader';

const Uploaded = ({
  onImageSelection, onChangeTab,
}) => {
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPreloader(false);
    }, 1000);
  }, []);

  return (
    <div className="editor__filesmanager-upload-wrapper">
      {preloader ? (
        <div className="editor__filesmanager-wrapper">
          <Preloader />
        </div>
      ) : (
        <>
          <UploadedContainer onImageSelection={onImageSelection} onChangeTab={onChangeTab} />
          <Dropzone />
        </>
      )}
    </div>
  );
};

Uploaded.propTypes = {
  onImageSelection: PropTypes.func,
  onChangeTab: PropTypes.func,
};

export default Uploaded;
