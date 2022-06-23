import * as stylesTypes from '../types/styles';

/**
 * @function
 * @name stylesListGet
 * @category Redux Actions
 */
export const stylesListGet = () => ({
  type: stylesTypes.STYLES_LIST_GET,
  payload: null,
});

/**
 * @function
 * @name stylesListGetSuccess
 * @category Redux Actions
 * @param  {object} data - Список стилей
 */
export const stylesListGetSuccess = (data) => ({
  type: stylesTypes.STYLES_LIST_GET_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name stylesListGetError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const stylesListGetError = (data) => ({
  type: stylesTypes.STYLES_LIST_GET_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name stylesActiveStyle
 * @category Redux Actions
 * @param  {number} id - Стиля
 */
export const stylesActiveStyle = (id) => ({
  type: stylesTypes.STYLES_ACTIVATE_STYLE,
  payload: {
    id,
  },
});

/**
 * @function
 * @name stylesActiveStyleSuccess
 * @category Redux Actions
 * @param  {object} id - Новый активный стиль
 */
export const stylesActiveStyleSuccess = (id) => ({
  type: stylesTypes.STYLES_ACTIVATE_STYLE_SUCCESS,
  payload: {
    id,
  },
});

/**
 * @function
 * @name stylesActiveStyleError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const stylesActiveStyleError = (data) => ({
  type: stylesTypes.STYLES_ACTIVATE_STYLE_ERROR,
  payload: {
    data,
  },
});
