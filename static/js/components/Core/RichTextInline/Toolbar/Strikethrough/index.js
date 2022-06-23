import React from 'react';
import { RichUtils } from 'draft-js';
import PropTypes from 'prop-types';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import Tooltip from '../../../../Elements/Tooltip';

/**
 * Strikethrough
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonStrikethrough = ({ getEditorState, activeObj, setEditorState }) => {
  const styleKey = 'STRIKETHROUGH';
  const isActive = !!activeObj[styleKey];

  const onClick = () => {
    const editorState = getEditorState();
    const newEditorState = RichUtils.toggleInlineStyle(editorState, styleKey);
    setEditorState(newEditorState);
  };

  const onMouseDown = (e) => e.preventDefault();

  return (
    <Tooltip text="Strikethrough" offset={8}>
      <ToolbarButtons.Strikethrough active={isActive} onMouseDown={onMouseDown} onClick={() => onClick()} />
    </Tooltip>
  );
};

ToolbarButtonStrikethrough.propTypes = {
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
};

ToolbarButtonStrikethrough.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonStrikethrough;
