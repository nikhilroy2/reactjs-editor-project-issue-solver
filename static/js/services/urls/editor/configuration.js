import instance from '../../instance';
import endpoints from '../../endpoints/editor';
import { getUrl } from '../../helper';

/**
 * @name configurationGetList
 * @function
 * @description axios instance - Листинг настроек
 */
export const configurationGetList = () => instance.get(getUrl(endpoints.config.list), { withoutAdminID: true });
