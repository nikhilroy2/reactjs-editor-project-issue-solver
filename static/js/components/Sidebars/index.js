import './_sidebar.scss';
import React, { useEffect, memo } from 'react';
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import SubSidebarsList from './List';
import Tooltip from '../Elements/Tooltip';
import { ReactComponent as IconArrowBack } from '../../assets/img/arrow-back.svg';
import Publish from './Publish';
import { sidebarChange } from '../../redux/actions/Sidebar';

import { list } from './constants';

/**
 * Sidebar
 *
 * @component
 * @category Components
 * @subcategory Sidebar main
 *
 */
const Sidebar = () => {
  const dispatch = useDispatch();
  const sidebar = useSelector((state) => state.sidebar.data);

  const onClose = () => {
    dispatch(sidebarChange(false));
  };

  const onOpenSidebar = (value) => {
    if (value !== sidebar) {
      dispatch(sidebarChange(value));
    }
  };

  useEffect(() => () => dispatch(sidebarChange(false)), [dispatch]);

  return (
    <div className="editor__sidebar">
      <div className="editor__sidebar-body">
        <div className="editor__sidebar-header">
          <a href="/admin/appearance/themes">
            <Tooltip text="Themes">
              <div className="editor__sidebar-header-back animate-transition-05">
                <IconArrowBack />
              </div>
            </Tooltip>
          </a>
        </div>
        <div className="editor__sidebar-menu">
          {list.map((item, index) => (
            <div
              className={classNames('editor__sidebar-menu-item animate-transition-05', {
                'editor__sidebar-menu-item-active': sidebar === item.value,
              })}
              id={`editor__sidebar-menu-item-${item.value}`}
              key={`sidebar-${index}`}
              onClick={() => onOpenSidebar(item.value)}
            >
              <div>
                <div className="editor__sidebar-menu-item-icon">{item.icon}</div>
                <div className="editor__sidebar-menu-item-title animate-transition-05">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="editor__sidebar-footer">
          <Publish />
        </div>
      </div>
      <SubSidebarsList sidebar={sidebar} onClose={onClose} />
    </div>
  );
};

Sidebar.propTypes = {};

Sidebar.defaultProps = {};

export default memo(Sidebar);
