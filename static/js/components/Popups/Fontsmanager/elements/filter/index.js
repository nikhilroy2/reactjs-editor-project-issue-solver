import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './dropdown';
import FontsSelect from './select';

const FontsFilter = ({
  isOpen, toggleOpen, value, options, onChange, onBlur,
}) => (
  <Dropdown
    isOpen={isOpen}
    toggleOpen={toggleOpen}
    value={value}
  >
    <FontsSelect
      value={value}
      options={options}
      onChange={onChange}
      onBlur={onBlur}
    />
  </Dropdown>
)

FontsSelect.defaultProps = {
  options: [{ value: 'All', label: 'All languages' }],
  value: { value: 'all languages", label: "All languages' },
}

FontsFilter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  value: PropTypes.object,
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
}

export default FontsFilter
