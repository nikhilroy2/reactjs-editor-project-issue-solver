import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import usePortal from '../../../../utils/usePortal';
import getPosition from '../../../../utils/getPosition';

const Dropdown = forwardRef((props, ref) => {
  const { children, parentNode } = props;

  const target = usePortal();
  const [position, setPosition] = useState(false);

  useEffect(() => {
    const position = getPosition(parentNode, ref, {
      direction: 'right bottom',
      margin: 3,
    });
    setPosition(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div
      className="editor__component-action__dropdown-menu animated zoomInFaster faster-3"
      ref={ref}
      style={{ ...position }}
    >
      {children}
    </div>,
    target,
  );
});

Dropdown.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.node]),
  parentNode: PropTypes.any,
};

export default Dropdown;
