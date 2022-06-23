import React, { useEffect, useState, useRef } from 'react';
import './_sortable.scss';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import arrayMove from 'array-move';
import usePortal from '../../../utils/usePortal';
import { Popover, PopoverBody, PopoverHeader } from '../../../layouts/Popover';
import { dataChangeValues } from '../../../redux/actions/data/update';
import Methods from '../../../utils/Methods/index';
import getPosition from '../../../utils/getPosition';
import { getObjectSource, getParentKey, getSourceValue } from '../../../utils/SourceValue';
import SortableList from '../../Elements/SortableList';
import { getList } from './helper';
import { ReactComponent as PLUS } from '../../../assets/img/plus.svg';
import Tooltip from '../../Elements/Tooltip';

const Sortable = ({
  dataID, sortable, create, rootNode, onClose,
}) => {
  const dispatch = useDispatch();

  const target = usePortal();
  const node = useRef(null);
  const [position, setPosition] = useState(false);

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
    const position = getPosition(rootNode, node, {
      direction: 'center bottom',
      margin: 8,
    });
    setPosition(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onStartEnd = (oldIndex, newIndex) => {
    const data = Methods.getData(dataID);
    const newData = _.cloneDeep(data.data);
    const keys = getParentKey(sortable.source);

    if (keys.currentPath === 'default' || keys.currentPath === false) {
      dispatch(dataChangeValues(arrayMove(newData[keys.parentKey], oldIndex, newIndex), keys.parentKey, dataID));
    } else {
      const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
      if (newDataCurrentPath[keys.currentKey] && _.isArray(newDataCurrentPath[keys.currentKey])) {
        newDataCurrentPath[keys.currentKey] = arrayMove(newDataCurrentPath[keys.currentKey], oldIndex, newIndex);
      }
      dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
    }
  };

  const onDelete = (index) => {
    const data = Methods.getData(dataID);
    const newData = _.cloneDeep(data.data);
    const keys = getParentKey(sortable.source);

    if (keys.currentPath === 'default' || keys.currentPath === false) {
      _.pullAt(newData[keys.parentKey], [index]);
      dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
    } else {
      const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
      _.pullAt(newDataCurrentPath[keys.currentKey], [index]);
      dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
    }
  };

  const onCreate = () => {
    const data = Methods.getData(dataID);
    const newData = _.cloneDeep(data.data);
    const keys = getParentKey(sortable.source);
    const newItem = getSourceValue(create.source, dataID);

    if (newItem !== 'not found') {
      if (keys.currentPath === 'default' || keys.currentPath === false) {
        newData[keys.parentKey].push(newItem);
        dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
      } else {
        const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
        newDataCurrentPath[keys.currentKey].push(newItem);
        dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
      }
    }
  };

  const list = getList(sortable, dataID);

  return createPortal(
    <Popover ref={node} position={position}>
      <PopoverHeader>
        Sortable
        {create ? (
          <div className="editor__sortable-create-item" onClick={() => onCreate()}>
            <Tooltip text="Add new item">
              <PLUS />
            </Tooltip>
          </div>
        ) : null}
      </PopoverHeader>
      <PopoverBody overflow>
        <SortableList list={list} onSort={onStartEnd} onDelete={onDelete} />
      </PopoverBody>
    </Popover>,
    target,
  );
};

export default Sortable;
