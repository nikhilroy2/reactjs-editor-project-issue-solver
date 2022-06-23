import React from 'react';
import Image from './Image';

// eslint-disable-next-line
const Media = ({ ...props }) => {
  try {
    const entity = props.contentState.getEntity(
      props.block.getEntityAt(0),
    );

    if (entity && entity.getData()) {
      const { type } = entity.getData();
      switch (type) {
        case 'image':
          return (
            <Image
              {...props}
              {...entity.getData()}
            />
          );
        default:
          return null
      }
    }
  } catch (e) {
    return null
  }
};

export default Media;
