import React from 'react';
import PropTypes from 'prop-types';
import './_button-bold.scss';
import { ReactComponent as BOLD } from '../../../../assets/img/wysiwyg/bold.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Жирность текста
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Bold = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <BOLD />
  </ButtonWrapper>
);

Bold.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default Bold;
