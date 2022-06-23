import './_dropdown.scss';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Menu from '../menu';
import TriangleIndicator from '../../../ui/triangle';
import Tooltip from '../../../../../Elements/Tooltip';

import { getFirstWord } from './helper';

const Dropdown = ({
  children, isOpen, toggleOpen, value,
}) => {
  const node = useRef();

  const outSideClick = (e) => {
    if (isOpen && node.current && !node.current.contains(e.target)) {
      return toggleOpen();
    }

    return false;
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);

    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
  });

  return (
    <div className="fonts-dropdown_menu" ref={node}>
      <DropdownValue toggleOpen={toggleOpen} value={value} />
      {isOpen ? <Menu>{children}</Menu> : null}
    </div>
  );
};

const DropdownValue = ({ toggleOpen, value }) => (
  <div className="fonts-dropdown_menu__list" onClick={toggleOpen}>
    <Tooltip text="Choose language">
      <div className="fonts-dropdown_menu__value">{value ? `${getFirstWord(value.label)}` : 'Select...'}</div>
      <TriangleIndicator />
    </Tooltip>
  </div>
);

DropdownValue.propTypes = {
  toggleOpen: PropTypes.func,
  value: PropTypes.object,
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  toggleOpen: PropTypes.func,
  value: PropTypes.object,
};

export default Dropdown;
