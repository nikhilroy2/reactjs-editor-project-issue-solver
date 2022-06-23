import React, { useMemo } from 'react';
import './_font_weight.scss';
import PropTypes from 'prop-types';
import className from 'classnames';
import { useSelector } from 'react-redux';
import Select from '../Select';
import { getFontWeightCurrentFont, getFontWeightValue } from './helper';

const FontWeight = ({
  theme, value, onChange,
}) => {
  const fonts = useSelector((state) => state.fonts);
  const fontWeightOptions = useMemo(() => getFontWeightCurrentFont(fonts), [fonts])
  const fontWeightValue = useMemo(() => getFontWeightValue(fontWeightOptions, value), [fontWeightOptions, value])

  const onChangeSelect = (selectValue) => {
    if (selectValue.value !== value) {
      onChange(selectValue);
    }
  }

  return (
    <div
      className={className('editor__elements-select', {
        'editor__elements-select-dark': theme === 'dark',
      })}
    >
      <Select
        placeholder="Choose weight"
        value={fontWeightValue}
        onChange={onChangeSelect}
        options={fontWeightOptions}
      />
    </div>
  );
};

FontWeight.defaultProps = {
  theme: 'white',
};

FontWeight.propTypes = {
  value: PropTypes.any.isRequired,
  theme: PropTypes.string,
  onChange: PropTypes.func,
};

export default FontWeight;
