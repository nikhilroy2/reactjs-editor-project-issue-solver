import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { getSourceValue, getParentKey, getObjectSource } from '../../../../utils/SourceValue';
import { dataChangeValues } from '../../../../redux/actions/data/update';
import Methods from '../../../../utils/Methods/index';
import { toolbarClass } from '../config';

/**
 * Resizable
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Resize = ({
  resize, wrapperNode, parentNode, dataID,
}) => {
  const dispatch = useDispatch();

  const nodeLeft = useRef(null);
  const nodeRight = useRef(null);

  const left = resize.left ? getSourceValue(resize.left.source, dataID) : false;
  const right = resize.right ? getSourceValue(resize.right.source, dataID) : false;

  const maxWidth = parentNode.current.offsetWidth / 2 - 15;

  const [resizeValue, setResizeValue] = useState({
    left: {
      resizing: false,
      value: left,
    },
    right: {
      resizing: false,
      value: right,
    },
  });

  const [height, setHeight] = useState(wrapperNode.current.editor.offsetHeight);

  setTimeout(() => {
    if (wrapperNode && wrapperNode.current && wrapperNode.current.editor) {
      setHeight(wrapperNode.current.editor.offsetHeight);
    }
  }, 5);

  const onChangeLeft = () => {
    const keys = getParentKey(resize.left.source);
    const { value } = resizeValue.left;

    if (keys.currentPath === 'default' || keys.currentPath === false) {
      dispatch(dataChangeValues(`${value}px`, keys.parentKey, dataID));
    } else {
      const newData = _.cloneDeep(Methods.getData(dataID));
      const changeData = getObjectSource(newData.data, keys.currentPath);
      changeData[keys.currentKey] = `${value}px`;
      dispatch(dataChangeValues(newData.data[keys.parentKey], keys.parentKey, dataID));
    }
    setResizeValue((prevState) => ({
      ...prevState,
      left: {
        ...prevState.left,
        resizing: false,
      },
    }));
  };

  const onChangeRight = () => {
    const keys = getParentKey(resize.right.source);
    const { value } = resizeValue.right;

    if (keys.currentPath === 'default' || keys.currentPath === false) {
      dispatch(dataChangeValues(`${value}px`, keys.parentKey, dataID));
    } else {
      const newData = _.cloneDeep(Methods.getData(dataID));
      const changeData = getObjectSource(newData.data, keys.currentPath);
      changeData[keys.currentKey] = `${value}px`;
      dispatch(dataChangeValues(newData.data[keys.parentKey], keys.parentKey, dataID));
    }
    setResizeValue((prevState) => ({
      ...prevState,
      right: {
        ...prevState.right,
        resizing: false,
      },
    }));
  };

  const onChange = (direction) => {
    if (resize.chain) {
      onChangeLeft();
      onChangeRight();
    } else {
      if (direction === 'left') {
        onChangeLeft();
      }
      if (direction === 'right') {
        onChangeRight();
      }
    }
  };

  useEffect(() => {
    if (resizeValue.left.value && resizeValue.left.value !== 'not found') {
      $(nodeLeft.current).resizable({
        handles: 'e',
        minHeight: 0,
        minWidth: 0,
        maxHeight: 500,
        maxWidth,
        width: parseInt(resizeValue.left.value, 10),
        // eslint-disable-next-line
        start: (event, ui) => {},
        // eslint-disable-next-line
        stop: (event, ui) => {
          onChange('left', ui.size.width > 0 ? ui.size.width : 0);
        },
        // eslint-disable-next-line
        resize: (event, ui) => {
          setTimeout(() => {
            const value = `${ui.size.width > 0 ? ui.size.width : 0}`;

            if (nodeLeft.current) {
              nodeLeft.current.parentNode.style.paddingLeft = `${value}px`;
            }
            if (resize.chain) {
              if (nodeLeft.current) {
                nodeLeft.current.parentNode.style.paddingRight = `${value}px`;
              }
              setResizeValue({
                right: {
                  resizing: true,
                  value,
                },
                left: {
                  resizing: true,
                  value,
                },
              });
            } else {
              setResizeValue((prevState) => ({
                ...prevState,
                left: {
                  resizing: true,
                  value,
                },
              }));
            }

            if (wrapperNode.current && wrapperNode.current.editor) {
              setHeight(wrapperNode.current.editor.offsetHeight);
            }
          }, 5);
        },
      });
    }
    if (resizeValue.right.value && resizeValue.right.value !== 'not found') {
      $(nodeRight.current).resizable({
        handles: 'w',
        minHeight: 0,
        minWidth: 0,
        maxWidth,
        maxHeight: 500,
        width: parseInt(resizeValue.right.value, 10),
        // eslint-disable-next-line
        start: (event, ui) => {},
        // eslint-disable-next-line
        stop: (event, ui) => {
          onChange('right', ui.size.width > 0 ? ui.size.width : 0);
        },
        // eslint-disable-next-line
        resize: (event, ui) => {
          setTimeout(() => {
            const value = `${ui.size.width > 0 ? ui.size.width : 0}`;
            if (nodeRight.current) {
              nodeRight.current.parentNode.style.paddingRight = `${value}px`;
            }
            if (resize.chain) {
              if (nodeRight.current) {
                nodeRight.current.parentNode.style.paddingLeft = `${value}px`;
              }
              setResizeValue({
                right: {
                  resizing: true,
                  value,
                },
                left: {
                  resizing: true,
                  value,
                },
              });
            } else {
              setResizeValue((prevState) => ({
                ...prevState,
                right: {
                  resizing: true,
                  value,
                },
              }));
            }

            if (wrapperNode.current && wrapperNode.current.editor) {
              setHeight(wrapperNode.current.editor.offsetHeight);
            }
          }, 5);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, resizeValue.left.value, resizeValue.right.value]);

  return (
    <>
      {left && left !== 'not found' ? (
        <div
          ref={nodeLeft}
          className={`editor__richtext editor__richtext-resize-left ${toolbarClass}`}
          style={{ width: `${parseInt(resizeValue.left.value, 10)}px`, height }}
        >
          {resizeValue.left.resizing ? (
            <div className="editor__richtext-resize-tooltip editor__richtext-resize-tooltip-left">
              {parseInt(resizeValue.left.value, 10)}
              px
            </div>
          ) : null}
        </div>
      ) : null}
      {right && right !== 'not found' ? (
        <div
          ref={nodeRight}
          className={`editor__richtext editor__richtext-resize-right ${toolbarClass}`}
          style={{ width: `${parseInt(resizeValue.right.value, 10)}px`, height }}
        >
          {resizeValue.right.resizing ? (
            <div className="editor__richtext-resize-tooltip editor__richtext-resize-tooltip-right">
              {parseInt(resizeValue.right.value, 10)}
              px
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

Resize.propTypes = {
  /**
   * Настройки resize из template.json
   */
  resize: PropTypes.object,
  /**
   * ID блока
   */
  dataID: PropTypes.number.isRequired,
  /**
   * ref node элемента в котором находится текст
   */
  parentNode: PropTypes.object.isRequired,
  /**
   * ref EditorState (DraftJS)
   */
  wrapperNode: PropTypes.object.isRequired,
};

Resize.defaultProps = {};

export default Resize;
