export const getLanguagesList = (languages, addedLanguages) => {
  if (languages && languages.length) {
    return languages
      .filter((item) => {
        const findAddedLang = addedLanguages.find((lang) => lang.code === item.code);
        return !findAddedLang;
      })
      .map((item) => ({
        label: item.name,
        value: item.code,
      }))
  }
  return []
}
