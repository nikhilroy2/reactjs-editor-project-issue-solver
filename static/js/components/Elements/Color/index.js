import './_color.scss';
import React, {
  useEffect, useState, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import ColorsLibrary from '../../Popups/ColorsLibrary';
import Tooltip from '../Tooltip';

import { openColorPicker, closeColorPicker } from '../../../redux/actions/Colorpicker';
import { getColor } from './_helper';

const Color = ({
  value, gradient, solid, onChange, onLock,
}) => {
  const [color, setColor] = useState(getColor(value));
  const [isOpenColorPicker, setOpenColorPicker] = useState(false);
  const node = useRef(null);

  const dispatch = useDispatch();

  const onClick = () => {
    if (onLock) {
      onLock(true);
    }
    setOpenColorPicker(true);
    dispatch(openColorPicker());
  };

  const onClose = () => {
    if (onLock) {
      onLock(false);
    }
    setOpenColorPicker(false);
    dispatch(closeColorPicker());
  };

  const onChangeColor = (value) => {
    onChange(value);
  };

  useEffect(() => {
    setColor(getColor(value));
  }, [color, value]);

  return (
    <>
      <div className="editor__elements-color">
        <div
          className="editor__elements-color-qub"
          ref={node}
          onClick={(e) => onClick(e)}
        >
          <Tooltip text="Edit color">
            <span
              className="editor__elements-color-qub-color"
              style={{ background: color }}
            />
          </Tooltip>
        </div>
        {isOpenColorPicker
          ? (
            <ColorsLibrary
              parentNode={node}
              onChange={onChangeColor}
              onClose={onClose}
              color={color}
              gradient={gradient}
              solid={solid}
            />
          )
          : null}
      </div>
    </>
  );
};

Color.defaultProps = {
  value: '#ffffff',
  gradient: false,
  solid: true,
};

Color.propTypes = {
  value: PropTypes.string,
  gradient: PropTypes.bool,
  solid: PropTypes.bool,
  onChange: PropTypes.func,
  onLock: PropTypes.func,
};

export default Color;
