import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import Button from '../../Elements/Button';
import Methods from '../../../utils/Methods/index';
import { getObjectSource, getParentKey, getSourceValue } from '../../../utils/SourceValue';
import { dataChangeValues } from '../../../redux/actions/data/update';

const CreateItem = ({ domElement, dataID }) => {
  const dispatch = useDispatch();

  const createItem = () => {
    if (domElement.for && domElement.for.create) {
      const { create } = domElement.for;

      const data = Methods.getData(dataID);
      const newData = _.cloneDeep(data.data);
      const keys = getParentKey(create.source);
      const dataKeys = getParentKey(domElement.for.data.source);
      const newItem = getSourceValue(create.source, dataID);

      if (newItem !== 'not found') {
        if (keys.currentPath === 'default' || keys.currentPath === false) {
          // newData[keys.parentKey].push(newItem);
          // dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID))
        } else {
          const newDataCurrentPath = getObjectSource(newData, dataKeys.currentPath);
          const emptyData = newDataCurrentPath[dataKeys.currentKey];
          if (newItem) {
            emptyData.push(newItem);
          }
          dispatch(dataChangeValues(newData[keys.parentKey], dataKeys.parentKey, dataID));
        }
      }
    }
  };

  return (
    <div className="text-center">
      <Button onClick={() => createItem()}>Create item</Button>
    </div>
  );
};

CreateItem.propTypes = {
  domElement: PropTypes.object,
  dataID: PropTypes.number,
};

export default CreateItem;
