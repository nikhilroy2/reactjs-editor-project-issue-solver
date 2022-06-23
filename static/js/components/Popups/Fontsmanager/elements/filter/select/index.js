import './_select.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const FontsSelect = ({
  options, onChange, value, onBlur,
}) => (
  <Select
    autoFocus
    components={{ DropdownIndicator: null, IndicatorSeparator: null }}
    className="editor__fonts_select"
    classNamePrefix="react-select"
    options={options}
    onChange={onChange}
    value={value}
    onBlur={onBlur}
    isSearchable={false}
    menuIsOpen
  />
)

FontsSelect.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.object,
  onBlur: PropTypes.func,
};

export default FontsSelect
