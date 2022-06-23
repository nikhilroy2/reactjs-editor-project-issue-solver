import React from 'react';
import './_faq-row.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReactComponent as OneColumn } from '../../../assets/img/faq-one-row.svg';
import { ReactComponent as TwoColumn } from '../../../assets/img/faq-two-row.svg';

const flipList = [
  {
    value: 'col-lg-12',
    label: 'Style 1',
    icon: <OneColumn className="animate-transition-05" />,
  },
  {
    value: 'col-lg-6 col-md-6 co-sm-12',
    label: 'Style 2',
    icon: <TwoColumn className="animate-transition-05" />,
  },
];

const FaqRow = ({ value, onChange }) => {
  const onClick = (itemValue) => {
    if (itemValue !== value) {
      onChange(itemValue);
    }
  };

  return (
    <div className="editor__elements-arrangement">
      <div className="editor__elements-arrangement-list">
        {flipList.map((item, index) => (
          <div
            className={classNames('editor__elements-arrangement-list-item', {
              'editor__elements-arrangement-list-item-active': item.value === value,
            })}
            onClick={() => onClick(item.value)}
            key={`faq_row_${index}`}
          >
            <div className="editor__elements-arrangement-list-item-icon animate-transition-05">
              {item.icon}
            </div>
            <div className="editor__elements-arrangement-list-item-label animate-transition-05">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

FaqRow.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FaqRow;
