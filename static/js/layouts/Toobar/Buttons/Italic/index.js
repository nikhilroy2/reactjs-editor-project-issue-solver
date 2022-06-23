import React from 'react';
import PropTypes from 'prop-types';
import './_button-italic.scss';
import { ReactComponent as ITALIC } from '../../../../assets/img/wysiwyg/italic.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Наклон текста
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Italic = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <ITALIC />
  </ButtonWrapper>
);

Italic.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default Italic;
