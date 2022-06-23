import React from 'react';
import PropTypes from 'prop-types';
import '../../../utils/Traverse';
import _ from 'lodash';
import Recursion from './Recursion';
import getIF from '../../../utils/if';

const If = ({
  domElement, blockID, dataID, imagesUpload, position, uniqueKey, ...props
}) => {
  const ifsArray = domElement.if;

  const toRenderChildren = (item) => {
    if (item) {
      if (_.isArray(item)) {
        return item.map((child, index) => (
          <Recursion
            values={props.values}
            position={position}
            domElement={child}
            dataID={dataID}
            uniqueKey={`${uniqueKey}`}
            blockID={blockID}
            key={index}
            {...props}
          />
        ));
      }
      if (_.isObject(item)) {
        return (
          <Recursion
            values={props.values}
            position={position}
            domElement={item}
            dataID={dataID}
            uniqueKey={`${uniqueKey}`}
            blockID={blockID}
            {...props}
          />
        );
      }
    }
    return new Error('Not item');
  };

  if (ifsArray.length) {
    return ifsArray.map((item) => {
      const result = getIF(item, dataID);
      if (result !== '0') {
        return toRenderChildren(result);
      }

      return null;
    });
  }

  return null;
};

If.propTypes = {
  values: PropTypes.object,
  domElement: PropTypes.object,
  blockID: PropTypes.number,
  dataID: PropTypes.number,
  imagesUpload: PropTypes.func,
  position: PropTypes.number,
  uniqueKey: PropTypes.string,
};

export default If;
