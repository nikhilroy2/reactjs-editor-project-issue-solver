import React, { useEffect, useState, useRef } from 'react';
import './_settings-link.scss';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import usePortal from '../../../utils/usePortal';
import { Popover, PopoverBody, PopoverHeader } from '../../../layouts/Popover';
import getPosition from '../../../utils/getPosition';
import { getObjectSource, getParentKey, getSourceValue } from '../../../utils/SourceValue';
import Link from '../../Elements/Link';
import { dataChangeValues } from '../../../redux/actions/data/update';
import Methods from '../../../utils/Methods/index';

const SettingsLink = ({
  rootNode, refNode, onChange, value, dataID, onClose, className,
}) => {
  const node = useRef(null);
  const dispatch = useDispatch();
  const mainNode = refNode || node;
  const data = Methods.getData(dataID);

  const target = usePortal();
  const [position, setPosition] = useState(false);

  const link = value && value.source ? getSourceValue(value.source, dataID) : value;
  const dataLink = link !== 'not found' ? link : false;

  const outSideClick = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return false;
    }

    if (mainNode && mainNode.current && mainNode.current.contains(e.target)) {
      return false;
    }
    return onClose(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);
    const position = getPosition(rootNode, mainNode, {
      direction: 'center bottom',
      margin: 18,
    });
    setPosition(position);

    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeLink = (obj) => {
    if (value && value.source) {
      const newData = _.cloneDeep(data.data);
      const keys = getParentKey(value.source);

      if (keys.currentPath === 'default' || keys.currentPath === false) {
        dispatch(dataChangeValues(obj, keys.parentKey, dataID));
      } else {
        const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
        newDataCurrentPath[keys.currentKey] = obj;
        dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
      }
    } else {
      onChange(obj);
    }
  };

  const props = {};
  if (dataLink) {
    if (dataLink.value) {
      props.value = dataLink.value;
    }
    if (dataLink.type) {
      props.type = dataLink.type;
    }
    if (dataLink.hasOwnProperty('blank')) {
      props.blank = dataLink.blank;
    }
  }

  return createPortal(
    <Popover ref={mainNode} className={className} position={position}>
      <PopoverHeader>Link</PopoverHeader>
      <PopoverBody>
        <Link onChange={onChangeLink} {...props} />
      </PopoverBody>
    </Popover>,
    target,
  );
};

SettingsLink.defaultProps = {};

SettingsLink.propTypes = {};

export default SettingsLink;
