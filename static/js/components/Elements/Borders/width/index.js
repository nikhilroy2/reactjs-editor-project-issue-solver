import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RangeSlider from '../../RangeSlider';
import { getBorderWidthSvg } from '../helpers';
import {
  parsedBorder, parsedObj, defaultBorders, getActiveSide, intParsedObj, getResult,
}
  from '../helpers/parser';

const BorderWidth = ({
  first_side, second_side, third_side, fourth_side, onChange,
}) => {
  const propsObj = {
    first_side,
    second_side,
    third_side,
    fourth_side,
  }

  const getActiveSideValue = getActiveSide(intParsedObj(propsObj));
  const [isActive, setActive] = useState(getActiveSideValue);

  const setActiveBorder = (index) => () => {
    setActive(getBorderWidthSvg()[index].id)
  }

  const [borders, setBordersWidth] = useState(
    {
      ...defaultBorders(intParsedObj(propsObj)),
    },
  )

  const getSliderValue = (value) => {
    const width = parsedBorder(parseInt(value, 10), isActive, borders);
    setBordersWidth(width);
    const obj = parsedObj(width);
    onChange(obj);
  }

  const result = getResult(borders, isActive);

  return (
    <div className="editor__border-config-wrapper">
      <div className="editor__border-config-wrapper_borders">
        {getBorderWidthSvg(setActiveBorder).map((item, index) => (
          item.getComponent(index, item.id === isActive)
        ))}
      </div>
      <div className="editor__rangeslider-borders-wrapper">
        <div className="editor__rangeslider-borders-wrapper_label">
          Width
        </div>
        <div className="editor__rangeslider-borders-wrapper_wrap">
          <div className="range-slider-border">
            <RangeSlider
              value={result}
              min={0}
              max={25}
              onChange={getSliderValue}
              input
            />
          </div>
          {/* <div className='editor__rangeslider-borders-wrapper_info'>
            {`${result || 0}px`}
          </div> */}
        </div>
      </div>
    </div>
  )
}

BorderWidth.defaultProps = {
  first_side: '0px',
  second_side: '0px',
  third_side: '0px',
  fourth_side: '0px',
}

BorderWidth.propTypes = {
  onChange: PropTypes.func.isRequired,
  first_side: PropTypes.string,
  second_side: PropTypes.string,
  third_side: PropTypes.string,
  fourth_side: PropTypes.string,
}

export default BorderWidth
