import * as componentsTypes from '../types/components';

/**
 * @function
 * @name componentsListGet
 * @category Redux Actions
 */
export const componentsListGet = () => ({
  type: componentsTypes.COMPONENTS_LIST_GET,
  payload: null,
});

/**
 * @function
 * @name componentsListGetSuccess
 * @category Redux Actions
 * @param {object} data - Список компонентов
 */
export const componentsListGetSuccess = (data) => ({
  type: componentsTypes.COMPONENTS_LIST_GET_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name componentsListGetError
 * @category Redux Actions
 * @param {object} data - Error
 */
export const componentsListGetError = (data) => ({
  type: componentsTypes.COMPONENTS_LIST_GET_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name componentsChangeData
 * @category Redux Actions
 * @param {any} value - Значение data
 * @param {string} key - Ключ в объекте который надо заменить
 * @param {string} code - Код компонента
 */
export const componentsChangeData = (value, key, code) => ({
  type: componentsTypes.COMPONENTS_CHANGE_DATA,
  payload: {
    value,
    key,
    code,
  },
});

/**
 * @function
 * @name componentsChangeDataError
 * @category Redux Actions
 * @param {object} data - Error
 */
export const componentsChangeDataError = (data) => ({
  type: componentsTypes.COMPONENTS_CHANGE_DATA_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name componentsDataSetToDefault
 * @category Redux Actions
 * @param {string} code - Код компонента
 */
export const componentsDataSetToDefault = (code) => ({
  type: componentsTypes.COMPONENTS_DATA_SET_DEFAULT,
  payload: {
    code,
  },
});

/**
 * @function
 * @name componentsDataSetToDefaultSuccess
 * @category Redux Actions
 * @param {object} data - Новая data компонента
 * @param {string} code - Код компонента
 */
export const componentsDataSetToDefaultSuccess = (code, data) => ({
  type: componentsTypes.COMPONENTS_DATA_SET_DEFAULT_SUCCESS,
  payload: {
    code,
    data,
  },
});

/**
 * @function
 * @name componentsDataSetToDefaultError
 * @category Redux Actions
 * @param {string} code - Ключ компонента, например "button"
 * @param {string} data - Ошибка
 */
export const componentsDataSetToDefaultError = (code, data) => ({
  type: componentsTypes.COMPONENTS_DATA_SET_DEFAULT_ERROR,
  payload: {
    code,
    data,
  },
});
