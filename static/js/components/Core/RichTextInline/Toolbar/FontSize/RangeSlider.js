import React from 'react';
import PropTypes from 'prop-types';
import RangeSlideTooltip from '../../../../Elements/RangeSliderTooltip';
import ButtonWrapper from '../../../../../layouts/Toobar/Buttons/ButtonWrapper';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import { styles } from '../../config';
import { getDefaultFontSize } from './helper';

/**
 * Slider font size
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarFontSizeSlider = ({
  onChangeTooltipBody, activeObj, getEditorState, setEditorState,
}) => {
  const styleKey = 'FONT_SIZE';
  const isActive = !!activeObj[styleKey];
  const defaultFontSize = getDefaultFontSize(activeObj);

  const onChangeFontSize = (value) => {
    const editorState = getEditorState();
    const newEditorState = styles.fontSize.toggle(editorState, value);
    setEditorState(newEditorState);
  };

  const onClose = () => {
    onChangeTooltipBody(false);
  };

  const onMouseDown = (e) => e.preventDefault();

  const value = isActive ? parseInt(activeObj[styleKey], 10) : defaultFontSize;

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

ToolbarFontSizeSlider.propTypes = {
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

ToolbarFontSizeSlider.defaultProps = {
  activeObj: {},
};

export default ToolbarFontSizeSlider;
