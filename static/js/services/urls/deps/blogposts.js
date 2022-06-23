import instance from '../../instance';
import endpoints from '../../endpoints/deps';
import { getUrl } from '../../helper';

/**
 * @name blogUpdateTitle
 * @function
 * @description axios instance - Обновление title поста
 */
export const blogUpdateTitle = ({ post_id, editor, draft }) => instance.post(getUrl(endpoints.blog.update_title, { post_id }), {
  editor,
  draft,
});

/**
 * @name blogUpdateContent
 * @function
 * @description axios instance - Обновление content поста
 */
export const blogUpdateContent = ({ post_id, editor, draft }) => instance.post(getUrl(endpoints.blog.update_content, { post_id }), {
  editor,
  draft,
});

/**
 * @name blogUpdatePreview
 * @function
 * @description axios instance - Обновление preview поста
 */
export const blogUpdatePreview = ({ post_id, id }) => instance.post(getUrl(endpoints.blog.update_preview, { post_id }), {
  id,
});

/**
 * @name blogGetPostsList
 * @function
 * @description axios instance - Обновление preview поста
 */
export const blogGetPostsList = ({ page }) => instance.get(getUrl(endpoints.blog.get_posts, { page }));

/**
 * @name blogUpdateQuantityPerPage
 * @function
 * @description axios instance - Обновление отоброжения постов на странице
 */
export const blogUpdateQuantityPerPage = ({ page_size }) => instance.post(getUrl(endpoints.blog.per_page), {
  page_size,
});
