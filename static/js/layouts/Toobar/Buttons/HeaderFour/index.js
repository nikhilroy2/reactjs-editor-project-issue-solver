import React from 'react';
import PropTypes from 'prop-types';
import './_button-header-four.scss';
import { ReactComponent as HEADER_FOUR } from '../../../../assets/img/wysiwyg/h4.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Header four
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const HeaderFour = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <HEADER_FOUR />
  </ButtonWrapper>
);

HeaderFour.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default HeaderFour;
