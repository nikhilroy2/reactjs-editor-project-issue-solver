import React from 'react';
import { RichUtils } from 'draft-js';
import PropTypes from 'prop-types';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import Tooltip from '../../../../Elements/Tooltip';

/**
 * Bold
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonBold = ({ getEditorState, activeObj, setEditorState }) => {
  const isActive = !!activeObj.BOLD;

  const onClick = () => {
    const editorState = getEditorState();
    const newEditorState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
    setEditorState(newEditorState);
  };

  const onMouseDown = (e) => e.preventDefault();

  return (
    <Tooltip text="Bold" offset={8}>
      <ToolbarButtons.Bold active={isActive} onMouseDown={onMouseDown} onClick={() => onClick()} />
    </Tooltip>
  );
};

ToolbarButtonBold.propTypes = {
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

ToolbarButtonBold.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonBold;
