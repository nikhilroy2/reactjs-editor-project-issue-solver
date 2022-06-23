import React from 'react';
import PropTypes from 'prop-types';
import './_button-uppercase.scss';
import { ReactComponent as UPPERCASE } from '../../../../assets/img/wysiwyg/uppercase.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Верхний регистр
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Uppercase = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <UPPERCASE />
  </ButtonWrapper>
);

Uppercase.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default Uppercase;
