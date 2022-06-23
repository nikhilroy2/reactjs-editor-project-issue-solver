import instance from '../../instance';
import endpoints from '../../endpoints/editor';
import { getUrl } from '../../helper';

/**
 * @name componentsGetList
 * @function
 * @description axios instance - Листинг компонентов
 */
export const componentsGetList = () => instance.get(getUrl(endpoints.components.list));
/**
 * @name componentsPostUpdateDataBlock
 * @function
 * @description axios instance - Обновление data компонента конкретного блока
 * @param {number} id_data_block - ID data блока который надо скопировать
 * @param {string} component_name - Имя компонента
 * @param {object} data - Новая data компонента
 */
export const componentsPostUpdateDataBlock = (
  id_data_block,
  component_name,
  data,
) => instance.post(
  getUrl(endpoints.components.update_data_block, {
    id_data_block,
    component_name,
  }),
  {
    data,
  },
);

/**
 * @name componentsPostSetDefaultDataBlock
 * @function
 * @description axios instance - Сброс к дефолту data компонента конкретного блока
 * @param {number} id_data_block - ID data блока который надо скопировать
 * @param {string} component_name - Имя компонента
 */
export const componentsPostSetDefaultDataBlock = (
  id_data_block,
  component_name,
) => instance.post(
  getUrl(endpoints.components.default_data_block, {
    id_data_block,
    component_name,
  }),
  {},
);

/**
 * @name componentsPostUpdateData
 * @function
 * @description axios instance - Обновление data компонента
 * @param {string} code - Код компонента
 * @param {object} data - Новая data компонента
 */
export const componentsPostUpdateData = (code, data) => instance.post(getUrl(endpoints.components.update_data, { code }), {
  data,
});

/**
 * @name componentsPostSetDefaultData
 * @function
 * @description axios instance - Обновление data компонента
 * @param {string} code - Код компонента
 */
export const componentsPostSetDefaultData = (code) => instance.post(getUrl(endpoints.components.default_component, { code }), {});
