import React from 'react';
import './_container.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReactComponent as IconContainerFluid } from '../../../assets/img/structure_fluid.svg';
import { ReactComponent as IconContainer } from '../../../assets/img/structure_container.svg';

const blocksHeightList = [
  {
    value: 'container',
    name: 'Container',
    icon: <IconContainer />,
  },
  {
    value: 'container-fluid',
    name: 'Fluid',
    icon: <IconContainerFluid />,
  },
];

const BlockContainer = ({ value, onChange }) => {
  const onClick = (itemValue) => {
    if (itemValue !== value) {
      onChange(itemValue);
    }
  };

  return (
    <div className="editor__elements-container">
      {blocksHeightList.map((item, index) => (
        <div
          key={`block_height_${index}`}
          onClick={() => onClick(item.value)}
          className={classNames('editor__elements-container-item', {
            'editor__elements-container-item-active': value === item.value,
            'editor__elements-container-item-no-active': value !== item.value,
          })}
        >
          {item.icon}
          <div className="editor__elements-container-item-title animate-transition-05">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

BlockContainer.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BlockContainer;
