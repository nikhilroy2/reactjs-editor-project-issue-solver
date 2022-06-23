import React from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { ToolbarButtons } from '../../../../../../../../layouts/Toobar/Buttons';
import Tooltip from '../../../../../../../Elements/Tooltip';

/**
 * Float right
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonFloatRight = ({ getEditorState, activeObj, ...props }) => {
  const onClick = () => {
    const { contentState, block } = props;
    // eslint-disable-next-line
    const { getEditorState, setEditorState } = props.blockProps;
    const editorState = getEditorState();

    const entityKey = block.getEntityAt(0);
    const contentStateUpdated = contentState.mergeEntityData(
      entityKey,
      { float: 'right' },
    );
    //
    const editorStateWithEntity = EditorState.set(editorState, {
      currentContent: contentStateUpdated,
    });

    setEditorState(editorStateWithEntity)
  };

  const onMouseDown = (e) => e.preventDefault();

  return (
    <Tooltip text="Right" offset={8}>
      <ToolbarButtons.FloatRight onMouseDown={onMouseDown} onClick={() => onClick()} />
    </Tooltip>
  );
};

ToolbarButtonFloatRight.propTypes = {
  /**
  * Актуальный EditorState (DraftJS)
  */
  getEditorState: PropTypes.func.isRequired,
  /**
  * Активные стили в getSelection Draft js
  */
  activeObj: PropTypes.object,
  contentState: PropTypes.object,
  block: PropTypes.object,
};

ToolbarButtonFloatRight.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonFloatRight;
