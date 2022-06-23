import _ from 'lodash';
import store from '../../../../store';

export const searchFilterFonts = (fonts, search, filter) => {
  const state = store.getState();
  const activeFonts = state.fonts.activeFonts.map((item) => item.font_id);
  const isFilter = !(filter && filter.value === 'all languages');
  const isSearch = !!search.trim();
  const fontsFiltered = fonts.filter((font) => {
    const fontFamily = font.family.toLowerCase();
    const fontSearch = search.toLowerCase();
    if (activeFonts.indexOf(font.id) !== -1) {
      font.status = 'success';
    } else {
      font.status = '';
    }
    const resultSearch = () => fontFamily.indexOf(fontSearch) !== -1;

    const resultFilter = () => font.subsets.indexOf(filter.value) !== -1;

    if (isFilter) {
      if (resultFilter()) {
        if (isSearch) {
          return resultSearch();
        }
        return true;
      }
      return false;
    } if (isSearch) {
      return resultSearch();
    }
    return true;
  });
  return _.chunk(fontsFiltered, 3);
};
