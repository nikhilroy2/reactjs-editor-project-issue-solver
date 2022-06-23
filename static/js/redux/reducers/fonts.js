import _ from 'lodash';
import * as fontsTypes from '../types/fonts';

const initialState = {
  isLoading: false,
  isLoadingSidebar: false,
  fontsData: [],
  activeFonts: [
    {
      font_id: 12,
      locked: false,
    },
    {
      font_id: 10,
      locked: false,
    },
  ],
  fonts_pairs: [
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 163,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 163,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 130,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 120,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 10,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 20,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 40,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 41,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 35,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 30,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 42,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 43,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 45,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 46,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 47,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 48,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 78,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 102,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 103,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 104,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 106,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 105,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 42,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 43,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 45,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 46,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 47,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 48,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 78,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 102,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 153,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 152,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
    {
      body: {
        set_id: 2,
        group: 'body',
        font_id: 151,
        weight: '400',
        size: 10,
        unit: 'px',
      },
      headers: {
        set_id: 2,
        group: 'headers',
        font_id: 150,
        weight: '400',
        size: 10,
        unit: 'px',
      },
    },
  ],
  options: {
    body: {
      set_id: 1,
      group: 'body',
      font_id: 163,
      weight: '400',
      style: 'normal',
      size: 10,
      unit: 'px',
    },
    h1: {
      set_id: 2,
      group: 'headers',
      font_id: 163,
      weight: '400',
      style: 'normal',
      size: 2,
      unit: 'rem',
    },
    h2: {
      set_id: 3,
      group: 'headers',
      font_id: 163,
      style: 'normal',
      weight: '400',
      size: 1.8,
      unit: 'rem',
    },
    h3: {
      set_id: 3,
      group: 'headers',
      font_id: 163,
      weight: '400',
      size: 1.2,
      style: 'normal',
      unit: 'rem',
    },
  },
  error: false,
  success: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case fontsTypes.FONTS_LIST_GET_SUCCESS:
      return {
        ...state,
        fontsData: payload.data,
      };
    case fontsTypes.FONTS_ACTIVE_GET_SUCCESS:
      return {
        ...state,
        activeFonts: payload.data.active_fonts,
        fonts_pairs: payload.data.fonts_pairs,
        options: payload.data.options,
      };
    case fontsTypes.ADD_FONT:
      return {
        ...state,
        isLoading: true,
      };
    case fontsTypes.ADD_FONT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: payload.success,
      };
    case fontsTypes.ADD_FONT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case fontsTypes.REMOVE_FONT_SUCCESS:
      const { id } = payload;
      const newActive = state.activeFonts.filter((item) => item.font_id !== id)
      return {
        ...state,
        isLoading: false,
        activeFonts: newActive,
      };
    case fontsTypes.REMOVE_FONT_ERROR:
      return {
        ...state,
        error: true,
      };
    case fontsTypes.FONTS_CHANGE_GROUP_OPTION:
      return {
        ...state,
        options: (() => {
          const options = _.cloneDeep(state.options);
          for (const key in options) {
            if (options[key]) {
              if (options[key].group === payload.group && _.isObject(payload.data)) {
                options[key] = {
                  ...options[key],
                  ...payload.data,
                }
              }
            }
          }
          return options;
        })(),
      };
    case fontsTypes.FONTS_RESET:
    case fontsTypes.FONTS_UPDATE_PAIR:
      return {
        ...state,
        isLoadingSidebar: true,
      };
    case fontsTypes.FONTS_UPDATE_PAIR_SUCCESS:
      return {
        ...state,
        options: payload.options,
        isLoadingSidebar: false,
      };
    case fontsTypes.FONTS_RESET_ERROR:
      return {
        ...state,
        isLoadingSidebar: false,
      };
    case fontsTypes.FONTS_RESET_SUCCESS:
      return {
        ...state,
        options: payload.options,
        isLoadingSidebar: false,
      };
    default:
      return state;
  }
}
