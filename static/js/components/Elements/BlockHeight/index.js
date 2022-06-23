import React from 'react';
import './_block_height.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReactComponent as IconHeightContent } from '../../../assets/img/block_height_content.svg';
import { ReactComponent as IconHeightSize } from '../../../assets/img/block_height_size.svg';

const blocksHeightList = [
  {
    value: 'auto',
    name: 'By content',
    icon: <IconHeightContent />,
  },
  {
    value: '100vh',
    name: 'By screen size',
    icon: <IconHeightSize />,
  },
];

const BlockHeight = ({ value, onChange }) => {
  const onClick = (itemValue) => {
    if (itemValue !== value) {
      onChange(itemValue);
    }
  };

  return (
    <div className="editor__elements-block_height">
      {blocksHeightList.map((item, index) => (
        <div
          key={`block_height_${index}`}
          onClick={() => onClick(item.value)}
          className={classNames('editor__elements-block_height-item', {
            'editor__elements-block_height-item-active': value === item.value,
            'editor__elements-block_height-item-no-active': value !== item.value,
          })}
        >
          {item.icon}
          <div className="editor__elements-block_height-item-title animate-transition-05">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

BlockHeight.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BlockHeight;
