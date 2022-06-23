import React from 'react';
import PropTypes from 'prop-types';
import RangeSlideTooltip from '../../../../Elements/RangeSliderTooltip';
import ButtonWrapper from '../../../../../layouts/Toobar/Buttons/ButtonWrapper';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import { styles } from '../../config';

/**
 * Slider line height
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarLineHeightSlider = ({
  onChangeTooltipBody, activeObj, getEditorState, setEditorState,
}) => {
  const styleKey = 'LINE_HEIGHT';
  const isActive = !!activeObj[styleKey];

  const onChangeFontSize = (value) => {
    const editorState = getEditorState();
    const newEditorState = styles.lineHeight.toggle(editorState, value);
    setEditorState(newEditorState);
  };

  const onClose = () => {
    onChangeTooltipBody(false);
  };

  const onMouseDown = (e) => e.preventDefault();

  const value = isActive ? parseInt(activeObj[styleKey], 10) : 16;
  return (
    <>
      <ButtonWrapper style={{
        width: 260,
      }}
      >
        <RangeSlideTooltip
          min={8}
          max={150}
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

ToolbarLineHeightSlider.propTypes = {
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

ToolbarLineHeightSlider.defaultProps = {
  activeObj: {},
};

export default ToolbarLineHeightSlider;
