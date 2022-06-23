import instance from '../../instance';
import endpoints from '../../endpoints/deps';
import { getUrl } from '../../helper';

/**
 * @name menuAddItem
 * @function
 * @description axios instance - Добавление пункта меню
 */
export const menuAddItem = (data) => instance.post(getUrl(endpoints.menu.add_menu), {
  ...data,
});

/**
 * @name menuUpdateItem
 * @function
 * @description axios instance - Обновление пункта меню
 */
export const menuUpdateItem = (data, id) => instance.post(getUrl(endpoints.menu.update_menu, { id }), {
  ...data,
});

/**
 * @name menuDeleteItem
 * @function
 * @description axios instance - Удаление пункта меню
 */
export const menuDeleteItem = (id) => instance.post(getUrl(endpoints.menu.delete, { id }), {});

/**
 * @name menuSortableItems
 * @function
 * @description axios instance - Сортировка пунктов меню
 */
export const menuSortableItems = (data) => instance.post(getUrl(endpoints.menu.sortable), {
  ...data,
});
