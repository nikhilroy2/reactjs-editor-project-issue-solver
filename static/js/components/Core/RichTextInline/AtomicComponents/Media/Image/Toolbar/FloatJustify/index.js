import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { ToolbarButtons } from '../../../../../../../../layouts/Toobar/Buttons';
import Tooltip from '../../../../../../../Elements/Tooltip';

/**
 * Float justify
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonFloatJustify = ({ getEditorState, activeObj, ...props }) => {
  const onClick = () => {
    const { contentState, block } = props;
    // eslint-disable-next-line
    const { getEditorState, setEditorState } = props.blockProps;
    const editorState = getEditorState();

    const entityKey = block.getEntityAt(0);
    const contentStateUpdated = contentState.mergeEntityData(
      entityKey,
      { float: 'justify' },
    );
    //
    const editorStateWithEntity = EditorState.set(editorState, {
      currentContent: contentStateUpdated,
    });

    setEditorState(editorStateWithEntity)
  };

  const onMouseDown = (e) => e.preventDefault();

  return (
    <Tooltip text="Justify" offset={8}>
      <ToolbarButtons.FloatJustify onMouseDown={onMouseDown} onClick={() => onClick()} />
    </Tooltip>
  );
};

ToolbarButtonFloatJustify.propTypes = {
  /**
  * Актуальный EditorState (DraftJS)
  */
  getEditorState: PropTypes.func.isRequired,
  /**
  * Активные стили в getSelection Draft js
  */
  activeObj: PropTypes.object,
  /**
  * Изменить EditorState (DraftJS)
  */
  setEditorState: PropTypes.func.isRequired,
  contentState: PropTypes.object,
  block: PropTypes.object,
};

ToolbarButtonFloatJustify.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonFloatJustify;
