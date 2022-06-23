import * as blocksTypes from '../types/blocks';

/**
 * @function
 * @name blocksListGet
 * @category Redux Actions
 */
export const blocksListGet = () => ({
  type: blocksTypes.BLOCKS_LIST_GET,
  payload: null,
});

/**
 * @function
 * @name blocksListGetSuccess
 * @category Redux Actions
 * @param  {object} data - Список блоков
 */
export const blocksListGetSuccess = (data) => ({
  type: blocksTypes.BLOCKS_LIST_GET_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name blocksListGetError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const blocksListGetError = (data) => ({
  type: blocksTypes.BLOCKS_LIST_GET_ERROR,
  payload: {
    data,
  },
});
