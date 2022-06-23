import './_select-button.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SelectButton = ({ value, options, onChange }) => (
  <div className="editor__elements-select-button">
    {options.map((item, index) => (
      <div
        key={`cards_row_${index}`}
        onClick={() => onChange(item.value)}
        className={classNames('editor__elements-select-button-item animate-transition-05', {
          'editor__elements-select-button-item-active': value === item.value,
          'editor__elements-select-button-item-no-active': value !== item.value,
        })}
      >
        <span className="animate-transition-05">{item.label}</span>
      </div>
    ))}
  </div>
);

SelectButton.defaultProps = {
  value: 1,
  options: [],
};

SelectButton.propTypes = {
  value: PropTypes.number,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

export default SelectButton;
