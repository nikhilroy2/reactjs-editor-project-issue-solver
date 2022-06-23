import React, { useState, useEffect } from 'react';
import './_resize-tooltip.scss';
import PropTypes from 'prop-types';
import { isClickToToolbarNode } from '../helper';
import { toolbarClass } from '../config';
import Resize from './Resize';

/**
 * Resize text event listener
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ResizeCheckText = ({
  wrapperNode, parentNode, resize, dataID,
}) => {
  const [isInit, setInit] = useState(false);

  const onClickNode = () => {
    if (!isInit) {
      setInit(true);
      // eslint-disable-next-line
      document.addEventListener('mousedown', outSideClick);
    }
  };

  const outSideClick = (e) => {
    if (wrapperNode.current && wrapperNode.current.editor && wrapperNode.current.editor.contains(e.target)) {
      return false;
    }

    const isClick = isClickToToolbarNode(toolbarClass, e.target);
    if (isClick) {
      return false;
    }

    document.removeEventListener('mousedown', outSideClick);
    if (wrapperNode.current && wrapperNode.current.editor) {
      wrapperNode.current.editor.removeEventListener('mousedown', onClickNode);
    }
    return setInit(false);
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (wrapperNode.current && wrapperNode.current.editor) {
      wrapperNode.current.editor.addEventListener('mousedown', onClickNode);

      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (wrapperNode.current && wrapperNode.current.editor) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          wrapperNode.current.editor.removeEventListener('mousedown', onClickNode);
        }
      };
    }
  });

  if (isInit) {
    return <Resize wrapperNode={wrapperNode} parentNode={parentNode} dataID={dataID} resize={resize} />;
  }

  return null;
};

ResizeCheckText.propTypes = {
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

ResizeCheckText.defaultProps = {};

export default ResizeCheckText;
