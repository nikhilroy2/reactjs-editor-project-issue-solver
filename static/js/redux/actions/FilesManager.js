import * as filesManagerTypes from '../types/filesmanager';

/**
 * @function
 * @name filesManagerList
 * @category Redux Actions
 */
export const filesManagerList = () => ({
  type: filesManagerTypes.FILES_MANAGER_LIST,
  payload: null,
});

/**
 * @function
 * @name filesManagerListSuccess
 * @category Redux Actions
 * @param  {object} data - Список картинок
 */
export const filesManagerListSuccess = (data) => ({
  type: filesManagerTypes.FILES_MANAGER_LIST_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name filesManagerListError
 * @category Redux Actions
 */
export const filesManagerListError = () => ({
  type: filesManagerTypes.FILES_MANAGER_LIST_ERROR,
  payload: null,
});

/**
 * @function
 * @name filesManagerUpload
 * @category Redux Actions
 * @param  {object} file - formData картинки
 */
export const filesManagerUpload = (file) => ({
  type: filesManagerTypes.FILES_MANAGER_UPLOAD,
  payload: {
    file,
  },
});

/**
 * @function
 * @name filesManagerUploadSuccess
 * @category Redux Actions
 * @param  {object} data - Загруженная картинка
 */
export const filesManagerUploadSuccess = (data) => ({
  type: filesManagerTypes.FILES_MANAGER_UPLOAD_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name filesManagerUploadError
 * @category Redux Actions
 * @param  {object} error - Ошибка
 */
export const filesManagerUploadError = (error) => ({
  type: filesManagerTypes.FILES_MANAGER_UPLOAD_ERROR,
  payload: {
    error,
  },
});

/**
 * @function
 * @name filesManagerUploadPixabay
 * @category Redux Actions
 * @param  {object} file - formData pixabay
 * @param  {number} id - id pixabay image
 */
export const filesManagerUploadPixabay = (file, id) => ({
  type: filesManagerTypes.FILES_MANAGER_UPLOAD_PIXABAY,
  payload: {
    file,
    id,
  },
});

/**
 * @function
 * @name filesManagerUploadPixabaySuccess
 * @category Redux Actions
 * @param  {object} data - Загруженная картинка
 * @param  {number} id - id pixabay image
 */
export const filesManagerUploadPixabaySuccess = (data, id) => ({
  type: filesManagerTypes.FILES_MANAGER_UPLOAD_PIXABAY_SUCCESS,
  payload: {
    data,
    id,
  },
});

/**
 * @function
 * @name filesManagerUploadPixabayError
 * @category Redux Actions
 * @param  {object} error - Ошибка,
 * @param  {number} id - id pixabay image
 */
export const filesManagerUploadPixabayError = (error, id) => ({
  type: filesManagerTypes.FILES_MANAGER_UPLOAD_PIXABAY_ERROR,
  payload: {
    error,
    id,
  },
});

/**
 * @function
 * @name filesManagerUploadPixabayClearFetching
 * @category Redux Actions
 * @param  {number} id - id pixabay image
 */
export const filesManagerUploadPixabayClearFetching = (id) => ({
  type: filesManagerTypes.FILES_MANAGER_UPLOAD_PIXABAY_CLEAR_FETCHING,
  payload: {
    id,
  },
});

/**
 * @function
 * @name filesManagerDelete
 * @category Redux Actions
 * @param  {number} id - картинки
 */
export const filesManagerDelete = (id) => ({
  type: filesManagerTypes.FILES_MANAGER_DELETE,
  payload: {
    id,
  },
});

/**
 * @function
 * @name filesManagerDeleteSuccess
 * @category Redux Actions
 * @param  {number} id - Удаленная картинка
 */
export const filesManagerDeleteSuccess = (id) => ({
  type: filesManagerTypes.FILES_MANAGER_DELETE_SUCCESS,
  payload: {
    id,
  },
});

/**
 * @function
 * @name filesManagerDeleteError
 * @category Redux Actions
 * @param  {object} error - Ошибка
 */
export const filesManagerDeleteError = (error) => ({
  type: filesManagerTypes.FILES_MANAGER_DELETE_ERROR,
  payload: {
    error,
  },
});

/**
 * @function
 * @name filesManagerDeleteClearFetching
 * @category Redux Actions
 * @param  {number} id - id картинки
 */
export const filesManagerDeleteClearFetching = (id) => ({
  type: filesManagerTypes.FILES_MANAGER_DELETE_CLEAR_FETCHING,
  payload: {
    id,
  },
});

/**
 * @function
 * @name filesManagerNewImageClear
 * @category Redux Actions
 */
export const filesManagerNewImageClear = () => ({
  type: filesManagerTypes.FILES_MANAGER_NEW_IMAGE_CLEAR,
  payload: null,
});
