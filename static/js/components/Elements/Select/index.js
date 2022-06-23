import './_select.scss';
import React, { useState } from 'react';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Indicator from './components/indicator';

const NewSelect = ({
  isDisabled,
  noOptText,
  options,
  activeValue,
  handleChangeSelect,
  isSearchable,
  maxMenuHeight,
  ...props
}) => {
  const [searchValue, setSearchValue] = useState('');

  const onClearSelect = () => setSearchValue('');

  return (
    <ReactSelect
      components={{
        DropdownIndicator: () => (
          <Indicator value={searchValue} onClearSelect={onClearSelect} style={{ right: '30px' }} />
        ),
        IndicatorSeparator: null,
      }}
      className={classNames('editor__component-select', { disable: isDisabled })}
      classNamePrefix="react-select"
      noOptionsMessage={() => noOptText}
      options={options}
      value={activeValue}
      isSearchable={isSearchable}
      onInputChange={(value) => setSearchValue(value)}
      inputValue={searchValue}
      onChange={handleChangeSelect}
      maxMenuHeight={maxMenuHeight}
      {...props}
    />
  );
};

NewSelect.propTypes = {
  isDisabled: PropTypes.bool,
  noOptText: PropTypes.string,
  options: PropTypes.array,
  activeValue: PropTypes.object,
  handleChangeSelect: PropTypes.func,
  isSearchable: PropTypes.bool,
  maxMenuHeight: PropTypes.number,
};

NewSelect.defaultProps = {
  maxMenuHeight: 360,
};

export default NewSelect;
