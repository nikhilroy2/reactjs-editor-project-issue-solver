import React from 'react';
import PropTypes from 'prop-types';
import './_wysiwyg_layouts.scss';

/**
 * Wrapper - Контейнер для списков <Items>
 *
 * @component
 * @category Components
 * @subcategory Tooltip layouts
 *
 */
const Wrapper = ({ children }) => (
  <div className="wysiwyg-actions">{children}</div>
);

Wrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export default Wrapper;
