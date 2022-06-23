import React from 'react';
import PropTypes from 'prop-types';
import './_button-align-left.scss';
import { ReactComponent as ALIGN_LEFT } from '../../../../assets/img/wysiwyg/alight_left.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Текст слева
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const AlignLeft = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <ALIGN_LEFT />
  </ButtonWrapper>
);

AlignLeft.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default AlignLeft;
