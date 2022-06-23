import * as publishTypes from '../types/publish';

const initialState = {
  isLoading: false,
  success: false,
  error: false,
};

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case publishTypes.PUBLISH:
      return {
        ...state,
        isLoading: true,
      };
    case publishTypes.PUBLISH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        success: true,
      };
    case publishTypes.PUBLISH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        success: false,
      };
    case publishTypes.PUBLISH_DEFAULT:
      return {
        ...state,
        isLoading: false,
        error: false,
        success: false,
      };
    default:
      return state;
  }
}
