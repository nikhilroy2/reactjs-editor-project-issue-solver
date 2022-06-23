import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import Tooltip from '../../../../Elements/Tooltip';

/**
 * Button letter spacing
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonLetterSpacing = ({ activeObj, onChangeTooltipBody }) => {
  const styleKey = 'LETTER_SPACING';
  const isActive = !!activeObj[styleKey];

  const onClick = () => {
    onChangeTooltipBody('letterSpacing');
  };

  const onMouseDown = (e) => e.preventDefault();

  return (
    <Tooltip text={`Letter spacing ${isActive ? activeObj[styleKey] : ''}`} offset={8}>
      <ToolbarButtons.LetterSpacing active={isActive} onMouseDown={onMouseDown} onClick={() => onClick()} />
    </Tooltip>
  );
};

ToolbarButtonLetterSpacing.propTypes = {
  /**
   * Изменить body toolbar
   */
  onChangeTooltipBody: PropTypes.func.isRequired,
  /**
   * Активные стили в getSelection Draft js
   */
  activeObj: PropTypes.object,
};

ToolbarButtonLetterSpacing.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonLetterSpacing;
