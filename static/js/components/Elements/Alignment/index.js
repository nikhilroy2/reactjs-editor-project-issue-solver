import React from 'react';
import './_alignment.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ReactComponent as IconLeft } from '../../../assets/img/alignment/left.svg';
import { ReactComponent as IconCenter } from '../../../assets/img/alignment/center.svg';
import { ReactComponent as IconRight } from '../../../assets/img/alignment/right.svg';

const Alignment = ({ value, onChange }) => {
  const configuration = useSelector((state) => state.configuration);

  const onClick = (itemValue) => {
    if (itemValue !== value) {
      onChange(itemValue);
    }
  };

  const AlignmentList = [
    {
      value: configuration.rtl ? 'flex-end' : 'flex-start',
      label: 'Left',
      icon: <IconLeft className="animate-transition-05" />,
    },
    {
      value: 'center',
      label: 'Center',
      icon: <IconCenter className="animate-transition-05" />,
    },
    {
      value: configuration.rtl ? 'flex-start' : 'flex-end',
      label: 'Right',
      icon: <IconRight className="animate-transition-05" />,
    },
  ];

  return (
    <div className="editor__elements-arrangement">
      <div className="editor__elements-arrangement-list">
        {AlignmentList.map((item, index) => (
          <div
            className={classNames('editor__elements-arrangement-list-item', {
              'editor__elements-arrangement-list-item-active': item.value === value,
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

Alignment.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Alignment;
