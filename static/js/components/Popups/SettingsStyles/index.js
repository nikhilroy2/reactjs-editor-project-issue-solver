import React, {
  useEffect, useState, useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import usePortal from '../../../utils/usePortal';
import { Popover, PopoverBody, PopoverHeader } from '../../../layouts/Popover';
import getPosition from '../../../utils/getPosition';

import CustomCategories from './Cutom/Categories';
import CustomComponent from './Cutom/Component';
import ComponentCategories from './Component/Categories';
import Component from './Component/Component';

import { PopupMenu } from '../../../layouts/PopupMenu';
import { Animate, AnimateHiddenDiv } from '../../../layouts/Animate';
import { fitsOnScreen } from '../../../utils/helpers';

const SettingsStyles = ({
  deps,
  dataID,
  blockID,
  rootNode,
  action,
  stylesCustom,
  currentComponentCode,
  currentComponentData,
  stylesComponent,
  onClose,
}) => {
  const isOpenColorPicker = useSelector((state) => state.colorPicker.isOpenColorPicker);
  const target = usePortal();
  const node = useRef(null);

  const [editSetting, setEditSetting] = useState(false);
  const [firstClick, setFirstClick] = useState(false);

  useEffect(() => {
    if (editSetting) {
      setFirstClick(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editSetting]);

  const outSideClick = (e) => {
    const isOpenModal = document.getElementById('open-font-modal');
    if (isOpenModal) {
      return false;
    }
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

  const [position, setPosition] = useState(false);
  const [fits, setFits] = useState(false);
  useEffect(() => {
    const position = getPosition(rootNode, node, {
      direction: 'center bottom',
      margin: 8,
    });
    setFits(true);
    setPosition(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootNode]);

  useEffect(() => {
    if (position && fits) {
      const fits = fitsOnScreen(node.current);
      if (!fits.right) {
        const position = getPosition(rootNode, node, {
          direction: 'right bottom',
          margin: 8,
        });
        setPosition(position);
      }
      if (!fits.bottom && fits.top) {
        const position = getPosition(rootNode, node, {
          direction: 'center top',
          margin: 8,
        });
        setPosition(position);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fits]);

  return createPortal(
    <Popover ref={node} position={position}>
      {editSetting ? (
        <>
          {editSetting.type === 'custom' ? (
            <CustomComponent
              rootNode={node}
              dataID={dataID}
              blockID={blockID}
              action={action}
              settings={editSetting.settings}
              onBack={() => setEditSetting(false)}
              onClose={onClose}
            />
          ) : null}
          {editSetting.type === 'component' ? (
            <Component
              rootNode={node}
              dataID={dataID}
              blockID={blockID}
              componentName={action.component}
              currentComponentCode={currentComponentCode}
              currentComponentData={currentComponentData}
              componentData={stylesComponent.data}
              onBack={() => setEditSetting(false)}
              settings={editSetting.settings}
              onClose={onClose}
            />
          ) : null}
        </>
      ) : (
        <>
          <PopoverHeader>
            <Animate animate={firstClick ? 'animated slideInLeft faster-3' : ''}>Edit styles</Animate>
          </PopoverHeader>
          <PopoverBody>
            <AnimateHiddenDiv>
              <Animate animate={firstClick ? 'animated slideInRight faster-3' : ''}>
                <PopupMenu>
                  {stylesCustom ? (
                    <CustomCategories
                      categories={stylesCustom}
                      dataID={dataID}
                      onEdit={(value) => setEditSetting({
                        type: 'custom',
                        settings: value,
                      })}
                    />
                  ) : null}
                  {stylesComponent ? (
                    <ComponentCategories
                      deps={deps}
                      categories={stylesComponent.settings}
                      dataID={dataID}
                      action={action}
                      onEdit={(value) => setEditSetting({
                        type: 'component',
                        settings: value,
                      })}
                    />
                  ) : null}
                </PopupMenu>
              </Animate>
            </AnimateHiddenDiv>
          </PopoverBody>
        </>
      )}
    </Popover>,
    target,
  );
};

export default SettingsStyles;
