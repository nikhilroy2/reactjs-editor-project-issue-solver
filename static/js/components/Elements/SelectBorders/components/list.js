import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import BorderElement from './element';

import { getBorderItem } from '../config';

const BordersLst = ({
  activeItem, setActiveBorder, setOpen, isOpen,
}) => {
  const nodeList = useRef(null);
  const outSideClick = (e) => {
    if (nodeList.current && nodeList.current.contains(e.target)) {
      return false;
    }
    return setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);
    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const objProps = {
    active: activeItem,
    setActiveBorder,
    setOpen,
    recurs: true,
  };

  return (
    <div className="elements-select_borders_list animated pulse faster" ref={nodeList}>
      {getBorderItem(objProps).map((item, index) => <BorderElement key={index} {...item} />)}
    </div>
  );
};

BordersLst.defaultProps = {
  activeItem: 'none',
};

BordersLst.propTypes = {
  activeItem: PropTypes.string,
  isOpen: PropTypes.bool,
  setActiveBorder: PropTypes.func,
  setOpen: PropTypes.func,
};

export default BordersLst;
