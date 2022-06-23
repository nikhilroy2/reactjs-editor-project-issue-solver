import React, {
  useEffect, useRef, memo, useState,
} from 'react';
import './_sidebar-fonts.scss'
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Sidebar, SidebarBody,
} from '../../../../layouts/Sidebar';
import List from './FontsList'
import EditFont from './FontsEdit'
import { Animate } from '../../../../layouts/Animate';
import Spinner from '../../../../layouts/Loaders/Spinner';
import { fontsReset } from '../../../../redux/actions/Fonts';

const SidebarFonts = ({ onClose }) => {
  const dispatch = useDispatch();
  const node = useRef(null);
  const [showFont, setShowFont] = useState('list');
  const { isLoadingSidebar } = useSelector((state) => state.fonts);

  const outSideClick = (e) => {
    if (isLoadingSidebar) {
      return false;
    }

    const menuNode = document.getElementsByClassName('editor__popup-colors-library');
    if (menuNode && menuNode.length && menuNode[0].contains(e.target)) {
      return false;
    }
    const modalNode = document.getElementsByClassName('editor__modal-content');
    if (modalNode && modalNode.length) {
      return false;
    }

    const activeMenu = document.getElementsByClassName('editor__sidebar-menu-item-active');
    if (activeMenu && activeMenu.length && activeMenu[0].contains(e.target)) {
      return false;
    }

    if (node.current && node.current.contains(e.target)) {
      return false;
    }

    return onClose(false);
  };

  const [firstRender, setFirstRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setFirstRender(true)
    }, 500)
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);

    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
  });

  const onChangeShow = (value) => {
    setShowFont(value)
  };

  const onResetFonts = (component_code) => {
    dispatch(fontsReset(component_code))
  };

  return (
    <Sidebar ref={node}>
      <SidebarBody>
        <div className="editor-sidebar__fonts-wrapper">
          {isLoadingSidebar
            ? (
              <div className="editor-sidebar__fonts-loader">
                <Spinner theme="dark" />
              </div>
            ) : null}
          {showFont === 'edit'
            ? (
              <Animate animate="animated slideInRight faster-3">
                <EditFont
                  onChangeShow={onChangeShow}
                  onResetFonts={onResetFonts}
                />
              </Animate>
            ) : null}
          {showFont === 'list'
            ? (
              <Animate animate={firstRender ? 'animated slideInLeft faster-3' : ''}>
                <List
                  onChangeShow={onChangeShow}
                />
              </Animate>
            ) : null}
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

SidebarFonts.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default memo(SidebarFonts);
