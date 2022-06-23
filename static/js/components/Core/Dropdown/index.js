import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import './_dropdown.scss';
import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({
  uniqueKey, children,
}) => {
  const dropdown = useSelector((state) => state.block.dropdown, shallowEqual);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const outSideClick = (e) => {
    const dropdownNode = document.getElementsByClassName(`node-${dropdown.key}`);

    if (dropdownNode) {
      for (let i = 0; i < dropdownNode.length; i++) {
        if (dropdownNode[i].contains(e.target)) {
          return false;
        }
      }
    }

    const colorLibrary = document.getElementsByClassName('editor__popup-colors-library');
    for (let i = 0; i < colorLibrary.length; i++) {
      if (colorLibrary[i].contains(e.target)) {
        return false;
      }
    }

    document.removeEventListener('mousedown', outSideClick, false);
    dispatch({ type: 'OPEN_DROPDOWN', payload: false });
  };

  if (dropdown && dropdown.key === uniqueKey) {
    document.addEventListener('mousedown', outSideClick, false);
  }

  return (
    <span className={`${dropdown && dropdown.key === uniqueKey ? 'editor__dropdown-menu-open' : ''}`}>
      {children}
    </span>
  );
};

Dropdown.propTypes = {
  uniqueKey: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
};

export default Dropdown;
