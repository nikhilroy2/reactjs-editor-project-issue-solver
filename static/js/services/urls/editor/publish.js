import instance from '../../instance';
import endpoints from '../../endpoints/editor';
import { getUrl } from '../../helper';

/**
 * @name publish
 * @function
 * @description axios instance - Сохранить изменения на страницах
 */
export const publish = () => instance.post(getUrl(endpoints.publish.save), {});
