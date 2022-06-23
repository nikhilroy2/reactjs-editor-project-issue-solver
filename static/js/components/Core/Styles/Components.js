import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import usePortal from '../../../utils/usePortal';
import { CSSJSON } from '../../../utils/ConvertCssJson';

const Components = () => {
  const components = useSelector((state) => state.components.data);
  const data = useSelector((state) => state.data, () => true);

  const target = usePortal('portal');
  const [blocks, setBlock] = useState({
    isLoading: true,
    id: [],
  });

  useEffect(() => {
    if (data && data.blocks) {
      const ids = [];
      Object.keys(data.blocks).forEach((snippetKey) => {
        const snippet = data.blocks[snippetKey];
        Object.keys(snippet).forEach((id) => {
          if (snippet[id].default_id) {
            ids.push({
              default_id: `${snippet[id].default_id}`,
              id: `${id}`,
            });
          }
        })
      });
      setBlock((prevState) => ({
        ...prevState,
        isLoading: false,
        id: ids,
      }))
    }
    // eslint-disable-next-line
  }, []);

  const createStyles = (components) => {
    let css = '';

    Object.keys(components).forEach((component) => {
      const { styles, title, data } = components[component];
      css += `/* Component [${component}] -  ${title} */ \n`;
      css += CSSJSON.toCSS(styles, null, null, '.body', data, blocks.id);
    });

    return css;
  };

  const css = createStyles(components);

  if (blocks.isLoading) {
    return null;
  }

  return createPortal(<style>{css}</style>, target);
};

export default Components;
