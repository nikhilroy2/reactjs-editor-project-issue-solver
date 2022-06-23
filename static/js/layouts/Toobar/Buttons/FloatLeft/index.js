import React from 'react';
import PropTypes from 'prop-types';
import './_button-float-left.scss';
import { ReactComponent as FLOAT_LEFT } from '../../../../assets/img/wysiwyg/float_left.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Блок слева
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const FloatLeft = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <FLOAT_LEFT />
  </ButtonWrapper>
);

FloatLeft.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default FloatLeft;
