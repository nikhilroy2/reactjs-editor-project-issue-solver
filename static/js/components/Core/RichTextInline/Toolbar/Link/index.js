import React, { useState, useRef } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import PropTypes from 'prop-types';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import SettingsLink from '../../../../Popups/SettingsLink';
import Tooltip from '../../../../Elements/Tooltip';

/**
 * Link
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonLink = ({
  getEditorState, activeObj, setEditorState, className,
}) => {
  const styleKey = 'LINK';
  const [isOpenLinkPopup, setOpenLinkPopup] = useState(false);
  const buttonNode = useRef(null);
  const isActive = !!activeObj[styleKey];

  const onClick = () => {
    if (!isOpenLinkPopup) {
      setOpenLinkPopup(true);
    }
  };

  const onMouseDown = (e) => e.preventDefault();

  const onChangeState = (link) => {
    const editorState = getEditorState();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      link.value && {
        url: link.value,
        ...link,
      },
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const _newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

    const newEditorState = RichUtils.toggleLink(
      _newEditorState,
      _newEditorState.getSelection(),
      String(link.value).trim() ? entityKey : null,
    );
    setEditorState(newEditorState);
  };

  return (
    <>
      <Tooltip text="Link" offset={8}>
        <ToolbarButtons.Link ref={buttonNode} active={isActive} onMouseDown={onMouseDown} onClick={() => onClick()} />
      </Tooltip>
      {isOpenLinkPopup ? (
        <SettingsLink
          rootNode={buttonNode}
          value={isActive ? activeObj[styleKey] : ''}
          className={className}
          onChange={onChangeState}
          refNode={false}
          onClose={() => setOpenLinkPopup(false)}
        />
      ) : null}
    </>
  );
};

ToolbarButtonLink.propTypes = {
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
  /**
   * Класс для outSideClick
   */
  className: PropTypes.string,
};

ToolbarButtonLink.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonLink;
