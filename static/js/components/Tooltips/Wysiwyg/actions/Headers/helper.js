import { list } from './contants';

/**
 *
 * @function
 * @category Helpers
 * @name findValue
 * @description Поиск иконки Headers
 * @param {string} value - Ключ Headers
 *
 */
export const findValue = (value) => {
  if (value) {
    let val = false;
    list.forEach((item) => {
      if (item.value === value) {
        val = item;
      }
    });

    return val;
  }
  return false;
};
