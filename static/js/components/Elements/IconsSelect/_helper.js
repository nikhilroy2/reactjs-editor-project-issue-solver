import { list } from '../../../constants/fontAwesome';

export const getIconName = (icon) => {
  if (icon) {
    const currentIcon = icon.split(' ')[1].replace('fa-', '');
    if (list[currentIcon]) {
      return list[currentIcon].label;
    }
  }
  return '';
};
