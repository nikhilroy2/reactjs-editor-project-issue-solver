import React, { forwardRef } from 'react';
import './_sidebar.scss';
import PropTypes from 'prop-types';
import { Header } from './Header';
import { Description } from './Description';

export const Sidebar = forwardRef((props, ref) => {
  const { children, width } = props;

  return (
    <div className="editor__sub-sidebar" ref={ref} style={{ width }}>
      {children}
    </div>
  );
});

Sidebar.defaultProps = {
  width: 380,
};

Sidebar.propTypes = {
  width: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export const SidebarBody = ({ children }) => <div className="editor__sub-sidebar-body">{children}</div>;

SidebarBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export const SidebarHeader = Header;
export const SidebarDescription = Description;
