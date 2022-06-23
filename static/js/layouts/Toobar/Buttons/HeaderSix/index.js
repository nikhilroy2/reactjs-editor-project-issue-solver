import React from 'react';
import PropTypes from 'prop-types';
import './_button-header-six.scss';
import { ReactComponent as HEADER_SIX } from '../../../../assets/img/wysiwyg/h6.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Header six
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const HeaderSix = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <HEADER_SIX />
  </ButtonWrapper>
);

HeaderSix.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default HeaderSix;
