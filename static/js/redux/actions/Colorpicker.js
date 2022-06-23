import * as actionTypes from '../types/colorpicker';

/**
 * @function
 * @name openColorPicker
 * @category Redux Actions
 */
export const openColorPicker = () => ({
  type: actionTypes.OPEN_COLORPICKER,
});

/**
 * @function
 * @name openColorPicker
 * @category Redux Actions
 */
export const closeColorPicker = () => ({
  type: actionTypes.CLOSE_COLORPICKER,
});
