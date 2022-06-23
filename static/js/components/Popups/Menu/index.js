import React, { useEffect, useState, useRef } from 'react';
import './_menu.scss';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import arrayMove from 'array-move';
import PropTypes from 'prop-types';
import usePortal from '../../../utils/usePortal';
import { Popover } from '../../../layouts/Popover';
import { depsChangeValues } from '../../../redux/actions/data/deps';
import Methods from '../../../utils/Methods/index';
import getPosition from '../../../utils/getPosition';
import { getParentKey, getSourceValue } from '../../../utils/SourceValue';
import MenuList from './List';
import EditMenu from './EditMenu';
import Loader from '../SettingsPage/Component/loader';
import {
  menuAddItem, menuUpdateItem, menuDeleteItem, menuSortableItems,
} from '../../../services/urls/deps/menu';
import Notification from '../../../utils/Notifications';
import { fitsOnScreen } from '../../../utils/helpers';

const defaultDataMenu = {
  id: null,
  name: '',
  icon: 'far fa-image',
  icon_visibility: true,
  is_delete: false,
  position: 1,
  badge: null,
  active: false,
  url: {
    type: 'internal',
    value: '',
  },
};

const Menu = ({
  dataID, menuSettings, rootNode, onClose,
}) => {
  const dispatch = useDispatch();
  const pages = useSelector((state) => state.pages);
  const list = getSourceValue(menuSettings.source, dataID);

  const target = usePortal();
  const node = useRef(null);

  const [menu, setMenu] = useState({
    isLoading: false,
    dataForm: false,
    error: false,
  });

  const outSideClick = (e) => {
    const nodeIconSelect = document.getElementById('editor-icon-select');
    if (nodeIconSelect) {
      return false;
    }
    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    document.removeEventListener('mousedown', outSideClick, false);
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

  const loading = (value) => {
    setMenu((prevState) => ({
      ...prevState,
      isLoading: value,
      error: false,
    }))
  };

  const onSaveChanges = async (form) => {
    if (form) {
      loading(true)

      const {
        id, name, url, icon, icon_visibility,
      } = form;
      const { activePage } = pages;

      const keys = getParentKey(menuSettings.source);
      const data = _.cloneDeep(Methods.getDeps(dataID));

      const addMenu = async () => {
        const requestData = {
          name,
          url,
          icon,
          icon_visibility,
          public: activePage.public,
        }

        try {
          const response = await menuAddItem(requestData);

          if (keys.currentPath === 'default' || keys.currentPath === false) {
            if (data[keys.parentKey]) {
              const newData = data[keys.parentKey];
              if (_.isArray(newData)) {
                newData.push(response.data.data);
                dispatch(depsChangeValues(newData, keys.parentKey, dataID, false));
              }
            }
          }

          setMenu(((prevState) => ({
            ...prevState,
            isLoading: false,
            dataForm: false,
            error: false,
          })))
        } catch (e) {
          if (e.response && e.response.data) {
            const { data } = e.response;
            if (data && data.error_message) {
              setMenu((prevState) => ({
                ...prevState,
                isLoading: false,
                error: data.error_message,
              }))
            }
          }
        }
      };
      const updateMenu = async () => {
        try {
          const requestData = {
            ...form,
            public: activePage.public,
          }

          await menuUpdateItem(requestData, id);

          if (keys.currentPath === 'default' || keys.currentPath === false) {
            if (data[keys.parentKey]) {
              const newData = data[keys.parentKey];
              if (_.isArray(newData)) {
                const findIndex = newData.findIndex((item) => Number(item.id) === Number(id));
                if (findIndex !== -1) {
                  newData[findIndex] = requestData;
                  dispatch(depsChangeValues(newData, keys.parentKey, dataID, false));
                }
              }
            }
          }

          setMenu(((prevState) => ({
            ...prevState,
            isLoading: false,
            dataForm: false,
            error: false,
          })))
        } catch (e) {
          if (e.response && e.response.data) {
            const { data } = e.response;
            setMenu((prevState) => ({
              ...prevState,
              isLoading: false,
              error: data && data.error_message ? data.error_message : 'Update error',
            }))
          }
        }
      }

      if (id) {
        await updateMenu();
      } else {
        await addMenu();
      }
    }
  };

  const onStartEnd = async (oldIndex, newIndex) => {
    if (oldIndex !== newIndex) {
      const keys = getParentKey(menuSettings.source);
      const data = _.cloneDeep(Methods.getDeps(dataID));
      const { activePage } = pages;

      try {
        const requestData = {
          public: activePage.public,
        }

        if (keys.currentPath === 'default' || keys.currentPath === false) {
          if (data[keys.parentKey]) {
            const newData = data[keys.parentKey];
            if (_.isArray(newData)) {
              const sortedMenu = await arrayMove(newData, oldIndex, newIndex);
              requestData.positions = sortedMenu.map((menu, index) => ({
                id: menu.id,
                position: index,
              }))
              dispatch(depsChangeValues(sortedMenu, keys.parentKey, dataID, false));

              await menuSortableItems(requestData);
            }
          }
        }
      } catch (e) {
        if (e.response && e.response.data) {
          const { data } = e.response;
          if (data && data.error_message) {
            Notification.onError(data.error_message);
          }
        }
      }
    }
  };

  const onDelete = async (id) => {
    if (id) {
      loading(true)
      try {
        const response = await menuDeleteItem(id);

        if (response && response.data && response.data.data) {
          const keys = getParentKey(menuSettings.source);
          const data = _.cloneDeep(Methods.getDeps(dataID));

          if (keys.currentPath === 'default' || keys.currentPath === false) {
            if (data[keys.parentKey]) {
              const newData = response.data.data;
              if (_.isArray(newData)) {
                dispatch(depsChangeValues(newData, keys.parentKey, dataID, false));

                setMenu(((prevState) => ({
                  ...prevState,
                  isLoading: false,
                  dataForm: false,
                  error: false,
                })))
              }
            }
          }
        }
      } catch (e) {
        if (e.response && e.response.data) {
          const { data } = e.response;
          if (data && data.error_message) {
            setMenu((prevState) => ({
              ...prevState,
              isLoading: false,
              error: data.error_message,
            }))
          }
        }
      }
    }
  };

  const onAddMenu = () => {
    setMenu((prevState) => ({
      ...prevState,
      dataForm: defaultDataMenu,
    }))
  };

  const onEditMenu = (dataForm) => {
    if (dataForm) {
      setMenu((prevState) => ({
        ...prevState,
        dataForm,
      }))
    }
  };

  const onBack = () => {
    setMenu((prevState) => ({
      ...prevState,
      dataForm: false,
    }))
  };

  return createPortal(
    <Popover ref={node} position={position}>
      {menu.isLoading
        ? (
          <div className="popover-loader">
            <Loader />
          </div>
        ) : null}
      {!menu.dataForm
        ? (
          <MenuList
            isFirstOpen={position}
            list={list}
            onSort={onStartEnd}
            onAddMenu={onAddMenu}
            onChangeSettings={onEditMenu}
          />
        )
        : (
          <EditMenu
            data={menu.dataForm}
            error={menu.error}
            list={list}
            onSaveChanges={onSaveChanges}
            onDelete={onDelete}
            onBack={onBack}
          />
        )}
    </Popover>,
    target,
  );
};

Menu.propTypes = {
  blockID: PropTypes.number,
  dataID: PropTypes.number,
  menuSettings: PropTypes.object,
  rootNode: PropTypes.object,
  onClose: PropTypes.func,
};

export default Menu;
