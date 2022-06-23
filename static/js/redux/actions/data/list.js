import * as preloaderTypes from '../../types/data';

/**
 * @function
 * @name dataListGet
 * @category Redux Actions
 */
export const dataListGet = () => ({
  type: preloaderTypes.DATA_LIST_GET,
  payload: null,
});

/**
 * @function
 * @name dataListGetSuccess
 * @category Redux Actions
 * @param  {object} data - Список блоков
 */
export const dataListGetSuccess = (data) => ({
  type: preloaderTypes.DATA_LIST_GET_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name dataListGetError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const dataListGetError = (data) => ({
  type: preloaderTypes.DATA_LIST_GET_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name dataListGetFormatData
 * @category Redux Actions
 */
export const dataListGetFormatData = () => ({
  type: preloaderTypes.DATA_LIST_FORMAT_DATA,
  payload: null,
});

/**
 * @function
 * @name dataListGetFormatDataSuccess
 * @category Redux Actions
 * @param  {object} data - Форматированные список блоков
 */
export const dataListGetFormatDataSuccess = (data) => ({
  type: preloaderTypes.DATA_LIST_FORMAT_DATA_SUCCESS,
  payload: {
    data,
  },
});
