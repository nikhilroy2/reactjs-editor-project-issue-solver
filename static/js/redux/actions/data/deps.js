import * as componentsTypes from '../../types/components';
import * as dataTypes from '../../types/data';
import * as depsTypes from '../../types/deps';

/**
 * @function
 * @name dataComponentSetDefault
 * @category Redux Actions
 * @param  {number} dataID - id Data
 * @param  {number} blockID - id Блока
 * @param  {string} componentName - Имя компонента, такие как component_1, component_2
 */
export const dataComponentSetDefault = (dataID, blockID, componentName) => ({
  type: componentsTypes.COMPONENTS_DATA_BLOCK_SET_DEFAULT,
  payload: {
    dataID,
    blockID,
    componentName,
  },
});

/**
 * @function
 * @name dataComponentSetDefaultError
 * @category Redux Actions
 * @param  {object} data - Error
 */
export const dataComponentSetDefaultError = (data) => ({
  type: componentsTypes.COMPONENTS_DATA_BLOCK_SET_DEFAULT_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name dataChangeComponentData
 * @category Redux Actions
 * @param  {number} dataID - id Data
 * @param  {number} blockID - id Блока
 * @param  {string} componentName - Имя компонента, такие как component_1, component_2
 * @param  {object} data - компонента блока
 */
export const dataChangeComponentData = (dataID, blockID, componentName, data) => ({
  type: componentsTypes.COMPONENTS_CHANGE_DATA_BLOCK,
  payload: {
    dataID,
    blockID,
    componentName,
    data,
  },
});

/**
 * @function
 * @name dataChangeComponentDataError
 * @category Redux Actions
 * @param  {object} data - Ошибка
 */
export const dataChangeComponentDataError = (data) => ({
  type: componentsTypes.COMPONENTS_CHANGE_DATA_BLOCK_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name dataDepsCreateSuccess
 * @category Redux Actions
 * @param  {number} dataID - data ID
 * @param  {object} data - deps
 */
export const dataDepsCreateSuccess = (dataID, data) => ({
  type: dataTypes.DATA_DEPS_CREATE_SUCCESS,
  payload: {
    dataID,
    data,
  },
});

/**
 * @function
 * @name depsChangeValues
 * @category Redux Actions
 * @param  value - Значение
 * @param  {string} key - параметр объекта для перезаписи
 * @param  {number} dataID - ID data
 * @param  {object} request - If you need to save to server
 */
export const depsChangeValues = (value, key, dataID, request) => ({
  type: depsTypes.DEPS_VALUES_CHANGE,
  payload: {
    value,
    key,
    dataID,
    request,
  },
});

/**
 * @function
 * @name depsChangeValuesError
 * @category Redux Actions
 * @param  data - Значение
 */
export const depsChangeValuesError = (data) => ({
  type: depsTypes.DEPS_VALUES_CHANGE_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name depsIsLoading
 * @category Redux Actions
 */
export const depsIsLoading = () => ({
  type: depsTypes.DEPS_LOADING,
  payload: null,
});

/**
 * @function
 * @name depsIsLoadingSuccess
 * @category Redux Actions
 */
export const depsIsLoadingSuccess = () => ({
  type: depsTypes.DEPS_LOADING_SUCCESS,
  payload: null,
});

/**
 * @function
 * @name depsIsLoadingError
 * @category Redux Actions
 */
export const depsIsLoadingError = () => ({
  type: depsTypes.DEPS_LOADING_ERROR,
  payload: null,
});

/**
 * @function
 * @name depsRequest
 * @category Redux Actions
 */
export const depsRequest = (request, dataID) => ({
  type: depsTypes.DEPS_REQUEST,
  payload: {
    request,
    dataID,
  },
});

/**
 * @function
 * @name depsRequestSuccess
 * @category Redux Actions
 */
export const depsRequestSuccess = () => ({
  type: depsTypes.DEPS_REQUEST_SUCCESS,
  payload: null,
});

/**
 * @function
 * @name depsRequestError
 * @category Redux Actions
 */
export const depsRequestError = () => ({
  type: depsTypes.DEPS_REQUEST_ERROR,
  payload: null,
});
