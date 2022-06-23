import React from 'react';
import PropTypes from 'prop-types';

export const Header = ({ children }) => (
  <div className="editor__sub-sidebar-title">
    {children}
  </div>
)

Header.defaultProps = {};

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};
