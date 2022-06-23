import React from 'react';
import PropTypes from 'prop-types';
import './_button-strikethrough.scss';
import { ReactComponent as STRIKETHROUGH } from '../../../../assets/img/wysiwyg/crossed.svg';
import ButtonWrapper from '../ButtonWrapper';

/**
 * Зачеркнуть текст
 *
 * @component
 * @category Components
 * @subcategory Tooltip actions
 *
 */
const Strikethrough = ({ active, ...props }) => (
  <ButtonWrapper {...props} active={active}>
    <STRIKETHROUGH />
  </ButtonWrapper>
);

Strikethrough.propTypes = {
  /**
   * Параметр для активной кнопки
   */
  active: PropTypes.bool,
};

export default Strikethrough;
