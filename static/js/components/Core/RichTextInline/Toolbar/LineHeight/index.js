import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import Tooltip from '../../../../Elements/Tooltip';

/**
 * Button line height
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonLineHeight = ({ activeObj, onChangeTooltipBody }) => {
  const styleKey = 'LINE_HEIGHT';
  const isActive = !!activeObj[styleKey];

  const onClick = () => {
    onChangeTooltipBody('lineHeight');
  };

  const onMouseDown = (e) => e.preventDefault();

  return (
    <Tooltip
      text={`Line height ${isActive ? activeObj[styleKey] : ''}`}
      offset={8}
    >
      <ToolbarButtons.LineHeight
        active={isActive}
        onMouseDown={onMouseDown}
        onClick={() => onClick()}
      />
    </Tooltip>
  )
};

ToolbarButtonLineHeight.propTypes = {
  /**
   * Изменить body toolbar
   */
  onChangeTooltipBody: PropTypes.func.isRequired,
  /**
   * Активные стили в getSelection Draft js
   */
  activeObj: PropTypes.object,
};

ToolbarButtonLineHeight.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonLineHeight;
