import * as configurationTypes from '../types/configuration';

const initialState = {
  isLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case configurationTypes.CONFIGURATION_LIST_GET_SUCCESS:
      return {
        ...state,
        isLoading: true,
        ...payload.data,
      };
    default:
      return state;
  }
}
