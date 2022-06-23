import * as fontsTypes from '../types/fonts';

/**
 * @function
 * @name fontsListGet
 * @category Redux Actions
 */
export const fontsListGet = () => ({
  type: fontsTypes.FONTS_LIST_GET,
  payload: null,
});

/**
 * @function
 * @name fontsListGetSuccess
 * @category Redux Actions
 * @param  {object} data - Список Google fonts
 */
export const fontsListGetSuccess = (data) => ({
  type: fontsTypes.FONTS_LIST_GET_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name fontsListGetError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const fontsListGetError = (data) => ({
  type: fontsTypes.FONTS_LIST_GET_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name fontsActiveGet
 * @category Redux Actions
 */
export const fontsActiveGet = () => ({
  type: fontsTypes.FONTS_ACTIVE_GET,
  payload: null,
});

/**
 * @function
 * @name fontsActiveGetSuccess
 * @category Redux Actions
 * @param  {object} data - Добавленный font
 */
export const fontsActiveGetSuccess = (data) => ({
  type: fontsTypes.FONTS_ACTIVE_GET_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name fontsActiveGetError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const fontsActiveGetError = (data) => ({
  type: fontsTypes.FONTS_ACTIVE_GET_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name uploadFont
 * @category Redux Actions
 * @param  {number} id - ID фонта
 */
export const uploadFont = (id) => ({
  type: fontsTypes.ADD_FONT,
  payload: {
    id,
  },
});

/**
 * @function
 * @name uploadFontSuccess
 * @category Redux Actions
 * @param  {number} id - ID фонта
 * @param  {string} success - Состояние
 */
export const uploadFontSuccess = (id, success) => ({
  type: fontsTypes.ADD_FONT_SUCCESS,
  payload: {
    id,
    success,
  },
});

/**
 * @function
 * @name uploadFontError
 * @category Redux Actions
 * @param  {object} error - Ошибка
 */
export const uploadFontError = (error) => ({
  type: fontsTypes.ADD_FONT_ERROR,
  error,
});

/**
 * @function
 * @name removeFont
 * @category Redux Actions
 * @param  {number} id - ID фонта
 */
export const removeFont = (id) => ({
  type: fontsTypes.REMOVE_FONT,
  id,
});

/**
 * @function
 * @name removeFontSuccess
 * @category Redux Actions
 * @param  {number} id - ID фонта
 */
export const removeFontSuccess = (id) => ({
  type: fontsTypes.REMOVE_FONT_SUCCESS,
  payload: {
    id,
  },
});

/**
 * @function
 * @name removeFontError
 * @category Redux Actions
 * @param  {object} error - ID фонта
 */
export const removeFontError = (error) => ({
  type: fontsTypes.REMOVE_FONT_ERROR,
  error,
});

/**
 * @function
 * @name fontsReset
 * @category Redux Actions
 * @param  {number} component_code - code компонента paragraph
 */
export const fontsReset = (component_code) => ({
  type: fontsTypes.FONTS_RESET,
  payload: {
    component_code,
  },
});

/**
 * @function
 * @name fontsResetSuccess
 * @category Redux Actions
 * @param  {object} data - Новые fonts и components
 */
export const fontsResetSuccess = (data) => ({
  type: fontsTypes.FONTS_RESET_SUCCESS,
  payload: {
    ...data,
  },
});

/**
 * @function
 * @name fontsResetError
 * @category Redux Actions
 * @param  {object} error - Ошибка
 */
export const fontsResetError = (error) => ({
  type: fontsTypes.FONTS_RESET_ERROR,
  error,
});

/**
 * @function
 * @name fontsUpdatePair
 * @category Redux Actions
 * @param  {object} pair - шрифтовая пара
 */
export const fontsUpdatePair = (pair) => ({
  type: fontsTypes.FONTS_UPDATE_PAIR,
  payload: {
    pair,
  },
});

/**
 * @function
 * @name fontsUpdatePairSuccess
 * @category Redux Actions
 * @param  {object} options - Новые options
 */
export const fontsUpdatePairSuccess = (options) => ({
  type: fontsTypes.FONTS_UPDATE_PAIR_SUCCESS,
  payload: {
    options,
  },
});

/**
 * @function
 * @name fontsUpdatePairError
 * @category Redux Actions
 * @param  {object} error - Ошибка
 */
export const fontsUpdatePairError = (error) => ({
  type: fontsTypes.FONTS_UPDATE_PAIR_ERROR,
  error,
});

/**
 * @function
 * @name fontsChangeGroupOptions
 * @category Redux Actions
 * @param  {string} group - Группа
 * @param  {object} data - data fonts
 */
export const fontsChangeGroupOptions = (group, data) => ({
  type: fontsTypes.FONTS_CHANGE_GROUP_OPTION,
  payload: {
    group,
    data,
  },
});

/**
 * @function
 * @name fontsChangeGroupOptionsError
 * @category Redux Actions
 * @param  {object} error - Ошибка
 */
export const fontsChangeGroupOptionsError = (error) => ({
  type: fontsTypes.FONTS_CHANGE_GROUP_OPTION_ERROR,
  error,
});
