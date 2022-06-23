import React from 'react';
import PropTypes from 'prop-types';
import { PopupMenuItem } from '../../../../../layouts/PopupMenu';

const Categories = ({ categories, onEdit }) => (
  <>
    {categories ? (
      <>
        {categories.map((category, index) => (
          <PopupMenuItem key={index} onClick={() => onEdit(category)}>
            {category.title}
          </PopupMenuItem>
        ))}
      </>
    ) : (
      'No settings'
    )}
  </>
);

Categories.propTypes = {
  categories: PropTypes.array,
  onEdit: PropTypes.func,
};

export default Categories;
