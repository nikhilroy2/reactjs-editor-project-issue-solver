import * as stylesTypes from '../types/styles';

const initialState = {
  data: [],
  isLoading: false,
  isFetchingId: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case stylesTypes.STYLES_LIST_GET_SUCCESS:
      return {
        ...state,
        isLoading: true,
        data: payload.data,
      };
    case stylesTypes.STYLES_ACTIVATE_STYLE:
      return {
        ...state,
        isFetchingId: payload.id,
      };
    case stylesTypes.STYLES_ACTIVATE_STYLE_SUCCESS:
      return {
        ...state,
        isFetchingId: false,
        data: state.data.map((style) => {
          const oldActiveID = Number(style.id);
          const newActiveID = Number(payload.id);
          style.active = oldActiveID === newActiveID;
          return style;
        }),
      };
    case stylesTypes.STYLES_ACTIVATE_STYLE_ERROR:
      return {
        ...state,
        isFetchingId: false,
      };
    default:
      return state;
  }
}
