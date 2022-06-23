import * as sidebarTypes from '../types/sidebar';

const initialState = {
  isLoading: false,
  data: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case sidebarTypes.SIDEBAR_CHANGE:
      return {
        ...state,
        data: payload.value,
      };
    default:
      return state;
  }
}
