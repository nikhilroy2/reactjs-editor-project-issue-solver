import * as pagesTypes from '../types/pages';

/**
 * @function
 * @name pagesGetList
 * @category Redux Actions
 * @param  {number} id - Список переводов активного языка
 */
export const pagesGetList = (id) => ({
  type: pagesTypes.PAGES_GET_LIST,
  payload: {
    id,
  },
});

/**
 * @function
 * @name pagesGetListSuccess
 * @category Redux Actions
 * @param  {number} data - Список страниц панели
 */
export const pagesGetListSuccess = (data) => ({
  type: pagesTypes.PAGES_GET_LIST_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name pagesGetListError
 * @category Redux Actions
 * @param  {number} data - Список страниц панели
 */
export const pagesGetListError = (data) => ({
  type: pagesTypes.PAGES_GET_LIST_ERROR,
  payload: {
    data,
  },
});

/**
 * @function
 * @name pagesAddActivePage
 * @category Redux Actions
 * @param  {number} data - Данные активиной страницы из листинга
 */
export const pagesAddActivePage = (data) => ({
  type: pagesTypes.PAGES_ADD_ACTIVE_PAGE,
  payload: {
    data,
  },
});

/**
 * @function
 * @name pagesAddPage
 * @category Redux Actions
 * @param  {number} data - Данные для создания новой страницы
 * @param  {boolean} onClose - Метка закрытия
 */
export const pagesAddPage = (data, onClose) => ({
  type: pagesTypes.PAGES_ADD_PAGE,
  payload: {
    data,
    onClose,
  },
});

/**
 * @function
 * @name pagesAddPageSuccess
 * @category Redux Actions
 * @param  {number} data - Данные созданной страницы
 */
export const pagesAddPageSuccess = (data) => ({
  type: pagesTypes.PAGES_ADD_PAGE_SUCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name pagesAddPageError
 * @category Redux Actions
 * @param  {number} error - Ошибка
 */
export const pagesAddPageError = (error) => ({
  type: pagesTypes.PAGES_ADD_PAGE_ERROR,
  payload: {
    error,
  },
});

/**
 * @function
 * @name pagesUpdatePage
 * @category Redux Actions
 * @param  {number} data - Данные для обновление страницы
 * @param  {number} id - ID Страницы
 * @param  {number} onClose - Метка закрытия
 */
export const pagesUpdatePage = (data, id, onClose) => ({
  type: pagesTypes.PAGES_UPDATE_PAGE,
  payload: {
    data,
    id,
    onClose,
  },
});

/**
 * @function
 * @name pagesUpdatePageSuccess
 * @category Redux Actions
 * @param  {number} data - Данные для обновленной страницы
 */
export const pagesUpdatePageSuccess = (data) => ({
  type: pagesTypes.PAGES_UPDATE_PAGE_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name pagesUpdatePageError
 * @category Redux Actions
 * @param  {object} error - Ошибка
 */
export const pagesUpdatePageError = (error) => ({
  type: pagesTypes.PAGES_UPDATE_PAGE_ERROR,
  payload: {
    error,
  },
});

/**
 * @function
 * @name pagesDeletePage
 * @category Redux Actions
 * @param  {number} id - Открытой страницы
 * @param  {number} urlId - Если юзер удаляет страницу на которой сейчас находится
 */
export const pagesDeletePage = (id, urlId) => ({
  type: pagesTypes.PAGES_DELETE_PAGE,
  payload: {
    id,
    urlId,
  },
});

/**
 * @function
 * @name pagesDeletePageSuccess
 * @category Redux Actions
 * @param  {object} data - Новый листинг страниц
 */
export const pagesDeletePageSuccess = (data) => ({
  type: pagesTypes.PAGES_DELETE_PAGE_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name pagesDeletePageError
 * @category Redux Actions
 * @param  {object} error - Ошибка
 */
export const pagesDeletePageError = (error) => ({
  type: pagesTypes.PAGES_DELETE_PAGE_ERROR,
  error,
});

/**
 * @function
 * @name pagesDeletePage
 * @category Redux Actions
 */
export const filterEmptyPage = () => ({
  type: pagesTypes.PAGE_EMPTY_FILTER,
});

/**
 * @function
 * @name addEmptyPage
 * @category Redux Actions
 * @param  {string} pageType - Тип страницы Public/Internal/Blog
 */
export const addEmptyPage = (pageType) => ({
  type: pagesTypes.ADD_EMPTY_PAGE,
  payload: {
    data: {
      name: '',
      url: '',
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      public: pageType === 'public',
      blog: pageType === 'blog',
      pageType,
    },
  },
});

/**
 * @function
 * @name switchPageMode
 * @category Redux Actions
 * @param  {object} data - {isEdit, activePage}
 */
export const switchPageMode = (data) => ({
  type: pagesTypes.SWITCH_PAGE_MODE,
  payload: {
    data,
  },
});

/**
 * @function
 * @name clearErrorState
 * @category Redux Actions
 */
export const clearErrorState = () => ({
  type: pagesTypes.CLEAR_ERROR_STATE,
});

/**
 * @function
 * @name pagesAddBlogPage
 * @category Redux Actions
 * @param  {object} data - Данные для создания новой страницы блога
 * @param  {boolean} onClose - Метка закрытия
 */
export const pagesAddBlogPage = (data, onClose) => ({
  type: pagesTypes.PAGES_ADD_BLOG_PAGE,
  payload: {
    data,
    onClose,
  },
});

/**
 * @function
 * @name pagesAddBlogPageSuccess
 * @category Redux Actions
 * @param  {object} data - Данные созданной страницы блога
 */
export const pagesAddBlogPageSuccess = (data) => ({
  type: pagesTypes.PAGES_ADD_PAGE_SUCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name pagesAddBlogPageError
 * @category Redux Actions
 * @param  {object} error - Ошибка
 */
export const pagesAddBlogPageError = (error) => ({
  type: pagesTypes.PAGES_ADD_PAGE_ERROR,
  payload: {
    error,
  },
});

/**
 * @function
 * @name pagesDeleteBlogPage
 * @category Redux Actions
 * @param  {number} id - Открытой страницы
 * @param  {number} urlId - Если юзер удаляет страницу на которой сейчас находится
 */
export const pagesDeleteBlogPage = (id, urlId) => ({
  type: pagesTypes.PAGES_DELETE_BLOG_PAGE,
  payload: {
    id,
    urlId,
  },
});

/**
 * @function
 * @name pagesDeleteBlogPageSuccess
 * @category Redux Actions
 * @param  {object} data - Новый листинг страниц
 */
export const pagesDeleteBlogPageSuccess = (data) => ({
  type: pagesTypes.PAGES_DELETE_BLOG_PAGE_SUCCESS,
  payload: {
    data,
  },
});

/**
 * @function
 * @name pagesDeleteBlogPageError
 * @category Redux Actions
 * @param  {object} error - Ошибка
 */
export const pagesDeleteBlogPageError = (error) => ({
  type: pagesTypes.PAGES_DELETE_BLOG_PAGE_ERROR,
  error,
});
