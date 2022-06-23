import React, { useEffect, useRef, useState } from 'react';
import './_color_picker_gradient.scss';
import classNames from 'classnames';
import { rgbaToAHex, rgbaToArray } from 'hex-and-rgba';
import PropTypes from 'prop-types';
import { useDebounce } from 'use-debounce';
import InputRgba from '../../InputRgba';

import { hexAlphaToRgba, parseGradient } from './helper';

import GradientPicker from '../GradientPanel';

const GradientColorPicker = ({ value, onChange }) => {
  const node = useRef();

  const initValue = parseGradient(value);

  const [gpickr, setGpickr] = useState();
  const [angle, setAngle] = useState(parseGradient(value).modifier);
  const [mode, setMode] = useState(parseGradient(value).type);
  const [activeColor, setActiveColor] = useState({
    hex: '#fffff',
    alpha: 100,
  });

  const [color, setColor] = useState(parseGradient(value));
  const [debounceColor] = useDebounce(color, 300);
  useEffect(() => {
    if (debounceColor.gradient && initValue.gradient && debounceColor.gradient !== initValue.gradient) {
      onChange(debounceColor.gradient);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceColor]);

  useEffect(() => {
    setColor({
      ...color,
      ...parseGradient(value),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onChangeInputs = (value) => {
    gpickr._setPickrColor(hexAlphaToRgba(value));

    const stops = gpickr.getStops().map((item) => [item.color, item.location]);

    setColor({
      ...color,
      gradient: gpickr.getGradient(),
      stops,
    });
  };

  const onGradientChange = (gpickr) => {
    const rgbaArray = rgbaToArray(gpickr._focusedStop.color);
    setActiveColor({
      hex: rgbaToAHex(rgbaArray[0], rgbaArray[1], rgbaArray[2]),
      alpha: parseInt(rgbaArray[3] * 100, 10),
    });

    const stops = gpickr.getStops().map((item) => [item.color, item.location]);

    setColor({
      ...color,
      stops,
      gradient: gpickr.getGradient(),
    });
  };

  return (
    <div ref={node} className={classNames('editor__elements-colorpicker-gradient')}>
      <div className="editor__elements-colorpicker-gradient-inputs">
        <InputRgba
          hex={activeColor.hex}
          alpha={activeColor.alpha}
          onChange={(value) => onChangeInputs(value)}
          onSubmitChange={false}
        />
      </div>
      <GradientPicker
        onChange={onGradientChange}
        stops={color.stops}
        angle={angle}
        setAngle={setAngle}
        mode={mode}
        setMode={setMode}
        cssString={value}
        gpickr={gpickr}
        setGpickr={setGpickr}
      />
    </div>
  );
};

GradientColorPicker.defaultProps = {
  value: 'transparent',
};

GradientColorPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default GradientColorPicker;
