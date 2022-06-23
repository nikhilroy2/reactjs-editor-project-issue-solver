import store from '../store';

const cache = [];

const fontWeight = ['normal', 'bold', 'bolder', 'regular', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
const fontStyle = ['italic', 'normal', 'oblique'];

const createRootElement = () => {
  const rootContainer = document.createElement('div');
  rootContainer.setAttribute('id', 'fonts-styles');
  return rootContainer;
};

const addRootElement = () => {
  const element = createRootElement();
  document.body.insertBefore(
    element,
    document.body.lastElementChild.nextElementSibling,
  );
};

const getWeightStyle = (key) => {
  const options = {
    fontStyle: 'normal',
    fontWeight: '400',
  };
  if (key) {
    for (let i = 0; i < fontWeight.length; i++) {
      const font = fontWeight[i];
      if (key.indexOf(font) !== -1) {
        options.fontWeight = font === 'regular' ? '400' : font;
      }
    }
    for (let i = 0; i < fontStyle.length; i++) {
      const font = fontStyle[i];
      if (key.indexOf(font) !== -1) {
        options.fontStyle = font;
      }
    }
  }
  return options;
};

const appendNode = (font) => {
  const fontsNode = document.getElementById('fonts-styles');
  const styleNode = document.createElement('style');
  const { variants } = font;

  let mainStyle = '';

  const family = `"${font.family}"`;

  for (let i = 0; i < variants.length; i++) {
    for (const key in variants[i]) {
      if (variants[i].hasOwnProperty(key)) {
        const fontOptions = getWeightStyle(key);
        const style = `
        @font-face {
          font-family: ${family};
          font-style: ${fontOptions.fontStyle};
          font-weight: ${fontOptions.fontWeight};
          font-display: swap;
          src: url(${variants[i][key].source_link}) format('woff');
        }`;
        mainStyle = `${mainStyle} ${style}`
      }
    }
  }
  if (fontsNode) {
    styleNode.innerHTML = `${mainStyle}`;
    fontsNode.appendChild(styleNode);
  }
};

export default (id) => {
  const state = store.getState();
  const fonts = state.fonts.fontsData;

  const fontsNode = document.getElementById('fonts-styles');
  if (!fontsNode) {
    addRootElement();
  }

  fonts.forEach((font) => {
    if (Number(font.id) === Number(id)) {
      const id = Number(font.id);
      if (cache.indexOf(id) === -1) {
        cache.push(font.id);
        appendNode(font)
      }
    }
  })
};
