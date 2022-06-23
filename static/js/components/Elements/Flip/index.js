import React from 'react';
import './_flip.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReactComponent as IconFlipHorizontal } from '../../../assets/img/flip_horizontal.svg';
import { ReactComponent as IconFlipVertical } from '../../../assets/img/flip_vertical.svg';

const flipList = [
  {
    value: 'x',
    icon: <IconFlipVertical className="animate-transition-03" />,
  },
  {
    value: 'y',
    icon: <IconFlipHorizontal className="animate-transition-03" />,
  },
];

const Flip = ({ flipX, flipY, onChange }) => {
  const onClick = (direction) => {
    let rotateX = flipX ? 'rotateX(180deg)' : '';
    let rotateY = flipY ? 'rotateY(180deg)' : '';

    if (direction === 'x') {
      if (rotateX) {
        rotateX = '';
      } else {
        rotateX = 'rotateX(180deg)';
      }
    }

    if (direction === 'y') {
      if (rotateY) {
        rotateY = '';
      } else {
        rotateY = 'rotateY(180deg)';
      }
    }

    onChange(`${rotateX} ${rotateY}`);
  };

  return (
    <div className="editor__elements-flip">
      <div className="editor__elements-flip-list">
        {flipList.map((item, index) => (
          <div
            className={classNames('editor__elements-flip-list-item animate-transition-03', {
              'editor__elements-flip-list-item-active':
                  (item.value === 'x' && flipX) || (item.value === 'y' && flipY),
            })}
            onClick={() => onClick(item.value)}
            key={`flip_list_${index}`}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

Flip.propTypes = {
  flipX: PropTypes.any.isRequired,
  flipY: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Flip;
