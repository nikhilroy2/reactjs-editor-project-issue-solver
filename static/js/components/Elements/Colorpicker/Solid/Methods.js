import _ from 'lodash';
import { isValidHex } from 'hex-and-rgba';

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

export const hexAlphaToRgba = (picker) => {
  if (picker) {
    const hexAlpha = getAlphaHex(picker.alpha);

    if (isValidHex(`${picker.hex}${hexAlpha}`)) {
      const rgba = hexToRgba(picker.hex, picker.alpha);

      if (rgba) {
        return rgba;
      }
    }
  }

  return false;
};
