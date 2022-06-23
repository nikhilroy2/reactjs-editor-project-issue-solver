import { list } from '../../../constants/fontAwesome';

export const getFontsList = () => {
  const stylesToClass = {
    brands: 'fab',
    solid: 'fas',
    regular: 'far',
    light: 'fal',
    duotone: 'fad',
  };

  if (list) {
    const newList = [];
    Object.keys(list).forEach((key) => {
      const item = list[key];

      if (item.styles) {
        item.styles.forEach((style) => {
          const defaultObject = {
            value: '',
            title: '',
            search: [],
          };

          if (stylesToClass[style]) {
            defaultObject.value = `${stylesToClass[style]} fa-${key}`;
            defaultObject.title = item.label;

            if (item.search && item.search.terms && item.search.terms.length) {
              defaultObject.search = [
                ...defaultObject.search,
                ...item.search.terms,
              ];
              defaultObject.search.push(item.label.toLowerCase());
            } else {
              defaultObject.search.push(item.label.toLowerCase());
            }
          }
          newList.push(defaultObject);
        });
      }
    });
    return newList;
  }
  return false;
};
