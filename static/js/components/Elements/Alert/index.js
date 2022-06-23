import './_alert.scss'
import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ content, type }) => (
  <div className={`editor-alert alert-${type}`} role="alert">
    {content}
  </div>
);

Alert.propTypes = {
  type: PropTypes.string,
  content: PropTypes.string,
};

Alert.defaultProps = {
  type: 'danger',
  content: 'Something went wrong',
};

export default Alert;
