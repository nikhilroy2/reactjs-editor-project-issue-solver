import * as dataTypes from '../../types/data';
/**
 * @function
 * @name dataSortable
 * @category Redux Actions
 * @param  {number} oldIndex - Индект где был элемент
 * @param  {number} newIndex - Индекс куда переместили
 * @param  {string} snippet - Сниппет где находится блок
 */
export const dataSortable = (oldIndex, newIndex, snippet) => ({
  type: dataTypes.DATA_SORTABLE,
  payload: {
    oldIndex,
    newIndex,
    snippet,
  },
});

/**
 * @function
 * @name dataSortableSuccess
 * @category Redux Actions
 * @param  {object} data - Новый блок для data
 * @param  {string} snippet - Сниппет где находится блок
 */
export const dataSortableSuccess = (data, snippet) => ({
  type: dataTypes.DATA_SORTABLE_SUCCESS,
  payload: {
    data,
    snippet,
  },
});

/**
 * @function
 * @name dataSortableError
 * @category Redux Actions
 * @param  {object} data - Новый блок для snippet Navbar
 * @param  {string} snippet - Сниппет где находится блок
 */
export const dataSortableError = (data, snippet) => ({
  type: dataTypes.DATA_SORTABLE_ERROR,
  payload: {
    data,
    snippet,
  },
});
