import React, { useState, useRef } from 'react';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import PropTypes from 'prop-types';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import Tooltip from '../../../../Elements/Tooltip';
import FilesManager from '../../../../Popups/Filesmanager'

/**
 * Image
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonImage = ({ getEditorState, activeObj, setEditorState }) => {
  const isActive = !!activeObj.IMAGE;
  const node = useRef(null);
  const [isOpenFilesManager, setOpenFilesManager] = useState(false);

  const onImageSelection = (selectImage) => {
    const editorState = getEditorState();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      {
        source: {
          type: 'filesmanager',
          id: selectImage.id,
        },
        type: 'image',
        float: 'justify',
        styles: {
          width: '200px',
          height: 'auto',
        },
        src: selectImage.url,
      },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
    );

    setEditorState(AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      ' ',
    ))
  };

  const onMouseDown = (e) => e.preventDefault();

  return (
    <Tooltip text="Image" offset={8}>
      <>
        <ToolbarButtons.Image active={isActive} onMouseDown={onMouseDown} onClick={() => setOpenFilesManager(!isOpenFilesManager)} />
        {isOpenFilesManager
          ? (
            <FilesManager
              rootNode={node}
              onClose={() => setOpenFilesManager(false)}
              onImageSelection={onImageSelection}
            />
          ) : null}
      </>
    </Tooltip>
  );
};

ToolbarButtonImage.propTypes = {
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

ToolbarButtonImage.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonImage;
