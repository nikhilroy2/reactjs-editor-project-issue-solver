import React from 'react';
import PropTypes from 'prop-types';
import RangeSlideTooltip from '../../../../Elements/RangeSliderTooltip';
import ButtonWrapper from '../../../../../layouts/Toobar/Buttons/ButtonWrapper';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import { styles } from '../../config';

/**
 * Slider letter spacing
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarLetterSpacingSlider = ({
  onChangeTooltipBody, activeObj, getEditorState, setEditorState,
}) => {
  const styleKey = 'LETTER_SPACING';
  const isActive = !!activeObj[styleKey];

  const onChangeFontSize = (value) => {
    const editorState = getEditorState();
    const newEditorState = styles.letterSpacing.toggle(editorState, value);
    setEditorState(newEditorState);
  };

  const onClose = () => {
    onChangeTooltipBody(false);
  };

  const onMouseDown = (e) => e.preventDefault();

  const value = isActive ? parseFloat(activeObj[styleKey], 10) : 0;
  return (
    <>
      <ButtonWrapper style={{
        width: 260,
      }}
      >
        <RangeSlideTooltip
          min={0}
          max={10}
          step={0.1}
          onChange={(value) => onChangeFontSize(value)}
          value={value}
          input
        />
      </ButtonWrapper>
      <ToolbarButtons.Close
        onMouseDown={onMouseDown}
        onClick={onClose}
      />
    </>
  )
};

ToolbarLetterSpacingSlider.propTypes = {
  /**
   * Актуальный EditorState (DraftJS)
   */
  getEditorState: PropTypes.func.isRequired,
  /**
   * Изменить body toolbar
   */
  onChangeTooltipBody: PropTypes.func.isRequired,
  /**
   * Изменить EditorState (DraftJS)
   */
  setEditorState: PropTypes.func.isRequired,
  /**
   * Активные стили в getSelection Draft js
   */
  activeObj: PropTypes.object,
};

ToolbarLetterSpacingSlider.defaultProps = {
  activeObj: {},
};

export default ToolbarLetterSpacingSlider;
