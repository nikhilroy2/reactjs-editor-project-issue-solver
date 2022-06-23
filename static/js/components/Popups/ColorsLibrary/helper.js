import {
  isValidHex, rgbaToArray, isValidRgba, rgbaToAHex,
} from 'hex-and-rgba';
import _ from 'lodash';

const hexToRgba = (hexVal, opacityVal) => {
  const opacity = _.isNaN(opacityVal) ? 100 : opacityVal;
  const hex = hexVal.replace('#', '');
  let r;
  let g;
  let b;

  if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    const rd = hex.substring(0, 1) + hex.substring(0, 1);
    const gd = hex.substring(1, 2) + hex.substring(1, 2);
    const bd = hex.substring(2, 3) + hex.substring(2, 3);
    r = parseInt(rd, 16);
    g = parseInt(gd, 16);
    b = parseInt(bd, 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getHexColor = (value) => {
  let defaultColor = 'ffffff';

  if (value) {
    if (value !== 'transparent') {
      if (isValidHex(value)) {
        defaultColor = value.substring(1);
        return defaultColor;
      }
      const rgba = rgbaToArray(value);

      if (rgba) {
        if (isValidRgba(rgba[0], rgba[1], rgba[2])) {
          defaultColor = rgbaToAHex(rgba[0], rgba[1], rgba[2]).substring(1);
        }
      }
    }
  }

  return defaultColor;
};

export const getColorType = (value) => {
  if (value) {
    if (value === 'transparent') {
      return 'transparent';
    }
    if (isValidHex(value)) {
      return 'hex';
    }
    const rgba = rgbaToArray(value);

    if (rgba) {
      if (isValidRgba(rgba[0], rgba[1], rgba[2])) {
        return 'rgba';
      }
    }
  }

  return 'gradient';
};

export const getBoxShadowPin = (color, colorType, hex) => {
  if (colorType === 'hex' || colorType === 'rgba') {
    if (hex !== 'transparent' && hex !== 'ffffff') {
      return `#${hex}33`;
    }
  }
  return '#dddddd33';
};

export const baseColors = [
  {
    value: 'transparent',
  },
  {
    value: '#ffffff',
  },
  {
    value: '#000000',
  },
];

export const onlyLatins = (string) => {
  if (string && string.substring(0, 1) === '#') string = string.substring(1);
  return string ? string.substr(0, 6).replace(/[^a-zA-Z0-9\s-]/gi, '') : '';
};

export const handlePressEnter = (e, fn) => {
  if (e.key === 'Enter') {
    fn();
  }
};

export const hexAlphaToRgba = (picker) => {
  if (picker) {
    if (isValidHex(`${picker.hex}`)) {
      const rgba = hexToRgba(picker.hex, picker.alpha);

      if (rgba) {
        return rgba;
      }
    }
  }

  return false;
};
