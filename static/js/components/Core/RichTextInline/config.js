import { Modifier, EditorState, RichUtils } from 'draft-js';
import createStyles from 'draft-js-custom-styles';

export const HEADERS = ['header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six'];
export const LISTS = ['ordered-list-item', 'unordered-list-item'];
export const CUSTOM_STYLES = ['font-size', 'color', 'text-align', 'text-transform', 'letter-spacing', 'line-height'];
export const CUSTOM_STYLES_JS = ['fontSize', 'color', 'textAlign', 'textTransform', 'letterSpacing', 'lineHeight'];
export const DEFAULT_STYLES = ['BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH', 'CODE'];
export const ALIGNMENT_DATA_KEY = 'textAlignment';
export const customStyleMap = {};
export const { styles, customStyleFn, exporter } = createStyles(CUSTOM_STYLES, 'CUSTOM_', customStyleMap);
export const toolbarClass = 'toolbar-element';
export const HEADERS_FONT = {
  'header-one': 'h1',
  'header-two': 'h2',
  'header-three': 'h3',
  'header-four': 'h4',
  'header-five': 'h4',
  'header-six': 'h4',
}
export const getBlockStyle = (block) => {
  const textAlignStyle = block.getData().get(ALIGNMENT_DATA_KEY);

  if (textAlignStyle) {
    switch (textAlignStyle) {
      case 'RIGHT':
        return 'align-right';
      case 'CENTER':
        return 'align-center';
      case 'LEFT':
        return 'align-left';
      case 'JUSTIFY':
        return 'align-justify';
      default:
    }
  }

  return '';
};

export const getCurrentlySelectedBlock = (editorState) => {
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  let endKey = selection.getEndKey();
  const content = editorState.getCurrentContent();
  let target = selection;

  if (startKey !== endKey && selection.getEndOffset() === 0) {
    const blockBefore = content.getBlockBefore(endKey);
    if (!blockBefore) {
      throw new Error('Got unexpected null or undefined');
    }

    endKey = blockBefore.getKey();
    target = target.merge({
      anchorKey: startKey,
      anchorOffset: selection.getStartOffset(),
      focusKey: endKey,
      focusOffset: blockBefore.getLength(),
      isBackward: false,
    });
  }

  const hasAtomicBlock = content
    .getBlockMap()
    .skipWhile((_, k) => k !== startKey)
    .takeWhile((_, k) => k !== endKey)
    .some((v) => v.getType() === 'atomic');

  const currentBlock = content.getBlockForKey(startKey);

  return {
    content,
    currentBlock,
    hasAtomicBlock,
    target,
  };
};

export const ExtendedRichUtils = {
  ...RichUtils,
  toggleAlignment(editorState, alignment) {
    const {
      content, currentBlock, hasAtomicBlock, target,
    } = getCurrentlySelectedBlock(editorState);

    if (hasAtomicBlock) {
      return editorState;
    }

    const blockData = currentBlock.getData();
    const alignmentToSet = blockData && blockData.get(ALIGNMENT_DATA_KEY) === alignment ? undefined : alignment;

    return EditorState.push(
      editorState,
      Modifier.mergeBlockData(content, target, {
        [ALIGNMENT_DATA_KEY]: alignmentToSet,
      }),
      'change-block-data',
    );
  },

  splitBlock(editorState) {
    const contentState = Modifier.splitBlock(editorState.getCurrentContent(), editorState.getSelection());
    const splitState = EditorState.push(editorState, contentState, 'split-block');

    const { currentBlock } = getCurrentlySelectedBlock(editorState);
    const alignment = currentBlock.getData().get(ALIGNMENT_DATA_KEY);
    if (alignment) {
      return ExtendedRichUtils.toggleAlignment(splitState, alignment);
    }
    return splitState;
  },
};
