import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import usePortal from '../../../utils/usePortal';
import './_settings_icon.scss';
import { Popover } from '../../../layouts/Popover';
import IconLibrary from './IconLibrary';
import IconStyles from './IconStyles';
import IconMenus from './IconMenus';
import getPosition from '../../../utils/getPosition';

const SettingsIcon = ({
  dataID, rootNode, settingIcon, onClose,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const isOpenColorPicker = useSelector((state) => state.colorPicker.isOpenColorPicker);
  const target = usePortal();
  const node = useRef(null);
  const [position, setPosition] = useState(false);

  const [firstClick, setFirstClick] = useState(false);

  useEffect(() => {
    if (activeTab) {
      setFirstClick(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const outSideClick = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    if (isOpenColorPicker) {
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
    const position = getPosition(rootNode, node, {
      direction: 'center bottom',
      margin: 8,
    });
    setPosition(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <Popover ref={node} position={position}>
      {activeTab === 0 ? (
        <IconMenus
          firstClick={firstClick}
          settingIcon={settingIcon}
          onChangeActiveTab={(value) => setActiveTab(value)}
        />
      ) : null}
      {activeTab === 1 ? (
        <IconLibrary dataID={dataID} settingIcon={settingIcon} onChangeActiveTab={(value) => setActiveTab(value)} />
      ) : null}
      {activeTab === 2 ? (
        <IconStyles settingIcon={settingIcon} dataID={dataID} onChangeActiveTab={(value) => setActiveTab(value)} />
      ) : null}
    </Popover>,
    target,
  );
};

export default SettingsIcon;
