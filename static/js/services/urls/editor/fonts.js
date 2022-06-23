import instance from '../../instance';
import endpoints from '../../endpoints/editor';
import { getUrl } from '../../helper';

/**
 * Fonts list
 */
export const fontsGetList = () => instance.get(getUrl(endpoints.fonts.list_all));

export const fontsActiveList = () => instance.get(getUrl(endpoints.fonts.list_active));

export const activateFont = (fonts_id) => instance.post(getUrl(endpoints.fonts.activate, { fonts_id }), {});

export const deleteFont = (fonts_id) => instance.post(getUrl(endpoints.fonts.delete, { fonts_id }), {});

export const fontsUpdateGroupOptions = (group, data) => instance.post(getUrl(endpoints.fonts.update, { group }), data);

export const fontsResetOptions = (component_code) => instance.post(getUrl(endpoints.fonts.reset), { component_code });
