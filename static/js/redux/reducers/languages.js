import * as languagesTypes from '../types/languages';

const initialState = {
  isLoading: false,
  popupAddLanguage: null,
  popupTranslations: null,
  mode: null,
  data: [],
  languages: [],
  translations: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case languagesTypes.LANGUAGES_ALL_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        languages: payload.data,
      };
    case languagesTypes.LANGUAGES_LIST_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload.data,
      };
    case languagesTypes.LANGUAGES_TRANSLATIONS_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        translations: payload.data,
      };
    case languagesTypes.LANGUAGES_SAVE_TRANSLATIONS:
    case languagesTypes.LANGUAGES_RESET_TRANSLATIONS:
    case languagesTypes.LANGUAGES_MAKE_DEFAULT:
    case languagesTypes.LANGUAGES_DELETE_LANGUAGE:
      return {
        ...state,
        popupTranslations: {
          ...state.popupTranslations,
          isLoading: true,
        },
      };
    case languagesTypes.LANGUAGES_SAVE_TRANSLATIONS_ERROR:
    case languagesTypes.LANGUAGES_RESET_TRANSLATIONS_ERROR:
    case languagesTypes.LANGUAGES_MAKE_DEFAULT_ERROR:
    case languagesTypes.LANGUAGES_DELETE_LANGUAGE_ERROR:
      return {
        ...state,
        popupTranslations: {
          ...state.popupTranslations,
          isLoading: false,
        },
      };
    case languagesTypes.LANGUAGES_SORTABLE:
    case languagesTypes.LANGUAGES_ACTIVATE:
      return {
        ...state,
        isLoading: true,
        popupTranslations: null,
      };
    case languagesTypes.LANGUAGES_ACTIVATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload.data,
      };
    case languagesTypes.LANGUAGES_SORTABLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload.data,
      };
    case languagesTypes.LANGUAGES_SORTABLE_ERROR:
    case languagesTypes.LANGUAGES_ACTIVATE_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case languagesTypes.LANGUAGES_RESET_TRANSLATIONS_SUCCESS:
      return {
        ...state,
        popupTranslations: {
          ...state.popupTranslations,
          isLoading: false,
          translations: payload.data,
        },
      };
    case languagesTypes.LANGUAGES_MAKE_DEFAULT_SUCCESS:
      return {
        ...state,
        popupTranslations: null,
        data: payload.data,
      };
    case languagesTypes.LANGUAGES_POPUP_OPEN_ADD_LANGUAGE:
      return {
        ...state,
        popupAddLanguage: {
          isLoading: false,
        },
      };
    case languagesTypes.LANGUAGES_ADD_LANGUAGE:
      return {
        ...state,
        popupAddLanguage: {
          ...state.popupAddLanguage,
          isLoading: true,
        },
      };
    case languagesTypes.LANGUAGES_ADD_LANGUAGE_ERROR:
      return {
        ...state,
        popupAddLanguage: {
          ...state.popupAddLanguage,
          isLoading: false,
        },
      };
    case languagesTypes.LANGUAGES_ADD_LANGUAGE_SUCCESS:
      return {
        ...state,
        popupAddLanguage: null,
        data: [
          ...state.data,
          payload.data,
        ],
      };
    case languagesTypes.LANGUAGES_DELETE_LANGUAGE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        popupTranslations: null,
        data: state.data.filter((language) => language.code !== payload.code),
      };
    }
    case languagesTypes.LANGUAGES_POPUP_OPEN_TRANSLATIONS_LIST:
      return {
        ...state,
        popupTranslations: {
          ...state.popupTranslations,
          isLoading: false,
          ...payload.data,
        },
      };
    case languagesTypes.LANGUAGES_POPUP_CLOSE_ADD_LANGUAGE:
      return {
        ...state,
        popupAddLanguage: null,
      };
    case languagesTypes.LANGUAGES_POPUP_CLOSE_TRANSLATIONS_LIST:
      return {
        ...state,
        popupTranslations: null,
      };
    case languagesTypes.LANGUAGES_TRANSLATION_MODE:
      return {
        ...state,
        mode: payload.mode,
      }
    case languagesTypes.LANGUAGES_SAVE_TRANSLATIONS_SUCCESS:
      return {
        ...state,
        popupTranslations: {
          ...state.popupTranslations,
          translations: payload.data,
          isLoading: false,
        },
        data: state.data.map((language) => {
          if (language.code === payload.code) {
            return {
              ...language,
              translations: payload.data,
            }
          }
          return { ...language };
        }),
      }
    case languagesTypes.LANGUAGES_UPDATE_TRANSLATIONS:
      return {
        ...state,
        translations: payload.data,
      };
    default:
      return state;
  }
}
