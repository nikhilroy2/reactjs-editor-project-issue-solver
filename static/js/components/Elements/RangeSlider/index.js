import React, { useEffect, useState, useRef } from 'react';
import './_rangeslider.scss';
import Slider from 'react-rangeslider';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { getSliderValue, pressEnter } from './helper';

const RangeSlider = ({
  min, max, step, value, input, onChange, units,
}) => {
  const [sliderValue, setSliderValue] = useState(parseInt(value, 10));
  const [inputValue, setInputValue] = useState(parseInt(value, 10));
  const inputNode = useRef(null);

  useEffect(() => {
    const validValue = getSliderValue(inputValue, min, max);
    const oldValue = parseInt(value, 10);
    if (oldValue !== inputValue) {
      setInputValue((prevState) => {
        if (prevState !== oldValue) {
          onChange(`${validValue}${units.trim() ? units : ''}`);
        }
        return validValue;
      });
      setSliderValue(validValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, min, max]);

  useEffect(() => {
    // setInputValue(parseInt(value, 10))
    setSliderValue(parseInt(value, 10));
  }, [value]);

  const onChangeSliderCompleteValue = () => {
    setInputValue(sliderValue);
  };

  const onChangeProps = (e) => {
    const { value } = e.target;
    const valueToNumber = parseInt(value, 10);
    setSliderValue(valueToNumber);
    setInputValue(valueToNumber);
    inputNode.current.element.blur();
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
          max={max}
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

RangeSlider.defaultProps = {
  value: 1,
  min: 0,
  max: 100,
  step: 1,
  units: 'px',
};

RangeSlider.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  units: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  input: PropTypes.bool,
};

export default RangeSlider;
