import React from 'react';
import './_logo-type.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReactComponent as LogotypeImage } from '../../../assets/img/logotype_image.svg';
import { ReactComponent as LogotypeText } from '../../../assets/img/logotype_text.svg';

const logotypesList = [
  {
    value: 'image',
    label: 'Image',
    icon: <LogotypeImage className="animate-transition-05" />,
  },
  {
    value: 'text',
    label: 'Text',
    icon: <LogotypeText className="animate-transition-05" />,
  },
];

const LogoType = ({ value, onChange }) => {
  const onClick = (itemValue) => {
    if (itemValue !== value) {
      onChange(itemValue);
    }
  };

  return (
    <div className="editor__elements-logotype">
      <div className="editor__elements-logotype-list">
        {logotypesList.map((item, index) => (
          <div
            className={classNames('editor__elements-logotype-list-item', {
              'editor__elements-logotype-list-item-active': item.value === value,
            })}
            onClick={() => onClick(item.value)}
            key={`flip_list_${index}`}
          >
            <div className="editor__elements-logotype-list-item-icon animate-transition-05">
              {item.icon}
            </div>
            <div className="editor__elements-logotype-list-item-label animate-transition-05">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

LogoType.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LogoType;
