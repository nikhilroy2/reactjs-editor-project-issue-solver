import React from 'react';
import PropTypes from 'prop-types';
import './_button-float-right.scss';
import { ReactComponent as FLOAT_RIGHT } from '../../../../assets/img/wysiwyg/float_right.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Блок справа
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const FloatRight = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <FLOAT_RIGHT />
  </ButtonWrapper>
);

FloatRight.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default FloatRight;
