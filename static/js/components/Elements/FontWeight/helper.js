/* eslint-disable */
export const getFontWeightCurrentFont = (fonts) => {
  const body = fonts.options?.body;
  if (body) {
    const font = fonts.fontsData.find((item) => item.id === body.font_id);
    if (font) {
      const fontWeightNameSpaces = {
        100: "Thin",
        200: "Extra Light",
        300: "Light",
        400: "Regular",
        500: "Medium",
        600: "Semi Bold",
        700: "Bold",
        800: "Extra Bold",
        900: "Black",
        regular: "Regular"
      }
      if (font?.variants) {
        const { variants } = font;
        return variants.reduce((accumulator, currentKey) => {
          const label = fontWeightNameSpaces[Object.keys(currentKey)[0]];
          if (label) {
            accumulator.push({
              label,
              value: Object.keys(currentKey)[0] === 'regular' ? 400 : Object.keys(currentKey)[0]
            })
          }
          return accumulator;
        }, [])
      }
    }
  }
  return [
    {
      label: "Normal",
      value: 400
    },
    {
      label: "Bold",
      value: 700
    }
  ];
}

export const getFontWeightValue = (options, value) => {
  if (options) {
    if (value) {
      const findOption = options.find((option) => option.value.toString() === value.toString());
      if (findOption) {
        return findOption;
      }
    }
    return options[0];
  }
  return null;
};