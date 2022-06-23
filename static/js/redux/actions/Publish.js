import * as publishTypes from '../types/publish';
/**
 * @function
 * @name publishPages
 * @category Redux Actions
 */
export const publishPages = () => ({
  type: publishTypes.PUBLISH,
  payload: null,
});

/**
 * @function
 * @name publishPagesSuccess
 * @category Redux Actions
 */
export const publishPagesSuccess = () => ({
  type: publishTypes.PUBLISH_SUCCESS,
  payload: null,
});

/**
 * @function
 * @name publishPagesSuccess
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const publishPagesError = (data) => ({
  type: publishTypes.PUBLISH_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name publishSetDefault
 * @category Redux Actions
 */
export const publishSetDefault = () => ({
  type: publishTypes.PUBLISH_DEFAULT,
  payload: null,
});
