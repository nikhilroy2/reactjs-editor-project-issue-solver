import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import loader from '../../../../../assets/img/loader.png';

import { ReactComponent as IconComplete } from '../../../../../assets/img/files_manager/complete.svg';
import { ReactComponent as IconFailed } from '../../../../../assets/img/files_manager/failed.svg';
import { ReactComponent as IconUploaded } from '../../../../../assets/img/files_manager/uploaded.svg';

const Input = ({
  active, isFetching, error, sizeError, isComplete, dragged, status,
}) => {
  const failedError = error && !sizeError;

  return (
    <div className={classNames('editor__dropzone-input-wrap')}>
      {dragged?.length > 1 ? (
        <>
          <span className="text-active">
            Only one file will be accepted with the image type
            <br />
            Release the button to start to uploading image
          </span>
        </>
      ) : active ? (
        <span className="text-active">Release the button to start to uploading image</span>
      ) : isFetching ? (
        <>
          <img src={loader} alt="loader" className="loader-icon" />
          <span className="text-active">Uploading...</span>
        </>
      ) : status === 'rejected_file_type' ? (
        <>
          <IconFailed className="close-mark-icon" />
          <span className="text-error">
            This file type is not accepted, use image type and
            {' '}
            <span className="bold">please try again</span>
          </span>
        </>
      ) : sizeError ? (
        <>
          <IconFailed className="close-mark-icon" />
          <span className="text-error">
            Uploading failed. The maximum file size 5Mb,
            {' '}
            <span className="bold">please try again</span>
          </span>
        </>
      ) : failedError ? (
        <>
          <IconFailed className="close-mark-icon" />
          <span className="text-error">
            Uploading failed,
            {' '}
            <span className="bold">please try again</span>
          </span>
        </>
      ) : isComplete ? (
        <>
          <IconComplete className="complete-mark-icon" />
          <span className="text-complete">Uploading is complete</span>
        </>
      ) : (
        <>
          <IconUploaded className="editor__dropzone-uploaded-icon" />
          <span>
            <span className="editor__dropzone-input-text">Drag your image here or</span>
            {' '}
            <span className="bold">select from your computer</span>
          </span>
        </>
      )}
    </div>
  );
};

Input.propTypes = {
  active: PropTypes.bool,
  isFetching: PropTypes.bool,
  error: PropTypes.bool,
  sizeError: PropTypes.bool,
  isComplete: PropTypes.bool,
  dragged: PropTypes.array,
  status: PropTypes.string,
}

export default Input;
