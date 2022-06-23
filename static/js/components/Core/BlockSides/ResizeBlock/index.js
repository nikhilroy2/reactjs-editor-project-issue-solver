import './_resizeblock.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import ResizeBlock from './PaddingBlock';

import { dataChangeValues } from '../../../../redux/actions/data/update';
import Methods from '../../../../utils/Methods/index';
import { getSourceValue, getParentKey, getObjectSource } from '../../../../utils/SourceValue';

const ResizeBlockContainer = ({ direction, value, dataID }) => {
  const dispatch = useDispatch();
  const resizeValue = getSourceValue(value, dataID);

  const onChange = (direction, newValue) => {
    const data = Methods.getData(dataID);
    const newData = _.cloneDeep(data.data);
    const keys = getParentKey(value);

    if (keys.currentPath === 'default' || keys.currentPath === false) {
      dispatch(dataChangeValues(newValue, keys.parentKey, dataID))
    } else {
      const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
      newDataCurrentPath[keys.currentKey] = newValue;

      dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID))
    }
    // const directionTop = direction === 'top';
    // const directionBottom = direction === 'bottom';
    // const block = Methods.getData(dataID);
    // const keys = getParentKey(value);
    // const paddingBlock = _.cloneDeep(block.data.padding_block);
    // paddingBlock['paddingTop'] = directionTop ? newValue : paddingBlock.paddingTop;
    // paddingBlock['paddingBottom'] = directionBottom ? newValue : paddingBlock.paddingBottom;
    // dispatch(dataChangeValues(paddingBlock, keys.parentKey, dataID));
  };

  return (
    <ResizeBlock
      value={resizeValue}
      onChange={onChange}
      direction={direction}
    />
  )
};

ResizeBlockContainer.propTypes = {
  direction: PropTypes.string,
  value: PropTypes.object,
  dataID: PropTypes.number,
}

export default ResizeBlockContainer;
