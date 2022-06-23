import React from 'react';
import PropTypes from 'prop-types';
import './_button-header-one.scss';
import { ReactComponent as HEADER_ONE } from '../../../../assets/img/wysiwyg/h1.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Header one
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const HeaderOne = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <HEADER_ONE />
  </ButtonWrapper>
);

HeaderOne.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default HeaderOne;
