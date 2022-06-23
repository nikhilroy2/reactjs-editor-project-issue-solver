import * as colorsTypes from '../types/colors';

/**
 * @function
 * @name colorsListGet
 * @category Redux Actions
 */
export const colorsListGet = () => ({
  type: colorsTypes.COLORS_LIST_GET,
  payload: null,
});

/**
 * @function
 * @name colorsListGetSuccess
 * @category Redux Actions
 * @param  {object} data - Список цветов
 */
export const colorsListGetSuccess = (data) => ({
  type: colorsTypes.COLORS_LIST_GET_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name colorsListGetError
 * @category Redux Actions
 * @param  {object} data - ошибка
 */
export const colorsListGetError = (data) => ({
  type: colorsTypes.COLORS_LIST_GET_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name colorsAdd
 * @category Redux Actions
 * @param  {string} type - Тип цвета
 * @param  {string} value - Значение цвета
 */
export const colorsAdd = (type, value) => ({
  type: colorsTypes.COLORS_ADD,
  payload: {
    type,
    value,
  },
});

/**
 * @function
 * @name colorsAddSuccess
 * @category Redux Actions
 * @param  {object} data - Добавленный цвет
 */
export const colorsAddSuccess = (data) => ({
  type: colorsTypes.COLORS_ADD_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name colorsAddError
 * @category Redux Actions
 * @param  {object} data - ошибка
 */
export const colorsAddError = (data) => ({
  type: colorsTypes.COLORS_ADD_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name colorsDelete
 * @category Redux Actions
 * @param  {number} color_id - Цвет для удаление
 */
export const colorsDelete = (color_id) => ({
  type: colorsTypes.COLORS_DELETE,
  payload: {
    color_id,
  },
});

/**
 * @function
 * @name colorsDeleteSuccess
 * @category Redux Actions
 * @param  {number} color_id - ID который надо удалить из листинга
 */
export const colorsDeleteSuccess = (color_id) => ({
  type: colorsTypes.COLORS_DELETE_SUCCESS,
  payload: {
    color_id,
  },
});

/**
 * @function
 * @name colorsDeleteError
 * @category Redux Actions
 * @param  {object} data - ошибка
 */
export const colorsDeleteError = (data) => ({
  type: colorsTypes.COLORS_DELETE_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name colorsUpdate
 * @category Redux Actions
 * @param  {number} color_id - Цвет для обновления
 * @param  {string} type - Тип цвета
 * @param  {string} value - Значение цвета
 */
export const colorsUpdate = (color_id, type, value) => ({
  type: colorsTypes.COLORS_UPDATE,
  payload: {
    color_id,
    type,
    value,
  },
});

/**
 * @function
 * @name colorsUpdateSuccess
 * @category Redux Actions
 * @param  {number} color_id - ID который надо удалить из листинга
 */
export const colorsUpdateSuccess = (color_id) => ({
  type: colorsTypes.COLORS_UPDATE_SUCCESS,
  payload: {
    color_id,
  },
});

/**
 * @function
 * @name colorsUpdateError
 * @category Redux Actions
 * @param  {object} data - ошибка
 */
export const colorsUpdateError = (data) => ({
  type: colorsTypes.COLORS_UPDATE_ERROR,
  payload: {
    data,
  },
});
