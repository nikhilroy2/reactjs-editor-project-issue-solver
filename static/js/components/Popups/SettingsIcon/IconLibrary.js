import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import {
  PopoverBody,
  PopoverHeader,
  PopoverHeaderBack,
} from '../../../layouts/Popover';
import { getObjectSource, getParentKey, getSourceValue } from '../../../utils/SourceValue';
import { dataChangeValues } from '../../../redux/actions/data/update';
import Methods from '../../../utils/Methods/index';
import Input from '../../Elements/Input';
import { Animate, AnimateHiddenDiv } from '../../../layouts/Animate';
import IconsList from '../../Elements/Icons';

import { getFontsList } from './helper';

const IconLibrary = ({ settingIcon, dataID, onChangeActiveTab }) => {
  const dispatch = useDispatch();

  const [list] = useState(getFontsList());
  const [search, setSearch] = useState('');
  const value = getSourceValue(settingIcon.icon.source, dataID);

  const onChange = (value) => {
    const data = Methods.getData(dataID);
    const newData = data !== 'not found' ? _.cloneDeep(data.data) : false;

    if (newData) {
      const keys = getParentKey(settingIcon.icon.source);

      if (keys.currentPath === 'default' || keys.currentPath === false) {
        dispatch(dataChangeValues(value, keys.parentKey, dataID));
      } else {
        const newDataCurrentPath = getObjectSource(newData, keys.currentPath);
        newDataCurrentPath[keys.currentKey] = value;
        dispatch(
          dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID),
        );
      }
    }
  };

  return (
    <div>
      <PopoverHeader>
        <PopoverHeaderBack onClick={() => onChangeActiveTab(0)} />
        <div className="editor__icon-search-wrapper">
          <Animate animate="animated slideInRight faster-3">
            <Input
              value={search}
              placeholder={`Search icon (${list.length})`}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Animate>
        </div>
      </PopoverHeader>
      <PopoverBody>
        <AnimateHiddenDiv>
          <Animate animate="animated slideInRight faster-3">
            <IconsList
              searchValue={search}
              onChange={onChange}
              value={value}
              list={list}
            />
          </Animate>
        </AnimateHiddenDiv>
      </PopoverBody>
    </div>
  );
};

IconLibrary.propTypes = {
  settingIcon: PropTypes.object,
  dataID: PropTypes.number,
  onChangeActiveTab: PropTypes.func,
};

export default IconLibrary;
