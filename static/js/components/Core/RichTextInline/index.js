/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { convertToRaw, RichUtils, Editor } from 'draft-js';
import './_richtext.scss';
import { useDebounce } from 'use-debounce';
import _ from 'lodash';
import { uuid } from 'uuidv4';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getSelectionRange,
  convertToEditor,
  getLengthOfSelectedText,
  convertEditorStateToHTML,
  getDraftID,
  dataObjectCreator,
} from './helper';
import Toolbar from './Toolbar';
import { customStyleFn, customStyleMap, getBlockStyle } from './config';
import { getObjectSource, getParentKey, getNewData } from '../../../utils/SourceValue';
import { dataChangeValues } from '../../../redux/actions/data/update';
import { depsChangeValues } from '../../../redux/actions/data/deps';
import { getSelectionValues } from './getSelectionValues';
import Resize from './ResizeText';
import mediaBlockRenderer from './AtomicComponents';

/**
 * Rich text inline
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const RichTextInline = ({ domElement, parentNode, dataID }) => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.languages);
  const [editor, setEditor] = useState({
    editorState: false,
    plainText: false,
    selectionObj: false,
    init: false,
  });

  const { selectionObj } = editor;

  const [debounceEditorState] = useDebounce(editor, 1000);

  const editorNode = useRef(null);

  const onChange = (editorState) => {
    setEditor((prevState) => {
      const getSelectionBounds = () => {
        if (
          !editorState.getSelection().isCollapsed()
          && !prevState.selectionObj
        ) {
          const newSelectionRangeAt = getSelectionRange();
          if (!newSelectionRangeAt) {
            return false;
          }
          return {
            length: getLengthOfSelectedText(editorState),
            selectionBounds: newSelectionRangeAt.getBoundingClientRect(),
          };
        }
        if (prevState.selectionObj) {
          const selectionLength = getLengthOfSelectedText(editorState);
          if (selectionLength === prevState.selectionObj.length) {
            return prevState.selectionObj;
          }
          if (selectionLength !== 0) {
            const newSelectionRangeAt = getSelectionRange();
            if (!newSelectionRangeAt) {
              return prevState.selectionObj;
            }
            return {
              length: selectionLength,
              selectionBounds: newSelectionRangeAt.getBoundingClientRect(),
            };
          }
          return false;
        }
        return false;
      };

      const selectionBounds = getSelectionBounds();
      return {
        ...prevState,
        editorState,
        selectionObj: selectionBounds,
        init: true,
      };
    });
  };

  const getEditorState = () => {
    const { editorState } = editor;
    return editorState;
  };

  const onChangeEditorState = (newEditorState) => {
    setEditor((prevState) => ({
      ...prevState,
      editorState: newEditorState,
    }));
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editor.editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  const checkEditorState = () => {
    const newEditorState = convertToEditor(domElement.text, dataID, mode);
    if (!_.isUndefined(newEditorState) && !_.isNull(newEditorState) && !_.isNaN(newEditorState)) {
      if (domElement.text.editor) {
        const draftID = getDraftID(domElement.text, dataID);
        setEditor((prevState) => ({
          ...prevState,
          storeEditorState: convertToRaw(newEditorState.getCurrentContent()),
          editorState: newEditorState,
          draftID,
        }));
      } else {
        setEditor((prevState) => ({
          ...prevState,
          plainText: newEditorState,
        }));
      }
    }
  };
  useEffect(() => {
    if (domElement.text) {
      checkEditorState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (domElement.text) {
      if (editor.editorState) {
        if (editor.draftID) {
          const draftID = getDraftID(domElement.text, dataID);
          if (editor.draftID !== draftID) {
            checkEditorState();
          }
        }
      } else {
        checkEditorState();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domElement.text]);

  useEffect(() => {
    if (debounceEditorState && debounceEditorState.init) {
      const newText = convertToRaw(
        debounceEditorState.editorState.getCurrentContent(),
      );
      const prevText = editor.storeEditorState;

      if (!_.isEqual(prevText, newText)) {
        const keys = getParentKey(domElement.text.source);
        const typeData = domElement.text.source.typeData || 'data';
        const newData = getNewData(domElement.text.source, dataID);

        if (keys.currentPath === 'default' || keys.currentPath === false) {
          const data = dataObjectCreator(newData[keys.currentKey], mode, newText, typeData);
          const newData = {
            id: prevText.id ? prevText.id : uuid(),
            type: 'wysiwyg',
            data,
          };
          if (typeData === 'data') {
            dispatch(dataChangeValues(newData, keys.parentKey, dataID));
          }
          if (typeData === 'deps') {
            dispatch(depsChangeValues(newData, keys.parentKey, dataID, false));
          }
        } else {
          const newDataCurrentPath = getObjectSource(newData, keys.currentPath);

          const data = dataObjectCreator(newDataCurrentPath[keys.currentKey], mode, newText, typeData);

          if (_.isObject(newDataCurrentPath[keys.currentKey])) {
            const { id } = newDataCurrentPath[keys.currentKey];
            newDataCurrentPath[keys.currentKey] = {
              id: id || uuid(),
              type: 'wysiwyg',
              data,
            };
          } else {
            newDataCurrentPath[keys.currentKey] = {
              id: uuid(),
              type: 'wysiwyg',
              data,
            };
          }

          if (domElement.text.request) {
            const editor = newDataCurrentPath[keys.currentKey]
            const draft = convertEditorStateToHTML(debounceEditorState.editorState)
            domElement.text.request.customData = {
              editor,
              draft,
            }
          }
          if (typeData === 'data') {
            dispatch(dataChangeValues(newData[keys.parentKey], keys.parentKey, dataID));
          }
          if (typeData === 'deps') {
            dispatch(depsChangeValues(newData[keys.parentKey], keys.parentKey, dataID, domElement.text.request));
          }
        }

        setEditor((prevState) => ({
          ...prevState,
          storeEditorState: convertToRaw(
            debounceEditorState.editorState.getCurrentContent(),
          ),
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceEditorState]);

  return (
    <>
      {editor.editorState && domElement.tooltip && selectionObj ? (
        <Toolbar
          tooltip={domElement.tooltip}
          getEditorState={getEditorState}
          setEditorState={(newEditorState) => onChangeEditorState(newEditorState)}
          activeObj={getSelectionValues(editor.editorState)}
          selectionRangeObj={selectionObj.selectionBounds}
          onClose={() => setEditor((prevState) => ({
            ...prevState,
            selectionObj: false,
          }))}
        />
      ) : null}
      {domElement.text.resize ? (
        <Resize
          wrapperNode={editorNode}
          parentNode={parentNode}
          dataID={dataID}
          resize={domElement.text.resize}
        />
      ) : null}
      {domElement.text && _.isString(domElement.text) ? domElement.text : null}
      {editor.plainText ? editor.plainText : null}
      {editor.editorState ? (
        <Editor
          editorState={editor.editorState}
          blockRendererFn={(block) => mediaBlockRenderer(block, getEditorState, onChangeEditorState)}
          placeholder={
            domElement.text.placeholder ? domElement.text.placeholder : null
          }
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          ref={editorNode}
          customStyleMap={customStyleMap}
          blockStyleFn={getBlockStyle}
          customStyleFn={customStyleFn}
        />
      ) : null}
    </>
  );
};

RichTextInline.propTypes = {
  /**
   * Настройки из template.json
   */
  domElement: PropTypes.object,
  /**
   * ID блока
   */
  dataID: PropTypes.number.isRequired,
  /**
   * ref node элемента в котором находится текст
   */
  parentNode: PropTypes.object.isRequired,
};

RichTextInline.defaultProps = {};

export default RichTextInline;
