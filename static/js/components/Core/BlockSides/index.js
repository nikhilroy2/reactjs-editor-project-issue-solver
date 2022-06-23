import './_block_sides.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Dividers from './Dividers';
import ResizeBlocksContainer from './ResizeBlock';

import { getSourceValue } from '../../../utils/SourceValue';

const BlockSides = ({ sides, dataID, blockID }) => {
  if (sides) {
    return (
      <>
        {Object.keys(sides).map((key, index) => (
          <div
            className={classNames({
              'editor__block_sides-top': key === 'top',
              'editor__block_sides-bottom': key === 'bottom',
            })}
            key={`side_${index}`}
            style={{ height: sides[key].resize ? getSourceValue(sides[key].resize.source, dataID) : 'auto' }}
          >
            {sides[key].resize && sides[key].resize.source
              ? (
                <ResizeBlocksContainer
                  direction={key}
                  value={sides[key].resize.source}
                  dataID={dataID}
                />
              )
              : null}
            {sides[key].divider && sides[key].divider.source
              ? (
                <Dividers
                  direction={key}
                  value={sides[key].divider.source}
                  dataID={dataID}
                  blockID={blockID}
                />
              )
              : null}
          </div>
        ))}
      </>
    )
  }

  return null;
};

BlockSides.propTypes = {
  sides: PropTypes.object,
  dataID: PropTypes.number,
  blockID: PropTypes.number,
}

export default BlockSides;
