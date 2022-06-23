import React from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import usePortal from '../../../utils/usePortal';

const Fonts = () => {
  const fonts = useSelector((state) => state.fonts);

  const target = usePortal('portal');

  const getFontData = (fontId) => {
    const { fontsData } = fonts;
    if (fontId) {
      return fontsData.find((item) => Number(item.id) === Number(fontId));
    }
    return null;
  }

  const createStyles = () => {
    let css = '';
    const { options } = fonts;
    Object.keys(options).forEach((option) => {
      const optionItem = options[option];
      const font = getFontData(optionItem.font_id);
      css = `${css}
        ${option === 'body' ? 'html, body' : option} {
          font-size: ${optionItem.size}${optionItem.units};
          font-weight: ${optionItem.weight};
          font-style: ${optionItem.style};`
      if (font) {
        css = `${css}
          font-family: '${font.family}', serif;
        `;
      }
      css = `${css}
      }`;
    })
    return css;
  };

  const css = createStyles();

  return createPortal(<style>{css}</style>, target);
};

export default Fonts;
