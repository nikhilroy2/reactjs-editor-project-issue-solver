/* eslint-disable */
import * as colorsTypes from '../types/colors';

const initialState = {
  isLoading: false,
  data: [],
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case colorsTypes.COLORS_LIST_GET_SUCCESS:
      return {
        ...state,
        isLoading: true,
        data: payload.data,
      };
    case colorsTypes.COLORS_ADD:
      return {
        ...state,
        data: [
          {
            id: 0,
            type: payload.type,
            value: payload.value,
          },
          ...state.data,
        ],
      };
    case colorsTypes.COLORS_ADD_SUCCESS:
      return {
        ...state,
        data: state.data.map((color) => {
          const id = Number(color.id);
          const newID = Number(payload.data.id);
          if (id === 0) {
            color.id = newID;
          }
          return color;
        }),
      };
    case colorsTypes.COLORS_DELETE:
      return {
        ...state,
        data: state.data.map((color) => {
          const id = Number(color.id);
          const deleteID = Number(payload.color_id);
          if (id === deleteID) {
            color.deleteLoader = true;
          }
          return color;
        }),
      };
    case colorsTypes.COLORS_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter((color) => {
          const id = Number(color.id);
          const deleteID = Number(payload.color_id);
          if (id !== deleteID) {
            return color;
          }
        }),
      };
    case colorsTypes.COLORS_DELETE_ERROR:
      return {
        ...state,
        data: state.data.map((color) => {
          if (color.deleteLoader) {
            delete color.deleteLoader;
          }
          return color;
        }),
      };
    case colorsTypes.COLORS_UPDATE:
      return {
        ...state,
        data: state.data.map((color) => {
          const id = Number(color.id);
          const updateID = Number(payload.color_id);
          if (id === updateID) {
            return {
              ...color,
              type: payload.type,
              value: payload.value,
            };
          }
          return color;
        }),
      };
    default:
      return state;
  }
}
