import * as dataTypes from '../../types/data';

/**
 * @function
 * @name dataDelete
 * @category Redux Actions
 * @param  {number} id - data
 * @param  {string} snippet - Сниппет где находится блок
 */
export const dataDelete = (id, snippet) => ({
  type: dataTypes.DATA_DELETE,
  payload: {
    id,
    snippet,
  },
});

/**
 * @function
 * @name dataDeleteSuccess
 * @category Redux Actions
 * @param  {object} data - Новый блок для data
 * @param  {string} snippet - Сниппет где находится блок
 */
export const dataDeleteSuccess = (data, snippet) => ({
  type: dataTypes.DATA_DELETE_SUCCESS,
  payload: {
    data,
    snippet,
  },
});

/**
 * @function
 * @name dataDeleteError
 * @category Redux Actions
 * @param  {object} data - Новый блок для snippet Navbar
 * @param  {string} snippet - Сниппет где находится блок
 */
export const dataDeleteError = (data, snippet) => ({
  type: dataTypes.DATA_DELETE_ERROR,
  payload: {
    data,
    snippet,
  },
});
