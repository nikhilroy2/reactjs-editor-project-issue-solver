import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { rgbaToArray } from 'hex-and-rgba';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as CLOSE } from '../../../../../assets/img/close_tooltip.svg';
import { colorsDelete, colorsUpdate } from '../../../../../redux/actions/Colors';
import Spinner from '../../../../../layouts/Loaders/Spinner';
import ColorPicker from '../../../../Elements/Colorpicker';

import Tooltip from '../../../../Elements/Tooltip';

const ColorItem = ({ item }) => {
  const dispatch = useDispatch();
  const node = useRef(null);
  const nodePicker = useRef(null);
  const [isUpdateColor, setUpdateColor] = useState(false);

  const outSideClick = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    if (nodePicker.current && nodePicker.current.contains(e.target)) {
      return false;
    }
    return setUpdateColor(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);

    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
  }, [isUpdateColor]);

  const onDeleteColor = (id) => {
    dispatch(colorsDelete(id));
  };

  const onUpdateColor = (id) => {
    setUpdateColor(id);
  };

  const onChangeColor = (id, value) => {
    const color = {};
    const rgbaArray = rgbaToArray(value);

    if (rgbaArray) {
      color.type = 'hex';
    } else {
      color.type = 'gradient';
    }
    color.value = value;
    dispatch(colorsUpdate(id, color.type, color.value));
  };

  return (
    <CSSTransition
      in={item.id === 0}
      timeout={600}
      classNames={{
        enter: 'animated faster',
        enterActive: 'bounceIn',
      }}
    >
      <div className="editor__sidebar-color-main-item" ref={node}>
        <div className="editor__sidebar-color-main-item-square animate-transition-03">
          {!item.deleteLoader ? (
            <div className="editor__sidebar-color-main-item-square-delete animate-transition-03">
              <div
                className="editor__sidebar-color-main-item-square-delete-icon"
                onClick={() => onDeleteColor(item.id)}
              >
                <Tooltip text="Delete">
                  <CLOSE />
                </Tooltip>
              </div>
            </div>
          ) : null}
          {item.deleteLoader ? (
            <div className="editor__sidebar-color-main-item-square-loading">
              <Spinner />
            </div>
          ) : null}
          <div
            className={classNames(
              'editor__sidebar-color-main-item-square-value animate-transition-03',
              {
                'editor__sidebar-color-main-item-square-value-active':
                  isUpdateColor && isUpdateColor === item.id,
              },
            )}
            style={{ background: item.value }}
            onClick={() => onUpdateColor(item.id)}
          />
        </div>
        {isUpdateColor ? (
          <div className="editor__sidebar-color-main-item-picker animated pulse faster" ref={nodePicker}>
            <ColorPicker
              gradient
              solid
              value={item.value}
              onChange={(value) => onChangeColor(item.id, value)}
            />
          </div>
        ) : null}
      </div>
    </CSSTransition>
  );
};

ColorItem.propTypes = {
  item: PropTypes.object,
};

export default ColorItem;
