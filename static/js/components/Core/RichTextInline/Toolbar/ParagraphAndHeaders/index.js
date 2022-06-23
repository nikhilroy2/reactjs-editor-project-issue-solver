import React from 'react';
import PropTypes from 'prop-types';
import { ToolbarButtons } from '../../../../../layouts/Toobar/Buttons';
import Tooltip from '../../../../Elements/Tooltip';

/**
 * Button paragraph
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const ToolbarButtonParagraphAndHeader = ({ activeObj, onChangeTooltipBody }) => {
  const styleKey = 'HEADER';
  const isActive = !!activeObj[styleKey];

  const onClick = () => {
    onChangeTooltipBody('headers');
  };

  const onMouseDown = (e) => e.preventDefault();

  const headers = [
    {
      value: 'p',
      title: 'Paragraph',
      Button: ToolbarButtons.Paragraph,
    },
    {
      value: 'header-one',
      title: 'H1',
      Button: ToolbarButtons.HeaderOne,
    },
    {
      value: 'header-two',
      title: 'H2',
      Button: ToolbarButtons.HeaderTwo,
    },
    {
      value: 'header-three',
      title: 'H3',
      Button: ToolbarButtons.HeaderThree,
    },
    {
      value: 'header-four',
      title: 'H4',
      Button: ToolbarButtons.HeaderFour,
    },
    {
      value: 'header-five',
      title: 'H5',
      Button: ToolbarButtons.HeaderFive,
    },
    {
      value: 'header-six',
      title: 'H6',
      Button: ToolbarButtons.HeaderSix,
    },
  ];

  return (
    <>
      {headers.map((header) => {
        if (isActive) {
          const { Button } = header;
          if (activeObj[styleKey] === header.value) {
            return <Button active select key={header.value} onMouseDown={onMouseDown} onClick={() => onClick()} />;
          }
          return null;
        }
        return null;
      })}
      {!isActive ? (
        <Tooltip text="Paragraph" offset={8}>
          <ToolbarButtons.Paragraph select active={isActive} onMouseDown={onMouseDown} onClick={() => onClick()} />
        </Tooltip>
      ) : null}
    </>
  );
};

ToolbarButtonParagraphAndHeader.propTypes = {
  /**
   * Изменить body toolbar
   */
  onChangeTooltipBody: PropTypes.func.isRequired,
  /**
   * Активные стили в getSelection Draft js
   */
  activeObj: PropTypes.object,
};

ToolbarButtonParagraphAndHeader.defaultProps = {
  activeObj: {},
};

export default ToolbarButtonParagraphAndHeader;
