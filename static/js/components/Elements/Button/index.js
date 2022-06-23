import React from 'react';
import PropTypes from 'prop-types';
import './_button.scss';
import classNames from 'classnames';

const Button = ({
  children, size, className, ...props
}) => (
  <button
    className={classNames('editor__button', {
      [className]: className,
      'editor__button-sm': size === 'sm',
      'editor__button-md': size === 'md',
      'editor__button-lg': size === 'lg',
      'editor__button-xs': size === 'xs',
    })}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = {
  size: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  className: PropTypes.string,
};

Button.defaultProps = {
  size: 'sm',
};

export default Button;
