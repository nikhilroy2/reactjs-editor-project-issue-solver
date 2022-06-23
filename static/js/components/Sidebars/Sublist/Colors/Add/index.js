import React, { useEffect, useState, useRef } from 'react';
import './_sidebars_colors_add.scss';
import { rgbaToArray } from 'hex-and-rgba';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { ReactComponent as PLUS } from '../../../../../assets/img/plus.svg';
import ColorPicker from '../../../../Elements/Colorpicker';
import { colorsAdd, colorsUpdate } from '../../../../../redux/actions/Colors';

const AddColor = () => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.colors.data);
  const node = useRef(null);
  const nodePicker = useRef(null);
  const [isOpenColorLibrary, setOpenColorLibrary] = useState(false);
  const [isFirstChanges, setFirstChanged] = useState(false);

  const outSideClick = (e) => {
    if (node.current && node.current.contains(e.target)) {
      return false;
    }
    if (nodePicker.current && nodePicker.current.contains(e.target)) {
      return false;
    }
    return setOpenColorLibrary(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', outSideClick, false);

    if (!isOpenColorLibrary) {
      setFirstChanged(false);
    }

    return () => {
      document.removeEventListener('mousedown', outSideClick, false);
    };
  }, [isOpenColorLibrary]);

  const onClick = () => {
    setOpenColorLibrary(true);
  };

  const onChangeColor = (value) => {
    const color = {};
    const rgbaArray = rgbaToArray(value);
    if (rgbaArray) {
      color.type = 'hex';
    } else {
      color.type = 'gradient';
    }
    color.value = value;

    if (isFirstChanges) {
      const newColor = colors[0];
      dispatch(colorsUpdate(newColor.id, color.type, color.value));
    } else {
      setFirstChanged(true);
      dispatch(colorsAdd(color.type, color.value));
    }
  };

  return (
    <div
      className={classNames('editor__sidebar-color-main-add-square animate-transition-03', {
        'editor__sidebar-color-main-add-square-active': isOpenColorLibrary,
      })}
      ref={node}
      onClick={(value) => onClick(value)}
    >
      <PLUS className="animate-transition-03" />
      {isOpenColorLibrary ? (
        <div className="editor__sidebar-color-main-add-colorpicker animated pulse faster" ref={nodePicker}>
          <ColorPicker gradient solid onChange={onChangeColor} />
        </div>
      ) : null}
    </div>
  );
};

export default AddColor;
