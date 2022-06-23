import React from 'react';
import PropTypes from 'prop-types';
import './_button-header-two.scss';
import { ReactComponent as HEADER_TWO } from '../../../../assets/img/wysiwyg/h2.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Header two
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const HeaderTwo = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <HEADER_TWO />
  </ButtonWrapper>
);

HeaderTwo.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default HeaderTwo;
