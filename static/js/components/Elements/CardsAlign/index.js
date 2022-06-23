import React from 'react';
import './_card_align.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReactComponent as IconCardAlignStart } from '../../../assets/img/card_align_start.svg';
import { ReactComponent as IconCardAlignStretch } from '../../../assets/img/card_align_stretch.svg';

const cardsAlignsList = [
  {
    value: 'align-items-stretch',
    name: 'By height',
    icon: <IconCardAlignStretch />,
  },
  {
    value: 'align-items-start',
    name: 'By content',
    icon: <IconCardAlignStart />,
  },
];

const CardAlign = ({ value, onChange }) => {
  const onClick = (itemValue) => {
    if (itemValue !== value) {
      onChange(itemValue);
    }
  };

  return (
    <div className="editor__elements-card_align">
      {cardsAlignsList.map((item, index) => (
        <div
          key={`block_height_${index}`}
          onClick={() => onClick(item.value)}
          className={classNames('editor__elements-card_align-item', {
            'editor__elements-card_align-item-active': value === item.value,
            'editor__elements-card_align-item-no-active': value !== item.value,
          })}
        >
          {item.icon}
          <div className="editor__elements-card_align-item-title animate-transition-05">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

CardAlign.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CardAlign;
