import React from 'react';
import PropTypes from 'prop-types';
import './_button-float-center.scss';
import { ReactComponent as FLOAT_CENTER } from '../../../../assets/img/wysiwyg/float_center.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Блок центру
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const FloatCenter = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <FLOAT_CENTER />
  </ButtonWrapper>
);

FloatCenter.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default FloatCenter;
