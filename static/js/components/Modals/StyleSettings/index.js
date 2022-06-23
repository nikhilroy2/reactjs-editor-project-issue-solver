import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import usePortal from '../../../utils/usePortal';
import { Modal } from '../../../layouts/Modal';
import ListStyleComponents from './List';
import Component from './Component';

const StyleSettings = ({ onClose }) => {
  const target = usePortal();
  const node = useRef(null);
  const [openComponent, setOpenComponent] = useState(false);
  const isOpenColorPicker = useSelector((state) => state.colorPicker.isOpenColorPicker);

  const outSideClick = (e) => {
    const isOpenModal = document.getElementById('open-font-modal');

    if (isOpenColorPicker) {
      return false;
    }

    if (isOpenModal) {
      return false;
    }

    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    return onClose(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);
    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
  });

  const [firstClick, setFirstClick] = useState(false);
  useEffect(() => {
    if (openComponent) {
      setFirstClick(true);
    }
  }, [openComponent]);

  return createPortal(
    <Modal ref={node}>
      {openComponent ? (
        <Component component={openComponent} onOpenList={() => setOpenComponent(false)} onClose={onClose} />
      ) : (
        <ListStyleComponents
          firstClick={firstClick}
          onOpenComponent={(value) => setOpenComponent(value)}
          onClose={onClose}
        />
      )}
    </Modal>,
    target,
  );
};

export default StyleSettings;
