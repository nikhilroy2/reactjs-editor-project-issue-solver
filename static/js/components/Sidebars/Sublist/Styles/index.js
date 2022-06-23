import './_sidebars_styles.scss';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { CSSTransition } from 'react-transition-group';
import { Sidebar, SidebarBody } from '../../../../layouts/Sidebar';
import PreviewCard from '../../../../layouts/PreviewCard';

import { mapStylesSelector } from '../../../../redux/selectors/styles';
import { stylesActiveStyle } from '../../../../redux/actions/Styles';

import ModalSettingsStyles from '../../../Modals/StyleSettings';

const SidebarStyles = ({ onClose }) => {
  const node = useRef(null);
  const styles = useSelector((state) => mapStylesSelector(state));
  const { otherStyles, activeStyle, isFetchingId } = styles;

  const [isOpenSettingsStyle, setOpenSettingsStyle] = useState(false);

  const dispatch = useDispatch();

  const outSideClick = (e) => {
    const menuNode = document.getElementById('editor__sidebar-menu-item-styles');

    if (menuNode && menuNode.contains(e.target)) {
      return false;
    }
    if (isOpenSettingsStyle) {
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
      document.removeEventListener('mousedown', outSideClick, false)
    }
  });

  const onActivate = (id) => () => {
    if (id) {
      dispatch(stylesActiveStyle(id));
    }
  };

  return (
    <Sidebar ref={node}>
      <SidebarBody>
        <div className="editor__sidebar-styles">
          <div className="editor__sidebar-styles-body scrollbar-light">
            <div className="editor__sidebar-styles_header">Active</div>
            <div className="editor__sidebar-styles-body__active">
              <CSSTransition
                in={!isFetchingId}
                timeout={1000}
                classNames={{
                  enter: 'animated',
                  enterActive: 'flipInY',
                }}
              >
                <PreviewCard isFetchingId={isFetchingId} {...activeStyle} onOpenSettings={() => setOpenSettingsStyle(true)} />
              </CSSTransition>
            </div>
            <div className="editor__sidebar-styles_header">Other</div>
            <div className="editor__sidebar-styles-body__other">
              {otherStyles.map((item) => {
                const { title, id, preview } = item;
                return (
                  <PreviewCard
                    id={id}
                    title={title}
                    preview={preview}
                    isFetchingId={isFetchingId}
                    key={id}
                    onClick={onActivate(id)}
                  />
                )
              })}
            </div>
          </div>
        </div>
        {isOpenSettingsStyle ? <ModalSettingsStyles onClose={() => setOpenSettingsStyle(false)} /> : null}
      </SidebarBody>
    </Sidebar>
  )
};

SidebarStyles.propTypes = {
  onClose: PropTypes.func,
};

export default SidebarStyles
