import * as sidebarTypes from '../types/sidebar';

/**
 * @function
 * @name sidebarChange
 * @category Redux Actions
 * @param  {string} value - Открыть пункт в sidebar
 */
export const sidebarChange = (value) => ({
  type: sidebarTypes.SIDEBAR_CHANGE,
  payload: {
    value,
  },
});
