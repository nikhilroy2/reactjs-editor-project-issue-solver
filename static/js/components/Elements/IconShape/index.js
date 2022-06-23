import React from 'react';
import './_icon_shape.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReactComponent as IconNoShadow } from '../../../assets/img/no_shadow.svg';

const backgroundList = [
  {
    borderRadius: '0px',
    name: 'none',
    preview: (
      <div className="editor__elements-icon_shape-preview editor__elements-icon_shape-none">
        <IconNoShadow />
      </div>
    ),
  },
  {
    borderRadius: '50%',
    name: 'circle',
    preview: (
      <div className="editor__elements-icon_shape-preview editor__elements-icon_shape-circle" />
    ),
  },
  {
    borderRadius: '10px',
    name: 'square',
    preview: (
      <div className="editor__elements-icon_shape-preview editor__elements-icon_shape-square" />
    ),
  },
];

const IconShape = ({ value, onChange }) => (
  <>
    <div className="editor__elements-icon_shape">
      <div className="editor__elements-icon_shape-list">
        {backgroundList.map((item, index) => (
          <div
            className={classNames('editor__elements-icon_shape-item', {
              'editor__elements-icon_shape-item-active': value === item.borderRadius,
            })}
            key={`shape_type_${index}`}
            onClick={() => onChange(item.borderRadius)}
          >
            <div className="editor__elements-icon_shape-item-icon">{item.preview}</div>
            <div className="editor__elements-icon_shape-item-title">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  </>
);

IconShape.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default IconShape;
