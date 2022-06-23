import React from 'react';
import { EditorState, Modifier } from 'draft-js';
import clearFormatting from 'draft-js-clear-formatting';
import PropTypes from 'prop-types';
import { CUSTOM_STYLES_JS, DEFAULT_STYLES, styles } from '../../config';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import Tooltip from '../../../../Elements/Tooltip';

/**
 * Clear styles
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonClear = ({ getEditorState, setEditorState }) => {
  const onClick = () => {
    const editorState = getEditorState();
    const currentInlineStyleList = editorState.getCurrentInlineStyle().toList().toJS();
    const allStyles = [...new Set(currentInlineStyleList.concat(DEFAULT_STYLES))];

    const contentState = editorState.getCurrentContent();

    const contentWithoutStyles = allStyles.reduce(
      (newContentState, style) => Modifier.removeInlineStyle(
        newContentState,
        editorState.getSelection(),
        style,
      ),
      contentState,
    );

    const newEditorState = EditorState.push(
      editorState,
      contentWithoutStyles,
      'change-inline-style',
    );
    const options = {
      inline: true,
      entities: true,
      lists: true,
    };

    let EditorStateRemoveStyles = newEditorState;
    CUSTOM_STYLES_JS.forEach((item) => {
      EditorStateRemoveStyles = styles[item].remove(EditorStateRemoveStyles);
    });

    const clearEditorState = clearFormatting(EditorStateRemoveStyles, options);
    // Clear tags
    // const clearToggleBlockType = RichUtils.toggleBlockType(clearEditorState, 'p');

    // const newEditorState = styles.textAlign.toggle(editorState, valueToUpperCase);
    // setEditorState(ExtendedRichUtils.toggleAlignment(newEditorState, valueToUpperCase));
    setEditorState(clearEditorState);
  };

  const onMouseDown = (e) => e.preventDefault();

  return (
    <Tooltip text="Clear styles" offset={8}>
      <ToolbarButtons.Clear
        active={false}
        onMouseDown={onMouseDown}
        onClick={() => onClick()}
      />
    </Tooltip>
  )
};

ToolbarButtonClear.propTypes = {
  /**
   * Актуальный EditorState (DraftJS)
   */
  getEditorState: PropTypes.func.isRequired,
  /**
   * Изменить EditorState (DraftJS)
   */
  setEditorState: PropTypes.func.isRequired,
};

export default ToolbarButtonClear;
