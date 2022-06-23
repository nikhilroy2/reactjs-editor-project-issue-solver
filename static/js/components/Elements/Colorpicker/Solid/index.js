import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './_colorpicker.scss';
import classNames from 'classnames';
import { rgbaToAHex, isValidHex, rgbaToArray } from 'hex-and-rgba';
import { useDebounce } from 'use-debounce';
import ColorPickerPanel from '../ColorPanel';
import { hexAlphaToRgba } from './Methods';
import InputRgba from '../../InputRgba';

const getHexAlpha = (value) => {
  const defaultObject = {
    hex: '#ffffff',
    alpha: 100,
  };

  if (value) {
    if (value === 'transparent') {
      defaultObject.alpha = 0;
    } else if (isValidHex(value)) {
      defaultObject.hex = value;
    } else {
      const rgbaArray = rgbaToArray(value);
      if (rgbaArray) {
        const hex = rgbaToAHex(rgbaArray[0], rgbaArray[1], rgbaArray[2]);
        if (hex) {
          defaultObject.hex = hex;
        }

        if (rgbaArray[3] !== 1) {
          defaultObject.alpha = Math.round(rgbaArray[3] * 100);
        } else {
          defaultObject.alpha = 100;
        }
      }
    }
  }

  return defaultObject;
};

const ColorPickerSolid = ({
  value, onChange, onClose, forText,
}) => {
  const node = useRef();

  const [init, setInit] = useState(true);
  const [color, setColor] = useState(getHexAlpha(value));
  useEffect(() => {
    !forText && setColor(getHexAlpha(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const [debounceColor] = useDebounce(color, 300);
  useEffect(() => {
    if (debounceColor && init === false) {
      const rgba = hexAlphaToRgba(color);
      onChange && onChange(rgba);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceColor]);

  const outSideClick = (e) => {
    if (node.current && !node.current.contains(e.target)) {
      onClose();
      document.removeEventListener('mousedown', outSideClick);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick);

    return () => {
      document.removeEventListener('mousedown', outSideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCompleteChange = (value) => {
    setInit(false);

    setColor((prev) => {
      const isTransparent = prev.hex === '#ffffff' && prev.alpha === 0 && value.alpha === 0;

      return {
        hex: value.color,
        alpha: isTransparent ? 100 : Math.round(value.alpha),
      };
    });
  };

  return (
    <div ref={node} className={classNames('editor__elements-colorpicker')}>
      <ColorPickerPanel color={color.hex} alpha={color.alpha} onChange={(value) => onCompleteChange(value)} />
      <InputRgba hex={color.hex} alpha={color.alpha} onChange={setColor} onSubmitChange={onChange} />
    </div>
  );
};

ColorPickerSolid.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  forText: PropTypes.bool,
};

export default ColorPickerSolid;
