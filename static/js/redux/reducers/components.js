import * as actionTypes from '../types/components';

const initialState = {
  isLoading: false,
  data: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.COMPONENTS_DATA_SET_DEFAULT:
      if (state.data[payload.code]) {
        return {
          ...state,
          data: {
            ...state.data,
            [payload.code]: {
              ...state.data[payload.code],
              isFetching: true,
            },
          },
        }
      }
      return state;
    case actionTypes.COMPONENTS_DATA_SET_DEFAULT_ERROR:
      if (state.data[payload.code]) {
        return {
          ...state,
          data: {
            ...state.data,
            [payload.code]: {
              ...state.data[payload.code],
              isFetching: false,
            },
          },
        }
      }
      return state;
    case actionTypes.COMPONENTS_DATA_SET_DEFAULT_SUCCESS:
      if (state.data[payload.code]) {
        return {
          ...state,
          data: {
            ...state.data,
            [payload.code]: {
              ...state.data[payload.code],
              isFetching: false,
              data: payload.data,
            },
          },
        }
      }
      return state;
    case actionTypes.COMPONENTS_LIST_GET_SUCCESS:
      return {
        ...state,
        isLoading: true,
        data: payload.data,
      };
    case actionTypes.COMPONENTS_CHANGE_DATA:
      if (!payload.key) {
        return {
          ...state,
          data: {
            ...state.data,
            [payload.code]: {
              ...state.data[payload.code],
              data: payload.value,
            },
          },
        };
      }
      return {
        ...state,
        data: {
          ...state.data,
          [payload.code]: {
            ...state.data[payload.code],
            data: {
              ...state.data[payload.code].data,
              [payload.key]: payload.value,
            },
          },
        },
      };

    default:
      return state;
  }
}
