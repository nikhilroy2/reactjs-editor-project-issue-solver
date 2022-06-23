import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './_tooltip.scss';
import classNames from 'classnames';

export const Tooltip = forwardRef((props, ref) => {
  let styles = {};

  if (props.position) {
    styles = {
      ...styles,
      ...props.position,
    };
  }

  return (
    <div
      className={classNames(`editor__tooltip animated zoomInFaster faster-3 ${props.classNames}`)}
      ref={ref}
      style={styles}
    >
      {props.children}
    </div>
  );
});

Tooltip.defaultProps = {
  classNames: '',
};

Tooltip.propTypes = {
  classNames: PropTypes.string,
  position: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export const TooltipBody = ({ children, className }) => <div className={`editor__tooltip-body ${className}`}>{children}</div>;

TooltipBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};
