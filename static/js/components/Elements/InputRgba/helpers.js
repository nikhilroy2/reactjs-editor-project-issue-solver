import { isValidHex } from 'hex-and-rgba';
import _ from 'lodash';

export const validateHex = (hex) => {
  if (hex && hex.length) {
    const validHEX = hex.replace('#', '');
    return validHEX;
  }

  return false;
};

export const getAlphaValue = (value) => {
  value.replace(/%/i, '');
  if (value[0] === '0' && value.length > 1) {
    return value.substr(1);
  } if (value >= 100) {
    return 100;
  } if (!_.isNaN(value)) {
    return value || 0;
  }
  return parseInt(value, 10);
};

export const getHexValue = (color) => {
  const baseColor = 'ffffff';
  if (!color || typeof color !== 'string') return baseColor;

  if (color.substring(0, 1) === '#') color = color.substring(1);

  switch (color.length) {
    // case 3: if (/^[0-9A-F]{3}$/i.test(color)) return color; break;
    case 6:
      if (/^[0-9A-F]{6}$/i.test(color)) return color;
      break;
    // case 8: if (/^[0-9A-F]{8}$/i.test(color)) return color; break;
    default:
      return baseColor;
  }

  return baseColor;
};

export const onlyDigits = (string) => (string ? string.substr(0, 3).replace(/[^\d]/g, '') : '');

export const onlyLatins = (string) => {
  if (string && string.substring(0, 1) === '#') string = string.substring(1);
  return string ? string.substr(0, 6).replace(/[^a-zA-Z0-9\s-]/gi, '') : '';
};

export const handlePressEnter = (e, fn) => {
  if (e.key === 'Enter') {
    fn();
  }
};

// DATA FOR INPUTS
export const inputsData = (props) => [
  {
    wrapClass: 'editor__elements-input_rgba-hex',
    labelSymbol: true,
    idInput: 'rgba-hex',
    valueInput: props.hexValue,
    labelText: 'Hex',
    labelClass: 'editor__elements-input_rgba-label',
    onChangeInput: (e) => props.onChangeHex(onlyLatins(e.target.value)),
    name: 'hex',
  },
  {
    wrapClass: 'editor__elements-input_rgba-alpha',
    labelSymbol: false,
    idInput: 'rgba-alpha',
    valueInput: props.alphaValue,
    labelText: 'Alpha',
    labelClass: 'editor__elements-input_rgba-label',
    onChangeInput: (e) => props.onChangeAlpha(onlyDigits(e.target.value)),
    name: 'alpha',
  },
];

export const getPercentLabelPosition = (valueInput) => (String(valueInput).length === 1 ? '40px' : String(valueInput).length === 2 ? '32px' : '24px');

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

  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
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

export const getAlphaHex = (value) => {
  if (_.isNumber(value)) {
    let alphaHEX = '';
    for (let i = 1; i >= 0; i -= 0.01) {
      i = Math.round(i * 100) / 100;
      const alpha = Math.round(i * 255);
      const hex = (alpha + 0x10000)
        .toString(16)
        .substr(-2)
        .toUpperCase();
      const perc = Math.round(i * 100);

      if (perc === value) {
        alphaHEX = hex;
        break;
      }
    }

    return alphaHEX;
  }
  return new Error('alpha error');
};
