import React, {
  useEffect, useState, useRef, forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import './_colors_library.scss';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { hexToRgba, rgbaToArray } from 'hex-and-rgba';
import usePortal from '../../../utils/usePortal';
import { ReactComponent as PIN } from '../../../assets/img/color_picker_pin.svg';

import getPosition from '../../../utils/getPosition';
import ColorPicker from '../../Elements/Colorpicker';
import Tooltip from '../../Elements/Tooltip';
import {
  getColorType,
  getHexColor,
  getBoxShadowPin,
  baseColors,
  onlyLatins,
  handlePressEnter,
  hexAlphaToRgba,
} from './helper';
import { fitsOnScreen } from '../../../utils/helpers';

/**
 * ColorsLibrary - список цветов из библиотеки с возможностью изменить и добавить новый
 *
 * @component
 * @category Components
 * @subcategory Popups
 *
 */
// eslint-disable-next-line no-unused-vars
const ColorsLibrary = forwardRef((props, ref) => {
  const {
    onClose, parentNode, className, onChange, color, gradient, solid, forText,
  } = props;
  const colorsList = useSelector((state) => state.colors.data);

  const node = useRef(null);
  const colorPickerNode = useRef(null);
  const target = usePortal();

  const [position, setPosition] = useState(false);
  const [isOpenPicker, setOpenPicker] = useState(false);
  const [partiesColorpicker, setPartiesColorpicker] = useState(false);
  const [inputColor, setInputColor] = useState(getHexColor(color));

  useEffect(() => {
    if (isOpenPicker) {
      const parties = fitsOnScreen(colorPickerNode.current);
      setPartiesColorpicker(parties);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenPicker]);

  useEffect(() => {
    setInputColor(getHexColor(color));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  const outSideClick = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return false;
    }

    if (parentNode.current && parentNode.current.contains(e.target)) {
      return false;
    }

    return onClose(false);
  };

  useEffect(() => {
    const position = getPosition(parentNode, node, {
      direction: 'right bottom',
      margin: 8,
    });
    setPosition(position);

    document.addEventListener('mousedown', outSideClick, false);
    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeColor = (value) => {
    if (value) {
      onChange(value);
    }
  };

  const colorType = getColorType(color);
  const hex = getHexColor(color);
  const shadowColor = getBoxShadowPin(color, colorType, hex);
  const boxShadowPin = hexToRgba(shadowColor).toString();

  const onSubmitInput = () => {
    const rgba = hexAlphaToRgba({
      hex: inputColor[0] === '#' ? inputColor : `#${inputColor}`,
      alpha: colorType === 'hex' ? hexToRgba(color)[3] : rgbaToArray(color)[3],
    });

    if (rgba) {
      onChange(rgba);
    } else {
      setInputColor(getHexColor(color));
    }
  };

  return createPortal(
    <div
      className={classNames('editor__popup-colors-library animated zoomInFaster faster-3', {
        [className]: className,
      })}
      ref={node}
      style={{ ...position }}
    >
      <div className="editor__popup-colors-library-header">
        {colorType === 'hex' || colorType === 'rgba' ? (
          <div className="editor__popup-colors-library-header-hex editor__popup-colors-library-header-hex-input">
            <label htmlFor="rgba-hex" className="editor__popup-colors-library-header-hex-input-label">
              #
            </label>
            <input
              value={inputColor}
              id="rgba-hex"
              onBlur={onSubmitInput}
              onKeyPress={(e) => handlePressEnter(e, onSubmitInput)}
              onChange={(e) => setInputColor(onlyLatins(e.target.value))}
            />
          </div>
        ) : null}
        {colorType === 'gradient' ? (
          <div className="editor__popup-colors-library-header-hex">{forText ? 'Transparent' : 'Gradient'}</div>
        ) : null}
        {colorType === 'transparent' ? (
          <div className="editor__popup-colors-library-header-hex">Transparent</div>
        ) : null}
        <div className="editor__popup-colors-library-header-pin">
          <div
            className="editor__popup-colors-library-header-pin-icon"
            style={{ background: color || 'transparent', boxShadow: `0px 0px 0px 3px ${boxShadowPin}` }}
            onClick={() => setOpenPicker(!isOpenPicker)}
          >
            <Tooltip text="Open color picker">
              <PIN />
            </Tooltip>
          </div>
        </div>

        {isOpenPicker ? (
          <div
            className={classNames('editor__popup-colors-library-picker', {
              'editor__popup-colors-library-picker-right':
                !partiesColorpicker || (partiesColorpicker && partiesColorpicker.right),
              'editor__popup-colors-library-picker-left': partiesColorpicker && !partiesColorpicker.right,
            })}
            ref={colorPickerNode}
          >
            <div className="editor__popup-colors-library-picker-wrap">
              <ColorPicker
                gradient={gradient}
                solid={solid}
                value={color}
                forText={forText}
                onChange={onChangeColor}
                onClose={() => setOpenPicker(false)}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="editor__popup-colors-library-body">
        <div className="editor__popup-colors-library-list">
          {baseColors.map((item, index) => (
            <div
              className="editor__popup-colors-library-item"
              key={`colors_library_base_item${index}`}
              onClick={() => onChangeColor(item.value)}
            >
              <div className="editor__popup-colors-library-item-bg">
                <div
                  className="editor__popup-colors-library-item-color"
                  style={{ background: item.value }}
                />
              </div>
            </div>
          ))}

          {colorsList.map((item, index) => {
            if (item.type === 'gradient' && !gradient) {
              return null;
            }
            return (
              <div
                className={classNames('editor__popup-colors-library-item', {
                  'editor__popup-colors-library-item-active': item.value === color,
                })}
                key={`colors_library_item${index}`}
                onClick={() => onChangeColor(item.value)}
              >
                <div className="editor__popup-colors-library-item-bg">
                  <div
                    className="editor__popup-colors-library-item-color"
                    style={{ background: item.value }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    target,
  );
});

ColorsLibrary.propTypes = {
  /**
   * Нужен ли градиент
   */
  gradient: PropTypes.bool,
  /**
   * Нужен ли обынчый solid
   */
  solid: PropTypes.bool,
  onClose: PropTypes.func,
  parentNode: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  forText: PropTypes.bool,
};

ColorsLibrary.defaultProps = {
  gradient: false,
  solid: true,
};

export default ColorsLibrary;
