import _ from 'lodash';

export const searchIcons = (list, value) => {
  if (list) {
    if (value) {
      return list.filter((item) => {
        let isEmpty = false;
        for (let i = 0; i < item.search.length; i++) {
          if (item.search[i] && _.isString(item.search[i])) {
            if (item.search[i].indexOf(value.toLowerCase()) !== -1) {
              isEmpty = true;
              break;
            }
          }
        }
        return isEmpty;
      });
    }
    return list;
  }
  return false;
};

export const rowsCounter = (index, height, list, listLength) => {
  const lastItem = list[list.length - 1];
  const lastIndex = list.length - 1;

  if (lastIndex === index) {
    if (lastItem.length < listLength) {
      return (height / listLength) * lastItem.length;
    }

    return height;
  }
  return height;
};
