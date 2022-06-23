import React from 'react';
import PropTypes from 'prop-types';
import './_unorder-list.scss';
import { ReactComponent as UN_ORDER_LIST } from '../../../../assets/img/wysiwyg/ul_list.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Список ul
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const UnOrderList = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <UN_ORDER_LIST />
  </ButtonWrapper>
);

UnOrderList.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default UnOrderList;
