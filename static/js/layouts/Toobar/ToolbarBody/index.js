import React from 'react';
import PropTypes from 'prop-types';
import './_toolbar-body.scss'
import classNames from 'classnames'

const ToolbarBody = ({ children, className }) => (
  <div className={classNames('editor__toolbar-body', {
    [className]: className,
  })}
  >
    { children }
  </div>
);

ToolbarBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  className: PropTypes.string,
};

export default ToolbarBody;
