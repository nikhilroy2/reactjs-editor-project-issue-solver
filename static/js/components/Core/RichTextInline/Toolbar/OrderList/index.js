import React from 'react';
import { RichUtils } from 'draft-js';
import PropTypes from 'prop-types';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import Tooltip from '../../../../Elements/Tooltip';

/**
 * Ol
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonOrderList = ({ getEditorState, activeObj, setEditorState }) => {
  const styleKey = 'OL';
  const isActive = !!activeObj[styleKey];

  const onClick = () => {
    const editorState = getEditorState();
    const newEditorState = RichUtils.toggleBlockType(editorState, 'ordered-list-item');
    setEditorState(newEditorState);
  };

  const onMouseDown = (e) => e.preventDefault();

  return (
    <Tooltip
      text="Order list"
      offset={8}
    >
      <ToolbarButtons.OrderList
        active={isActive}
        onMouseDown={onMouseDown}
        onClick={() => onClick()}
      />
    </Tooltip>
  )
};

ToolbarButtonOrderList.propTypes = {
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

ToolbarButtonOrderList.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonOrderList;
