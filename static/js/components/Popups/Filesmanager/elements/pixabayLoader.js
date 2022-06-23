import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ReactComponent as IconComplete } from '../../../../assets/img/files_manager/complete.svg';
import { ReactComponent as IconFailed } from '../../../../assets/img/files_manager/failed.svg';
import Spinner from '../../../../assets/img/back-copy-12@3x.png';

const PixabayLoader = ({
  pending, complete, failed, loader,
}) => (
  <div className={classnames('editor__image-wrapper-preview-loader', {
    failed, complete, pending, loading: loader,
  })}
  >
    {failed
                && (
                <>
                  <IconFailed className="complete-loading-icon" />
                  <span className="load-status-text">Failed</span>
                </>
                )}
    {pending
                && (
                <>
                  <img src={Spinner} alt="loader" className="loader-icon pixabay" />
                  <span className="load-status-text">Uploading...</span>
                </>
                )}
    {loader
                && (
                <>
                  <img src={Spinner} alt="loader" className="loader-icon pixabay" />
                  <span className="load-status-text">Loading...</span>
                </>
                )}
    {complete
                && (
                <>
                  <IconComplete className="complete-loading-icon" />
                  <span className="load-status-text">Complete</span>
                </>
                )}
  </div>
);

PixabayLoader.propTypes = {
  pending: PropTypes.bool,
  complete: PropTypes.bool,
  failed: PropTypes.bool,
  loader: PropTypes.bool,
};

export default PixabayLoader
