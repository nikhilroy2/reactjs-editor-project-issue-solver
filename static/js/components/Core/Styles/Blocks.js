import React from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import usePortal from '../../../utils/usePortal';
import { CSSJSON } from '../../../utils/ConvertCssJson';

const Blocks = () => {
  const blocks = useSelector((state) => state.data.blocks);
  const componentsList = useSelector((state) => state.components.data);
  const target = usePortal('portal');

  const createStyles = (blocks) => {
    let css = '';

    Object.values(blocks).forEach((snippet) => {
      Object.values(snippet).forEach((data) => {
        css += `/* Block ID:${data.id} styles */ \n`;
        css += CSSJSON.toCSS(data.styles, null, null, `#block_${data.id}`, data.data);

        if (data.deps && data.deps.components) {
          const { components } = data.deps;

          Object.keys(components).forEach((componentName) => {
            const component = components[componentName];
            const componentCode = component.code;
            const componentData = component.data;

            if (component && componentCode && componentData && componentsList[componentCode]) {
              const currentComponent = componentsList[componentCode];
              const currentComponentStyles = currentComponent.styles;
              if (currentComponentStyles) {
                css += `/* Block ID:${data.id} - Component:${componentName} */ \n`;
                css += CSSJSON.toCSS(
                  currentComponentStyles,
                  null,
                  null,
                  `#block_${data.id} .component_${componentName}`,
                  componentData,
                );
              }
            }
          });
        }
      });
    });

    return css;
  };

  const css = createStyles(blocks);

  return createPortal(<style>{css}</style>, target);
};

export default Blocks;
