import React from 'react';
import PropTypes from 'prop-types';
import './_popup-menu.scss';
import { ReactComponent as Arrow } from '../../assets/img/arrow-next.svg';

import Tooltip from '../../components/Elements/Tooltip';

export const PopupMenu = ({ children }) => <div className="editor__popup-menu">{children}</div>;

PopupMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export const PopupMenuItem = ({ children, ...props }) => (
  <div className="editor__popup-menu-item" {...props}>
    {children}
    <div className="editor__popup-menu-item-arrow">
      <Tooltip text="Edit">
        <Arrow />
      </Tooltip>
    </div>
  </div>
);

PopupMenuItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};
