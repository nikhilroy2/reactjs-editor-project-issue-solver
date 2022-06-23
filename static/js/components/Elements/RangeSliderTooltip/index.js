import React, { useEffect, useState, useRef } from 'react';
import './_rangeslider_tooltip.scss';
import Slider from 'react-rangeslider';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import _ from 'lodash';

const RangeSliderTooltip = ({
  min, max, value, step, input, onChange,
}) => {
  const inputNode = useRef(null);

  const [sliderValue, setSliderValue] = useState(Number(value));
  const [inputValue, setInputValue] = useState(value);

  const onChangeSlider = (value) => {
    setSliderValue(value);
    setInputValue(value);
  };

  const onChangeSliderCompleteValue = () => {
    onChange(`${sliderValue}px`);
  };

  // eslint-disable-next-line
  useEffect(() => () => {
    if (inputNode && inputNode.current && Number(inputNode.current.value) !== Number(inputValue)) {
      if (Number(inputNode.current.value) < min) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        return onChange(`${min}px`);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return onChange(`${inputNode.current.value}px`);
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  const pressEnter = (e, fn) => {
    if (e.key === 'Enter') {
      fn(e);
    }
  };

  const onChangeProps = (e) => {
    const { value } = e.target;
    const valueToNumber = parseFloat(value, 10);

    if (_.isNaN(valueToNumber)) {
      setSliderValue(Number(min));
      setInputValue(Number(min));
      onChange(`${Number(min)}px`);
      inputNode.current.blur();
      return;
    }

    if (value < min) {
      setSliderValue(min);
      setInputValue(min);
      onChange(`${min}px`);
      inputNode.current.blur();
      return;
    }

    setSliderValue(valueToNumber);
    setInputValue(valueToNumber);
    onChange(`${valueToNumber}px`);
    inputNode.current.blur();
  };

  const onChangeInputNumber = (value) => {
    if (value > max) {
      return setInputValue(max);
    }

    if (value.trim() === '') {
      return setInputValue(0);
    }

    if (value.trim().length > 1 && value[0] === '0') {
      return setInputValue(value.substring(1));
    }

    return setInputValue(value);
  };

  const onlyDigits = (string) => (string ? string.substr(0, String(max).length).replace(/[^\d]/g, '') : '');

  // eslint-disable-next-line
  const onlyDigitsWithDots = (string) => (string ? string.substr(0, String(max).length + 1).replace(/[^\d\.]/g, '') : '');

  return (
    <div className={classNames('editor__elements-range_slider-tooltip')}>
      <div
        className={classNames('editor__elements-range_slider-tooltip-slider', {
          'editor__elements-range_slider-tooltip-column': input,
        })}
      >
        <Slider
          value={Number(sliderValue)}
          min={min}
          max={max}
          step={step}
          tooltip
          orientation="horizontal"
          onChangeComplete={(e) => onChangeSliderCompleteValue(e)}
          onChange={(e) => onChangeSlider(step === 0.1 ? e.toFixed(1) : e)}
        />
        {input ? (
          <div className="editor__elements-range_slider-tooltip-input">
            <input
              type="text"
              value={inputValue}
              ref={inputNode}
              onChange={(e) => (step === 0.1
                ? onChangeInputNumber(onlyDigitsWithDots(e.target.value))
                : onChangeInputNumber(onlyDigits(e.target.value)))}
              onKeyPress={(e) => pressEnter(e, onChangeProps)}
              onBlur={(e) => onChangeProps(e)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

RangeSliderTooltip.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
};

RangeSliderTooltip.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  input: PropTypes.bool,
};

export default RangeSliderTooltip;
