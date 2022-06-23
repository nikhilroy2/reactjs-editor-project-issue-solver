import React from 'react';
import './_cards_row.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const cards = [
  {
    label: '1',
    value: 'col-lg-12',
  },
  {
    label: '2',
    value: 'col-lg-6',
  },
  {
    label: '3',
    value: 'col-lg-4',
  },
  {
    label: '4',
    value: 'col-lg-3',
  },
  {
    label: '6',
    value: 'col-lg-2',
  },
];

const CardRow = ({ value, onChange }) => {
  const onClick = (itemValue) => {
    if (itemValue !== value) {
      onChange(itemValue);
    }
  };

  return (
    <div className="editor__elements-cards_row">
      {cards.map((item, index) => (
        <div
          key={`cards_row_${index}`}
          onClick={() => onClick(item.value)}
          className={classNames('editor__elements-cards_row-item animate-transition-05', {
            'editor__elements-cards_row-item-active': value === item.value,
            'editor__elements-cards_row-item-no-active': value !== item.value,
          })}
        >
          <span className="animate-transition-05">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

CardRow.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CardRow;
