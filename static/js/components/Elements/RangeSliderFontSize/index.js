/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import './_rangeslider.scss';
import Slider from 'react-rangeslider';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { getSliderValue, pressEnter } from './helper';
import {useSelector} from 'react-redux';

const RangeSliderRem = ({
  min, max, step, value, base, input, onChange, units,
}) => {
  const { options } = useSelector((state) => state.fonts);
  const getStartValue = () => {
    if (value) {
      return parseInt(value, 10);
    }

    if (base && base !== 'body' && options.hasOwnProperty(base)) {
      const rem = parseFloat(options[base].size);
      const body = parseInt(options.body.size, 10);
      const headerSize = parseInt(rem * body, 10);
      return headerSize
    }
    return parseInt(options.body.size, 10)
  }


  const [sliderValue, setSliderValue] = useState(0);
  const inputNode = useRef(null);

  useEffect(() => {
    const parseValue = getStartValue();
    setSliderValue(parseValue)
  }, [value])

  const onChangeSliderCompleteValue = () => {
    onChange(`${sliderValue}${units.trim() ? units : ''}`);
  };

  const onChangeProps = (e) => {
    const { value } = e.target;
    const valueToNumber = parseInt(value, 10);
    const validValue = getSliderValue(valueToNumber, min, max);
    setSliderValue(validValue);
    onChange(`${validValue}${units.trim() ? units : ''}`);
    inputNode.current.element.blur();
    inputNode.current.element.value = `${validValue}${units.trim() ? ` ${units}` : ''}`;
  };

  return (
    <div
      className={classNames('editor__elements-range_slider', {
        'editor__elements-range_slider-margin': input,
      })}
    >
      <div
        className={classNames('editor__elements-range_slider-slider', {
          'editor__elements-range_slider-column': input,
        })}
      >
        <Slider
          value={sliderValue}
          min={min}
          max={78}
          step={step}
          tooltip
          orientation="horizontal"
          onChangeComplete={(e) => onChangeSliderCompleteValue(e)}
          onChange={(e) => setSliderValue(e)}
        />
        {input ? (
          <div className={classNames('editor__elements-range_slider-input')}>
            <IMaskInput
              value={`${sliderValue}`}
              ref={inputNode}
              mask={[
                { mask: '' },
                {
                  mask: `num ${units}`,
                  lazy: false,
                  blocks: {
                    num: {
                      mask: Number,
                      signed: false,
                      scale: '0',
                      radix: '.',
                      mapToRadix: [''],
                    },
                  },
                },
              ]}
              onKeyPress={(e) => pressEnter(e, onChangeProps)}
              onBlur={(e) => onChangeProps(e)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

RangeSliderRem.defaultProps = {
  value: 1,
  min: 0,
  max: 100,
  step: 1,
  units: 'px',
  base: 'body'
};

RangeSliderRem.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  units: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  input: PropTypes.bool,
  base: PropTypes.string,
};

export default RangeSliderRem;
