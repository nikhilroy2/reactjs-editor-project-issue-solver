import React from 'react';
import './_button-wrapper.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * ButtonWrapper - обертка для кнопок
 *
 * @component
 * @category Components
 * @subcategory Tooltip layouts
 *
 */
const ButtonWrapper = ({
  children, select, active, ...props
}) => (
  <div
    className={classNames('editor__toolbar-buttons-wrapper', {
      'editor__toolbar-buttons-wrapper-active': active,
    })}
    {...props}
  >
    {select ? <div className="editor__toolbar-buttons-wrapper-select">{children}</div> : children}
  </div>
);

ButtonWrapper.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
  /**
   * Кнопка является селектом
   */
  select: PropTypes.bool,
  /**
   * Вложенные дети компонента
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

ButtonWrapper.defaultProps = {
  active: false,
};

export default ButtonWrapper;
