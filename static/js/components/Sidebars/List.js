import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import { list } from './constants';

const SidebarsList = ({ sidebar, onClose }) => (
  <>
    {list.map((item, index) => {
      switch (item.type) {
        case 'sidebar':
          return (
            <CSSTransition
              in={sidebar === item.value}
              timeout={500}
              key={`sidebar_type_${index}`}
              classNames={{
                enter: 'animated faster-3',
                enterActive: 'slideInLeft',
                exit: 'animated faster-3',
                exitActive: 'slideOutLeft',
              }}
              unmountOnExit
            >
              <item.component onClose={onClose} />
            </CSSTransition>
          );
        case 'modal':
          return sidebar === item.value ? <item.component onClose={onClose} key={`sidebar_type_${index}`} /> : null;
        default:
          return null;
      }
    })}
  </>
);

SidebarsList.propTypes = {
  sidebar: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onClose: PropTypes.func,
};

export default SidebarsList;
