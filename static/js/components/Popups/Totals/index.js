import React, { useEffect, useState, useRef } from 'react';
import './_totals.scss';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import arrayMove from 'array-move';
import PropTypes from 'prop-types';
import usePortal from '../../../utils/usePortal';
import { Popover } from '../../../layouts/Popover';
import Methods from '../../../utils/Methods/index';
import getPosition from '../../../utils/getPosition';
import { getObjectSource, getParentKey } from '../../../utils/SourceValue';
import TotalsList from './List';
import { fitsOnScreen } from '../../../utils/helpers';
import { getTotalsList } from './helper';
import { dataChangeValues } from '../../../redux/actions/data/update';

const Menu = ({
  dataID, totals, rootNode, onClose,
}) => {
  const dispatch = useDispatch();
  const list = getTotalsList(totals.source, dataID);
  const target = usePortal();
  const node = useRef(null);

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

  const onStartEnd = async (oldIndex, newIndex) => {
    if (oldIndex !== newIndex) {
      const data = Methods.getData(dataID);
      const newData = _.cloneDeep(data.data);
      const keys = getParentKey(totals.source);

      if (keys.currentPath === 'default' || keys.currentPath === false) {
        dispatch(dataChangeValues(arrayMove(newData[keys.parentKey], oldIndex, newIndex), keys.parentKey, dataID));
      } else {
        const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
        if (newDataCurrentPath[keys.currentKey] && _.isArray(newDataCurrentPath[keys.currentKey])) {
          newDataCurrentPath[keys.currentKey] = arrayMove(newDataCurrentPath[keys.currentKey], oldIndex, newIndex);
        }
        dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
      }
    }
  };

  const onChangeVisibility = (index) => {
    if (!_.isUndefined(index)) {
      const data = Methods.getData(dataID);
      const newData = _.cloneDeep(data.data);
      const keys = getParentKey(totals.source);

      if (keys.currentPath === 'default' || keys.currentPath === false) {
        dispatch(dataChangeValues(!newData[index].visibility, keys.parentKey, dataID));
      } else {
        const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
        newDataCurrentPath[keys.currentKey][index].visibility = !newDataCurrentPath[keys.currentKey][index].visibility;
        console.log(newDataCurrentPath[keys.currentKey]);
        dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
      }
    }
  };

  return createPortal(
    <Popover ref={node} position={position}>
      <TotalsList
        isFirstOpen={position}
        list={list}
        onChangeVisibility={onChangeVisibility}
        onSort={onStartEnd}
      />
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
