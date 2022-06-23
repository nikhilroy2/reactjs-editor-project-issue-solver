import * as dataTypes from '../../types/data';
/**
 * @function
 * @name dataAdd
 * @category Redux Actions
 * @param  {number} id - Блока (НЕ DATA)
 * @param  {number} position - Новая позиция блока который надо добавить
 * @param  {string} snippet - В какой сниппет добавляется блок
 */
export const dataAdd = (id, position, snippet) => ({
  type: dataTypes.DATA_ADD,
  payload: {
    id,
    position,
    snippet,
  },
});

/**
 * @function
 * @name dataAddSuccess
 * @category Redux Actions
 * @param  {object} data - Новый блок для data
 */
export const dataAddSuccess = (data) => ({
  type: dataTypes.DATA_ADD_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name dataAddError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const dataAddError = (data) => ({
  type: dataTypes.DATA_ADD_ERROR,
  payload: {
    data,
  },
});
