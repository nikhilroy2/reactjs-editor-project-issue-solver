import instance from '../../instance';
import endpoints from '../../endpoints/editor';
import { getUrl } from '../../helper';

/**
 * @name blocksListGet
 * @function
 * @description axios instance - Листинг всех блоков активной страницы
 */
export const blocksListGet = () => instance.get(getUrl(endpoints.blocks.list));
