import './_component.scss';
import React, {
  useEffect, useState, useRef,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import SettingsCard from '../../Popups/SettingsCard';
import SettingsStyles from '../../Popups/SettingsStyles';
import SettingsLink from '../../Popups/SettingsLink';
import Sortable from '../../Popups/Sortable';
import Menu from '../../Popups/Menu';
import Totals from '../../Popups/Totals';
import Tooltip from '../../Elements/Tooltip';
import { ReactComponent as IconMore } from '../../../assets/img/actions/more.svg';
import { ReactComponent as IconSettings } from '../../../assets/img/actions/settings.svg';
import { ReactComponent as IconStyles } from '../../../assets/img/actions/styles.svg';
import { ReactComponent as IconSetDefault } from '../../../assets/img/actions/set_default.svg';
import { ReactComponent as IconDuplicate } from '../../../assets/img/actions/duplicate.svg';
import { ReactComponent as IconSortable } from '../../../assets/img/actions/sortable.svg';
import { ReactComponent as IconDelete } from '../../../assets/img/actions/delete.svg';
import { ReactComponent as IconLink } from '../../../assets/img/wysiwyg/link.svg';
import {
  getActionPosition, getComponent, getDeps, newWysiwygID,
} from './helper';
import { dataComponentSetDefault } from '../../../redux/actions/data/deps';
import { getParentKey, getObjectSource, getSourceValue } from '../../../utils/SourceValue';
import Methods from '../../../utils/Methods/index';
import { dataChangeValues } from '../../../redux/actions/data/update';
import Dropdown from './Dropdown';

const Component = ({
  blockID, dataID, domElement,
}) => {
  const dispatch = useDispatch();
  const isOpenColorPicker = useSelector((state) => state.colorPicker.isOpenColorPicker);
  const position = getActionPosition(domElement.actions);

  const data = getComponent(dataID, domElement.actions);
  const deps = getDeps(dataID, domElement.actions);

  const settings = domElement.actions && domElement.actions.settings ? domElement.actions.settings : false;
  const menu = domElement.actions && domElement.actions.menu ? domElement.actions.menu : false;
  const totals = domElement.actions && domElement.actions.totals ? domElement.actions.totals : false;
  const stylesCustom = domElement.actions && domElement.actions.custom ? domElement.actions.custom : false;
  const stylesComponent = domElement.actions && domElement.actions.component ? domElement.actions.component : false;
  const deleteAction = domElement.actions && domElement.actions.delete ? domElement.actions.delete : false;
  const copyAction = domElement.actions && domElement.actions.copy ? domElement.actions.copy : false;
  const defaultAction = domElement.actions && domElement.actions.default ? domElement.actions.default : false;
  const sortable = domElement.actions && domElement.actions.sortable ? domElement.actions.sortable : false;
  const create = domElement.actions && domElement.actions.create ? domElement.actions.create : false;
  const link = domElement.actions && domElement.actions.link ? domElement.actions.link : false;

  const nodeDropdown = useRef(null);
  const dropdownNode = useRef(null);

  const [access, setAccess] = useState({
    isActiveComponent: false,
    isOpenDropdown: false,
    popup: '',
  })
  const { popup, isActiveComponent, isOpenDropdown } = access;

  const onOpenDropdown = () => {
    if (!isOpenDropdown) {
      setAccess(((prevState) => ({
        ...prevState,
        isOpenDropdown: true,
      })))
    }
  };

  const onCloseDropdown = () => {
    setAccess(((prevState) => ({
      ...prevState,
      isOpenDropdown: false,
    })))
  };

  const outSideClickDropdown = (e) => {
    if (dropdownNode.current && dropdownNode.current.contains(e.target)) {
      return false;
    }
    if (nodeDropdown.current && nodeDropdown.current.contains(e.target)) {
      return false;
    }
    return setAccess(((prevState) => ({
      ...prevState,
      isOpenDropdown: false,
    })))
  };

  useEffect(() => {
    if (isOpenDropdown) {
      document.addEventListener('mousedown', outSideClickDropdown, false);
    }
    return () => {
      document.removeEventListener('mousedown', outSideClickDropdown, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenDropdown]);

  const node = useRef(null);

  const setDefaultDataComponent = () => {
    if (defaultAction) {
      if (defaultAction.custom) {
        if (defaultAction.custom.from && defaultAction.custom.to) {
          const { from, to } = defaultAction.custom;

          if (from.source && to.source) {
            const defaultData = getSourceValue(from.source, dataID);
            const keys = getParentKey(to.source);

            if (keys.currentPath === 'default' || keys.currentPath === false) {
              console.log('default');
            } else {
              const data = Methods.getData(dataID) ? _.cloneDeep(Methods.getData(dataID).data) : false;

              if (data) {
                const newData = getObjectSource(data, keys.currentPath);
                newData[keys.currentKey] = _.cloneDeep(defaultData);
                dispatch(dataChangeValues(data[keys.parentKey], keys.parentKey, dataID));
              }
            }
          }
        }
      }

      if (defaultAction.component) {
        const componentName = domElement.actions.component;
        if (stylesComponent && componentName) {
          dispatch(dataComponentSetDefault(dataID, blockID, componentName));
        }
      }
    }
    onCloseDropdown();
  };

  const onDelete = () => {
    if (deleteAction) {
      const keys = getParentKey(deleteAction.source);
      const data = Methods.getData(dataID);

      if (keys.currentPath === 'default' || keys.currentPath === false) {
        const data = Methods.getData(dataID);
        const newData = _.cloneDeep(data.data);
        newData[keys.parentKey].splice(keys.currentKey, 1);
        dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
      } else {
        const newData = _.cloneDeep(data.data);
        const itemsArray = getObjectSource(newData, keys.currentPath);

        if (itemsArray && itemsArray[keys.currentKey]) {
          itemsArray.splice(keys.currentKey, 1);
        }
        dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
      }
    }

    onCloseDropdown();
  };

  const onCopy = () => {
    if (copyAction) {
      const keys = getParentKey(copyAction.source);
      const data = Methods.getData(dataID);
      if (keys.currentPath === 'default' || keys.currentPath === false) {
        const newData = _.cloneDeep(data.data);
        const newItem = _.cloneDeep(newData[keys.parentKey][keys.currentKey]);
        const item = newWysiwygID(newItem);
        newData[keys.parentKey].push(item);
        dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
      } else {
        const newData = _.cloneDeep(data.data);
        const itemsArray = getObjectSource(newData, keys.currentPath);

        if (itemsArray && itemsArray[keys.currentKey]) {
          const item = newWysiwygID(itemsArray[keys.currentKey]);
          itemsArray.splice(keys.currentKey, 0, _.cloneDeep(item));
          newWysiwygID(itemsArray[keys.currentKey]);
        }

        dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
      }
    }

    onCloseDropdown();
  };

  const onActiveComponent = () => {
    if (!isActiveComponent) {
      setAccess((prevState) => ({
        ...prevState,
        isActiveComponent: true,
      }))
    }
  };

  const outSideActiveComponent = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    if (popup) {
      return false;
    }
    if (isOpenColorPicker) {
      return false;
    }

    return setAccess(((prevState) => ({
      ...prevState,
      popup: '',
      isActiveComponent: false,
    })))
  };

  useEffect(() => {
    if (isActiveComponent) {
      document.addEventListener('mousedown', outSideActiveComponent, false);
    }
    return () => {
      document.removeEventListener('mousedown', outSideActiveComponent, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveComponent, popup]);

  const onOpenPopup = (popupKey) => {
    setAccess((prevState) => ({
      ...prevState,
      popup: popupKey,
    }))
  }

  const onClosePopups = () => {
    setAccess((prevState) => ({
      ...prevState,
      isActiveComponent: false,
      popup: '',
    }))
  }

  const {
    currentComponentID, currentComponentCode, currentComponentData, component,
  } = data;

  return (
    <>
      <div
        className={classNames('editor__component-action', {
          'editor__component-active': isActiveComponent,
          ...position.classNames,
        })}
        onClick={onActiveComponent}
      >
        <div className="editor__component-action__body" {...position.styles} ref={node}>
          <div className="editor__component-action__body-border-hidden" />
          <div className="editor__component-action__body-title">
            {stylesComponent ? component.title : domElement.actions.title || '...'}
          </div>
          <div className="editor__component-action__body-list">
            {stylesCustom || stylesComponent ? (
              <Tooltip text="Styles" offset={6}>
                <div className="editor__component-action__body-list-item" onClick={() => onOpenPopup('styles')}>
                  <IconStyles />
                </div>
              </Tooltip>
            ) : null}
            {settings ? (
              <Tooltip text="Settings" offset={6}>
                <div className="editor__component-action__body-list-item" onClick={() => onOpenPopup('settings')}>
                  <IconSettings />
                </div>
              </Tooltip>
            ) : null}
            {menu ? (
              <Tooltip text="Settings" offset={6}>
                <div className="editor__component-action__body-list-item" onClick={() => onOpenPopup('menu')}>
                  <IconSettings />
                </div>
              </Tooltip>
            ) : null}
            {totals ? (
              <Tooltip text="Settings" offset={6}>
                <div className="editor__component-action__body-list-item" onClick={() => onOpenPopup('totals')}>
                  <IconSettings />
                </div>
              </Tooltip>
            ) : null}
            {copyAction ? (
              <Tooltip text="Duplicate" offset={6}>
                <div className="editor__component-action__body-list-item" onClick={onCopy}>
                  <IconDuplicate />
                </div>
              </Tooltip>
            ) : null}
            {link ? (
              <Tooltip text="Link" offset={6}>
                <div className="editor__component-action__body-list-item" onClick={() => onOpenPopup('link')}>
                  <IconLink />
                </div>
              </Tooltip>
            ) : null}
            {sortable ? (
              <Tooltip text="Sortable" offset={6}>
                <div className="editor__component-action__body-list-item" onClick={() => onOpenPopup('sortable')}>
                  <IconSortable />
                </div>
              </Tooltip>
            ) : null}
            {deleteAction ? (
              <Tooltip text="Delete" offset={6}>
                <div className="editor__component-action__body-list-item" onClick={() => onDelete()}>
                  <IconDelete />
                </div>
              </Tooltip>
            ) : null}
          </div>
          {defaultAction ? (
            <div className="editor__component-action__body-more" ref={nodeDropdown}>
              <IconMore
                onClick={onOpenDropdown}
                className="editor__component-action__body-more-icon"
              />
              {isOpenDropdown ? (
                <Dropdown ref={dropdownNode} parentNode={node}>
                  <div className="editor__component-action__dropdown-menu-list">
                    {defaultAction ? (
                      <div
                        className="editor__component-action__dropdown-menu-list-item"
                        onClick={() => setDefaultDataComponent(currentComponentID)}
                      >
                        <div className="editor__component-action__dropdown-menu-list-icon">
                          <IconSetDefault />
                        </div>
                        Reset styles
                      </div>
                    ) : null}
                  </div>
                </Dropdown>
              ) : null}
            </div>
          ) : (
            <div>&nbsp;&nbsp;</div>
          )}
        </div>
      </div>
      <div
        className={classNames(
          'editor__component-action__borders editor__component-action__borders-top',
          {
            'editor__component-active-borders': isActiveComponent,
          },
        )}
      />
      <div
        className={classNames(
          'editor__component-action__borders editor__component-action__borders-bottom',
          {
            'editor__component-active-borders': isActiveComponent,
          },
        )}
      />
      <div
        className={classNames(
          'editor__component-action__borders editor__component-action__borders-left',
          {
            'editor__component-active-borders': isActiveComponent,
          },
        )}
      />
      <div
        className={classNames(
          'editor__component-action__borders editor__component-action__borders-right',
          {
            'editor__component-active-borders': isActiveComponent,
          },
        )}
      />
      {popup === 'menu' ? (
        <Menu
          dataID={dataID}
          blockID={blockID}
          rootNode={node}
          menuSettings={domElement.actions.menu}
          onClose={onClosePopups}
        />
      ) : null}
      {popup === 'totals' ? (
        <Totals
          dataID={dataID}
          blockID={blockID}
          rootNode={node}
          totals={domElement.actions.totals}
          onClose={onClosePopups}
        />
      ) : null}
      {popup === 'styles' ? (
        <SettingsStyles
          deps={deps}
          dataID={dataID}
          blockID={blockID}
          rootNode={node}
          action={domElement.actions}
          currentComponentCode={currentComponentCode}
          currentComponentData={currentComponentData}
          stylesCustom={stylesCustom}
          stylesComponent={component}
          onClose={onClosePopups}
        />
      ) : null}
      {popup === 'settings' ? (
        <SettingsCard
          dataID={dataID}
          rootNode={node}
          action={domElement.actions}
          settings={settings}
          onClose={onClosePopups}
        />
      ) : null}
      {popup === 'sortable' ? (
        <Sortable
          dataID={dataID}
          rootNode={node}
          action={domElement.actions}
          sortable={sortable}
          create={create}
          onClose={onClosePopups}
        />
      ) : null}
      {popup === 'link' ? (
        <SettingsLink
          value={link}
          rootNode={node}
          dataID={dataID}
          onClose={onClosePopups}
        />
      ) : null}
    </>
  );
};

Component.propTypes = {
  blockID: PropTypes.number,
  dataID: PropTypes.number,
  domElement: PropTypes.object,
};

export default Component;
