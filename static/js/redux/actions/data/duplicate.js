import * as dataTypes from '../../types/data';
/**
 * @function
 * @name dataDuplicate
 * @category Redux Actions
 * @param  {number} id - data
 * @param  {number} position - Новая позиция блока который надо добавить
 * @param  {string} snippet - Сниппет где находится блок
 */
export const dataDuplicate = (id, position, snippet) => ({
  type: dataTypes.DATA_DUPLICATE,
  payload: {
    id,
    position,
    snippet,
  },
});

/**
 * @function
 * @name dataDuplicateSuccess
 * @category Redux Actions
 * @param  {object} data - Новый блок для data
 * @param  {string} snippet - Сниппет где находится блок
 */
export const dataDuplicateSuccess = (data, snippet) => ({
  type: dataTypes.DATA_DUPLICATE_SUCCESS,
  payload: {
    data,
    snippet,
  },
});

/**
 * @function
 * @name dataDuplicateError
 * @category Redux Actions
 * @param  {object} data - Новый блок для snippet Navbar
 * @param  {string} snippet - Сниппет где находится блок
 */
export const dataDuplicateError = (data, snippet) => ({
  type: dataTypes.DATA_DUPLICATE_ERROR,
  payload: {
    data,
    snippet,
  },
});
