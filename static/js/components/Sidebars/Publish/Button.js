import './_publish_buttons.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tooltip from '../../Elements/Tooltip';

import { getIcon } from './helper';

const PublishButton = ({ state, onClick }) => {
  const { error, success, loading } = state;

  return (
    <Tooltip
      text={error ? 'Publish error' : success ? 'Publish success' : 'Publish'}
      type={error ? 'error' : success ? 'success' : ''}
    >
      <div
        className={classNames('editor__publish-button', {
          success,
          error,
        })}
      >
        <div
          className={classNames('editor__publish-button_clicker', {
            success,
            error,
            loading,
          })}
          onClick={onClick}
        >
          {getIcon(state).map((item) => {
            if (item.type) {
              return item.component;
            }
            return null;
          })}
        </div>
      </div>
    </Tooltip>
  );
};

PublishButton.propTypes = {
  onClick: PropTypes.func,
  state: PropTypes.shape({
    error: PropTypes.bool,
    success: PropTypes.bool,
    loading: PropTypes.bool,
  }),
};

export default PublishButton;
