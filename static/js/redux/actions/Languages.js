import * as languagesTypes from '../types/languages';

/**
 * @function
 * @name languagesGetList
 * @category Redux Actions
 */
export const languagesGetList = () => ({
  type: languagesTypes.LANGUAGES_LIST_GET,
  payload: null,
});

/**
 * @function
 * @name languagesGetListSuccess
 * @category Redux Actions
 * @param  {object} data - Список языков
 */
export const languagesGetListSuccess = (data) => ({
  type: languagesTypes.LANGUAGES_LIST_GET_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesGetListError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const languagesGetListError = (data) => ({
  type: languagesTypes.LANGUAGES_LIST_GET_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesAllList
 * @category Redux Actions
 */
export const languagesAllList = () => ({
  type: languagesTypes.LANGUAGES_ALL_LIST,
  payload: null,
});

/**
 * @function
 * @name languagesAllListSuccess
 * @category Redux Actions
 * @param  {object} data - Список всех языков
 */
export const languagesAllListSuccess = (data) => ({
  type: languagesTypes.LANGUAGES_ALL_LIST_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesAllListError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const languagesAllListError = (data) => ({
  type: languagesTypes.LANGUAGES_ALL_LIST_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesTranslationsGet
 * @category Redux Actions
 */
export const languagesTranslationsGet = () => ({
  type: languagesTypes.LANGUAGES_TRANSLATIONS_GET,
  payload: null,
});

/**
 * @function
 * @name languagesTranslationsGetSuccess
 * @category Redux Actions
 * @param  {object} data - Список переводов активного языка
 */
export const languagesTranslationsGetSuccess = (data) => ({
  type: languagesTypes.LANGUAGES_TRANSLATIONS_GET_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesTranslationsGetError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const languagesTranslationsGetError = (data) => ({
  type: languagesTypes.LANGUAGES_TRANSLATIONS_GET_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesPopupOpenAddLanguage
 * @category Redux Actions
 */
export const languagesPopupOpenAddLanguage = () => ({
  type: languagesTypes.LANGUAGES_POPUP_OPEN_ADD_LANGUAGE,
  payload: null,
});

/**
 * @function
 * @name languagesPopupCloseAddLanguage
 * @category Redux Actions
 */
export const languagesPopupCloseAddLanguage = () => ({
  type: languagesTypes.LANGUAGES_POPUP_CLOSE_ADD_LANGUAGE,
  payload: null,
});

/**
 * @function
 * @name languagesPopupOpenTranslationsList
 * @category Redux Actions
 * @param  {object} data - Язык
 */
export const languagesPopupOpenTranslationsList = (data) => ({
  type: languagesTypes.LANGUAGES_POPUP_OPEN_TRANSLATIONS_LIST,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesPopupCloseTranslationsList
 * @category Redux Actions
 */
export const languagesPopupCloseTranslationsList = () => ({
  type: languagesTypes.LANGUAGES_POPUP_CLOSE_TRANSLATIONS_LIST,
  payload: null,
});

/**
 * @function
 * @name languagesSaveTranslations
 * @category Redux Actions
 */
export const languagesSaveTranslations = (code, data) => ({
  type: languagesTypes.LANGUAGES_SAVE_TRANSLATIONS,
  payload: {
    code,
    data,
  },
});

/**
 * @function
 * @name languagesSaveTranslationsSuccess
 * @category Redux Actions
 * @param  {string} code - код языка
 * @param  {object} data - Обновленные переводы
 */
export const languagesSaveTranslationsSuccess = (code, data) => ({
  type: languagesTypes.LANGUAGES_SAVE_TRANSLATIONS_SUCCESS,
  payload: {
    code,
    data,
  },
});

/**
 * @function
 * @name languagesSaveTranslationsError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const languagesSaveTranslationsError = (data) => ({
  type: languagesTypes.LANGUAGES_SAVE_TRANSLATIONS_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesUpdateCurrentTranslation
 * @category Redux Actions
 * @param  {object} data - Переводы для data блоков
 */
export const languagesUpdateCurrentTranslation = (data) => ({
  type: languagesTypes.LANGUAGES_UPDATE_TRANSLATIONS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesResetTranslations
 * @category Redux Actions
 */
export const languagesResetTranslations = (code) => ({
  type: languagesTypes.LANGUAGES_RESET_TRANSLATIONS,
  payload: {
    code,
  },
});

/**
 * @function
 * @name languagesResetTranslationsSuccess
 * @category Redux Actions
 * @param  {object} data - Обновленные переводы
 */
export const languagesResetTranslationsSuccess = (data) => ({
  type: languagesTypes.LANGUAGES_RESET_TRANSLATIONS_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesSaveTranslationsError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const languagesResetTranslationsError = (data) => ({
  type: languagesTypes.LANGUAGES_RESET_TRANSLATIONS_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesMakeDefault
 * @category Redux Actions
 */
export const languagesMakeDefault = (code) => ({
  type: languagesTypes.LANGUAGES_MAKE_DEFAULT,
  payload: {
    code,
  },
});

/**
 * @function
 * @name languagesMakeDefaultSuccess
 * @category Redux Actions
 * @param  {object} data - Обновленный список языков
 */
export const languagesMakeDefaultSuccess = (data) => ({
  type: languagesTypes.LANGUAGES_MAKE_DEFAULT_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesMakeDefaultError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const languagesMakeDefaultError = (data) => ({
  type: languagesTypes.LANGUAGES_MAKE_DEFAULT_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesSortable
 * @category Redux Actions
 * @param  {array} data - Новый листинг
 * @param  {array} positions - Список позиций для бека
 */
export const languagesSortable = (data, positions) => ({
  type: languagesTypes.LANGUAGES_SORTABLE,
  payload: {
    data,
    positions,
  },
});

/**
 * @function
 * @name languagesMakeDefaultSuccess
 * @category Redux Actions
 * @param  {array} data - Обновленный список языков
 */
export const languagesSortableSuccess = (data) => ({
  type: languagesTypes.LANGUAGES_SORTABLE_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesSortableError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const languagesSortableError = (data) => ({
  type: languagesTypes.LANGUAGES_SORTABLE_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesSortable
 * @category Redux Actions
 * @param  {string} code - Код языка
 * @param  {boolean} active - Включить/Выключить язык
 */
export const languagesActivate = (code, active) => ({
  type: languagesTypes.LANGUAGES_ACTIVATE,
  payload: {
    code,
    active,
  },
});

/**
 * @function
 * @name languagesActivateSuccess
 * @category Redux Actions
 * @param  {array} data - Обновленный список языков
 */
export const languagesActivateSuccess = (data) => ({
  type: languagesTypes.LANGUAGES_ACTIVATE_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesActivateError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const languagesActivateError = (data) => ({
  type: languagesTypes.LANGUAGES_ACTIVATE_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesAdd
 * @category Redux Actions
 * @param  {string} code - Код языка
 */
export const languagesAdd = (code) => ({
  type: languagesTypes.LANGUAGES_ADD_LANGUAGE,
  payload: {
    code,
  },
});

/**
 * @function
 * @name languagesAddSuccess
 * @category Redux Actions
 * @param  {array} data - Обновленный список языков
 */
export const languagesAddSuccess = (data) => ({
  type: languagesTypes.LANGUAGES_ADD_LANGUAGE_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesAddError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const languagesAddError = (data) => ({
  type: languagesTypes.LANGUAGES_ADD_LANGUAGE_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name languagesTranslationMode
 * @category Redux Actions
 * @param  {any} mode - код языка
 */
export const languagesTranslationMode = (mode) => ({
  type: languagesTypes.LANGUAGES_TRANSLATION_MODE,
  payload: {
    mode,
  },
});

/**
 * @function
 * @name languagesDelete
 * @category Redux Actions
 * @param  {string} code - Код языка
 */
export const languagesDelete = (code) => ({
  type: languagesTypes.LANGUAGES_DELETE_LANGUAGE,
  payload: {
    code,
  },
});

/**
 * @function
 * @name languagesDeleteSuccess
 * @category Redux Actions
 * @param  {array} data - Обновленный список языков
 */
export const languagesDeleteSuccess = (code) => ({
  type: languagesTypes.LANGUAGES_DELETE_LANGUAGE_SUCCESS,
  payload: {
    code,
  },
});

/**
 * @function
 * @name languagesDeleteError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const languagesDeleteError = (data) => ({
  type: languagesTypes.LANGUAGES_DELETE_LANGUAGE_ERROR,
  payload: {
    data,
  },
});
