import React from 'react';
import PropTypes from 'prop-types';
import './_button-float-justify.scss';
import { ReactComponent as FLOAT_JUSTIFY } from '../../../../assets/img/wysiwyg/float_justify.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Блок justify
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const FloatJustify = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <FLOAT_JUSTIFY />
  </ButtonWrapper>
);

FloatJustify.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default FloatJustify;
