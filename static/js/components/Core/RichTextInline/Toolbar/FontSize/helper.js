import { HEADERS_FONT } from '../../config';
import store from '../../../../../store';

export const getDefaultFontSize = (activeObj) => {
  const state = store.getState();
  const { options } = state.fonts;

  if (activeObj.HEADER) {
    if (HEADERS_FONT.hasOwnProperty(activeObj.HEADER) && options.hasOwnProperty(HEADERS_FONT[activeObj.HEADER]) && options.hasOwnProperty('body')) {
      const fontHeader = options[HEADERS_FONT[activeObj.HEADER]];
      const fontBody = options.body;
      const baseSize = parseInt(fontBody.size, 10);
      const headerSize = parseFloat(fontHeader.size);
      return parseInt(baseSize * headerSize, 10);
    }
  }

  if (options.hasOwnProperty('body')) {
    return options.body.size;
  }

  return 14;
};
