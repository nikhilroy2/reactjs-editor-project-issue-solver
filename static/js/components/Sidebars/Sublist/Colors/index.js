import React, { useEffect, useRef } from 'react';
import './_sidebars_colors.scss';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Sidebar, SidebarBody } from '../../../../layouts/Sidebar';

import AddButton from './Add';
import ColorItem from './Color';
import Tooltip from '../../../Elements/Tooltip';

const SidebarColors = ({ onClose }) => {
  const colors = useSelector((state) => state.colors.data);
  const node = useRef(null);
  const nodeList = useRef(null);

  const outSideClick = (e) => {
    const menuNode = document.getElementById('editor__sidebar-menu-item-colors');
    if (menuNode && menuNode.contains(e.target)) {
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

  const sortColors = colors.sort((a, b) => b.id - a.id);

  return (
    <Sidebar ref={node} width={168}>
      <SidebarBody>
        <div className="editor__sidebar-color scrollbar-light">
          <div className="editor__sidebar-color-main">
            <div className="editor__sidebar-color-main-item">
              <div className="editor__sidebar-color-main-item-square">
                <div className="editor__sidebar-color-main-item-square-value" style={{ background: '#fff' }} />
              </div>
            </div>
            <div className="editor__sidebar-color-main-item">
              <div className="editor__sidebar-color-main-item-square">
                <div className="editor__sidebar-color-main-item-square-value" style={{ background: '#000' }} />
              </div>
            </div>
            <div className="editor__sidebar-color-main-item">
              <div className="editor__sidebar-color-main-item-square">
                <div
                  className="editor__sidebar-color-main-item-square-value"
                  style={{ background: 'transparent' }}
                />
              </div>
            </div>
          </div>
          <div className="editor__sidebar-color-main-add">
            <Tooltip text="Add color">
              <AddButton />
            </Tooltip>
          </div>
          <div className="editor__sidebar-color-list" ref={nodeList}>
            {sortColors.map((item, index) => (
              <ColorItem nodeList={nodeList} item={item} key={index} />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

SidebarColors.propTypes = {
  onClose: PropTypes.func,
}

export default SidebarColors;
