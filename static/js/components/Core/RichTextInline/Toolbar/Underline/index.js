import React from 'react';
import { RichUtils } from 'draft-js';
import PropTypes from 'prop-types';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import Tooltip from '../../../../Elements/Tooltip';

/**
 * Underline
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonItalic = ({ getEditorState, activeObj, setEditorState }) => {
  const styleKey = 'UNDERLINE';
  const isActive = !!activeObj[styleKey];

  const onClick = () => {
    const editorState = getEditorState();
    const newEditorState = RichUtils.toggleInlineStyle(editorState, styleKey);
    setEditorState(newEditorState);
  };

  const onMouseDown = (e) => e.preventDefault();

  return (
    <Tooltip text="Underline" offset={8}>
      <ToolbarButtons.Underline
        active={isActive}
        onMouseDown={onMouseDown}
        onClick={() => onClick()}
      />
    </Tooltip>
  )
};

ToolbarButtonItalic.propTypes = {
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

ToolbarButtonItalic.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonItalic;
