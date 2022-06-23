import React from 'react';
import PropTypes from 'prop-types';
import './_button-header-five.scss';
import { ReactComponent as HEADER_FIVE } from '../../../../assets/img/wysiwyg/h5.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Header five
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const HeaderFive = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <HEADER_FIVE />
  </ButtonWrapper>
);

HeaderFive.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default HeaderFive;
