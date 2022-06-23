import instance from '../../instance';
import endpoints from '../../endpoints/editor';
import { getUrl } from '../../helper';

/**
 * @name languagesGetList
 * @function
 * @description axios instance - Листинг добавленных языков
 */
export const languagesGetList = () => instance.get(getUrl(endpoints.languages.list));

/**
 * @name languagesGetAllList
 * @function
 * @description axios instance - Листинг всех доступных языков
 */
export const languagesGetAllList = () => instance.get(getUrl(endpoints.languages.all_languages));

/**
 * @name languagesGetTranslation
 * @function
 * @description axios instance - Листинг переводов активного языка
 */
export const languagesGetTranslation = () => instance.get(getUrl(endpoints.languages.translations, {
  language_code: '',
}));

/**
 * @name languagesResetTranslation
 * @function
 * @description axios instance - Скинуть переводы языка
 */
export const languagesResetTranslation = (code) => instance.post(getUrl(endpoints.languages.reset), {
  code,
});

/**
 * @name languagesUpdateTranslation
 * @function
 * @description axios instance - Обновить переводы
 */
export const languagesUpdateTranslation = (code, data) => instance.post(getUrl(endpoints.languages.update, { code }), {
  data,
});

/**
 * @name languagesAdd
 * @function
 * @description axios instance - Добавить новый язык в листинг
 */
export const languagesAdd = (code) => instance.post(getUrl(endpoints.languages.add), {
  code,
});

/**
 * @name languagesMakeDefault
 * @function
 * @description axios instance - Язык по умолчанию
 */
export const languagesMakeDefault = (code) => instance.post(getUrl(endpoints.languages.make_default), {
  code,
});

/**
 * @name languagesActive
 * @function
 * @description axios instance - Сделать язык активным
 */
export const languagesActive = (code, active) => instance.post(getUrl(endpoints.languages.active, {
  code,
}), {
  active,
});

/**
 * @name languagesUpdatePositions
 * @function
 * @description axios instance - Сортировка позиции
 */
export const languagesUpdatePositions = (positions) => instance.post(getUrl(endpoints.languages.sortable), {
  positions,
});

/**
 * @name languagesDelete
 * @function
 * @description axios instance - Удаление языка
 */
export const languagesDelete = (code) => instance.post(getUrl(endpoints.languages.delete), {
  code,
});
