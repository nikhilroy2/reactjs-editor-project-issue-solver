/**
 * @name getAddedLanguagesList
 * @function
 * @description Список всех доступных для добавления языкв react-select
 * @param {array} languages - список добавленных языков
 */
export const getAddedLanguagesList = (languages) => {
  if (languages && languages.length) {
    return languages.map((item) => ({
      label: item.name,
      value: item.code,
    }))
  }
  return [];
};

/**
 * @name getActiveLanguage
 * @function
 * @description Активный язык для react-select
 * @param {array} languages - список добавленных языков
 * @param {string} mode - код активного языка
 */
export const getActiveLanguage = (languages, mode) => {
  if (languages && mode) {
    const findDefaultLanguage = languages.find((item) => item.code === mode);
    if (findDefaultLanguage) {
      const { code, name } = findDefaultLanguage;
      return {
        label: name,
        value: code,
      }
    }
  }
  return {
    label: 'Not found language',
    value: '',
  }
};

/**
 * @name getDefaultLanguage
 * @description Получаем дефолтный язык
 * @param {array} languages
 * @returns {null|*}
 */
export const getDefaultLanguage = (languages) => {
  if (languages) {
    const findLanguage = languages.find((language) => language.default);
    if (findLanguage) {
      return findLanguage;
    }
  }
  return null;
};
