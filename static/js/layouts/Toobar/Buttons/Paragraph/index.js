import React from 'react';
import PropTypes from 'prop-types';
import './_button-paragraph.scss';
import { ReactComponent as PARAGRAPH } from '../../../../assets/img/wysiwyg/paragraph.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Параграф
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Paragraph = ({ active, ...props }) => (
  <ButtonWrapper
    {...props}
    active={active}
  >
    <PARAGRAPH />
  </ButtonWrapper>
);

Paragraph.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default Paragraph;
