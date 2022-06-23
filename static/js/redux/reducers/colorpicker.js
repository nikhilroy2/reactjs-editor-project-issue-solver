import * as actionTypes from '../types/colorpicker';

const initialState = {
  isOpenColorPicker: false,
};

const colorPicker = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPEN_COLORPICKER: {
      return {
        isOpenColorPicker: true,
      }
    }
    case actionTypes.CLOSE_COLORPICKER: {
      return {
        isOpenColorPicker: false,
      }
    }
    default: {
      break;
    }
  }
  return state;
};

export default colorPicker;
