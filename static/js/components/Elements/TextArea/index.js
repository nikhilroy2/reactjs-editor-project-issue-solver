import React from 'react';
import './_textarea.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TextArea = ({
  value, onChange, rows, placeholder, className, bg, newRef,
}) => (
  <div
    className={classNames('editor__elements-textarea', {
      'editor__elements-input-textarea': bg === 'grey',
    })}
  >
    <textarea
      rows={rows}
      ref={newRef}
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

TextArea.defaultProps = {
  value: '',
  rows: 5,
  placeholder: '',
  className: '',
  bg: false,
};

TextArea.propTypes = {
  value: PropTypes.string,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  bg: PropTypes.bool,
  newRef: PropTypes.node,
};

export default TextArea;
