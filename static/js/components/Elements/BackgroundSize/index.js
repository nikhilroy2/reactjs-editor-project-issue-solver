import React, { useRef } from 'react';
import './_background_size.scss';
import classNames from 'classnames';
import AnimateHeight from 'react-animate-height';
import PropTypes from 'prop-types';
import { ReactComponent as IconBackgroundFill } from '../../../assets/img/background_repeat_fill.svg';
import { ReactComponent as IconBackgroundFit } from '../../../assets/img/background_repeat_fit.svg';
import { ReactComponent as IconBackgroundTile } from '../../../assets/img/background_repeat_tile.svg';

import { FormGroup, FormVertical } from '../../../layouts/Form';
import RangeSlider from '../RangeSlider';
import Tooltip from '../Tooltip';

import { getSourceValue } from '../../../utils/SourceValue';

const backgroundSizeList = [
  {
    value: {
      repeat: 'no-repeat',
      size: 'cover',
    },
    label: 'Fill',
    icon: <IconBackgroundFill />,
  },
  {
    value: {
      repeat: 'no-repeat',
      size: '100%',
    },
    label: 'Fit',
    icon: <IconBackgroundFit />,
  },
  {
    value: {
      repeat: 'repeat',
      size: '50%',
    },
    label: 'Tile',
    icon: <IconBackgroundTile />,
  },
];

const isActiveType = (type, repeat, size) => {
  if (type.repeat === 'no-repeat' && type.size === 'cover' && size === 'cover') {
    return true;
  }

  if (type.size !== 'cover' && size !== 'cover' && type.repeat === repeat) {
    return true;
  }

  return false;
};

const BackgroundSize = ({ values, dataID, onChange }) => {
  const node = useRef(null);
  const valueSize = values.size
    ? getSourceValue(values.size, dataID) !== 'not found'
      ? getSourceValue(values.size, dataID)
      : false
    : false;
  const valueRepeat = values.size
    ? getSourceValue(values.repeat, dataID) !== 'not found'
      ? getSourceValue(values.repeat, dataID)
      : false
    : false;

  const onChangeSize = (value) => {
    onChange(values.size, value);
  };

  const onChangeRepeat = (value) => {
    onChange(values.repeat, value);
  };

  const onClick = (value) => {
    onChangeSize(value.size);
    onChangeRepeat(value.repeat);
  };

  return (
    <>
      {valueSize && valueRepeat ? (
        <div className="editor__elements-background_size" ref={node}>
          <div className="editor__elements-background_size-type">
            {backgroundSizeList.map((item, index) => (
              <div
                className={classNames('editor__elements-background_size-type-item', {
                  'editor__elements-background_size-type-item-active': isActiveType(
                    item.value,
                    valueRepeat,
                    valueSize,
                  ),
                })}
                key={`background_size_type_${index}`}
                onClick={() => onClick(item.value)}
              >
                <div className="editor__elements-background_size-type-item-icon">
                  <Tooltip text={item.label} offset={8}>
                    {item.icon}
                  </Tooltip>
                </div>
                <div className="editor__elements-background_size-type-item-label">{item.label}</div>
              </div>
            ))}
          </div>
          <AnimateHeight duration={500} height={valueSize === 'cover' ? 0 : 'auto'}>
            <div className="editor__elements-background_size-scale">
              <FormGroup>
                <FormVertical label="Scale">
                  <RangeSlider
                    value={valueSize === 'cover' ? 100 : valueSize}
                    onChange={(value) => onChangeSize(`${parseInt(value, 10)}%`, false)}
                    input
                    min={1}
                    max={500}
                    step={1}
                    units="%"
                  />
                </FormVertical>
              </FormGroup>
            </div>
          </AnimateHeight>
        </div>
      ) : null}
    </>
  );
};

BackgroundSize.propTypes = {
  dataID: PropTypes.any.isRequired,
  values: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BackgroundSize;
