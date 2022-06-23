import { stateToHTML } from 'draft-js-export-html';
import _ from 'lodash';
import React from 'react';
import {
  CompositeDecorator, convertFromRaw, convertToRaw, EditorState,
} from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { getSourceValue } from '../../../utils/SourceValue';
import { exporter, ALIGNMENT_DATA_KEY } from './config';
import Methods from '../../../utils/Methods';

/**
 * @name Link
 * @function
 * @description Компонент для вывода ссылки
 * @param {object} props - react props
 */
export const Link = (props) => {
  // eslint-disable-next-line
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  // eslint-disable-next-line
  return <a href={url}>{props.children}</a>;
};

/**
 * @name checkIsDraftData
 * @function
 * @description Проверяем Draft js объект
 * @param {object} data - data объект текста
 */
export const checkIsDraftData = (data) => _.isObject(data) && data.hasOwnProperty('blocks') && data.hasOwnProperty('entityMap');

/**
 * @name findLinkEntities
 * @function
 * @description Поиск ссылок в draftjs объекте
 * @param {object} contentBlock - контент в draftjs объекте
 * @param {function} callback
 * @param {object} contentState - state draftjs
 */
export const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
};

/**
 * @name convertFromRawToEditorState
 * @function
 * @description Конвертируем из обхекта draftjs в state draftjs
 * @param {object} content - отконвертированный обхект draftjs
 */
export const convertFromRawToEditorState = (content) => {
  const convertFromRawState = convertFromRaw(content);
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);
  const newEditorState = EditorState.createWithContent(convertFromRawState, decorator);

  if (content.hasOwnProperty('entityMap') && _.isArray(content.entityMap)) {
    const correctContent = convertToRaw(newEditorState.getCurrentContent());
    const convertFromRawState = convertFromRaw(correctContent);
    return EditorState.createWithContent(convertFromRawState, decorator);
  }

  return newEditorState;
};

/**
 * @name convertHtmlToEditor
 * @function
 * @description Конвертируем из строчки с тегами HTML в draftjs объект
 * @param {string} html - HTML строка
 */
export const convertHtmlToEditor = (html) => {
  const newEditorState = stateFromHTML(html);

  if (newEditorState && html) {
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);
    return EditorState.createWithContent(newEditorState, decorator);
  }
  return EditorState.createEmpty();
};

/**
 * @name convertToEditor
 * @function
 * @description Конвертируем в draft js
 * @param {object} text - Текущая data
 * @param {string} dataID - ID data блока
 * @param {string} mode - Режим перевода
 */
export const convertToEditor = (text, dataID, mode) => {
  const dataText = getSourceValue(text.source, dataID);

  if (dataText !== 'not found') {
    if (dataText && _.isObject(dataText)) {
      const defaultLanguage = Methods.getDefaultLanguage();
      const isValue = dataText.hasOwnProperty('data');
      const value = dataText.data;
      const isDraftData = checkIsDraftData(value);
      if (isValue && typeof value === 'string' && value !== 'not found') {
        return convertHtmlToEditor(value);
      } if (isValue && typeof value === 'object') {
        if (isDraftData) {
          return convertFromRawToEditorState(value);
        }
        if (mode && value[mode]) {
          return convertFromRawToEditorState(value[mode]);
        }
        if (value[defaultLanguage.code]) {
          return convertFromRawToEditorState(value[defaultLanguage.code]);
        }
        if (value.default) {
          return convertFromRawToEditorState(value.default);
        }
        return EditorState.createEmpty()
      }
    } else if (text.editor && !_.isUndefined(dataText) && _.isString(dataText)) {
      return convertHtmlToEditor(dataText)
    } else if (_.isNumber(dataText)) {
      return `${dataText}`;
    }
    return dataText;
  }
  return false;
};

/**
 * @name getDraftID
 * @function
 * @description Получаем ID текста
 * @param {object} text - source в data
 * @param {number} dataID - ID data блока
 */
export const getDraftID = (text, dataID) => {
  const dataText = getSourceValue(text.source, dataID);
  if (dataText !== 'not found') {
    if (dataText && _.isObject(dataText)) {
      if (dataText.id) {
        return dataText.id;
      }
    }
  }
  return false;
};

/**
 * @name convertEditorStateToHTML
 * @function
 * @description Конвертируем из DraftJS объекта в HTML строку
 * @param {object} editorState - draftjs объект
 */
export const convertEditorStateToHTML = (editorState) => {
  if (editorState) {
    if (_.isString(editorState)) {
      return editorState;
    } if (_.isObject(editorState)) {
      const inlineStyles = exporter(editorState);
      const currentContent = editorState.getCurrentContent();
      return stateToHTML(currentContent, {
        inlineStyles,
        // eslint-disable-next-line
        entityStyleFn: (entity) => {
          const entityType = entity.get('type').toLowerCase();
          if (entityType === 'link') {
            const data = entity.getData();
            let href = '#';

            if (data.type === 'anchor') {
              if (data.value) {
                href = `#block_${data.value}`;
              }
            } else {
              href = data.url;
            }
            return {
              element: 'a',
              attributes: {
                target: data && data.blank ? '_blank' : '_self',
                href,
              },
            };
          }
        },
        // eslint-disable-next-line
        blockStyleFn: (block) => {
          const alignKey = block.getData().get(ALIGNMENT_DATA_KEY);
          if (alignKey) {
            return {
              attributes: {
                class: `text-${alignKey.toLowerCase()}`,
              },
            };
          }
        },
      });
    }
  }

  return false;
};

/**
 * @name getOnlyText
 * @function
 * @description Получаем строку с текстом (не draftjs)
 * @param {object} text - source объект
 * @param {number} dataID - ID data
 */
export const getOnlyText = (text, dataID) => {
  if (text) {
    if (_.isObject(text) && text.source && dataID) {
      const value = getSourceValue(text.source, dataID);
      if (value !== 'not found') {
        return value;
      }
    } else if (_.isString(text)) {
      return text;
    }
  }

  return '';
};

/**
 * @name isClickToToolbarNode
 * @function
 * @description Проверяем, произошел ли клик на toolbar
 * @param {object} toolbarClass - css класс тулбара
 * @param {object} target - клик
 */
export const isClickToToolbarNode = (toolbarClass, target) => {
  const toolbarNodes = document.getElementsByClassName(toolbarClass);

  if (toolbarNodes) {
    for (let i = 0; i < toolbarNodes.length; i++) {
      if (toolbarNodes[i].contains(target)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * @name getLengthOfSelectedText
 * @function
 * @description Длина выделенно текста в draftjs
 * @param {object} editorState - draftjs объект
 */
export const getLengthOfSelectedText = (editorState) => {
  const currentSelection = editorState.getSelection();
  const isCollapsed = currentSelection.isCollapsed();

  let length = 0;

  if (!isCollapsed) {
    const currentContent = editorState.getCurrentContent();
    const startKey = currentSelection.getStartKey();
    const endKey = currentSelection.getEndKey();
    const startBlock = currentContent.getBlockForKey(startKey);
    const isStartAndEndBlockAreTheSame = startKey === endKey;
    const startBlockTextLength = startBlock.getLength();
    const startSelectedTextLength = startBlockTextLength - currentSelection.getStartOffset();
    const endSelectedTextLength = currentSelection.getEndOffset();
    const keyAfterEnd = currentContent.getKeyAfter(endKey);

    if (isStartAndEndBlockAreTheSame) {
      length += currentSelection.getEndOffset() - currentSelection.getStartOffset();
    } else {
      let currentKey = startKey;

      while (currentKey && currentKey !== keyAfterEnd) {
        if (currentKey === startKey) {
          length += startSelectedTextLength + 1;
        } else if (currentKey === endKey) {
          length += endSelectedTextLength;
        } else {
          length += currentContent.getBlockForKey(currentKey).getLength() + 1;
        }

        currentKey = currentContent.getKeyAfter(currentKey);
      }
    }
  }

  return length;
};

/**
 * @name getSelectionRange
 * @function
 * @description Выделение текста в drafts
 */
export const getSelectionRange = () => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return null;
  return selection.getRangeAt(0);
};

/**
 * @name dataObjectCreator
 * @function
 * @description Создание мультиязычной даты
 * @param {object} currentData - Текущая data
 * @param {string} mode - Включен ли мод перевода
 * @param {object} newText - Новый текст
 * @param {string} typeData - Тип data/deps
 */
export const dataObjectCreator = (currentData, mode, newText, typeData) => {
  if (currentData && currentData.data && typeData !== 'deps') {
    const defaultLanguage = Methods.getDefaultLanguage();
    const isDraftData = checkIsDraftData(currentData.data);
    let newData = {};
    if (isDraftData) {
      if (mode) {
        newData = {
          default: currentData.data,
          [mode]: newText,
        };
      } else {
        newData = newText;
      }
    } else {
      if (mode) {
        newData = {
          ...currentData.data,
          [mode]: newText,
        };
      } else {
        // TODO fix
        if (currentData.data[0] && currentData.data[1]) {
          newData = {
            default: newText,
          }
        } else {
          newData = {
            ...currentData.data,
            [defaultLanguage.code]: newText,
          };
        }
      }
    }
    return newData;
  }
  return newText;
};
