import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import ColorsLibrary from '../../../../Popups/ColorsLibrary';
import { styles } from '../../config';

/**
 * Color
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonColor = ({
  getEditorState, activeObj, setEditorState, className,
}) => {
  const styleKey = 'COLOR';
  const [isOpenColorLibrary, setOpenColorLibrary] = useState(false);
  const buttonNode = useRef(null);
  const isActive = !!activeObj[styleKey];

  const onClick = () => {
    if (!isOpenColorLibrary) {
      setOpenColorLibrary(true);
    }
  };

  const onChangeColor = (color) => {
    const editorState = getEditorState();
    const newEditorState = styles.color.add(editorState, color);
    setEditorState(newEditorState);
  };

  return (
    <>
      <ToolbarButtons.Color ref={buttonNode} value={isActive ? activeObj[styleKey] : false} onClick={() => onClick()} />
      {isOpenColorLibrary ? (
        <ColorsLibrary
          color={isActive ? activeObj[styleKey] : false}
          parentNode={buttonNode}
          className={className}
          onClose={(value) => setOpenColorLibrary(value)}
          onChange={(value) => onChangeColor(value)}
          solid
          forText
        />
      ) : null}
    </>
  );
};

ToolbarButtonColor.propTypes = {
  /**
   * Актуальный EditorState (DraftJS)
   */
  getEditorState: PropTypes.func.isRequired,
  /**
   * Изменить EditorState (DraftJS)
   */
  setEditorState: PropTypes.func.isRequired,
  /**
   * Активные стили в getSelection Draft js
   */
  activeObj: PropTypes.object,
  /**
   * Класс для outSideClick
   */
  className: PropTypes.string,
};

ToolbarButtonColor.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonColor;
