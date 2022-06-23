import { HEADERS } from './config';

/**
 * @name getCurrentEntityKey
 * @function
 * @description ключи стилей draft js
 * @param {object} editorState - draft js объект
 */
export const getCurrentEntityKey = (editorState) => {
  const selection = editorState.getSelection();
  const anchorKey = selection.getAnchorKey();
  const contentState = editorState.getCurrentContent();
  const anchorBlock = contentState.getBlockForKey(anchorKey);
  const offset = selection.anchorOffset;
  const index = selection.isBackward ? offset - 1 : offset;
  return anchorBlock.getEntityAt(index);
};

/**
 * @name getSelectionValues
 * @function
 * @description стили в выделенном тексте
 * @param {object} editorState - draft js объект
 */
export const getSelectionValues = (editorState) => {
  const editorStateInlines = {};
  const contentState = editorState.getCurrentContent();
  const entityKey = getCurrentEntityKey(editorState);
  const currentInlineStyle = editorState.getCurrentInlineStyle();
  const currentInlineStyleList = editorState
    .getCurrentInlineStyle()
    .toList()
    .toJS();
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  currentInlineStyleList.forEach((item) => {
    const subitems = item.split('_');

    if (subitems[1] === 'COLOR') {
      editorStateInlines[subitems[1]] = subitems[2];
    }
    if (subitems[1] === 'LINE') {
      editorStateInlines[subitems[1]] = subitems[3];
    }
    if (subitems[1] === 'FONT') {
      if (subitems[2] && subitems[2] === 'SIZE') {
        editorStateInlines[`${subitems[1]}_${subitems[2]}`] = subitems[3];
      }
    }
    if (subitems[1] === 'TEXT') {
      if (subitems[2] && subitems[2] === 'TRANSFORM') {
        editorStateInlines[`${subitems[1]}_${subitems[2]}`] = subitems[3];
      }
    }
    if (subitems[1] === 'LINE') {
      if (subitems[2] && subitems[2] === 'HEIGHT') {
        editorStateInlines[`${subitems[1]}_${subitems[2]}`] = subitems[3];
      }
    }
    if (subitems[1] === 'LETTER') {
      if (subitems[2] && subitems[2] === 'SPACING') {
        editorStateInlines[`${subitems[1]}_${subitems[2]}`] = subitems[3];
      }
    }
  });

  if (currentInlineStyle.has('BOLD')) {
    editorStateInlines.BOLD = true;
  }

  if (currentInlineStyle.has('ITALIC')) {
    editorStateInlines.ITALIC = true;
  }

  if (currentInlineStyle.has('UNDERLINE')) {
    editorStateInlines.UNDERLINE = true;
  }

  if (currentInlineStyle.has('STRIKETHROUGH')) {
    editorStateInlines.STRIKETHROUGH = true;
  }

  if (HEADERS.includes(blockType)) {
    editorStateInlines.HEADER = blockType;
  }

  if (blockType && blockType === 'unordered-list-item') {
    editorStateInlines.UL = true;
  }

  if (blockType && blockType === 'ordered-list-item') {
    editorStateInlines.OL = true;
  }

  if (currentInlineStyle.has('CUSTOM_TEXT_ALIGN_LEFT')) {
    editorStateInlines.ALIGN = 'left';
  }

  if (currentInlineStyle.has('CUSTOM_TEXT_ALIGN_RIGHT')) {
    editorStateInlines.ALIGN = 'right';
  }

  if (currentInlineStyle.has('CUSTOM_TEXT_ALIGN_CENTER')) {
    editorStateInlines.ALIGN = 'center';
  }

  if (currentInlineStyle.has('CUSTOM_TEXT_ALIGN_JUSTIFY')) {
    editorStateInlines.ALIGN = 'justify';
  }

  if (entityKey) {
    const {
      url, type, value, blank,
    } = contentState.getEntity(entityKey).getData();
    if (url) {
      editorStateInlines.LINK = {
        type,
        value,
        blank,
      };
    }
  }

  return editorStateInlines;
};
