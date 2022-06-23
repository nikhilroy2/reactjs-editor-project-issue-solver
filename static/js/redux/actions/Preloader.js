import * as preloaderTypes from '../types/preloader';

/**
 * @function
 * @name loadData
 * @category Redux Actions
 * @param  {number} id - ID страницы
 */
export const loadData = (id) => ({
  type: preloaderTypes.PRELOADER,
  payload: {
    id,
  },
});

/**
 * @function
 * @name setProgress
 * @category Redux Actions
 * @param  {number} progress - Процент загрузки
 */
export const setProgress = (progress) => ({
  type: preloaderTypes.PRELOADER_PROGRESS,
  payload: {
    progress,
  },
});

/**
 * @function
 * @name preloaderSuccess
 * @category Redux Actions
 */
export const preloaderSuccess = () => ({
  type: preloaderTypes.PRELOADER_SUCCESS,
  payload: null,
});

/**
 * @function
 * @name preloaderError
 * @category Redux Actions
 */
export const preloaderError = () => ({
  type: preloaderTypes.PRELOADER_ERROR,
  payload: null,
});

/**
 * @function
 * @name preloaderLockedTab
 * @category Redux Actions
 * @description Блокируем вкладку
 */
export const preloaderLockedTab = () => ({
  type: preloaderTypes.PRELOADER_LOCKED_TAB,
  payload: null,
});

/**
 * @function
 * @name preloaderLockedMobile
 * @category Redux Actions
 * @description Блокируем редактор для мобильных устройств
 */
export const preloaderLockedMobile = () => ({
  type: preloaderTypes.PRELOADER_LOCKED_MOBILE,
  payload: null,
});
