import React from 'react';
import './_wysiwyg_layouts.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Item - Кнопка возврата
 *
 * @component
 * @category Components
 * @subcategory Tooltip layouts
 *
 */
const Item = ({ children, active, ...props }) => (
  <div
    className={classNames('wysiwyg-actions__item', {
      'wysiwyg-actions__item-active': active,
    })}
    {...props}
  >
    {children}
  </div>
);

Item.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
  /**
   * Вложененные дети компонента
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

Item.defaultProps = {
  active: false,
};

export default Item;
