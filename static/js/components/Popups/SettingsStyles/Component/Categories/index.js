import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { PopupMenuItem } from '../../../../../layouts/PopupMenu';

const checkStyleComponent = (deps, action, categories) => {
  if (action.component_style && typeof action.component_style !== 'string') {
    if (action.component_style.hasOwnProperty('deps') && action.component_style.deps) {
      const getFromDeps = _.get(deps, action.component_style.deps.if, 'not found');
      if (getFromDeps !== 'not found' && getFromDeps !== null) {
        return action.component_style && categories[action.component_style.deps.value] ? categories[action.component_style.deps.value] : false;
      }
      return action.component_style && categories[action.component_style.deps.fallback] ? categories[action.component_style.deps.fallback] : false;
    }
  }

  return action.component_style && categories[action.component_style] ? categories[action.component_style] : false;
};

const Categories = ({
  onEdit, action, categories, deps,
}) => {
  const componentStyle = checkStyleComponent(deps, action, categories);

  return (
    <>
      {categories && categories.default ? (
        <>
          {categories.default.map((category, index) => (
            <PopupMenuItem key={index} onClick={() => onEdit(category)}>
              {category.title}
            </PopupMenuItem>
          ))}
          {componentStyle ? (
            <>
              {componentStyle.map((category, index) => (
                <PopupMenuItem key={index} onClick={() => onEdit(category)}>
                  {category.title}
                </PopupMenuItem>
              ))}
            </>
          ) : null}
        </>
      ) : (
        ' '
      )}
    </>
  );
};

Categories.propTypes = {
  onEdit: PropTypes.func,
  action: PropTypes.object,
  categories: PropTypes.object,
  deps: PropTypes.object,
};

export default Categories;
