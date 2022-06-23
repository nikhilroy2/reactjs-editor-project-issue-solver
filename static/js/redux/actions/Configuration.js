import * as configurationTypes from '../types/configuration';

/**
 * @function
 * @name configurationListGet
 * @category Redux Actions
 */
export const configurationListGet = () => ({
  type: configurationTypes.CONFIGURATION_LIST_GET,
  payload: null,
});

/**
 * @function
 * @name configurationListGetSuccess
 * @category Redux Actions
 * @param  {object} data - Список настроек
 */
export const configurationListGetSuccess = (data) => ({
  type: configurationTypes.CONFIGURATION_LIST_GET_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name configurationListGetError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const configurationListGetError = (data) => ({
  type: configurationTypes.CONFIGURATION_LIST_GET_ERROR,
  payload: {
    data,
  },
});
