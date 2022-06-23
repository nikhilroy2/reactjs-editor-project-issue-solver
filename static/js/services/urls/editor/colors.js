import instance from '../../instance';
import endpoints from '../../endpoints/editor';
import { getUrl } from '../../helper';

/**
 * @name colorsGetList
 * @function
 * @description axios instance - Листинг всех цветов
 */
export const colorsGetList = () => instance.get(getUrl(endpoints.colors.list));

/**
 * @name colorsPostAdd
 * @function
 * @description axios instance - Добавление цвета
 * @param {string} type - Тип цвета
 * @param {string} value - Значение цвета
 */
export const colorsPostAdd = (type, value) => instance.post(getUrl(endpoints.colors.add), {
  type,
  value,
});

/**
 * @name colorsPostUpdate
 * @function
 * @description axios instance - Обновление цвета
 * @param {number} color_id - id цвета
 * @param {string} type - Тип цвета
 * @param {string} value - Значение
 */
export const colorsPostUpdate = (color_id, type, value) => instance.post(getUrl(endpoints.colors.update, { color_id }), {
  type,
  value,
});

/**
 * @name colorsPostDelete
 * @function
 * @description axios instance - Удаление цвета
 * @param {number} color_id - id цвета
 */
export const colorsPostDelete = (color_id) => instance.post(getUrl(endpoints.colors.delete, { color_id }), {});
