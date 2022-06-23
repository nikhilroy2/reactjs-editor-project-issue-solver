export const getGroups = (translations) => {
  const groups = [...new Set(translations.map((item) => item.group))];

  return groups.map((group) => {
    const findFirstIndex = translations.find((item) => item.group === group);

    return {
      name: group,
      index: findFirstIndex ? findFirstIndex.position : undefined,
    };
  });
};

export const convertTranslationForm = (translations) => translations.reduce((obj, cur) => ({ ...obj, [cur.key]: cur.value }), {});
