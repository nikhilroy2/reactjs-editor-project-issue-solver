import React from 'react';
import PropTypes from 'prop-types';
import './_button-header-three.scss';
import { ReactComponent as HEADER_THREE } from '../../../../assets/img/wysiwyg/h3.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Header three
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const HeaderThree = ({ active, ...props }) => (
  <ButtonWrapper
    {...props}
    active={active}
  >
    <HEADER_THREE />
  </ButtonWrapper>
);

HeaderThree.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default HeaderThree;
