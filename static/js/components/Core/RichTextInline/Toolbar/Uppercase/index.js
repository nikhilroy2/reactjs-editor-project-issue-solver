import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import { styles } from '../../config';
import Tooltip from '../../../../Elements/Tooltip';

/**
 * Uppercase
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonUppercase = ({ getEditorState, activeObj, setEditorState }) => {
  const styleKey = 'TEXT_TRANSFORM';
  const isActive = !!activeObj[styleKey];

  const onClick = () => {
    const editorState = getEditorState();
    setEditorState(styles.textTransform.toggle(editorState, 'uppercase'))
  };

  const onMouseDown = (e) => e.preventDefault();

  return (
    <Tooltip text="Uppercase" offset={8}>
      <ToolbarButtons.Uppercase
        active={isActive}
        onMouseDown={onMouseDown}
        onClick={() => onClick()}
      />
    </Tooltip>
  )
};

ToolbarButtonUppercase.propTypes = {
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

ToolbarButtonUppercase.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonUppercase;
