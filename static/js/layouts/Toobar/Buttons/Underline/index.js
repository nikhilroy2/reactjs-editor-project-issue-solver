import React from 'react';
import PropTypes from 'prop-types';
import './_button-underline.scss';
import { ReactComponent as UNDERLINE } from '../../../../assets/img/wysiwyg/underline.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Подчеркивание
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Underline = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <UNDERLINE />
  </ButtonWrapper>
);

Underline.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default Underline;
