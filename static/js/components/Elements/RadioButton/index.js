import './_radio-button.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const RadioButton = ({
  value, options, align, onChange,
}) => (
  <div className={classNames('editor__elements-rb', {
    'editor__elements-rb-inline': align === 'inline',
    'editor__elements-rb-column': align === 'column',
  })}
  >
    {options.map((item, index) => (
      <div
        className="editor__elements-rb-row"
        key={index}
      >
        <label
          className="editor__elements-rb-container"
        >
          {item.label}
          <input type="radio" checked={value === item.value} name="radio" onChange={() => onChange(item.value)} />
          <span className="checkmark" />
        </label>
      </div>
    ))}
  </div>
)

RadioButton.defaultProps = {
  value: 'val',
  align: 'inline',
  options: [
    {
      label: 'Label',
      value: 'val',
    },
  ],
};

RadioButton.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  align: PropTypes.string,
};

export default RadioButton;
