export const getFontPairsList = (pairs, fontsData) => {
  if (pairs && fontsData) {
    return pairs.map((pair) => {
      const { headers, body } = pair;
      const fontHeader = fontsData.find((item) => Number(item.id) === Number(headers.font_id));
      const fontBody = fontsData.find((item) => Number(item.id) === Number(body.font_id));
      return {
        headers: {
          ...headers,
          font: fontHeader,
        },
        body: {
          ...body,
          font: fontBody,
        },
      }
    })
  }
  return []
};

export const getFontActive = (options, fontsData) => {
  if (options) {
    const { body, h1 } = options;
    if (body && h1) {
      const fontHeader = fontsData.find((item) => Number(item.id) === Number(h1.font_id));
      const fontBody = fontsData.find((item) => Number(item.id) === Number(body.font_id));
      return {
        headers: {
          ...h1,
          font: fontHeader,
        },
        body: {
          ...body,
          font: fontBody,
        },
      }
    }
  }
  return null
};

export const getFontsOptions = (activeFonts, fontsData) => {
  if (activeFonts && fontsData) {
    return activeFonts.filter((v, i, a) => a.findIndex((t) => (t.font_id === v.font_id)) === i).map((item) => {
      const findItem = fontsData.find((defaultFont) => defaultFont.id === item.font_id);
      return {
        label: findItem.family,
        value: findItem.id,
      }
    })
  }
  return []
}

export const getFontWeightOptions = (option) => {
  const fontWeightNameSpaces = {
    100: 'Thin',
    200: 'Extra Light',
    300: 'Light',
    400: 'Regular',
    500: 'Medium',
    600: 'Semi Bold',
    700: 'Bold',
    800: 'Extra Bold',
    900: 'Black',
    regular: 'Regular',
  }
  if (option?.font?.variants) {
    const { variants } = option.font;
    return variants.reduce((accumulator, currentKey) => {
      const label = fontWeightNameSpaces[Object.keys(currentKey)[0]];
      if (label) {
        accumulator.push({
          label,
          value: Object.keys(currentKey)[0] === 'regular' ? 400 : Object.keys(currentKey)[0],
        })
      }
      return accumulator;
    }, [])
  }
  return [
    {
      label: 'Normal',
      value: 400,
    },
    {
      label: 'Bold',
      value: 700,
    },
  ];
}

export const getFontSelectValue = (options, value) => {
  const findValue = options.find((option) => `${option.value}` === `${value}`);
  if (findValue) {
    return findValue
  }
  return null;
}

export const getTypographyComponent = (components) => {
  if (components) {
    const componentKey = Object.keys(components).find((componentKey) => components[componentKey].title === 'Typography');
    if (componentKey) {
      return {
        key: componentKey,
        data: components[componentKey].data,
      }
    }
  }
  return null;
}
