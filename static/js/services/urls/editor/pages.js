import instance from '../../instance';
import endpoints from '../../endpoints/editor';
import { getUrl } from '../../helper';

/**
 * @name pagesGetList
 * @function
 * @description axios instance - Листинг всех страниц
 */
export const pagesGetList = () => instance.get(getUrl(endpoints.pages.list));

/**
 * @name addPage
 * @function
 * @description axios instance - Добавление страницы
 */
export const addPage = (payload) => instance.post(getUrl(endpoints.pages.add), { ...payload });

/**
 * @name addBlogPage
 * @function
 * @description axios instance - Добавление страницы
 */
export const addBlogPage = (payload) => instance.post(getUrl(endpoints.pages.add_blog), { ...payload });

/**
 * @name deletePage
 * @function
 * @description axios instance - Удаление страницы
 */
export const deletePage = (pageId) => instance.post(getUrl(endpoints.pages.delete, { pageId }), {});

/**
 * @name deleteBlogPage
 * @function
 * @description axios instance - Удаление страницы
 */
export const deleteBlogPage = (pageId) => instance.post(getUrl(endpoints.pages.delete_blog, { pageId }), {});

/**
 * @name updatePage
 * @function
 * @description axios instance - Обновление страницы
 */
export const updatePage = (pageId, payload) => instance.post(getUrl(endpoints.pages.update, { pageId }), { ...payload });
