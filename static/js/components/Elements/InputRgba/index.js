import React, { useEffect, useState } from 'react';
import './_input_rgba.scss';
import PropTypes from 'prop-types';

import {
  getAlphaValue, inputsData, handlePressEnter, hexAlphaToRgba, getPercentLabelPosition,
} from './helpers';

const InputRgba = ({
  hex, alpha, onChange, onSubmitChange,
}) => {
  const [color, setColor] = useState({
    alpha,
    hex,
  });

  const onChangeAlpha = (alpha) => {
    const validAlpha = getAlphaValue(alpha);

    setColor({
      ...color,
      alpha: validAlpha,
    });
  };

  const onChangeHex = (hex) => {
    setColor({
      ...color,
      hex,
    });
  };

  const onHandleSubmit = () => {
    const rgba = hexAlphaToRgba({
      hex: color.hex[0] === '#' ? color.hex : `#${color.hex}`,
      alpha: Number(color.alpha),
    });

    if (rgba && (color.alpha !== alpha || color.hex !== hex)) {
      onChange({
        hex: color.hex[0] === '#' ? color.hex : `#${color.hex}`,
        alpha: Number(color.alpha),
      });
      if (onSubmitChange) {
        onSubmitChange(rgba);
      }
    } else {
      setColor({
        hex,
        alpha,
      });
      onChange({
        hex,
        alpha,
      });
    }
  };

  useEffect(() => {
    setColor({
      hex,
      alpha,
    });
  }, [hex, alpha]);

  const inputsProps = {
    alphaValue: color.alpha,
    hexValue: color.hex.replace(/#/i, ''),
    onChangeAlpha,
    onChangeHex,
  };

  return (
    <div className="editor__elements-input_rgba">
      <div className="editor__elements-input_rgba-wrap">
        {inputsData(inputsProps).map((item, index) => {
          const {
            wrapClass, labelSymbol, idInput, valueInput, labelText, labelClass, onChangeInput, name,
          } = item;
          return (
            <div className={wrapClass} key={index}>
              {labelSymbol && (
                <label htmlFor="rgba-hex" className="editor__elements-input_rgba-hex-label">
                  #
                </label>
              )}
              {name === 'alpha' && (
                <label
                  htmlFor="rgba-alpha"
                  style={{ right: getPercentLabelPosition(valueInput) }}
                  className="editor__elements-input_rgba-alpha-label"
                >
                  %
                </label>
              )}
              <input
                type="text"
                id={idInput}
                value={valueInput}
                onChange={(e) => onChangeInput(e)}
                onBlur={onHandleSubmit}
                onKeyPress={(e) => handlePressEnter(e, onHandleSubmit)}
              />
              <div className={labelClass}>{labelText}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

InputRgba.defaultProps = {
  hex: '#ffffff',
  alpha: 100,
};

InputRgba.propTypes = {
  hex: PropTypes.string,
  alpha: PropTypes.number,
  onSubmitChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onChange: PropTypes.func,
};

export default InputRgba;
