/* eslint-disable */
import './_fontsmanager.scss';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import usePortal from 'react-useportal';

import { useSelector } from 'react-redux';
import MyFonts from './body/myFonts';
import GoogleFonts from './body/googleFonts';
import { Modal, ModalHeader, ModalBody } from '../../../layouts/Modal';
import { Swipe, SwipeItem } from '../../../layouts/Swipe';
import Tabs from '../../../layouts/Tabs';

import { tabs, backgroundStyles, tabWidth } from './config';

const Fontsmanager = ({ onClose }) => {
  const node = useRef(null);
  const [activeTab, setActiveTab] = useState({ width: '88px', tab: 0 });
  const [isNewChange, setNewChange] = useState(false);
  const fonts = useSelector((state) => state.fonts);
  const { tab } = activeTab;
  const { Portal } = usePortal();

  const outSideClick = (e) => {
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

  useEffect(() => {
    if (fonts.success) {
      setNewChange(true);
    }
  }, [fonts.success]);

  useEffect(() => {
    if (tab === 0) {
      setNewChange(false);
    }
  }, [tab]);

  return (
    <Portal>
      <Modal ref={node} width={743}>
        <ModalHeader onClose={onClose}>Fonts library</ModalHeader>
        <ModalBody>
          <div className="editor__tabs-container">
            <GoogleFonts />
          </div>
        </ModalBody>
      </Modal>
    </Portal>
  );
};

Fontsmanager.propTypes = {
  onClose: PropTypes.func,
};

export default Fontsmanager;
