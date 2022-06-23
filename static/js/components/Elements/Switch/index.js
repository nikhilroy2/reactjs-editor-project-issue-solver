import React from 'react';
import './_switch.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Switch = ({ value, onChange, disabled }) => (
  <label
    className={classNames('editor__elements-switch', {
      disabled,
    })}
  >
    <input type="checkbox" onChange={() => onChange(!value)} checked={value} disabled={disabled} />
    <span className="editor__elements-switch-slider editor__elements-switch-slider-rounded" />
  </label>
);

Switch.propTypes = {
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Switch.defaultProps = {
  value: false,
  disabled: false,
};

export default Switch;
