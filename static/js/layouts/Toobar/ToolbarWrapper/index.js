import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './_toolbar-wrapper.scss';
import classNames from 'classnames';

const ToolbarWrapper = forwardRef((props, ref) => (
  <div
    className={classNames('editor__toolbar animated fadeIn faster-3 animate-transition-03', {
      [props.className]: props.className,
    })}
    ref={ref}
    style={props.style}
  >
    {props.children}
  </div>
));

ToolbarWrapper.defaultProps = {
  className: '',
};

ToolbarWrapper.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export default ToolbarWrapper;
