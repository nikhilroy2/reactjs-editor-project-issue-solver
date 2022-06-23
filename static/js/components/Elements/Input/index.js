import React from 'react';
import './_input.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Input = ({
  value, onChange, disabled, height, paddingLeft, placeholder, className, bg, newRef, error, name, onKeyUp,
}) => (
  <div
    className={classNames('editor__elements-input', {
      'editor__elements-input-grey': bg === 'grey',
      'editor__elements-input-disabled': disabled,
      'editor__elements-input-error': error,
    })}
  >
    <input
      type="text"
      ref={newRef}
      className={className}
      style={{ height, paddingLeft, minHeight: height }}
      value={value}
      placeholder={placeholder}
      onKeyUp={onKeyUp}
      onChange={onChange}
      disabled={disabled}
      name={name}
    />
    {error ? <div className="editor__elements-input-error-message">{error}</div> : null}
  </div>
);

Input.defaultProps = {
  value: '',
  height: 40,
  placeholder: '',
  className: '',
  bg: false,
  disabled: false,
  name: null,
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]),
  height: PropTypes.number,
  name: PropTypes.string,
  paddingLeft: PropTypes.number,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  bg: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  newRef: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  error: PropTypes.bool,
};

export default Input;
