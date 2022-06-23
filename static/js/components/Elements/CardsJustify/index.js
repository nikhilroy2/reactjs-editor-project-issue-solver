import React from 'react';
import './_card_justify.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReactComponent as IconCardJustifyLeft } from '../../../assets/img/card_justify_left.svg';
import { ReactComponent as IconCardJustifyCenter } from '../../../assets/img/card_justify_center.svg';

const cardsJustifyList = [
  {
    value: 'justify-content-start',
    name: 'Left',
    icon: <IconCardJustifyLeft />,
  },
  {
    value: 'justify-content-center',
    name: 'Centered',
    icon: <IconCardJustifyCenter />,
  },
];

const CardsJustify = ({ value, onChange }) => {
  const onClick = (itemValue) => {
    if (itemValue !== value) {
      onChange(itemValue);
    }
  };

  return (
    <div className="editor__elements-card_justify">
      {cardsJustifyList.map((item, index) => (
        <div
          key={`block_height_${index}`}
          onClick={() => onClick(item.value)}
          className={classNames('editor__elements-card_justify-item', {
            'editor__elements-card_justify-item-active': value === item.value,
            'editor__elements-card_justify-item-no-active': value !== item.value,
          })}
        >
          {item.icon}
          <div className="editor__elements-card_justify-item-title animate-transition-05">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

CardsJustify.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CardsJustify;
