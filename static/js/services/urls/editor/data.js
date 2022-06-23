import instance from '../../instance';
import endpoints from '../../endpoints/editor';
import { getUrl } from '../../helper';

/**
 * @name dataGetList
 * @function
 * @description axios instance - Листинг data текущей страницы
 */
export const dataGetList = () => instance.get(getUrl(endpoints.data.list));

/**
 * @name dataPostAddBlock
 * @function
 * @description axios instance - Добавление блока (data) на страницу
 * @param {number} block_id - Блока
 * @param {number} position - Новая позиция блока
 */
export const dataPostAddBlock = (block_id, position) => instance.post(getUrl(endpoints.data.add, {}), {
  block_id,
  position,
});

/**
 * @name dataPostDuplicateBlock
 * @function
 * @description axios instance - Дублирование блока (data) на страницу
 * @param {number} id_data_block - Data ID блока который надо скопировать
 * @param {number} position - Новая позиция блока
 */
export const dataPostDuplicateBlock = (id_data_block, position) => instance.post(getUrl(endpoints.data.duplicate, { id_data_block }), {
  id: id_data_block,
  position,
});

/**
 * @name dataPostDeleteBlock
 * @function
 * @description axios instance - Удаление блока (data) на странице
 * @param {number} id - Блока который надо скопировать
 */
export const dataPostDeleteBlock = (id) => instance.post(
  getUrl(endpoints.data.delete, {
    id,
  }),
  {},
);

/**
 * @name dataPostSortableBlocks
 * @function
 * @description axios instance - Сортировка блоков (data) в сниппете
 * @param {string} snippet - Сниппет где сортируем
 * @param {array} positions - Новый массив сортировки
 */
export const dataPostSortableBlocks = (snippet, positions) => instance.post(getUrl(endpoints.data.sortable, {}), {
  snippet,
  positions,
});

/**
 * @name dataPostUpdateBlock
 * @function
 * @description axios instance - Обновление блока блоков (data) в сниппете
 * @param {number} data_block_id - Сниппет где сортируем
 * @param {object} draft - Сниппет где сортируем
 * @param {object} publish - Сниппет где сортируем
 */
export const dataPostUpdateBlock = (data_block_id, draft, publish) => instance.post(getUrl(endpoints.data.update, { data_block_id }), {
  draft,
  publish,
});
