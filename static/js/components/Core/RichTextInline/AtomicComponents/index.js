import PropTypes from 'prop-types';
import Media from './Media';

/**
 * Media draft js
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const mediaBlockRenderer = (block, getEditorState, onChangeEditorState) => {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
      props: {
        getEditorState,
        setEditorState: onChangeEditorState,
      },
    };
  }

  return null;
};

mediaBlockRenderer.propTypes = {
  /**
   * Актуальный EditorState (DraftJS)
   */
  getEditorState: PropTypes.func.isRequired,
  /**
   * Обновить EditorState (DraftJS)
   */
  onChangeEditorState: PropTypes.func.isRequired,
  /**
   * Draft js block with entity
   */
  block: PropTypes.object,
};

mediaBlockRenderer.defaultProps = {

};

export default mediaBlockRenderer;
