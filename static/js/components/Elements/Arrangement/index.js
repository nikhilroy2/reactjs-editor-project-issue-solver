import React from 'react';
import './_arrangement.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReactComponent as IconArrangementTop } from '../../../assets/img/arrangement_top.svg';
import { ReactComponent as IconArrangementUnderneath } from '../../../assets/img/arrangement_underneath.svg';

const flipList = [
  {
    value: '1',
    label: 'On top',
    icon: <IconArrangementTop className="animate-transition-05" />,
  },
  {
    value: '0',
    label: 'Underneath',
    icon: <IconArrangementUnderneath className="animate-transition-05" />,
  },
];

const Arrangement = ({ value, onChange }) => {
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
              'editor__elements-arrangement-list-item-active': Number(item.value) === Number(value),
            })}
            onClick={() => onClick(item.value)}
            key={`flip_list_${index}`}
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

Arrangement.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Arrangement;
