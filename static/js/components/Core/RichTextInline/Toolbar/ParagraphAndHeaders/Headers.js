import React from 'react';
import { RichUtils } from 'draft-js';
import PropTypes from 'prop-types';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';

/**
 * Paragraph and headers
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarHeadersList = ({
  getEditorState, onChangeTooltipBody, activeObj, setEditorState,
}) => {
  const styleKey = 'HEADER';
  const isActive = !!activeObj[styleKey];

  const onMouseDown = (e) => e.preventDefault();

  const onClick = (value) => {
    const editorState = getEditorState();
    const newEditorState = RichUtils.toggleBlockType(editorState, value);
    setEditorState(newEditorState);
  };

  const headers = [
    {
      value: 'p',
      Button: ToolbarButtons.Paragraph,
    },
    {
      value: 'header-one',
      Button: ToolbarButtons.HeaderOne,
    },
    {
      value: 'header-two',
      Button: ToolbarButtons.HeaderTwo,
    },
    {
      value: 'header-three',
      Button: ToolbarButtons.HeaderThree,
    },
    {
      value: 'header-four',
      Button: ToolbarButtons.HeaderFour,
    },
    {
      value: 'header-five',
      Button: ToolbarButtons.HeaderFive,
    },
    {
      value: 'header-six',
      Button: ToolbarButtons.HeaderSix,
    },
  ];

  return (
    <>
      {headers.map((header) => {
        const { Button } = header;
        return (
          <Button
            active={isActive ? activeObj[styleKey] === header.value : !isActive && header.value === 'p'}
            key={header.value}
            onClick={() => onClick(header.value)}
            onMouseDown={onMouseDown}
          />
        );
      })}
      <ToolbarButtons.Close onClick={() => onChangeTooltipBody(false)} />
    </>
  );
};

ToolbarHeadersList.propTypes = {
  /**
   * Актуальный EditorState (DraftJS)
   */
  getEditorState: PropTypes.func.isRequired,
  /**
   * Изменить EditorState (DraftJS)
   */
  setEditorState: PropTypes.func.isRequired,
  /**
   * Изменить body toolbar
   */
  onChangeTooltipBody: PropTypes.func.isRequired,
  /**
   * Активные стили в getSelection Draft js
   */
  activeObj: PropTypes.object,
};

ToolbarHeadersList.defaultProps = {
  activeObj: {},
};

export default ToolbarHeadersList;
