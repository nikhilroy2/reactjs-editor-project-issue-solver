import React from 'react';
import PropTypes from 'prop-types';
import './_button-close.scss';
import { ReactComponent as CLOSE } from '../../../../assets/img/close_tooltip.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Закрыть
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Close = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <CLOSE />
  </ButtonWrapper>
);

Close.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default Close;
