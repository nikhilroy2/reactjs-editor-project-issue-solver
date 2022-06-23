import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import Tooltip from '../../../../Elements/Tooltip';
import { getDefaultFontSize } from './helper';

/**
 * Button font size
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonFontSize = ({ onChangeTooltipBody, activeObj }) => {
  const styleKey = 'FONT_SIZE';
  const isActive = !!activeObj[styleKey];

  const defaultFontSize = getDefaultFontSize(activeObj)

  const onClick = () => {
    onChangeTooltipBody('fontSize');
  };

  const onMouseDown = (e) => e.preventDefault();

  return (
    <Tooltip text={`Font size ${isActive ? `${activeObj[styleKey]}` : `${defaultFontSize}px`}`} offset={8}>
      <ToolbarButtons.FontSize
        active={isActive}
        onMouseDown={onMouseDown}
        onClick={() => onClick()}
      />
    </Tooltip>
  )
};

ToolbarButtonFontSize.propTypes = {
  /**
   * Изменить body toolbar
   */
  onChangeTooltipBody: PropTypes.func.isRequired,
  /**
   * Активные стили в getSelection Draft js
   */
  activeObj: PropTypes.object,
};

ToolbarButtonFontSize.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonFontSize;
