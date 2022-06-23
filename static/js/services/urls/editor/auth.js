import instance from '../../instance';
import endpoints from '../../endpoints/editor';
import { getUrl } from '../../helper';

/**
 * @name checkAuth
 * @function
 * @description axios instance - Проверка авторизации
 */
export const checkAuth = () => instance.get(getUrl(endpoints.auth.check));
