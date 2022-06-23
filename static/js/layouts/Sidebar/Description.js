import React from 'react';
import PropTypes from 'prop-types';

export const Description = ({ children }) => (
  <div className="editor__sub-sidebar-description">
    {children}
  </div>
)

Description.defaultProps = {};

Description.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};
