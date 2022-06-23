import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import Tooltip from '../../../../Elements/Tooltip';

/**
 * Align button
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonAlign = ({ activeObj, onChangeTooltipBody }) => {
  const styleKey = 'ALIGN';
  const isActive = !!activeObj[styleKey];

  const onClick = () => {
    onChangeTooltipBody('alignments');
  };

  const onMouseDown = (e) => e.preventDefault();

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
        if (isActive) {
          const { Button } = align;
          if (activeObj[styleKey] === align.value) {
            return (
              <Tooltip text={`Align ${align.value}`} key={align.value} offset={8}>
                <Button active onMouseDown={onMouseDown} onClick={() => onClick()} />
              </Tooltip>
            );
          }
          return null;
        }
        return null;
      })}
      {!isActive ? (
        <Tooltip text="Align" offset={8}>
          <ToolbarButtons.AlignCenter active={isActive} onMouseDown={onMouseDown} onClick={() => onClick()} />
        </Tooltip>
      ) : null}
    </>
  );
};

ToolbarButtonAlign.propTypes = {
  /**
   * Изменить body toolbar
   */
  onChangeTooltipBody: PropTypes.func.isRequired,
  /**
   * Активные стили в getSelection Draft js
   */
  activeObj: PropTypes.object,
};

ToolbarButtonAlign.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonAlign;
