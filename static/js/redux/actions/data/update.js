import * as dataTypes from '../../types/data';

/**
 * @function
 * @name dataChangeValues
 * @category Redux Actions
 * @param  value - Значение
 * @param  {string} key - параметр объекта для перезаписи
 * @param  {number} dataID - ID data
 */
export const dataChangeValues = (value, key, dataID) => ({
  type: dataTypes.DATA_VALUES_CHANGE,
  payload: {
    value,
    key,
    dataID,
  },
});

/**
 * @function
 * @name dataChangeValuesError
 * @category Redux Actions
 * @param  data - Значение
 */
export const dataChangeValuesError = (data) => ({
  type: dataTypes.DATA_VALUES_CHANGE_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name dataReplaceAll
 * @category Redux Actions
 * @param  {object} data - Новая data сниппета
 * @param  {string} snippet - Сниппет где находится блок
 */
export const dataReplaceAll = (data, snippet) => ({
  type: dataTypes.DATA_REPLACE_ALL,
  payload: {
    data,
    snippet,
  },
});
