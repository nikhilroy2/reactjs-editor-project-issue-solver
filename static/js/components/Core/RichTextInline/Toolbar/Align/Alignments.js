import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import { ExtendedRichUtils, styles } from '../../config';

import Tooltip from '../../../../Elements/Tooltip';

/**
 * Alignments
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarAlignments = ({
  getEditorState, onChangeTooltipBody, activeObj, setEditorState,
}) => {
  const styleKey = 'ALIGN';
  const isActive = !!activeObj[styleKey];

  const onMouseDown = (e) => e.preventDefault();

  const onClick = (value) => {
    try {
      const editorState = getEditorState();
      const valueToUpperCase = value.toUpperCase();
      const newEditorState = styles.textAlign.toggle(editorState, valueToUpperCase);
      setEditorState(ExtendedRichUtils.toggleAlignment(newEditorState, valueToUpperCase));
    } catch (error) {
      if (error && error.message) {
        console.error(error.message)
        Sentry.captureException(error);
      }
    }
  };

  const alignments = [
    {
      value: 'left',
      Button: ToolbarButtons.AlignLeft,
    },
    {
      value: 'center',
      Button: ToolbarButtons.AlignCenter,
    },
    {
      value: 'right',
      Button: ToolbarButtons.AlignRight,
    },
    {
      value: 'justify',
      Button: ToolbarButtons.AlignJustify,
    },
  ];

  return (
    <>
      {alignments.map((align) => {
        const { Button } = align;
        return (
          <Tooltip text={`Align ${align.value}`} offset={8} key={align.value}>
            <Button
              active={isActive ? activeObj[styleKey] === align.value : false}
              key={align.value}
              onClick={() => onClick(align.value)}
              onMouseDown={onMouseDown}
            />
          </Tooltip>
        )
      })}
      <ToolbarButtons.Close
        onClick={() => onChangeTooltipBody(false)}
      />
    </>
  )
};

ToolbarAlignments.propTypes = {
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

ToolbarAlignments.defaultProps = {
  activeObj: {},
};

export default ToolbarAlignments;
