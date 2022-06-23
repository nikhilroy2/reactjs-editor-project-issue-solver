import React from 'react';
import PropTypes from 'prop-types';
import './_order-list.scss';
import { ReactComponent as ORDER_LIST } from '../../../../assets/img/wysiwyg/ol_list.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Список ol
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const OrderList = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <ORDER_LIST />
  </ButtonWrapper>
);

OrderList.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default OrderList;
