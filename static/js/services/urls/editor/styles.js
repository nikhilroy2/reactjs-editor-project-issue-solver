import instance from '../../instance';
import endpoints from '../../endpoints/editor';
import { getUrl } from '../../helper';

/**
 * @name stylesGetList
 * @function
 * @description axios instance - Листинг всех стилей
 */
export const stylesGetList = () => instance.get(getUrl(endpoints.styles.list));

/**
 * @name stylesPostActivateStyle
 * @function
 * @description axios instance - Активировать стиль темы
 */
export const stylesPostActivateStyle = (style_id) => instance.post(getUrl(endpoints.styles.activate, { style_id }), {});
