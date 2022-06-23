/**
 * @name getLanguagesList
 * @function
 * @description Делим список на две части (дефолтный и для сортировки)
 * @param {array} languages - список добавленных языков
 */
export const getLanguagesList = (languages) => {
  if (languages) {
    const data = {
      default: {},
      list: [],
    };
    languages.data.forEach((lang) => {
      if (!lang.default) {
        data.list.push(lang);
      } else {
        data.default = lang;
      }
    });
    return data;
  }
  return false;
};
