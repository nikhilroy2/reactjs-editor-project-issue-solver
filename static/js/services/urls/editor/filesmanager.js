import instance from '../../instance';
import endpoints from '../../endpoints/editor';
import { getUrl } from '../../helper';

/**
 * @function
 * @name filesManagerGetList
 * @description axios instance - Листинг всех картинок
 */
export const filesManagerGetList = () => instance.get(getUrl(endpoints.files_manager.list));

/**
 * @name filesManagerPostUpload
 * @function
 * @description axios instance - Добавление картинки
 * @param {object} file - Файл
 */
export const filesManagerPostUpload = (file) => instance.post(getUrl(endpoints.files_manager.add, {}), file, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

/**
 * @name filesManagerPostDelete
 * @function
 * @description axios instance - Удаление блока из списка
 * @param {number} file_id - ID файла для удаления
 */
export const filesManagerPostDelete = (file_id) => instance.post(getUrl(endpoints.files_manager.delete, { file_id }), {});

/**
 * @name filesManagerGetPixabay
 * @function
 * @description axios instance - Pixabay листинг
 */
export const filesManagerGetPixabay = () => {
  const data = {
    params: {
      key: '12628428-fe5491ffb5f3155db2fa46917',
    },
  };
  return instance.get('https://pixabay.com/api/', data, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
  });
};
